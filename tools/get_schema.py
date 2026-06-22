from langchain.tools import tool
from database.sqlite_manager import get_db
import utils.request_context as rc
@tool
def get_schema(table_name:str) -> str:
    """Get the schema of a table in the database."""
    context = rc.CURRENT_CONTEXT.get()
    db = context.db 
    
    #Instead of using PRAGMA table_info(students) which is specific for sqlite, we can use the following query which is more general and works for most databases
    # query = f"PRAGMA table_info({table_name})"

    try:
        return db.get_table_info([table_name])
    except Exception as e:
        return f"Error executing query: {str(e)}"