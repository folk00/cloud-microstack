async function fetchJSON(url) {
  try {
    const r = await fetch(url);
    return await r.json();
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

async function refresh() {
  const [api, echo, items] = await Promise.all([
    fetchJSON("/api/health"),
    fetchJSON("/svc/health"),
    fetchJSON("/api/items"),
  ]);

  document.getElementById("api-health").textContent = JSON.stringify(api, null, 2);
  document.getElementById("echo-health").textContent = JSON.stringify(echo, null, 2);

  const tbody = document.getElementById("items");
  tbody.innerHTML = "";
  (items || []).forEach((it) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${it.id}</td><td>${it.name}</td><td>${it.owner}</td><td>${it.status}</td>`;
    tbody.appendChild(tr);
  });
}

refresh();
setInterval(refresh, 10000);
