# Profil projet — NovatrixAI

## Racine et produit

- Racine Git : `D:\projets\novatrix\novatrix2\novatrix`
- Produit : site vitrine et moteur d’acquisition bilingue français/anglais.
- Déploiement prévu : application Nuxt SSR, avec preset Nitro choisi par la plateforme.

## Stack vérifiée

- Nuxt 3, Vue 3 et TypeScript strict.
- Tailwind CSS, Nuxt Image, Nuxt I18n, Nuxt Sitemap et Nuxt Robots.
- API Nitro, MongoDB avec Mongoose, stockage Cloudinary ou S3-compatible.
- Authentification d’administration par session, validation Zod et intégrations webhook/email facultatives.
- Gestionnaire et verrou de dépendances : npm (`package-lock.json`).

## Commandes de référence

- Développement : `npm run dev`
- Vérification TypeScript : `npx vue-tsc --noEmit`
- Build de production : `npm run build`
- Démarrage du build : `npm run start`
- Vérification d’un script Node : `node --check <script>`

Le projet ne définit actuellement ni commande de lint ni suite de tests automatisés dans `package.json`.

## Risques principaux

- Données personnelles : formulaires de leads, avis, réservation Calendly et back-office.
- Secrets et accès : MongoDB, session d’administration, webhooks, email, Cloudinary et S3.
- SEO bilingue : routes préfixées en anglais, canonical, hreflang, sitemap et données structurées.
- Contenu dynamique : articles, ressources, réalisations et avis peuvent provenir de MongoDB avec des données de démonstration en repli.
- Actions sensibles : migrations ou enrichissements MongoDB, publication, déploiement et rotation de secrets exigent une validation dédiée et un rollback explicite.
- Dépendances externes : Calendly, Google Fonts, Cloudinary/S3 et services webhook peuvent être bloqués par la CSP, le réseau ou leur disponibilité.

## Équipe globale minimale

Aucun agent métier local supplémentaire n’est nécessaire à ce stade. Utiliser les rôles globaux suivants selon le besoin :

1. `senior_fullstack_engineer` — propriétaire unique du diff applicatif.
2. `qa_validation_engineer` — validation indépendante des critères, régressions, responsive et accessibilité.
3. `expert_seo_webmaster_redacteur_web` — revue SEO technique et cohérence FR/EN lorsque le contenu public ou l’indexation change.
4. `designer_ui_ux` — revue ciblée des parcours, états et composants lorsque l’interface change matériellement.
5. `security_privacy_engineer` — revue ciblée pour authentification, secrets, données personnelles, uploads ou nouvelles dépendances externes.

N’activer que les rôles nécessaires au changement. Un seul rôle inscriptible possède le diff final d’un même périmètre.

## Garde-fous d’exécution

- Lire les instructions locales et l’état Git avant toute action.
- Préserver les modifications non liées présentes dans le worktree.
- Ne jamais afficher le contenu de `.env` ni journaliser un secret ou une donnée personnelle inutile.
- Ne pas exécuter de script de mutation MongoDB sans confirmation dédiée.
- Ne pas commit, push, déployer, publier ou supprimer des données sans autorisation explicite.
- Pour une action de niveau L3, demander une seconde confirmation avec cible exacte et rollback juste avant l’action.
