#!/bin/bash
set -euxo pipefail

# Amazon Linux 2023
dnf -y update
dnf -y install docker git unzip

systemctl enable docker
systemctl start docker

# docker compose plugin
mkdir -p /usr/local/lib/docker/cli-plugins
curl -L "https://github.com/docker/compose/releases/download/v2.29.7/docker-compose-linux-x86_64" -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# project home
mkdir -p /opt/enterprise-microstack
chown -R ec2-user:ec2-user /opt/enterprise-microstack

cat >/opt/enterprise-microstack/README_EC2.txt <<'EOF'
EC2 setup done ✅

Next steps (from your laptop):
1) Upload the project zip to this instance, then:
   sudo unzip enterprise-microstack.zip -d /opt
   cd /opt/enterprise-microstack
   sudo WEB_PORT=80 docker compose up -d --build

2) Open in browser:
   http://<PUBLIC_IP>/

To see logs:
   sudo docker compose logs -f --tail=200

To stop:
   sudo docker compose down
EOF
