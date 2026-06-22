from pydantic import BaseModel

class ChatRequest(BaseModel):
    question: str
    connection_id: str | None = None

class VerificationResult(BaseModel):
    status: str
    reason: str | None = None