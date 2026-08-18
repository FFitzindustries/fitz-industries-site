# FITZ INDUSTRIES — Cinematic Website

Pure HTML/CSS/JS (kein Build-Step). Scroll-Storytelling mit **GSAP + ScrollTrigger** und **Lenis** Smooth-Scroll.
Hero nutzt das **echte Brand-Intro-Video** (Erde → Weltkarte → Logo), per CSS gegradet und vom
„Veo"-Wasserzeichen befreit (ffmpeg-Crop). Echte Markenassets (weisses FITZ-Logo, FHG-Logo, Länder-Fotos) sind eingebunden.

**Corporate Identity: Schwarz, Weiss, Stahlblau** (`--accent:#86a8b8`). Die CSS-Klasse heisst aus
historischen Gründen `.gold`, rendert aber Stahlblau. Nicht umbenennen ohne Sweep über alle Dateien.

> **Rechtliches:** Impressum und Datenschutzerklärung sind angelegt, aber **noch nicht
> veröffentlichungsreif**. Bitte vor jedem Deploy [`RECHTLICHES.md`](RECHTLICHES.md) lesen.

## Lokal ansehen
```bash
cd fitz-industries-site
python3 -m http.server 8080
# → http://localhost:8080
```

## Deployment

Produktion läuft auf **Vercel**, nicht auf GitHub Pages.

| | |
|---|---|
| Team | `fitz-industries` (FitzIndustries) |
| Projekt | `fitz-industries-site` |
| Production-URL | `https://www.fitz-industries.ch` |
| Framework Preset | Other (statisch, kein Build) |

```bash
vercel --scope fitz-industries            # Preview-Deploy
vercel --prod --scope fitz-industries     # Produktion
```

**Bekanntes Problem:** Die Apex-Domain `fitz-industries.ch` zeigt auf easyname (`91.151.18.29`,
`web9.wh20.easyname.systems`) und antwortet nicht. Erreichbar ist nur `www.fitz-industries.ch`.
Die Nameserver sind gemischt (`ns.inwx.de` + `ns1/ns2.vercel-dns.com`). Zu tun: Apex bei Vercel
als Domain hinzufügen und beim Registrar INWX auf Vercel zeigen lassen, oder eine Weiterleitung
Apex → `www` einrichten.

## Sektionen
1. **Hero** — echtes Brand-Video + Tagline „Global Vision. Swiss Heritage."
2. **Über Uns** — Wort-für-Wort-Reveal + hochzählende Stats
3. **Unternehmen** — horizontaler Pin-Scroll durch alle 11 Firmen (FHG mit echtem Logo)
4. **Globale Präsenz** — „Swiss Heritage"-Marquee mit echten Länder-Fotos (Liechtenstein, Österreich, Deutschland, Luxemburg, Tschechien, Bulgarien, Alpenraum)
5. **Fitz Foundation** — cinematic Parallax
6. **Kontakt** — Formular (`mailto:`) + Sitz / WhatsApp / E-Mail
7. **Impressum / Datenschutz** — eigene Seiten, verlinkt in Footer und Mobile-Menü

## Kontaktformular

Das Formular ist ein **`mailto:`-Formular** (`action="mailto:info@fitz-industries.ch"`,
`enctype="text/plain"`). Es überträgt nichts an einen Server, sondern öffnet das Mailprogramm des
Besuchers. Ein JS-Fallback blendet einen Hinweis samt „Nachricht kopieren" ein, falls kein
Mailprogramm reagiert.

**Nicht auf Formspree oder ein anderes Server-Backend umstellen, ohne vorher
[`RECHTLICHES.md`](RECHTLICHES.md) Abschnitt 3 zu lesen.** Ein echtes Server-Formular macht einen
Auftragsbearbeitungsvertrag nötig und kippt die Bewertung zum EU-Vertreter nach Art. 27 DSGVO.

## WhatsApp

Kontaktkanäle sind bewusst auf drei reduziert: **Sitz, WhatsApp, E-Mail**. Das frühere
Abteilungs-Popup mit neun Karten (`DEPARTMENTS` in `js/main.js`) wurde entfernt.

Die WhatsApp-Nummer steht an drei Stellen in `index.html` — Kontakt-Infozeile, Social-Leiste und
dem Sticky-Button rechts unten (`.wafab`). Beim Ändern alle drei fassen:

```bash
grep -n 'wa.me/' index.html      # muss 3 Treffer liefern
```

Der Button ist ein **reiner `wa.me`-Link**, kein eingebettetes Widget. Er lädt beim Seitenaufruf
nichts von Meta und löst erst beim Klick einen Request aus. Das ist die Voraussetzung dafür, dass
die Aussagen in `datenschutz.html` weiter stimmen — **kein WhatsApp-Business-Widget einbauen**,
siehe [`RECHTLICHES.md`](RECHTLICHES.md) Abschnitt 3.

## Schriften und Libraries — lokal, nicht per CDN

Alle Schriften und Programmbibliotheken werden **vom eigenen Server ausgeliefert**. Beim
Seitenaufruf entsteht dadurch kein einziger Request an Dritte.

```
assets/fonts/    # 8 woff2 (Anton, Cormorant Garamond, Inter; latin + latin-ext)
css/fonts.css    # 18 @font-face-Regeln, Variable Fonts dedupliziert
js/vendor/       # gsap 3.12.5, ScrollTrigger 3.12.5, lenis 1.1.14 (siehe js/vendor/README.md)
```

**Nicht auf Google Fonts, cdnjs oder unpkg zurückstellen.** Das wäre eine Datenschutz-Regression
und würde die Aussagen in `datenschutz.html` falsch machen.

## Assets
```
assets/video/hero-globe.mp4   # echtes Brand-Intro (Wasserzeichen weggecroppt)
assets/brand/                 # echte Logos (logo-white, fhg-ag, …) von test.fitz-industries.ch
assets/real/                  # echte Länder-Fotos (Adobe Stock) von test.fitz-industries.ch
assets/img/                   # Branchen-Fotos pro Unternehmen (Unsplash) + Hero-Poster
assets/fonts/                 # lokale Schriften
```
Hinweis: Die Branchen-Fotos in `assets/img/` sind Unsplash-Platzhalter — für den finalen Auftritt
durch echte Firmenbilder ersetzen (gleiche Dateinamen). Die übrigen Firmenlogos
(`fih`, `fitz-group`, `fitz-ag`, `logo-black`) liegen bereit, falls weitere Karten ein echtes Logo
bekommen sollen. Die Lizenznachweise für das Adobe-Stock-Material sind noch zu belegen.

## Dateien
```
index.html        # Startseite (Onepage)
impressum.html    # Rechtsseite — enthält noch Platzhalter, siehe RECHTLICHES.md
datenschutz.html  # Rechtsseite — enthält noch Platzhalter, siehe RECHTLICHES.md
css/styles.css    # Design-Tokens + Layout der Startseite
css/fonts.css     # lokale @font-face-Regeln
css/legal.css     # schlankes Layout der Rechtsseiten (ohne GSAP/Lenis/Preloader)
js/main.js        # Lenis + GSAP Szenen, Bild-Loader, Heritage-Marquee, Mobile-Menü, DEPARTMENTS
js/cursor.js      # Custom Cursor + magnetische Buttons
js/vendor/        # lokale Libraries
RECHTLICHES.md    # interne Notiz zu Impressum/Datenschutz — vor Deploy lesen
```

## Schreibweise

Schweizer Rechtschreibung: **kein ß, stattdessen ss** (`Strasse`, `grösstmöglich`, `ausschliesslich`).
Umlaute normal (ä, ö, ü), nicht als `ae/oe/ue`.
