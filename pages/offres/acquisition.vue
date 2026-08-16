<template><OfferDetail v-bind="content"><template #title><span v-html="titleHtml"/></template></OfferDetail></template>
<script setup lang="ts">
import { BarChart3,MailCheck,MousePointerClick } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Acquisition system that turns your clicks into clients', description: 'Creatives, ads, funnel, CRM and follow-ups connected in one system: every lead is captured, followed up and converted. Not one more sale lost between two tools.' }
  : { title: 'Système d’acquisition qui transforme vos clics en clients', description: 'Créatifs, pub, tunnel, CRM et relances reliés en un seul système : chaque lead est capté, relancé et converti. Plus une seule vente perdue entre deux outils.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const titleHtml = computed(() => locale.value === 'en'
  ? 'Stop paying for clicks that <span class="text-gradient">end up in the trash.</span>'
  : 'Arrêtez de payer des clics qui <span class="text-gradient">finissent à la poubelle.</span>')
const content = computed(() => locale.value === 'en' ? {
  kicker: 'offer a · acquisition', title: 'Acquisition System',
  description: 'You generate clicks, but how many become clients? We connect attention to sales: creatives, ads, funnel, CRM and follow-ups in a single system. Every lead captured, followed up, converted.',
  systemTitle: 'From the first click to the signed client, no leaks.',
  systemText: 'Your ad can be a hit: if the after-click is patched together, you burn budget. We connect the five blocks into one system. Result: no lead gets lost, every dollar works toward the sale.',
  modules: ['Creatives and ad angles', 'Meta, TikTok and Google campaigns', 'Conversion funnel and tracking', 'Automatic email, SMS and WhatsApp follow-ups: every lead recontacted at the right time, scored and tracked, without you thinking about it', 'Closing, or qualified leads delivered ready to sign to your team'],
  capabilitiesTitle: 'What turns your clicks into revenue.',
  capabilities: [{icon:MousePointerClick,title:'Attract',text:'Ads that speak to your prospects’ real pain, and trigger clicks from the right ones.'},{icon:MailCheck,title:'Follow up',text:'No prospect forgotten: each one is followed up at the right time, until they reply or buy.'},{icon:BarChart3,title:'Optimize',text:'We cut what costs, we scale what sells: your cost per client drops month after month.'}],
  steps: [{step:'01',title:'Scoping',text:'We start from your sales goal and your real numbers.',outcome:'a priced sales target and the metrics that matter.'},{step:'02',title:'Architecture',text:'We map the path from click to purchase.',outcome:'the full path from click to purchase, mapped.'},{step:'03',title:'Build',text:'We build ads, funnel, CRM and follow-ups, connected end to end.',outcome:'a system connected end to end, ready to test.'},{step:'04',title:'Launch',text:'We launch, measure against your sales, and optimize relentlessly.',outcome:'live campaigns and numbers to track in real time.'}],
  ctaTitle: 'How many clients have you already lost between two tools? Let’s talk.',
} : {
  kicker: 'offre a · acquisition', title: 'Système d’acquisition',
  description: 'Vous générez des clics, mais combien deviennent des clients ? Nous relions l’attention à la vente : créatifs, pub, tunnel, CRM et relances dans un seul système. Chaque lead capté, relancé, converti.',
  systemTitle: 'Du premier clic au client signé, sans fuite.',
  systemText: 'Votre pub peut cartonner : si l’après-clic est bricolé, vous brûlez du budget. Nous relions les cinq blocs en un seul système. Résultat : aucun lead ne se perd, chaque euro travaille jusqu’à la vente.',
  modules: ['Créatifs et angles publicitaires', 'Campagnes Meta, TikTok et Google', 'Tunnel de conversion et tracking', 'Relances automatiques email, SMS et WhatsApp : chaque lead recontacté au bon moment, scoré et suivi, sans que vous y pensiez', 'Closing ou leads qualifiés livrés prêts à signer à votre équipe'],
  capabilitiesTitle: 'Ce qui transforme vos clics en chiffre d’affaires.',
  capabilities: [{icon:MousePointerClick,title:'Attirer',text:'Des pubs qui parlent à la vraie douleur de vos prospects, et déclenchent le clic des bons.'},{icon:MailCheck,title:'Relancer',text:'Aucun prospect oublié : chacun est relancé au bon moment, jusqu’à ce qu’il réponde ou achète.'},{icon:BarChart3,title:'Optimiser',text:'On coupe ce qui coûte, on amplifie ce qui vend : votre coût par client baisse mois après mois.'}],
  steps: [{step:'01',title:'Cadrage',text:'On part de votre objectif de ventes et de vos vrais chiffres.',outcome:'un objectif de ventes chiffré et les indicateurs qui comptent.'},{step:'02',title:'Architecture',text:'On dessine le parcours qui mène le clic jusqu’à l’achat.',outcome:'le parcours complet du clic à l’achat, cartographié.'},{step:'03',title:'Construction',text:'On monte pubs, tunnel, CRM et relances, reliés bout à bout.',outcome:'un système connecté de bout en bout, prêt à tester.'},{step:'04',title:'Lancement',text:'On lance, on mesure sur vos ventes, on optimise sans relâche.',outcome:'des campagnes actives et des chiffres à suivre en direct.'}],
  ctaTitle: 'Combien de clients avez-vous déjà perdus entre deux outils ? Parlons-en.',
})
</script>
