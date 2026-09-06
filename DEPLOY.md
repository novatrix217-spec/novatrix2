# Déploiement — NovatrixAI

App **Nuxt 3 SSR + Nitro** (MongoDB/Mongoose, fichiers sur Cloudinary, mails en SMTP).

La production tourne sur **Dokku**, serveur IONOS `217.154.9.146`, application `novatrixai`,
servie derrière nginx. Le domaine `novatrixai.com` pointe sur ce serveur (enregistrement `A`).

> Le dépôt contient encore un `vercel.json` d'une évaluation précédente : Vercel n'est pas
> la cible de déploiement. Ne pas s'y fier.

## 1. Remotes git

| Remote | Cible |
|---|---|
| `origin` | `github.com/novatrix217-spec/novatrix2` (code source) |
| `new-prod` | `dokku@217.154.9.146:novatrixai` — **production actuelle** |
| `production` | `dokku@51.210.107.39:novatrixai` — ancien serveur |

Déployer : `git push new-prod main`
Dokku construit l'image puis bascule le conteneur (zero-downtime si le healthcheck passe).

## 2. Variables d'environnement

À définir sur le serveur, **pas dans le dépôt** (le `.env` local n'est jamais déployé) :

```bash
ssh dokku@217.154.9.146 config:set novatrixai \
  SITE_URL=https://novatrixai.com \
  NUXT_MONGO_URL='mongodb+srv://…' \
  AUTH_SESSION_SECRET='…' \
  NUXT_PUBLIC_WHATSAPP_URL=https://wa.me/2290163774295
```

`config:set` redémarre l'application à chaque appel : grouper les variables en une commande.
Lire l'existant avec `ssh dokku@217.154.9.146 config:show novatrixai`.

**Obligatoires :**

| Variable | Rôle | Note |
|---|---|---|
| `NUXT_MONGO_URL` | Base de données (Atlas, pas localhost) | `MONGODB_URI` est aussi accepté |
| `AUTH_SESSION_SECRET` | Sessions admin + liens de téléchargement signés | ≥ 32 caractères — `openssl rand -hex 32` |
| `SITE_URL` | URL publique | `https://novatrixai.com` — **en HTTPS** |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Création du premier admin si la collection `users` est vide | |

Sans `SITE_URL`, l'app retombe sur `http://localhost:3000` : canonicals, `og:image`, JSON-LD,
sitemap et hreflang deviennent tous faux. C'est la variable la plus critique pour le SEO.

**Fichiers et médias (Cloudinary) :**
`NUXT_CLOUDINARY_CLOUD_NAME`, `NUXT_CLOUDINARY_API_KEY`, `NUXT_CLOUDINARY_API_SECRET`.
Les variables `S3_*` sont facultatives : elles ne servent qu'aux ressources téléversées
avant la bascule sur Cloudinary.

**E-mails (SMTP Hostinger) :**
`SMTP_HOST=smtp.hostinger.com`, `SMTP_PORT=465`, `SMTP_USER=contact@novatrixai.com`,
`SMTP_PASS`, `MAIL_FROM`, `MAIL_TO_INTERNAL`.
Vérifier la configuration sans envoyer d'e-mail : `node scripts/test-smtp.mjs`.

**Optionnelles :**
`AUTOPUBLISH_API_KEY` (publication automatisée n8n/Make), `N8N_WEBHOOK_URL`,
`GHL_WEBHOOK_URL`, `NUXT_PUBLIC_CALENDAR_URL`, `NUXT_PUBLIC_WHATSAPP_URL`,
`ALLOW_DEMO_DOWNLOADS`.

## 3. Comportement en l'absence de configuration

- **Sans base** : les pages publiques affichent le contenu de démonstration ; les routes
  admin et leads renvoient un `503` propre (la connexion Mongo est paresseuse, pas de crash au boot).
- **Sans SMTP** : aucun e-mail ne part, y compris l'alerte interne de nouveau lead — le lead
  est bien enregistré, mais personne n'est prévenu.
- **Sans Cloudinary** : le téléchargement de ressources échoue (texte de démonstration
  uniquement si `ALLOW_DEMO_DOWNLOADS=true`, en développement).
- **Sans `NUXT_PUBLIC_WHATSAPP_URL`** : les CTA WhatsApp sont masqués plutôt que de pointer
  vers un numéro inexistant.

## 4. Médias du Video Lab

Les vidéos ne sont pas versionnées (30 Mo). Elles vivent sur Cloudinary et le dépôt ne
contient que le manifeste `shared/video-lab-assets.json`. Pour en ajouter ou en remplacer :
déposer les `.mp4` dans `public/media/video-lab/`, puis `node scripts/upload-video-lab.mjs`
(`--dry-run` pour prévisualiser) et commiter le manifeste mis à jour.

## 5. Limite connue

Le rate-limit et la déduplication des webhooks sont en mémoire du process
(`server/utils/rate-limit.ts`). Sur une instance unique — le cas actuel sur Dokku — cela
fonctionne. Toute montée en charge sur plusieurs conteneurs imposera de passer par Redis.

## 6. Après un déploiement

```bash
ssh dokku@217.154.9.146 logs novatrixai -t     # journaux
ssh dokku@217.154.9.146 ps:report novatrixai   # état des conteneurs
```

Vérifier une page ajoutée récemment (par exemple `/mentions-legales`) plutôt que la seule
page d'accueil : un ancien conteneur toujours actif répond `200` sur `/` mais `404` sur les
routes récentes.
