from config.settings import get_fast_llm
from models.chat_model import VerificationResult
def verify_answer(
    question: str,
    sql_result: str,
    sql_query: str,
    answer: str
):
    prompt = f"""
You are a strict SQL answer verifier.

You are given:

1. User question
2. SQL query
3. SQL result
4. Generated answer

Question:
{question}

SQL Query:
{sql_query}

SQL Result:
{sql_result}

Generated Answer:
{answer}

Rules:

- The SQL query and SQL result are the source of truth.
- Do NOT recompute values unless explicitly required.
- Do NOT make assumptions.
- Verify whether the generated answer accurately reflects the SQL result.

Return:

PASS

or

FAIL: <brief explanation>
"""

    llm = get_fast_llm()
    structured_llm = llm.with_structured_output(VerificationResult)
    response = structured_llm.invoke(prompt)

    return response

# test_cases = [

#     # PASS CASES
#     {
#         "question": "How many students are in Artificial Intelligence?",
#         "sql_result": "[(2,)]",
#         "answer": "There are 2 students in Artificial Intelligence.",
#         "expected": "PASS"
#     },

#     {
#         "question": "Who scored the highest marks?",
#         "sql_result": "[('Jane Smith', 92)]",
#         "answer": "Jane Smith scored the highest marks with 92.",
#         "expected": "PASS"
#     },

#     {
#         "question": "What is the average marks of all students?",
#         "sql_result": "[(86.6,)]",
#         "answer": "The average marks of all students is 86.6.",
#         "expected": "PASS"
#     },

#     {
#         "question": "List students in Data Science.",
#         "sql_result": "[('John Doe',), ('Tom Brown',)]",
#         "answer": "The Data Science students are John Doe and Tom Brown.",
#         "expected": "PASS"
#     },

#     {
#         "question": "How many classes are available?",
#         "sql_result": "[(3,)]",
#         "answer": "There are 3 classes available.",
#         "expected": "PASS"
#     },

#     # FAIL CASES

#     {
#         "question": "How many students are in Artificial Intelligence?",
#         "sql_result": "[(2,)]",
#         "answer": "There is 1 student in Artificial Intelligence.",
#         "expected": "FAIL"
#     },

#     {
#         "question": "Who scored the highest marks?",
#         "sql_result": "[('Jane Smith', 92)]",
#         "answer": "Tom Brown scored the highest marks.",
#         "expected": "FAIL"
#     },

#     {
#         "question": "What is the average marks of all students?",
#         "sql_result": "[(86.6,)]",
#         "answer": "The average marks is 92.",
#         "expected": "FAIL"
#     },

#     {
#         "question": "List students in Data Science.",
#         "sql_result": "[('John Doe',), ('Tom Brown',)]",
#         "answer": "The Data Science students are John Doe, Tom Brown, and Sarah Williams.",
#         "expected": "FAIL"
#     },

#     {
#         "question": "How many classes are available?",
#         "sql_result": "[(3,)]",
#         "answer": "There are 5 classes available.",
#         "expected": "FAIL"
#     },

#     # TRICKY CASES

#     {
#         "question": "Who scored the highest marks?",
#         "sql_result": "[('Jane Smith', 92)]",
#         "answer": "Jane Smith achieved the highest score of 92 marks.",
#         "expected": "PASS"
#     },

#     {
#         "question": "How many students are in Artificial Intelligence?",
#         "sql_result": "[(2,)]",
#         "answer": "Artificial Intelligence currently has two students enrolled.",
#         "expected": "PASS"
#     },

#     {
#         "question": "Who scored the highest marks?",
#         "sql_result": "[('Jane Smith', 92)]",
#         "answer": "Jane Smith scored 91 marks and was the highest scorer.",
#         "expected": "FAIL"
#     }
# ]

# for i,test_case in enumerate(test_cases):
#     question = test_case["question"]
#     sql_result = test_case["sql_result"]
#     answer = test_case["answer"]
#     expected = test_case["expected"]

#     result = verify_answer(question, sql_result, answer)

#     print(f"Test Case {i+1}:")
#     print(f"Question: {question}")
#     print(f"SQL Result: {sql_result}")
#     print(f"Generated Answer: {answer}")
#     print(f"Expected: {expected}, Got: {result}")
#     print(f"Test {'PASSED' if result == expected else 'FAILED'}\n")