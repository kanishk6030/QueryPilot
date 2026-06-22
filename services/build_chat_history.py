from langchain_core.messages import (
    HumanMessage,
    AIMessage
)

def build_chat_history(
    messages
):
    history = []

    for msg in messages:

        if msg["role"] == "user":
            history.append(
                HumanMessage(
                    content=msg["content"]
                )
            )

        else: 
            
            history.append(
                AIMessage(
                    content=msg["content"]
                )
            )