# Déploiement Vercel — NovatrixAI

App **Nuxt 3 SSR + Nitro** (backend MongoDB/Mongoose + stockage S3/R2). Sur Vercel, le backend
tourne en **fonctions serverless** ; le preset Nitro `vercel` est auto-détecté (`VERCEL=1`).

## 1. Importer le projet
- Vercel → New Project → importer `github.com/novatrix217-spec/novatrix2`.
- Root Directory : **`.`** (racine — le code Nuxt est à la racine du dépôt).
- Framework : Nuxt (auto). Build : `nuxt build`.

## 2. Variables d'environnement (Project Settings → Environment Variables)

**Obligatoires pour un site fonctionnel :**

| Variable | Rôle | Exemple / note |
|---|---|---|
| `MONGODB_URI` | Base de données (Atlas, PAS localhost) | `mongodb+srv://user:pass@cluster.mongodb.net/novatrixai` |
| `AUTH_SESSION_SECRET` | Secret sessions + liens signés (≥ 32 car. aléatoires) | générer avec `openssl rand -hex 32` |
| `SITE_URL` | URL publique du site | `https://novatrix2.vercel.app` (puis domaine final) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Bootstrap du 1er admin si `users` vide | |

**Requises pour les ressources téléchargeables (S3/Cloudflare R2) :**
`NUXT_CLOUDINARY_CLOUD_NAME` / `NUXT_CLOUDINARY_API_KEY` / `NUXT_CLOUDINARY_API_SECRET` (hebergement des fichiers et medias). Les variables `S3_*` sont facultatives : elles ne servent qu aux ressources historiques stockees avant la bascule sur Cloudinary.

**Optionnelles :**
`AUTOPUBLISH_API_KEY` (auto-publication n8n/Make), `N8N_WEBHOOK_URL`, `GHL_WEBHOOK_URL`,
`SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` + `MAIL_FROM` (envoi SMTP), `MAIL_TO_INTERNAL` (alertes nouveau lead),
`NUXT_PUBLIC_CALENDAR_URL`, `NUXT_PUBLIC_WHATSAPP_URL`, `ALLOW_DEMO_DOWNLOADS`.

## 3. Comportement sans configuration
- **Sans `MONGODB_URI`** : les pages publiques s'affichent avec le **contenu de démonstration** ;
  les routes admin/leads renvoient un `503` propre (pas de crash au boot — connexion Mongo paresseuse).
- **Sans S3** : le téléchargement de ressources échoue (texte de démo seulement si `ALLOW_DEMO_DOWNLOADS=true` en dev).

## 4. Limite serverless connue
Le **rate-limit** et la **déduplication webhooks** sont en mémoire process → non partagés entre
instances serverless. Pour plusieurs instances, remplacer par Redis (voir `server/utils/rate-limit.ts`).
Non bloquant pour un premier lancement.
