from langchain.tools import tool
# from database.sqlite_manager import get_db
import utils.request_context as rc

@tool
def list_tables():
    """List all tables in the database."""
    context = rc.CURRENT_CONTEXT.get()
    db = context.db 
    
    try:
        return list(db.get_usable_table_names())
    except Exception as e:
        return f"Error executing query: {str(e)}"