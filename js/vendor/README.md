# Lokale Libraries

Diese Dateien werden bewusst **lokal ausgeliefert statt über ein CDN**. Damit entsteht beim
Seitenaufruf keine Verbindung zu Dritten (cdnjs / Cloudflare, unpkg), es wird keine IP-Adresse
an Dritte übermittelt und es ist keine Einwilligung erforderlich.

| Datei | Version | Quelle | Lizenz |
|---|---|---|---|
| `gsap.min.js` | 3.12.5 | cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5 | GSAP Standard License (kostenlos nutzbar) |
| `ScrollTrigger.min.js` | 3.12.5 | cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5 | GSAP Standard License (kostenlos nutzbar) |
| `lenis.min.js` | 1.1.14 | unpkg.com/lenis@1.1.14/dist | MIT |

Die Schriften liegen aus demselben Grund unter `assets/fonts/`, eingebunden über `css/fonts.css`.

## Aktualisieren

Version in der Tabelle anpassen, Datei neu herunterladen, im Browser gegenprüfen.
**Nicht** auf CDN-URLs zurückstellen: Das wäre eine Datenschutz-Regression und müsste in der
Datenschutzerklärung nachgezogen werden.
