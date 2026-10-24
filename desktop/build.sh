#!/bin/sh
# Baut desktop/NEXUS.exe aus den Web-Dateien im Repo-Wurzelordner.
set -e
cd "$(dirname "$0")"
rm -rf web && mkdir -p web
cp -r ../index.html ../manifest.webmanifest ../sw.js ../icons web/
[ -f go.mod ] || go mod init nexus-desktop >/dev/null 2>&1
GOOS=windows GOARCH=amd64 CGO_ENABLED=0 go build -trimpath -ldflags "-s -w" -o NEXUS.exe .
echo "Fertig: $(pwd)/NEXUS.exe"
