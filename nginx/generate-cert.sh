#!/bin/sh

mkdir -p ssl

MSYS_NO_PATHCONV=1 openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
  -keyout ssl/server.key \
  -out ssl/server.crt \
  -subj "/CN=devops-stack.local" \
  -addext "subjectAltName=DNS:devops-stack.local,DNS:localhost,IP:127.0.0.1"
