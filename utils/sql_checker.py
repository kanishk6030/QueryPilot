from config.settings import get_fast_llm
def review_sql_query(query: str, schema: str) -> str:
    """
    Review the SQL query against provided schema and fix the issue before  execution.
    """

    prompt = f"""
        You are a SQL reviewer.

        Database Schema:
        {schema}

        SQL Query:
        {query}

        Tasks:
        1. Check whether the query matches the schema.
        2. Fix any incorrect table names.
        3. Fix any incorrect column names.
        4. For text filters using literal values, make comparisons case-insensitive
           using LOWER(column_name) = LOWER('literal value').
        5. Return ONLY the corrected SQL query.
        6. Do not explain anything.
        """
    llm = get_fast_llm()
    response = llm.invoke(prompt)

    return response.content.strip() 
