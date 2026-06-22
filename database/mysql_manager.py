from langchain_community.utilities import SQLDatabase
from urllib.parse import quote_plus

def get_mysql_db(
    host: str,
    port: int,
    username: str,
    password: str,
    database: str
):
    encoded_password = quote_plus(password)
    #pass - ram@1233 -> ram%401233

    uri = (
        f"mysql+pymysql://"
        f"{username}:{encoded_password}"
        f"@{host}:{port}/{database}"
    )

    return SQLDatabase.from_uri(uri)