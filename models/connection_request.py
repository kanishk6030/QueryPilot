from pydantic import BaseModel

class ConnectionRequest(BaseModel):

    id: str

    name: str

    kind: str

    host: str

    port: int | None = None

    status: str = "idle"

    lastUsed: str = ""

    username: str | None = None

    password: str | None = None

    database: str | None = None