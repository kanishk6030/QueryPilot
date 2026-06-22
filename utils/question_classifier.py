# from config.settings import get_fast_llm

# def classify_question(question: str) ->str:
#     prompt = f"""
#     You are a classifier.

#     Determine whether the user's question requires querying a database.

#     Return ONLY one word:

#     DATABASE
#     or
#     GENERAL

#     Question:
#     {question}
#     """
#     llm = get_fast_llm()
#     response = llm.invoke(prompt)
#     return response.content.strip()

#testing purpose
# questions = [
#     "Who scored the highest marks?",

#     "What is the average marks of all students?",

#     "List students in Artificial Intelligence.",

#     "Who is the Prime Minister of India?",

#     "Count students in Data Science.",

#     "Show top 3 students by marks.",

#     "Tell me a joke.",

#     "Which student has the lowest marks?",

#     "What is the capital of France?",
    
#     "How many students are in section A?",

#     "What classes are available?",

#     "What is 2 + 2?",

#     "Explain machine learning.",

#     "What is LangChain?",

#     "Write a Python function for factorial.",


#     "Explain SQL joins.",

#     "What is RAG?",

#     "How does Groq work?",
# ]


# for question in questions:
#     classification = classify_question(question)
#     print(f"Question: {question} -> Classification: {classification}\n")
#     # print(f"Classification: {classification}\n")
