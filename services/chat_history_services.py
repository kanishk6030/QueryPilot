from services.supabase_service import (
    supabase
)


def save_message(
    user_id: str,
    role: str,
    content: str
):

    return (
        supabase
        .table("chat_messages")
        .insert(
            {
                "user_id": user_id,
                "role": role,
                "content": content
            }
        )
        .execute()
    )

def get_chat_history(
        user_id:str,
        limit:int
):
    response =  (
        supabase
        .table("chat_messages")
        .select("*")
        .eq(
            "user_id",user_id
        )
        .order(
            "created_at"
        )
        .limit(limit)
        .execute()
    )
    return response.data


def delete_chat_history(
    user_id: str,
):

    return (
        supabase
        .table("chat_messages")
        .delete()
        .eq(
            "user_id",
            user_id
        )
        .execute()
    )