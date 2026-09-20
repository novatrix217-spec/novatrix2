<template>
  <div>
    <PageHero :kicker="t.kicker"><span v-html="t.title"/></PageHero>
    <section class="section-pad"><div class="prose-novatrix container-shell max-w-3xl">
      <h2>{{ t.editorTitle }}</h2>
      <p>{{ t.editorText }}</p>
      <!-- Identification legale officielle (RCCM RB/ABC/26 B 10826, IFU 3202673384094). -->
      <ul>
        <li>{{ t.editorName }}</li>
        <li>{{ t.editorForm }}</li>
        <li>{{ t.editorRegistration }}</li>
        <li>{{ t.editorAddress }}</li>
        <li>{{ t.editorEmail }}</li>
      </ul>
      <h2>{{ t.directorTitle }}</h2><p>{{ t.directorText }}</p>
      <h2>{{ t.hostTitle }}</h2><p>{{ t.hostText }}</p>
      <h2>{{ t.ipTitle }}</h2><p>{{ t.ipText }}</p>
      <h2 id="cookies" class="scroll-mt-24">{{ t.cookiesTitle }}</h2>
      <p>{{ t.cookiesIntro }}</p>
      <ul><li>{{ t.cookiesCalendly }}</li><li>{{ t.cookiesFonts }}</li><li>{{ t.cookiesSession }}</li></ul>
      <p>{{ t.cookiesNoTracking }}</p>
      <h2>{{ t.dataTitle }}</h2>
      <p>{{ t.dataText }} <NuxtLink :to="localePath('/confidentialite')">{{ t.dataLink }}</NuxtLink>.</p>
    </div></section>
  </div>
</template>
<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const seo = computed(() => locale.value === 'en'
  ? { title: 'Legal notice', description: 'Publisher, hosting provider and cookie information for the NovatrixAI website.' }
  : { title: 'Mentions légales', description: 'Éditeur, hébergeur et informations sur les cookies du site NovatrixAI.' })
usePageSeo(() => seo.value.title, () => seo.value.description)
const t = computed(() => locale.value === 'en' ? {
  kicker: 'legal notice', title: 'Legal <span class="text-gradient">notice.</span>',
  editorTitle: 'Website publisher', editorText: 'This website is published by:',
  editorName: 'Company name: NOVATRIXAI SARL', editorForm: 'Legal form: limited liability company (SARL) under the law of the Republic of Benin', editorRegistration: 'Trade register (RCCM): RB/ABC/26 B 10826. Tax ID (IFU): 3202673384094', editorAddress: 'Registered office: Maison Véronique Noélie Hinson, Parcelle C, Îlot 1574, Quartier Aïbatin Kpota, 13th district, Cotonou, Littoral, Republic of Benin', editorEmail: 'Email: contact@novatrixai.com. Phone: +229 01 63 77 42 95',
  directorTitle: 'Publication director', directorText: 'The publication director is Mr Raphaël Jacques-Dane Patrick AGBAHUNGBA, Manager of NOVATRIXAI SARL.',
  hostTitle: 'Hosting provider', hostText: 'The website is hosted on a dedicated server operated by IONOS SE, Elgendorfer Straße 57, 56410 Montabaur, Germany (ionos.fr), with infrastructure located in France.',
  ipTitle: 'Intellectual property', ipText: 'Unless otherwise stated, the content of this website (texts, visuals, logo, source code) is the property of NovatrixAI. Any reproduction or reuse without prior written permission is prohibited.',
  cookiesTitle: 'Cookies and third-party services', cookiesIntro: 'This website does not use advertising or audience-measurement cookies. Only the following technical services may store data on your device:',
  cookiesCalendly: 'Calendly: loaded when you open the booking widget (button “Book a call” or the booking page), never on other pages.',
  cookiesFonts: 'Google Fonts: used to load the website typefaces.',
  cookiesSession: 'Session cookie: strictly necessary, used only in the private administration area to keep an administrator signed in.',
  cookiesNoTracking: 'No tracking, profiling or advertising cookie is placed without your action.',
  dataTitle: 'Personal data', dataText: 'The processing of personal data collected through the forms is described in the',
  dataLink: 'privacy policy',
} : {
  kicker: 'mentions légales', title: 'Mentions <span class="text-gradient">légales.</span>',
  editorTitle: 'Éditeur du site', editorText: 'Ce site est édité par :',
  editorName: 'Dénomination sociale : NOVATRIXAI SARL', editorForm: 'Forme juridique : société à responsabilité limitée (SARL) de droit béninois', editorRegistration: 'RCCM : RB/ABC/26 B 10826. Identifiant Fiscal Unique (IFU) : 3202673384094', editorAddress: 'Siège social : Maison Véronique Noélie Hinson, Parcelle C, Îlot 1574, Quartier Aïbatin Kpota, 13ᵉ arrondissement, Cotonou, Littoral, République du Bénin', editorEmail: 'Email : contact@novatrixai.com. Téléphone : +229 01 63 77 42 95',
  directorTitle: 'Directeur de la publication', directorText: 'Le directeur de la publication est Monsieur Raphaël Jacques-Dane Patrick AGBAHUNGBA, Gérant de NOVATRIXAI SARL.',
  hostTitle: 'Hébergeur', hostText: 'Le site est hébergé sur un serveur dédié exploité par IONOS SE, Elgendorfer Straße 57, 56410 Montabaur, Allemagne (ionos.fr), dont l’infrastructure est située en France.',
  ipTitle: 'Propriété intellectuelle', ipText: 'Sauf mention contraire, les contenus de ce site (textes, visuels, logo, code source) sont la propriété de NovatrixAI. Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite.',
  cookiesTitle: 'Cookies et services tiers', cookiesIntro: 'Ce site n’utilise aucun cookie publicitaire ni de mesure d’audience. Seuls les services techniques suivants sont susceptibles de déposer des données sur votre appareil :',
  cookiesCalendly: 'Calendly : chargé lorsque vous ouvrez l’outil de réservation (bouton « Réserver un appel » ou la page de réservation), jamais sur les autres pages.',
  cookiesFonts: 'Google Fonts : utilisé pour charger les polices du site.',
  cookiesSession: 'Cookie de session : strictement nécessaire, utilisé uniquement dans l’espace d’administration privé pour maintenir un administrateur connecté.',
  cookiesNoTracking: 'Aucun cookie de suivi, de profilage ou de publicité n’est déposé sans action de votre part.',
  dataTitle: 'Données personnelles', dataText: 'Le traitement des données personnelles collectées via les formulaires est décrit dans la',
  dataLink: 'politique de confidentialité',
})
</script>
