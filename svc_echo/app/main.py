\
from __future__ import annotations

import platform
import time
from typing import Any, Dict
from fastapi import FastAPI

app = FastAPI(title="Echo Microservice", version="0.1.0")

@app.get("/svc/health")
def health() -> Dict[str, Any]:
    return {"ok": True, "service": "svc-echo", "ts": int(time.time())}

@app.get("/svc/echo")
def echo() -> Dict[str, Any]:
    return {
        "ok": True,
        "service": "svc-echo",
        "ts": int(time.time()),
        "host": platform.node(),
        "python": platform.python_version(),
        "platform": platform.platform(),
    }
