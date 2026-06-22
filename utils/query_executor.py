from sqlalchemy import text


def execute_sql_with_metadata(db, query):

    with db._engine.connect() as connection:

        result = connection.execute(
            text(query)
        )

        columns = list(result.keys())

        rows = [
            dict(zip(columns, row))
            for row in result.fetchall()
        ]

        return {
            "columns": columns,
            "rows": rows
        }