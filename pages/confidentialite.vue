<template>
  <div>
    <PageHero :kicker="t.kicker"><span v-html="t.title"/></PageHero>
    <section class="section-pad"><div class="prose-novatrix container-shell max-w-3xl">
      <h2>{{ t.collectedTitle }}</h2><p>{{ t.collectedText }}</p>
      <h2>{{ t.purposeTitle }}</h2><p>{{ t.purposeText }}</p>
      <h2>{{ t.retentionTitle }}</h2><p>{{ t.retentionText }}</p>
      <h2 id="calendly" class="scroll-mt-24">{{ t.calendlyTitle }}</h2><p>{{ t.calendlyText }}</p><ul><li>{{ t.calendlyData }}</li><li>{{ t.calendlyPurpose }}</li><li>{{ t.calendlyBasis }}</li><li>{{ t.calendlyRetention }}</li><li>{{ t.calendlyTransfers }}</li></ul><p><a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">{{ t.calendlyPolicy }}</a></p>
      <h2>{{ t.processorsTitle }}</h2><p>{{ t.processorsText }}</p>
    </div></section>
  </div>
</template>
<script setup lang="ts">
const { locale } = useI18n()
const seo = computed(() => locale.value === 'en'
  ? { title: 'Privacy Policy', description: 'How NovatrixAI and its booking provider process personal data.' }
  : { title: 'Politique de confidentialité', description: 'Comment NovatrixAI et son outil de réservation traitent les données personnelles.' })
usePageSeo(() => seo.value.title, () => seo.value.description)
const t = computed(() => locale.value === 'en' ? {
  kicker: 'privacy', title: 'Privacy <span class="text-gradient">policy.</span>',
  collectedTitle: 'Data collected', collectedText: 'NovatrixAI collects information submitted through its forms: identity, contact details, company, consent, campaign parameters, IP address and browser information.',
  purposeTitle: 'Purposes and legal basis', purposeText: 'This data is used to deliver requested resources, respond to requests and provide sales follow-up. Form processing is based on your request and, where required, your consent.',
  retentionTitle: 'Retention and rights', retentionText: 'NovatrixAI keeps data only for the period needed for the stated purpose and applicable obligations. You can request access, correction, objection or deletion at contact@novatrixai.com.',
  calendlyTitle: 'Calendly booking tool', calendlyText: 'Calendly loads as soon as you open the booking widget, to let you see and pick a slot without an extra step. Calendly then acts as NovatrixAI’s booking service provider.',
  calendlyData: 'Data: technical connection data and the identity, contact and scheduling information you submit in the calendar.', calendlyPurpose: 'Purpose: display availability, let you select a slot and send booking information.', calendlyBasis: 'Legal basis: opening the booking widget is treated as your request to use this service; you can always continue by e-mail or WhatsApp instead.', calendlyRetention: 'Retention: Calendly applies the retention periods described in its policy; NovatrixAI retains the resulting booking information only as needed to organize and follow up the audit.', calendlyTransfers: 'Transfers: Calendly may process data outside your country and uses the safeguards described in its privacy documentation.', calendlyPolicy: 'Read Calendly’s privacy policy',
  processorsTitle: 'Other service providers', processorsText: 'Delivery relies on Cloudinary (file and media hosting), an SMTP email service and automation tools configured by NovatrixAI. The website is hosted on a dedicated server (IONOS, France). Providers receive only the data needed for their role.',
} : {
  kicker: 'confidentialité', title: 'Politique de <span class="text-gradient">confidentialité.</span>',
  collectedTitle: 'Données collectées', collectedText: 'NovatrixAI collecte les informations transmises dans ses formulaires : identité, coordonnées, entreprise, consentement, paramètres de campagne, adresse IP et informations de navigateur.',
  purposeTitle: 'Finalités et base légale', purposeText: 'Ces données servent à délivrer les ressources demandées, répondre aux demandes et assurer le suivi commercial. Le traitement des formulaires repose sur votre demande et, lorsque nécessaire, sur votre consentement.',
  retentionTitle: 'Conservation et droits', retentionText: 'NovatrixAI conserve les données uniquement pendant la durée nécessaire à la finalité annoncée et aux obligations applicables. Vous pouvez demander accès, correction, opposition ou suppression à contact@novatrixai.com.',
  calendlyTitle: 'Outil de réservation Calendly', calendlyText: 'Calendly se charge dès l’ouverture de l’outil de réservation, afin d’afficher directement les créneaux disponibles. Calendly intervient ensuite comme prestataire de réservation de NovatrixAI.',
  calendlyData: 'Données : données techniques de connexion ainsi que les informations d’identité, de contact et de planification saisies dans le calendrier.', calendlyPurpose: 'Finalité : afficher les disponibilités, vous permettre de sélectionner un créneau et transmettre les informations de réservation.', calendlyBasis: 'Base légale : l’ouverture de l’outil de réservation vaut demande d’utilisation de ce service ; vous pouvez toujours nous contacter par email ou WhatsApp à la place.', calendlyRetention: 'Conservation : Calendly applique les durées décrites dans sa politique ; NovatrixAI conserve les informations issues de la réservation uniquement le temps nécessaire à l’organisation et au suivi de l’audit.', calendlyTransfers: 'Transferts : Calendly peut traiter des données hors de votre pays et applique les garanties décrites dans sa documentation de confidentialité.', calendlyPolicy: 'Consulter la politique de confidentialité de Calendly',
  processorsTitle: 'Autres prestataires', processorsText: 'La délivrance s’appuie sur Cloudinary (hébergement des fichiers et médias), un service email SMTP et des outils d’automatisation configurés par NovatrixAI. Le site est hébergé sur un serveur dédié (IONOS, France). Chaque prestataire reçoit uniquement les données nécessaires à son rôle.',
})
</script>
