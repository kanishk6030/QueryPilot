import os

from fastapi import FastAPI

from database.db_factory import get_database
from services.chat_history_services import delete_chat_history, delete_chat_history, get_chat_history
from services.chat_service import process_question
from models.chat_model import ChatRequest

from fastapi.middleware.cors import CORSMiddleware
from models.connection_request import ConnectionRequest

from fastapi import Depends
from middleware.auth import get_current_user

from services.connection_service import (
    load_connections,
    save_connection,
    delete_connection,
    connect_connection,
    disconnect_connection
)
from services.history_service import get_user_history

import os
from dotenv import load_dotenv
load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")


app = FastAPI()

#Cors middleware to allow cross-origin requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://localhost:3000",
        "http://localhost:5173",
        FRONTEND_URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():

    return {
        "message": "AI Database Copilot API"
    }

@app.get("/me")
def get_me(
    user = Depends(
        get_current_user
    )
):

    return {
        "user": user
    }


@app.post("/chat")
def chat(request: ChatRequest,user = Depends(get_current_user)
):

    result = process_question(
        request.question,
        request.connection_id,
        user
    )

    return result

@app.get("/connections")
def get_connections(
    user = Depends(
        get_current_user
    )
):

    return load_connections(
        user["sub"]
    )

    # connections = load_connections()

    # return [
    #     connection
    #     for connection in connections
    #     if connection["user_id"] == user["sub"]
    # ]

@app.post("/connections")
def create_connection(
    request: ConnectionRequest,
    user = Depends(get_current_user)
):

    save_connection(
        request.model_dump(),
        user["sub"]
    )

    return {
        "message": "Connection saved"
    }

@app.delete("/connections/{connection_id}")
def remove_connection(
    connection_id: str,
    user = Depends(get_current_user)
):

    delete_connection(
        connection_id,
        user["sub"]
    )

    return {
        "message": "Connection deleted"
    }

@app.post("/connections/test")
def test_connection(request: ConnectionRequest,user = Depends(get_current_user)):

    try:
        connect_connection(connection_id=request.id,user_id=user["sub"])

        return {
        "message": "Connection Tested Successfully"
        }
    
    except Exception as e:
        return {
        "message": "Connection failed: " + str(e)
        }

@app.post("/connections/{id}/disconnect")
def disconnect_connection_endpoint(id: str,user = Depends(get_current_user)):

    try:
        disconnect_connection(connection_id=id,user_id=user["sub"])

        return {
        "message": "Connection Disconnected Successfully"
        }
    
    except Exception as e:
        return {
        "message": "Failed to disconnect connection: " + str(e)
        }
    
@app.get("/history")
def get_history(
    user=Depends(
        get_current_user
    )
):

    return get_user_history(
        user["sub"]
    )

@app.get("/chat/history")
def get_history(
    user=Depends(
        get_current_user
    )
):

    return get_chat_history(
        user["sub"],
        limit=10
    )

@app.delete("/chat/history")
def clear_history(
    user=Depends(
        get_current_user
    )
):

    delete_chat_history(
        user["sub"]
    )

    return {
        "message":
        "History cleared successfully"
    }