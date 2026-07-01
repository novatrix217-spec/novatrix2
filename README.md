# NovatrixAI

Site vitrine et moteur d’acquisition full-stack de NovatrixAI : Nuxt 3 SSR, MongoDB/Mongoose, Tailwind CSS et stockage S3-compatible.

## Installation

Prérequis : Node.js 20+, npm et MongoDB local ou Atlas.

    Copy-Item .env.example .env
    npm install
    npm run dev

Production :

    npm run build
    npm run start

La partie publique utilise des contenus de démonstration lorsque MongoDB est vide. Les créations, captures et fonctions admin exigent une base disponible. En développement, la connexion par défaut est mongodb://127.0.0.1:27017/novatrixai.

## Variables d’environnement

Copier .env.example, puis définir :

- MONGODB_URI : connexion MongoDB.
- AUTH_SESSION_SECRET : secret d’au moins 32 caractères pour sessions et liens signés.
- ADMIN_EMAIL et ADMIN_PASSWORD : création du premier administrateur si users est vide.
- AUTOPUBLISH_API_KEY : clé Bearer réservée à n8n/Make.
- S3_* : endpoint, bucket et identifiants R2/S3.
- N8N_WEBHOOK_URL et GHL_WEBHOOK_URL : webhooks facultatifs des nouveaux leads.
- MAIL_PROVIDER_KEY et MAIL_FROM : livraison email via Resend.
- SITE_URL, NUXT_PUBLIC_CALENDAR_URL et NUXT_PUBLIC_WHATSAPP_URL : URLs publiques.

## Modèles MongoDB

- Resource : métadonnées et clé S3 d’une ressource protégée.
- Lead : contact, consentement, source, UTM, preuve technique et statut CRM.
- Article : contenu, SEO, publication et origine manuelle ou automatisée.
- User : administrateur ou éditeur avec hash bcrypt.
- Setting : réglages non secrets du back-office.

Les fichiers ne sont jamais stockés dans MongoDB.

## Flux ressource vers lead

1. Le visiteur ouvre /ressources/:slug.
2. Le formulaire envoie quatre champs, le consentement, les UTM et un honeypot à POST /api/leads.
3. Le serveur valide avec Zod, limite le débit, enregistre la preuve RGPD et incrémente leadCount.
4. Les webhooks n8n/GHL sont appelés sans bloquer la délivrance.
5. Un jeton de 15 minutes protège /api/resources/:id/download.
6. Cette route génère une URL S3 signée de 5 minutes. En développement uniquement, un texte de démonstration est renvoyé si S3 manque.

## Auto-publication n8n / Make

Envoyer une requête POST /api/articles avec les en-têtes Authorization: Bearer AUTOPUBLISH_API_KEY et Content-Type: application/json.

Corps JSON attendu : title, excerpt (20 caractères minimum), body (Markdown, 100 caractères minimum), category, tags et status. Le serveur normalise le slug français, calcule le temps de lecture, complète le SEO et publie la page SSR. Le sitemap et /rss.xml lisent MongoDB dynamiquement.

## API principale

- GET /api/resources et GET /api/resources/:slug
- POST /api/leads
- GET /api/resources/:id/download?token=...
- GET /api/articles, GET /api/articles/:slug et POST /api/articles
- POST /api/auth/login, POST /api/auth/logout et GET /api/auth/me
- /api/admin/* : dashboard, CRUD, upload et export CSV protégés

## Sécurité

Cookies httpOnly, hash bcrypt, validation Zod, limitation de débit, jetons courts, URL S3 signée, whitelist d’upload, CSP, HSTS en production, consentement non précoché et collecte IP/user-agent. Pour plusieurs instances, remplacer le rate-limit mémoire par Redis.
