"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Item = { id: number; name: string; status: string; owner: string };
type Health = { ok: boolean; service: string; ts: number; echo_base_url?: string };

const statusColor: Record<string, string> = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-rose-500",
};

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);
  const [apiHealth, setApiHealth] = useState<Health | null>(null);
  const [echoHealth, setEchoHealth] = useState<Health | null>(null);
  const [echoMsg, setEchoMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const [a, e, i] = await Promise.all([
        fetch("/api/health").then((r) => r.json()).catch(() => null),
        fetch("/svc/health").then((r) => r.json()).catch(() => null),
        fetch("/api/items").then((r) => r.json()).catch(() => []),
      ]);
      setApiHealth(a);
      setEchoHealth(e);
      setItems(i || []);
    } finally {
      setLoading(false);
    }
  }

  async function callEcho() {
    const r = await fetch("/api/echo").then((r) => r.json());
    setEchoMsg(JSON.stringify(r, null, 2));
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Cloud Microstack</h1>
            <p className="mt-1 text-sm text-slate-600">
              Reference cloud-native stack — Next.js + FastAPI + microservices on AWS
            </p>
          </div>
          <Button onClick={refresh} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </Button>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                API Service
                <Badge className={apiHealth?.ok ? "bg-emerald-500" : "bg-rose-500"}>
                  {apiHealth?.ok ? "healthy" : "down"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-xs text-slate-700">
                {JSON.stringify(apiHealth, null, 2)}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Echo Microservice
                <Badge className={echoHealth?.ok ? "bg-emerald-500" : "bg-rose-500"}>
                  {echoHealth?.ok ? "healthy" : "down"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-xs text-slate-700">
                {JSON.stringify(echoHealth, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-slate-500">
                    <th className="py-2">ID</th>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id} className="border-b last:border-0">
                      <td className="py-2">{it.id}</td>
                      <td>{it.name}</td>
                      <td className="text-slate-600">{it.owner}</td>
                      <td>
                        <span
                          className={`inline-block h-2 w-2 rounded-full ${
                            statusColor[it.status] || "bg-slate-400"
                          }`}
                        />
                        <span className="ml-2 capitalize">{it.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Inter-service call (api → svc-echo)</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={callEcho}>Call /api/echo</Button>
              {echoMsg && (
                <pre className="mt-4 whitespace-pre-wrap rounded bg-slate-900 p-3 text-xs text-slate-100">
                  {echoMsg}
                </pre>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
