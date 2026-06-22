# import sqlite3

# connection = sqlite3.connect("history.db")

# cursor = connection.cursor()

# cursor.execute(
#     """
#     CREATE TABLE IF NOT EXISTS query_history (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         question TEXT,
#         sql_query TEXT,
#         sql_result TEXT,
#         answer TEXT,
#         verification TEXT,
#         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#     )
#     """
# )

# connection.commit()
# connection.close()