# Cloud Microstack

A reference cloud-native microstack: **Next.js 15 frontend + FastAPI API + microservice + Nginx** — orchestrated with Docker Compose locally and deployable to AWS via Terraform.

Built as a reference project to demonstrate end-to-end ownership of a small cloud-native system: container builds, service-to-service communication, IaC provisioning, and a modern frontend.

## Architecture

```
                ┌──────────────────────────┐
                │  Browser (localhost:8080)│
                └────────────┬─────────────┘
                             │
                ┌────────────▼─────────────┐
                │  Next.js 15 / Tailwind   │  frontend
                │  (rewrites /api, /svc)   │
                └────────────┬─────────────┘
                             │
            ┌────────────────┴────────────────┐
            │                                 │
   ┌────────▼─────────┐             ┌─────────▼────────┐
   │  FastAPI (api)   │ ──httpx──►  │ FastAPI (echo)   │
   │  :8000           │             │ :8001            │
   └──────────────────┘             └──────────────────┘
```

- **frontend** — Next.js 15 + React 19 + Tailwind + TypeScript + shadcn-style UI components
- **api** — FastAPI gateway exposing `/api/health`, `/api/items`, `/api/echo` (proxies to svc-echo)
- **svc-echo** — FastAPI microservice exposing `/svc/health`, `/svc/echo`
- **web** — Optional Nginx static landing page (alternative to Next.js entry)
- **terraform** — AWS EC2 + Security Group + default VPC integration

## Run locally

```bash
docker compose up --build
```

Open http://localhost:8080

Stop:
```bash
docker compose down
```

## Endpoints

| Path           | Service   | Description                          |
|----------------|-----------|--------------------------------------|
| `/api/health`  | api       | API health + upstream config         |
| `/api/items`   | api       | In-memory items list                 |
| `/api/echo`    | api       | Calls svc-echo (inter-service demo)  |
| `/svc/health`  | svc-echo  | Microservice health                  |
| `/svc/echo`    | svc-echo  | Echoes request metadata              |

## Deploy to AWS (single-instance demo)

```bash
cd terraform
terraform init
terraform apply -var="key_name=YOUR_KEY" -var="ssh_cidr=YOUR_IP/32"
```

Provisions an Amazon Linux 2023 EC2 instance in the default VPC with a Security Group allowing SSH (restricted) and HTTP. SSH in, clone this repo, run `docker compose up -d --build`.

## Tech stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn-style primitives
- **Backend:** FastAPI, httpx, Python 3.11
- **Infra:** Docker, Docker Compose, Terraform (AWS provider), Nginx
- **Cloud:** AWS EC2, Security Groups, default VPC, Amazon Linux 2023

## Why this exists

I'm a senior network engineer (Cisco PS, 15+ yrs LAN/WAN/data center) transitioning into cloud engineering. This repo demonstrates the modern application/infra patterns my networking background already supports: VPC design, security groups, multi-service composition, and IaC-driven provisioning.

## License

MIT
