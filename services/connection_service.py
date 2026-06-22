import json

from database.db_factory import get_database
from database.db_factory import get_database
from services.supabase_service import supabase
# from pathlib import Path

# BASE_DIR = Path(__file__).resolve()

# connection_path = BASE_DIR / "connections.db"

CONNECTIONS_FILE ="data\connections.json"


def load_connections(user_id):

    # with open(CONNECTIONS_FILE, "r") as f:
    #     return json.load(f)

    result = (
        supabase
        .table("connections")
        .select("*")
        .eq("user_id", user_id)
        .execute()
    )

    return result.data


def get_connection(connection_id, user_id):

    # connections = load_connections(user_id)

    # for connection in connections:

    #     if (
    #         connection["id"] == connection_id
    #         and connection.get("user_id") == user_id
    #     ):
    #         return connection

    result = (
        supabase
        .table("connections")
        .select("*")
        .eq("id", connection_id)
        .eq("user_id", user_id)
        .execute()
    )

    if result.data:

        return result.data[0]

    return None



def save_connection(connection,user_id):

    # connections = load_connections()
    # connection["user_id"] = user_id
    # connections.append(connection)

    # with open(CONNECTIONS_FILE, "w") as f:
    #     json.dump(
    #         connections,
    #         f,
    #         indent=4
    #     )

    connection["user_id"] = user_id

    return (
        supabase
        .table("connections")
        .insert(connection)
        .execute()
    )


def delete_connection(connection_id, user_id):

    # connections = load_connections()

    # updated_connections = [
    #     connection
    #     for connection in connections
    #     if not (
    #         connection["id"] == connection_id
    #         and connection.get("user_id") == user_id
    #     )
    # ]

    # with open(CONNECTIONS_FILE, "w") as f:
    #     json.dump(
    #         updated_connections,
    #         f,
    #         indent=4
    #     )

    return (
        supabase
        .table("connections")
        .delete()
        .eq("id", connection_id)
        .eq("user_id", user_id)
        .execute()
    )

def disconnect_connection(connection_id,user_id):

    # connections = load_connections()

    # for connection in connections:

    #     if connection["id"] == connection_id and connection.get("user_id") == user_id:

    #         connection["status"] = "idle"

    #         break

    # with open(CONNECTIONS_FILE, "w") as f:

    #     json.dump(
    #         connections,
    #         f,
    #         indent=4
    #     )
    return (
        supabase
        .table("connections")
        .update(
            {
                "status": "idle"
            }
        )
        .eq("id", connection_id)
        .eq("user_id", user_id)
        .execute()
    )

def connect_connection(connection_id,user_id):
    # found = False

    # connections = load_connections()
    # try:
    #     for connection in connections:

    #         if connection["id"] == connection_id and connection.get("user_id") == user_id:

    #             connection["status"] = "connected"

    #             found = True

    #             break
    #         if not found:
    #             raise ValueError(
    #                 "Connection not found"
    #             )
            
    #     with open(CONNECTIONS_FILE, "w") as f:

    #         json.dump(
    #             connections,
    #             f,
    #             indent=4
    #         )
    # except Exception as e:
    #     for connection in connections:

    #         if connection["id"] == connection_id and connection.get("user_id") == user_id:

    #             connection["status"] = "connected"

    #             break
    #     with open(CONNECTIONS_FILE, "w") as f:

    #         json.dump(
    #             connections,
    #             f,
    #             indent=4
    #         )  
    #     raise e
    
    # return (
    #     supabase
    #     .table("connections")
    #     .update(
    #         {
    #             "status": "connected"
    #         }
    #     )
    #     .eq("id", connection_id)
    #     .eq("user_id", user_id)
    #     .execute()
    # )
    
    connection = get_connection(connection_id, user_id)

    if not connection:
        raise ValueError(
            "Connection not found"
        )

    try:

        db = get_database(
            db_type=connection["kind"],
            host=connection.get("host"),
            port=connection.get("port"),
            username=connection.get("username"),
            password=connection.get("password"),
            database=connection.get("database")
        )

        ## Real Connection Test
        ## get the schema names from the database to ensure the connection is valid
        tables = db.get_usable_table_names()

        if tables is None:
            raise Exception(
                "Unable to fetch schema"
            )
        
        return (
        supabase
        .table("connections")
        .update(
            {
                "status": "connected"
            }
        )
        .eq("id", connection_id)
        .eq("user_id", user_id)
        .execute()
        )
    except Exception as e:
        (supabase
        .table("connections")
        .update(
            {
                "status": "error"
            }
        )
        .eq("id", connection_id)
        .eq("user_id", user_id)
        .execute()
        )
        raise ValueError(
            f"Connection failed: {str(e)}"
        )

