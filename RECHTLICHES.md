# Rechtliches — interne Notiz

**Nicht für die Öffentlichkeit.** Dieses Dokument hält fest, warum die Rechtsseiten so aussehen,
wie sie aussehen, und was noch offen ist. Stand: 08.08.2026.

> **Diese Texte sind nicht juristisch geprüft.** Sie sind nach bestem Wissen erstellt und ersetzen
> keine Rechtsberatung. Vor der Veröffentlichung durch die Rechtsberatung der Gruppe prüfen lassen.

---

## 1. Offene Punkte — Blocker vor dem Livegang

| # | Was fehlt | Wo einzutragen |
|---|---|---|
| 1 | **Voller bürgerlicher Name** der verantwortlichen Person | `impressum.html`, `datenschutz.html` — Platzhalter `[[ VOLLSTÄNDIGER NAME ]]` |
| 2 | **Ladungsfähige Anschrift** (Strasse, Nr., PLZ, Ort; kein Postfach) | dieselben Dateien — `[[ STRASSE NR ]]`, `[[ PLZ ORT ]]` |

Beide Dateien immer **gemeinsam** ausfüllen. Suchbefehl:

```bash
grep -rn '\[\[' impressum.html datenschutz.html
```

**Solange diese Platzhalter drinstehen, dürfen die Seiten nicht deployt werden.**
Die Links im Footer und im Mobile-Menü zeigen bereits auf sie.

## 2. Gewählter Rechtsrahmen

- **Schweizer Recht (UWG, revDSG) plus DSGVO.** Die DSGVO wird angewandt, weil die Website
  deutschsprachig ist und sich mit beworbenen Standorten in DE, AT, LU, CZ und BG erkennbar an
  Personen in der EU richtet (Art. 3 Abs. 2 DSGVO).
- **Kein Cookie-Banner.** Begründung: keine Cookies, kein Storage, kein Tracking, keine Embeds,
  keine Drittanbieter-Requests. Verifiziert am 08.08.2026 über `index.html`, `js/*.js`, `css/*.css`.
- **Verantwortlicher ist eine natürliche Person**, nicht eine der Gesellschaften. Grund: Die
  Fitz-Gesellschaften sind noch nicht im Handelsregister eingetragen. Ohne Eintrag gibt es keine
  UID, keinen eingetragenen Sitz und keine vertretungsberechtigten Organe. Ein
  Handelsregister-Abschnitt fehlt im Impressum deshalb bewusst.
- **Grundregel:** lieber ein Abschnitt weniger als ein Platzhalter mehr. Keine Registernummern,
  Sitzangaben oder Aufsichtsbehörden eintragen, die nicht belegt sind.

## 3. Kein EU-Vertreter nach Art. 27 DSGVO — Begründung

Der Verantwortliche sitzt in der Schweiz, also ausserhalb der EU, und die Website richtet sich an
Personen in der EU. Grundsätzlich greift damit Art. 27 Abs. 1 DSGVO. Wir stützen uns auf die
**Ausnahme in Art. 27 Abs. 2 lit. a**:

- Die Bearbeitung erfolgt nur **gelegentlich**: reine Broschürenwebsite, kein Login, keine
  Datenbank, kein Newsletter, kein Server-Formular, kein Tracking.
- Es werden **keine besonderen Kategorien** von Personendaten nach Art. 9 DSGVO und keine Daten
  über strafrechtliche Verurteilungen in grossem Umfang bearbeitet.
- Es ist **kein Risiko** für die Rechte und Freiheiten natürlicher Personen erkennbar. Bearbeitet
  werden nur technische Server-Logs und freiwillig gesendete E-Mails.

**Diese Bewertung kippt**, sobald einer der folgenden Auslöser eintritt. Dann ist ein Vertreter in
der EU zu bestellen und in beiden Rechtsseiten zu nennen:

- Tracking, Analytics oder Werbepixel jeder Art
- Newsletter oder Marketing-Automation
- ein echtes Server-Formular (z. B. Formspree, eigenes Backend)
- Login, Kundenbereich oder Bewerberportal
- Chatwidget, Terminbuchung, Kartendienst oder Video-Embed

## 4. Technische Massnahmen, auf denen die Texte aufbauen

Diese Punkte sind **Voraussetzung** für die Aussagen in `datenschutz.html`. Wer sie zurückdreht,
macht die Datenschutzerklärung falsch.

| Massnahme | Umgesetzt am | Datei |
|---|---|---|
| Google Fonts lokal statt CDN (18 `@font-face`, 8 deduplizierte woff2) | 08.08.2026 | `css/fonts.css`, `assets/fonts/` |
| GSAP 3.12.5, ScrollTrigger 3.12.5, Lenis 1.1.14 lokal statt cdnjs/unpkg | 08.08.2026 | `js/vendor/` |
| Keine Cookies, kein Storage, keine Embeds | verifiziert 08.08.2026 | gesamtes Projekt |

Gegenprüfung, muss leer bleiben:

```bash
grep -oE '(src|href)="https?://[^"]+"' index.html impressum.html datenschutz.html \
  | grep -vE 'instagram\.com|ubs\.com|stadlerrail|raiffeisen\.at|mi\.com|arvaloo\.com|vercel\.com|unsplash\.com|stock\.adobe\.com'
```

(Die ausgenommenen Hosts sind reine Textlinks. Sie lösen erst beim Klick einen Request aus.)

## 5. Hosting

- Produktion: **Vercel Inc., USA**, Team `fitz-industries`, Projekt `fitz-industries-site`,
  Production-URL `https://www.fitz-industries.ch`.
- In `datenschutz.html` Ziffer 4 namentlich genannt, Drittlandtransfer über
  EU-Standardvertragsklauseln begründet.
- **Noch zu erledigen:** Auftragsbearbeitungsvertrag (DPA) mit Vercel abschliessen bzw. dessen
  Geltung dokumentieren.
- Die Apex-Domain `fitz-industries.ch` zeigt derzeit auf easyname (`91.151.18.29`) und antwortet
  nicht. Nur `www` läuft über Vercel. Siehe README, Abschnitt Deployment.

## 6. Bewusst nicht behandelt

Diese Punkte wurden erkannt, gehören aber nicht zum Auftrag „Impressum und Datenschutz". Sie sind
**nicht erledigt** und liegen beim Kunden:

- Aussagen auf der Startseite, die nicht belegt sind: „seit 2003", „über 50 Unternehmen in elf
  Ländern", „Aktionär bei UBS, Xiaomi, der Stadler Group und Raiffeisen" samt Verwendung der
  jeweiligen Fremdlogos. Werberechtlich (UWG) und markenrechtlich zu prüfen.
- `index.html`: Eintrag „Riverside Ink. Zürich". Laut Handelsregister und eigenem Impressum lautet
  die Firma **Riverside Ink St.Margrethen GmbH**, Grenzstrasse 25, 9430 St. Margrethen.
- Lizenznachweise für das Bildmaterial aus `assets/real/` (Adobe Stock) und `assets/img/`
  (Unsplash-Platzhalter laut README).
- Die Schwesterseite `capital1-landing`: Dort sind `impressum.html` und `datenschutz.html` live mit
  sichtbaren `[…]`-Platzhaltern und sichtbarem Entwurfshinweis. Eigener Auftrag.

## 7. Wenn die Gesellschaften eingetragen sind

1. `impressum.html`: Verantwortlichen von der natürlichen Person auf die Gesellschaft umstellen.
2. Abschnitt „Handelsregister" ergänzen: Handelsregisteramt, Firmennummer, UID, bei Bedarf
   MWST-Nummer.
3. Abschnitt „Vertretungsberechtigte Personen" ergänzen.
4. Prüfen, ob für eine der Gesellschaften eine **Bewilligungs- oder Aufsichtspflicht** besteht
   (Stichwort FINMA). Falls ja, Aufsichtsbehörde und Bewilligung nennen.
5. `datenschutz.html` Ziffer 1 auf dieselbe Gesellschaft umstellen.
6. Angaben gegen `zefix.ch` prüfen, bevor sie live gehen.
