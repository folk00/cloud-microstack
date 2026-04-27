from __future__ import annotations

import os
import time
from typing import Any, Dict, List

import httpx
from fastapi import FastAPI, HTTPException

app = FastAPI(title="Cloud Microstack API", version="0.1.0")

ECHO_BASE_URL = os.getenv("ECHO_BASE_URL", "http://svc-echo:8001").rstrip("/")

ITEMS: List[Dict[str, Any]] = [
    {"id": 1, "name": "Health Check",    "status": "green", "owner": "platform"},
    {"id": 2, "name": "Deploy Pipeline", "status": "amber", "owner": "devops"},
    {"id": 3, "name": "Cost Report",     "status": "green", "owner": "finops"},
]


@app.get("/api/health")
def health() -> Dict[str, Any]:
    return {
        "ok": True,
        "service": "api",
        "ts": int(time.time()),
        "echo_base_url": ECHO_BASE_URL,
    }


@app.get("/api/items")
def list_items() -> List[Dict[str, Any]]:
    return ITEMS


@app.get("/api/items/{item_id}")
def get_item(item_id: int) -> Dict[str, Any]:
    for it in ITEMS:
        if it["id"] == item_id:
            return it
    raise HTTPException(status_code=404, detail="item not found")


@app.get("/api/echo")
async def echo_proxy() -> Dict[str, Any]:
    """Demonstrates inter-service call: api -> svc-echo."""
    async with httpx.AsyncClient(timeout=5.0) as client:
        try:
            r = await client.get(f"{ECHO_BASE_URL}/svc/echo")
            r.raise_for_status()
            return {"upstream": r.json(), "via": "api"}
        except httpx.HTTPError as e:
            raise HTTPException(status_code=502, detail=f"upstream error: {e}")
