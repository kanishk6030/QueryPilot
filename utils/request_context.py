from contextvars import ContextVar
CURRENT_CONTEXT = ContextVar(
    "CURRENT_CONTEXT",
    default=None
)