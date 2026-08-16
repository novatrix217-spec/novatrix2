<template><div><PageHero :kicker="t.kicker"><span v-html="t.title"/></PageHero><section class="section-pad"><div class="prose-novatrix container-shell max-w-3xl"><h2>{{ t.h1 }}</h2><p>{{ t.p1 }}</p><h2>{{ t.h2 }}</h2><p>{{ t.p2 }}</p><h2>{{ t.h3 }}</h2><p v-html="t.p3"/><h2>{{ t.h4 }}</h2><p>{{ t.p4 }}</p></div></section></div></template>
<script setup lang="ts">
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Privacy Policy', description: 'Processing of personal data and user rights on the NovatrixAI website.' }
  : { title: 'Politique de confidentialité', description: 'Traitement des données personnelles et droits des utilisateurs du site NovatrixAI.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const t = computed(() => locale.value === 'en' ? {
  kicker: 'gdpr', title: 'Privacy <span class="text-gradient">policy.</span>',
  h1: 'Data collected', p1: 'NovatrixAI only collects information submitted through forms: identity, contact details, company, consent, campaign parameters, IP address and browser.',
  h2: 'Purpose', p2: 'This data is used to deliver requested resources, respond to inquiries, measure the origin of requests and ensure sales follow-up.',
  h3: 'Retention and rights', p3: 'Data is protected and kept for as long as necessary for the stated purposes. You can request access to, correction of, or deletion of your data at contact@novatrixai.com.',
  h4: 'Subprocessors', p4: 'Delivery may use an S3-compatible host, an email service and automation tools configured by NovatrixAI.',
} : {
  kicker: 'rgpd', title: 'Politique de <span class="text-gradient">confidentialité.</span>',
  h1: 'Données collectées', p1: 'NovatrixAI collecte uniquement les informations transmises dans les formulaires : identité, coordonnées, entreprise, consentement, paramètres de campagne, adresse IP et navigateur.',
  h2: 'Finalités', p2: 'Ces données servent à délivrer les ressources demandées, répondre aux prises de contact, mesurer l’origine des demandes et assurer le suivi commercial.',
  h3: 'Conservation et droits', p3: 'Les données sont protégées et conservées pendant la durée nécessaire aux finalités annoncées. Vous pouvez demander l’accès, la correction ou la suppression de vos données à contact@novatrixai.com.',
  h4: 'Sous-traitants', p4: 'La délivrance peut utiliser un hébergeur S3-compatible, un service email et des outils d’automatisation configurés par NovatrixAI.',
})
</script>
