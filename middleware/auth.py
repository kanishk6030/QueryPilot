import jwt
from fastapi import HTTPException
import os


SUPABASE_JWT_SECRET = os.getenv(
    "SUPABASE_JWT_SECRET"
)

from fastapi import Depends
from fastapi.security import HTTPBearer
from fastapi.security import HTTPAuthorizationCredentials

security = HTTPBearer()

if not hasattr(jwt, "decode"):
    raise ImportError(
        "The installed 'jwt' module does not provide decode(). "
        "Install PyJWT and remove the unrelated 'jwt' package if present."
    )

def get_current_user(

    credentials:
    HTTPAuthorizationCredentials =
    Depends(security)

):
    # 
    try:
        # print(
        #      "AUTHORIZATION:",
        #      credentials.credentials
        # )


        # print("AUTH:", credentials.credentials)

        token = credentials.credentials.replace(
            "Bearer ",
            ""
        )

        # print(
        #     "HEADER:",
        #     jwt.get_unverified_header(token)
        # )

        payload = jwt.decode(
            token,
            options={
                "verify_signature": False
            }
        )

        print(
            "PAYLOAD:",
            payload
        )

        return payload

    except Exception as e:

        print("ERROR:", e)

        raise HTTPException(
            status_code=401,
            detail=str(e)
        )
