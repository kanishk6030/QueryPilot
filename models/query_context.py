class QueryContext:
   def __init__(self, question: str):

        self.question = question
        
        self.connection_id = None

        self.db_type = None

        self.connection_config = None

        self.db = None

        self.sql_query = None

        self.sql_result = None

        self.answer = None

        self.verification = None

        self.user_id = None

        self.email = None