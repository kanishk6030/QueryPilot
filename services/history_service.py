from multiprocessing import context

from services.supabase_service import supabase
def save_query(
    user_id,
    connection_id,
    question,
    sql_query,
    verification
):

    return (
        supabase
        .table("query_history")
        .insert(
            {
                "user_id": user_id,
                "connection_id": connection_id,
                "question": question,
                "sql_query": sql_query,
                "verification":verification.status
            }
        )
        .execute()
    )

def get_user_history(
    user_id
):

    result = (
        supabase
        .table("query_history")
        .select("*")
        .eq("user_id", user_id)
        .order(
            "created_at",
            desc=True
        )
        .execute()
    )

    return result.data