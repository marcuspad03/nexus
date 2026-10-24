# NEXUS

NEXUS scannt echte Live-Quoten von [the-odds-api.com](https://the-odds-api.com) nach Arbitrage und Value Bets und kann Treffer per Telegram melden.

Als Claude-Artefakt darf die Seite keine fremden Server erreichen. Über GitHub Pages läuft sie als normale Web-App mit vollem Internetzugang und lässt sich auf dem Handy wie eine App installieren.

## Online stellen (einmalig, geht auch am Handy im Browser)

1. Auf github.com dieses Repo öffnen → **Settings** → **Pages**
2. Unter **Build and deployment**: Source **Deploy from a branch**
3. Branch auswählen (z. B. `main`), Ordner **/ (root)** → **Save**
4. Nach 1–2 Minuten steht oben die Adresse, z. B. `https://marcuspad03.github.io/nexus/`

## Auf dem iPhone als App

Adresse in **Safari** öffnen → **Teilen** → **Zum Home-Bildschirm**.

## Einrichten in der App

- **Setup → API-Schlüssel**: eigener Schlüssel von the-odds-api.com (kostenloser Plan reicht zum Start)
- **Verbindung prüfen → Testen**
- Optional **Telegram**: Bot-Token von @BotFather und deine Chat-ID

Schlüssel, Konten und Einstellungen werden nur lokal im Browser gespeichert, nie im Repo.
