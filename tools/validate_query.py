from langchain.tools import tool

@tool
def validate_query(query:str) -> str:
    """validate the query to check if it is a valid SQL query before the execution."""
    # Placeholder implementation - replace with actual query validation logic
    forbidden = {
        "DROP", 
        "DELETE", 
        "ALTER", 
        "TRUNCATE",
        "INSERT",
        "UPDATE",
        "REPLACE",
        "CREATE",
    }

    # Convert the query to uppercase for case-insensitive comparison
    query_upper = query.upper()

    for keyword in forbidden:
        if keyword in query_upper:
            return f"Unsafe query detected: {keyword}"
        
    return "Query is valid and safe to execute."