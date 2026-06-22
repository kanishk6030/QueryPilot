from streamlit import context, user

from models.query_context import QueryContext

# from services.chat_history import get_session_history
from services.connection_service import get_connection
from services.history_service import save_query
import utils.request_context as rc
from agents.sql_agent import agent_executor 
# from utils.question_classifier import classify_question
from agents.general_chat import general_chat
from utils.verification import verify_answer
from database.db_factory import get_database
from services.connection_service import get_connection

from services.chat_history_services import  get_chat_history , save_message

from services.build_chat_history import build_chat_history

from groq import RateLimitError

def process_question(question: str,connection_id: str = None, user = None):

    context = QueryContext(question)

    connection = get_connection(connection_id,user["sub"])

    context.user_id = user["sub"]
    context.email = user.get("email")
    context.connection_id = connection_id
    context.connection_config = connection                 
    context.db_type = connection["kind"]

    # print(
    # f"User: {context.email}"
    # )

    # print(
    #     f"User ID: {context.user_id}"
    # )

    if context.db_type == "sqlite":
        context.db = get_database(
            db_type="sqlite"
        )

    elif context.db_type == "mysql":
        context.db = get_database(
            db_type="mysql",
            host=connection["host"],
            port=connection["port"],
            username=connection["username"],
            password=connection["password"],
            database=connection["database"]
        )

    messages = get_chat_history(
            context.user_id,
            limit = 10
        )

    chat_history = (
        build_chat_history(
            messages
        )
    )    

    rc.CURRENT_CONTEXT.set(context)

    # route = classify_question(question)

    # print(f"\nSelected Route: {route}\n")

    try:
        # if route == "DATABASE":

            response = (
                agent_executor.invoke(
                        {
                            "input": question,
                            "chat_history": chat_history
                        },
                        config={
                            "configurable": {
                                "session_id":
                                context.user_id
                            }
                        }
                    )
                )

            context.answer = response["output"]

            verification = verify_answer(
                question=context.question,
                sql_result=str(context.sql_result),
                sql_query=context.sql_query,
                answer=context.answer
            )

            context.verification = verification

            save_message(
                user_id=context.user_id,
                role= "user",
                content= question
            )
            save_message(
                user_id=context.user_id,
                role= "assistant",
                content= context.answer
            )
## Storing the query and its details in the history database for future reference and analysis
            save_query(
                user_id=context.user_id,
                connection_id=context.connection_id,
                question=question,
                sql_query=context.sql_query,
                verification=context.verification
            )

            # history = get_session_history(
            #     context.user_id
            # )

            # print(history.messages)
            return {
                # "route": route,
                "answer": context.answer,
                "sql_query": context.sql_query,
                "sql_result": context.sql_result,
                "verification": context.verification
            }

        # else:

        #     answer = general_chat(question)

        #     return {
        #         "route": route,
        #         "answer": answer
        #     }
    except RateLimitError as e:
        return {
            # "route": route,
            "error": "Rate limit exceeded. Please try again later."
        }