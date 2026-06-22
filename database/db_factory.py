# from database.sqlite_manager import get_db
from database.mysql_manager import get_mysql_db

def get_database(
    db_type: str,
    **kwargs
):

    if db_type == "sqlite":

        return ##get_db()

    elif db_type == "mysql":

        return get_mysql_db(
            host=kwargs["host"],
            port=kwargs["port"],
            username=kwargs["username"],
            password=kwargs["password"],
            database=kwargs["database"]
        )

    raise ValueError(
        f"Unsupported database type: {db_type}"
    )