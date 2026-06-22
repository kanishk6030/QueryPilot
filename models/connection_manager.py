ACTIVE_CONNECTIONS = {}


def get_key(
    user_id: str,
    connection_id: str
):
    return f"{user_id}:{connection_id}"


def add_connection(
    user_id: str,
    connection_id: str,
    db
):
    ACTIVE_CONNECTIONS[
        get_key(
            user_id,
            connection_id
        )
    ] = db


def get_active_connection(
    user_id: str,
    connection_id: str
):
    return ACTIVE_CONNECTIONS.get(
        get_key(
            user_id,
            connection_id
        )
    )


def remove_connection(
    user_id: str,
    connection_id: str
):
    key = get_key(
        user_id,
        connection_id
    )

    if key in ACTIVE_CONNECTIONS:
        del ACTIVE_CONNECTIONS[key]