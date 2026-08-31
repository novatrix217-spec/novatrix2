<template><OfferDetail v-bind="content"><template #title><span v-html="titleHtml"/></template></OfferDetail></template>
<script setup lang="ts">
import { Rocket, Layers, TrendingUp } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Novatrix Launch — Start, Growth, Scale', description: 'A complete support program to launch, grow and scale your digital acquisition system, structured in three progressive stages.' }
  : { title: 'Novatrix Launch — Start, Growth, Scale', description: 'Un accompagnement complet pour lancer, développer et faire grandir votre système d’acquisition digitale, structuré en trois paliers progressifs.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const titleHtml = computed(() => locale.value === 'en'
  ? 'A progressive path, from your first system to <span class="text-gradient">a scaled operation.</span>'
  : 'Un parcours progressif, du premier système à <span class="text-gradient">une activité qui passe à l’échelle.</span>')
const content = computed(() => locale.value === 'en' ? {
  kicker: 'offer 3 · novatrix launch', title: 'Novatrix Launch',
  description: 'A complete, staged support program — Start, Growth, Scale — that adapts the scope of intervention to where your acquisition system actually stands today.',
  systemTitle: 'You don’t need everything on day one. You need the right stage.',
  systemText: 'Novatrix Launch structures the work in three progressive stages, so effort matches your current reality instead of a generic package. Each stage has its own scope, checkpoint and criteria before moving to the next.',
  modules: ['Start — first acquisition system in place, ready to run', 'Growth — connected follow-up, CRM and reporting once the base works', 'Scale — expanded channels and automation once volume justifies it', 'A review point before each stage begins', 'A single point of accountability across the whole path'],
  capabilitiesTitle: 'Three stages, one continuous path.',
  capabilities: [
    { icon: Rocket, title: 'Start', text: 'Get a first working acquisition system live, with the essential connections in place.' },
    { icon: Layers, title: 'Growth', text: 'Connect follow-up, CRM and reporting once the base is validated and running.' },
    { icon: TrendingUp, title: 'Scale', text: 'Expand channels and automate what volume justifies, once growth is confirmed.' },
  ],
  steps: [{step:'01',title:'Diagnose',text:'We map where you stand today against the three stages.',outcome:'the stage that matches your current situation.'},{step:'02',title:'Start',text:'We ship the first working system for that stage.',outcome:'a running system, reviewed against a clear checkpoint.'},{step:'03',title:'Review',text:'We check results against the agreed criteria before moving on.',outcome:'a documented decision to move to the next stage or consolidate.'},{step:'04',title:'Progress',text:'We move to Growth or Scale only when the previous stage holds.',outcome:'a path that grows with your real capacity, not a fixed calendar.'}],
  faqs: [
    { question: 'Do I have to start at Start even if I already have tools running?', answer: 'No. The diagnosis identifies which stage matches your current situation — you don’t restart from zero if a working base already exists.' },
    { question: 'How is each stage priced?', answer: 'Each stage is scoped and priced separately, based on what the diagnosis finds. The free audit identifies the right starting stage before a proposal is prepared.' },
    { question: 'What if we stay at Start and never move to Growth?', answer: 'That is a valid outcome. The path only progresses when the criteria for the next stage are met, not on a fixed schedule.' },
  ],
  ctaTitle: 'Find out which stage of Novatrix Launch matches where you stand today.',
} : {
  kicker: 'offre 3 · novatrix launch', title: 'Novatrix Launch',
  description: 'Un accompagnement complet et progressif — Start, Growth, Scale — qui adapte le périmètre d’intervention à l’état réel de votre système d’acquisition aujourd’hui.',
  systemTitle: 'Vous n’avez pas besoin de tout dès le premier jour. Vous avez besoin du bon palier.',
  systemText: 'Novatrix Launch structure le travail en trois paliers progressifs, pour que l’effort corresponde à votre réalité actuelle plutôt qu’à un forfait générique. Chaque palier a son périmètre propre, son point de revue et ses critères avant de passer au suivant.',
  modules: ['Start — premier système d’acquisition en place, opérationnel', 'Growth — relances, CRM et reporting connectés une fois la base fonctionnelle', 'Scale — canaux étendus et automatisation une fois le volume le justifiant', 'Un point de revue avant chaque palier', 'Un seul responsable sur l’ensemble du parcours'],
  capabilitiesTitle: 'Trois paliers, un seul parcours continu.',
  capabilities: [
    { icon: Rocket, title: 'Start', text: 'Mettre en route un premier système d’acquisition fonctionnel, avec les connexions essentielles en place.' },
    { icon: Layers, title: 'Growth', text: 'Relier relances, CRM et reporting une fois la base validée et opérationnelle.' },
    { icon: TrendingUp, title: 'Scale', text: 'Étendre les canaux et automatiser ce que le volume justifie, une fois la croissance confirmée.' },
  ],
  steps: [{step:'01',title:'Diagnostiquer',text:'On cartographie votre situation actuelle face aux trois paliers.',outcome:'le palier qui correspond à votre situation actuelle.'},{step:'02',title:'Démarrer',text:'On livre le premier système fonctionnel pour ce palier.',outcome:'un système opérationnel, revu selon un point de contrôle clair.'},{step:'03',title:'Revoir',text:'On vérifie les résultats selon les critères convenus avant de poursuivre.',outcome:'une décision documentée : passer au palier suivant ou consolider.'},{step:'04',title:'Progresser',text:'On passe à Growth ou Scale seulement quand le palier précédent tient.',outcome:'un parcours qui grandit avec votre capacité réelle, pas un calendrier figé.'}],
  faqs: [
    { question: 'Dois-je commencer par Start même si j’ai déjà des outils en place ?', answer: 'Non. Le diagnostic identifie le palier qui correspond à votre situation actuelle — vous ne repartez pas de zéro si une base fonctionnelle existe déjà.' },
    { question: 'Comment chaque palier est-il chiffré ?', answer: 'Chaque palier est cadré et chiffré séparément, selon ce que révèle le diagnostic. L’audit gratuit identifie le bon palier de départ avant la préparation d’une proposition.' },
    { question: 'Et si on reste à Start sans jamais passer à Growth ?', answer: 'C’est un résultat valide. Le parcours n’avance que lorsque les critères du palier suivant sont atteints, pas selon un calendrier figé.' },
  ],
  ctaTitle: 'Identifions le palier de Novatrix Launch qui correspond à votre situation actuelle.',
})
</script>
