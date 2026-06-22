from config.settings import get_fast_llm

def fix_sql_query(query:str , schema:str , error:str) -> str:
        prompt = f"""
        You are a SQL expert.

        Database Schema:
        {schema}

        Original Query:
        {query}

        Database Error:
        {error}

        Fix the SQL query.

        Return ONLY the corrected SQL QUERY.
        Do NOT use markdown.
        Do NOT use triple backticks.
        Do NOT explain anything.
        """

        llm = get_fast_llm()

        response = llm.invoke(prompt)
        return response.content.strip()