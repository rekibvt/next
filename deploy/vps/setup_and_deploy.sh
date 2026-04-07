#!/usr/bin/env bash
set -euo pipefail

# Simple unattended deploy script for a VPS (Debian/Ubuntu-like systems)
# Usage:
# 1) Upload this repo (or this script) to your VPS
# 2) Run: DOMAIN=example.com DB_PASSWORD=yourpassword GIT_REPO=https://github.com/rekibvt/next.git sudo ./setup_and_deploy.sh

DOMAIN=${DOMAIN:-}
DB_PASSWORD=${DB_PASSWORD:-}
GIT_REPO=${GIT_REPO:-https://github.com/rekibvt/next.git}
TARGET_DIR=${TARGET_DIR:-/srv/next}

if [[ -z "$DOMAIN" || -z "$DB_PASSWORD" ]]; then
  echo "Error: You must set DOMAIN and DB_PASSWORD environment variables."
  echo "Example: DOMAIN=example.com DB_PASSWORD=ChangeMe GIT_REPO=$GIT_REPO sudo $0"
  exit 1
fi

echo "Deploying repo $GIT_REPO to $TARGET_DIR for domain $DOMAIN"

install_docker() {
  if command -v docker >/dev/null 2>&1; then
    echo "Docker already installed"
  else
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh
  fi

  if ! docker compose version >/dev/null 2>&1; then
    echo "Installing docker compose plugin..."
    sudo apt-get update -y
    sudo apt-get install -y docker-compose-plugin
  fi
}

prepare_repo() {
  sudo mkdir -p "$TARGET_DIR"
  sudo chown "$USER":"$USER" "$TARGET_DIR"
  if [ -d "$TARGET_DIR/.git" ]; then
    echo "Repo exists, pulling latest changes"
    cd "$TARGET_DIR"
    git pull --rebase || true
  else
    git clone "$GIT_REPO" "$TARGET_DIR"
  fi
}

write_env_and_caddy() {
  echo "Writing .env file"
  cat > "$TARGET_DIR/app/.env" <<EOF
DATABASE_URL="postgresql://postgres:${DB_PASSWORD}@db:5432/postgres?schema=public"
NODE_ENV=production
REDIS_URL="redis://redis:6379"
EOF

  echo "Writing Caddyfile"
  mkdir -p "$TARGET_DIR/caddy"
  sed "s/DOMAIN/${DOMAIN}/g" "$TARGET_DIR/deploy/vps/Caddyfile" > "$TARGET_DIR/caddy/Caddyfile"
  echo "Copying nginx.conf"
  mkdir -p "$TARGET_DIR/deploy/vps"
  cp "$TARGET_DIR/deploy/vps/nginx.conf" "$TARGET_DIR/deploy/vps/nginx.conf"
}

deploy_compose() {
  echo "Copying docker-compose to project root"
  cp "$TARGET_DIR/deploy/vps/docker-compose.yml" "$TARGET_DIR/docker-compose.yml"

  cd "$TARGET_DIR"
  echo "Building and starting containers (this may take a few minutes)"
  docker compose up -d --build
}

prisma_init() {
  echo "Waiting for DB to be ready..."
  # simple wait loop
  for i in {1..30}; do
    if docker compose exec db pg_isready -U postgres >/dev/null 2>&1; then
      echo "Postgres is ready"
      break
    fi
    echo "Waiting for postgres... ($i)"
    sleep 2
  done

  echo "Running prisma db push inside app container"
  docker compose exec app npx prisma db push || echo "prisma db push failed or prisma not available in image"
  docker compose exec app npx prisma generate || echo "prisma generate failed or prisma not available in image"
}

main() {
  install_docker
  prepare_repo
  write_env_and_caddy
  deploy_compose
  prisma_init
  echo "Deployment finished. Visit: https://${DOMAIN}"
}

main
