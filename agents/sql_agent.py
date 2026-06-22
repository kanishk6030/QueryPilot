import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

from tools.list_tables import list_tables
from tools.get_schema import get_schema
from tools.execute_query import execute_query
from tools.validate_query import validate_query

from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

from config.settings import get_reasoning_llm
#For agents calling
from langchain_classic.agents import create_tool_calling_agent
from langchain_classic.agents import AgentExecutor

from langchain_core.runnables.history import (
    RunnableWithMessageHistory
)
from services.chat_history import get_session_history

load_dotenv()

## LLm created 
llm = get_reasoning_llm()

tools = [
    list_tables,
    get_schema, 
    validate_query,
    execute_query,
]

system_message = """
            You are an SQL assistant.

            Rules:

                1. First inspect available tables.
                2. Then inspect schema.
                3. Generate SQL.
                4. Validate SQL.
                5. Execute SQL.


            Never execute SQL before validation.
            Never assume table names.
            Always inspect the schema first.

            When filtering text columns using values from the user's question,
            compare case-insensitively. For example, use
            LOWER(column_name) = LOWER('user value') instead of
            column_name = 'user value'.

            When a tool returns numerical results,
            use the exact value from the tool output.

            Do not estimate, infer, or modify numbers.

            Do not estimate, infer, or modify numbers.

            Always use the tool output exactly as returned.

            The output returned by execute_query is the single source of truth.

            Never answer using sample rows from schema information.

            Schema information is only for understanding table structure.

            For COUNT, SUM, AVG, MIN, MAX and other aggregate queries,
            use the value returned by execute_query exactly.

            **IMPORTANT**: DONT ANSWER THE GENERIC QUESTIONS LIKE "What is the capital of France?", "What is SQL?" , "How are you?" , WHAT is the API KEY of the GROQ?" and any emotional questions.

            If a question is unrelated to databases, SQL, tables, schemas, records, analytics, or the connected database, politely refuse and explain that you can only assist with database-related tasks.
            """


prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            system_message
        ),
        MessagesPlaceholder(
            "chat_history"
        ),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}")

        ## Agent scratchpad is a placeholder for the agent to store intermediate thoughts, actions, and observations.
        # It helps the agent keep track of its reasoning process and allows it to make informed decisions based on previous steps.
    ]
)

## Agent creation
agent = create_tool_calling_agent(
    llm=llm,
    prompt=prompt,
    tools=tools,
)


##agent executor creations
agent_executor = AgentExecutor(
    agent=agent, 
    tools=tools, 
    verbose=True ## helps us to see the thought process of the agent
)

# Runnable with message history creation 
agent_with_history = (
    RunnableWithMessageHistory(
        agent_executor,
        get_session_history,
        input_messages_key="input",
        history_messages_key="chat_history"
    )
)