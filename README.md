# 24/7 Riool & Ontstoppingsservice — Website

Statische website voor 24/7 Riool & Ontstoppingsservice, een riool- en ontstoppingsdienst in Zuid-Holland.

**Domein:** rioolontoppingsservice.nl  
**E-mail:** rioolontoppingsservice@gmail.com  
**Werkgebied:** Zuid-Holland, Nederland

---

## Projectstructuur

```
rioolontoppingsservice/
├── index.html               # Homepage
├── favicon.svg              # SVG favicon
├── robots.txt               # Zoekmachine-instructies
├── sitemap.xml              # XML sitemap
├── netlify.toml             # Netlify configuratie + security headers
├── site.config.js           # Centrale bedrijfsgegevens (TODO's voor eigenaar)
├── 404.html                 # Foutpagina
├── css/
│   ├── variables.css        # Design system (kleuren, fonts, spacing)
│   ├── base.css             # Reset, typografie, hulpklassen
│   ├── components.css       # Herbruikbare componenten
│   └── page.css             # Paginaspecifieke stijlen
├── js/
│   └── main.js              # Mobiel menu, FAQ accordion, smooth scroll
├── contact/index.html       # Contactpagina met Formspree-formulier
├── diensten/
│   ├── index.html           # Dienstenoverzicht
│   ├── riool-ontstoppen/    # Riool ontstoppen pagina
│   ├── afvoer-ontstoppen/   # Afvoer ontstoppen pagina
│   ├── wc-ontstoppen/       # WC ontstoppen pagina
│   ├── gootsteen-ontstoppen/# Gootsteen ontstoppen pagina
│   ├── rioolinspectie/      # Rioolinspectie pagina
│   └── rioolreiniging/      # Rioolreiniging pagina
├── tarieven/index.html      # Tarieven & prijsinformatie
├── werkgebied/index.html    # Werkgebied Zuid-Holland
├── over-ons/index.html      # Over ons
├── faq/index.html           # Veelgestelde vragen
├── privacy/index.html       # Privacyverklaring
└── algemene-voorwaarden/    # Algemene voorwaarden
```

---

## Deployment via GitHub + Netlify

### Stap 1: Push naar GitHub

```bash
cd rioolontoppingsservice
git init
git add .
git commit -m "Initial website commit"
git remote add origin https://github.com/rioolontoppingsservice/rioolontoppingsservice.git
git push -u origin main
```

### Stap 2: Netlify koppelen

1. Ga naar [app.netlify.com](https://app.netlify.com) en log in
2. Klik op **"Add new site" → "Import an existing project"**
3. Kies **GitHub** en selecteer de repository `rioolontoppingsservice/rioolontoppingsservice`
4. Build instellingen:
   - **Build command:** *(leeg laten)*
   - **Publish directory:** `.` (punt — de rootmap)
5. Klik op **"Deploy site"**

Netlify deployt automatisch bij elke push naar de `main` branch.

### Stap 3: Eigen domein koppelen

1. Ga in Netlify naar **Site settings → Domain management**
2. Klik op **"Add custom domain"** en voer in: `rioolontoppingsservice.nl`
3. Netlify toont de vereiste DNS-records
4. Stel bij uw domeinregistrar in:
   - **Type A-record:** `75.2.60.5` (Netlify load balancer IP)
   - **CNAME voor www:** `[uw-site-naam].netlify.app`
5. Wacht op DNS-propagatie (kan tot 24 uur duren)
6. Netlify activeert automatisch een gratis Let's Encrypt SSL-certificaat

---

## Contactformulier instellen (Formspree)

Het contactformulier gebruikt [Formspree](https://formspree.io) om berichten door te sturen naar uw e-mailadres. Geen backend of servercode nodig.

### Stap 1: Formspree account aanmaken

1. Ga naar [formspree.io](https://formspree.io) en maak een gratis account aan
2. Klik op **"+ New Form"**
3. Voer uw e-mailadres in: `rioolontoppingsservice@gmail.com`
4. Geef het formulier een naam, bijv. "Website contactformulier"

### Stap 2: Form ID invullen

U ontvangt een Form ID, zoals: `xpzgkwqb`

Open `contact/index.html` en vervang:
```html
action="https://formspree.io/f/YOUR_FORMSPREE_ID"
```
door:
```html
action="https://formspree.io/f/xpzgkwqb"
```
(gebruik uw eigen ID)

### Stap 3: Testen

1. Deploy de website
2. Vul het contactformulier in met een testbericht
3. Controleer of u het bericht ontvangt op `rioolontoppingsservice@gmail.com`
4. Controleer de Formspree dashboard voor bevestiging

**Let op:** Zet nooit API-sleutels of wachtwoorden in de frontendcode of in de GitHub-repository.

---

## TODO-lijst voor de eigenaar

De volgende gegevens moeten nog worden ingevuld vóór publicatie:

### Verplicht vóór live gaan

- [ ] **Telefoonnummer** — invullen in `site.config.js` en alle pagina's waar `<!-- TODO: eigenaar invullen -->` staat
- [ ] **Formspree Form ID** — vervang `YOUR_FORMSPREE_ID` in `contact/index.html`
- [ ] **DNS instellen** — A-record en CNAME bij uw domeinregistrar (zie Stap 3 hierboven)

### Aanbevolen

- [ ] **KvK-nummer** — invullen in `site.config.js` en `privacy/index.html`
- [ ] **BTW-nummer** — invullen in `site.config.js`
- [ ] **Bedrijfsadres** (indien van toepassing) — invullen in `site.config.js` en `privacy/index.html`
- [ ] **Openingstijden** — invullen in `site.config.js` en op alle relevante pagina's
- [ ] **Tarieven** — invullen op `tarieven/index.html` (nu zijn er alleen placeholders)
- [ ] **Reviews/testimonials** — wanneer u echte beoordelingen heeft, toevoegen aan homepage
- [ ] **Privacyverklaring** — laat controleren door jurist of gebruik een AVG-sjabloon afgestemd op uw situatie
- [ ] **Algemene voorwaarden** — laat opstellen of controleren door jurist

### Optioneel maar nuttig

- [ ] **Google Bedrijfsprofiel** aanmaken op [business.google.com](https://business.google.com) en website koppelen
- [ ] **Google Search Console** — website toevoegen en sitemap indienen: `https://rioolontoppingsservice.nl/sitemap.xml`
- [ ] **Foto's** — eigen professionele foto's toevoegen (nu zijn er geen afbeeldingen)
- [ ] **Social media** — Facebook/Instagram-links invullen in `site.config.js` en footer

---

## Security headers

De `netlify.toml` bevat de volgende beveiligingsheaders:

| Header | Waarde |
|--------|--------|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microfoon en geolocatie uitgeschakeld |
| `Content-Security-Policy` | Beperkt tot eigen domein + Google Fonts + Formspree |

---

## Technische details

- **Type:** Statische website (geen build-tool, geen framework)
- **Hosting:** Netlify (gratis tier)
- **Fonts:** Google Fonts — Playfair Display + Inter
- **Formulieren:** Formspree (gratis tier: 50 inzendingen/maand)
- **SSL:** Let's Encrypt via Netlify (automatisch)
- **Toegankelijkheid:** WCAG 2.2 AA nagestreefd (aria-labels, toetsenbordbediening, kleurcontrast)
- **SEO:** JSON-LD LocalBusiness schema, canonical URLs, XML sitemap, unieke meta descriptions

---

## DNS-verificatie (uitvoeren door eigenaar)

Voer deze controles uit nadat u het domein heeft ingesteld:

```bash
# DNS A-record controleren
dig rioolontoppingsservice.nl A

# HTTPS-certificaat controleren
curl -I https://rioolontoppingsservice.nl

# www-redirect controleren
curl -I https://www.rioolontoppingsservice.nl
```

**Opmerking:** Deze controles zijn nog niet uitgevoerd. Het domein en de SSL-configuratie zijn op het moment van oplevering niet live geverifieerd.

---

## Licentie

Eigendom van 24/7 Riool & Ontstoppingsservice. Alle rechten voorbehouden.
