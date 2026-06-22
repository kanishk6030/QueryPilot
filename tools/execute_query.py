from langchain.tools import tool
from database.sqlite_manager import get_db
from utils.sql_checker import review_sql_query
from utils.sql_error_recovery import fix_sql_query
import utils.request_context as rc
from utils.query_executor import execute_sql_with_metadata
@tool
def execute_query(query: str) -> str:
    """Execute a SQL SELECT query against the database.

    The returned result is authoritative and must be used exactly
    when answering the user.

    Do not estimate or modify values."""

    context = rc.CURRENT_CONTEXT.get()
    db = context.db 
    try:
        
        schema = db.get_table_info()

        corrected_query = review_sql_query(
            query=query,
            schema=schema
        )

        print(f"\nOriginal Query: {query}")
        print(f"Corrected Query after review: {corrected_query}\n")
        
        result = execute_sql_with_metadata  (db, corrected_query)

        context = rc.CURRENT_CONTEXT.get()
        if context:
            context.sql_query = corrected_query
            context.sql_result = result

        print(f"RESULT: {result}\n")
        return f"SQL_QUERY_RESULT after review: {result}"
    
    except Exception as e:

        schema = db.get_table_info()

        corrected_query = fix_sql_query(
            query=query,
            schema=schema,
            error=str(e)
        )

        print(f"\nOriginal Query: {query}")
        print(f"Corrected Query after fix: {corrected_query}\n")
        
        result = execute_sql_with_metadata  (db, corrected_query)
        
        context = rc.CURRENT_CONTEXT.get()
        if context:
            context.sql_query = corrected_query
            context.sql_result = result

        print(f"RESULT: {result}\n")
        return f"SQL_QUERY_RESULT after fix: {result}"