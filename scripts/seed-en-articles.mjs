// Ajoute la traduction anglaise complète aux 5 articles de blog déjà en base.
// Met à jour par slug — ne touche à aucun champ français existant.
// Usage : node scripts/seed-en-articles.mjs

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import dns from 'node:dns'
import mongoose from 'mongoose'

dns.setServers(['1.1.1.1', '8.8.8.8'])
const __dirname = dirname(fileURLToPath(import.meta.url))
function loadEnv() {
  try {
    const raw = readFileSync(resolve(__dirname, '../.env'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim()
    }
  } catch {}
}
loadEnv()
const uri = process.env.MONGODB_URI || process.env.NUXT_MONGO_URL
if (!uri) { console.error('Aucune URI MongoDB trouvée.'); process.exit(1) }

function readingTime(body) { return Math.max(1, Math.ceil(body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 220)) }

const { Schema } = mongoose
const ArticleModel = mongoose.models.Article || mongoose.model('Article', new Schema({}, { strict: false }))

const translations = [
  {
    slug: 'le-diagnostic-en-5-points-pour-reperer-ou-votre-acquisition-fuit',
    titleEn: 'The 5-point diagnostic to find where your acquisition is leaking',
    categoryEn: 'Acquisition', tagsEn: ['CRM', 'Automation', 'Diagnostic'],
    excerptEn: 'A campaign that’s running guarantees nothing. Here are the five most common breaking points between the first click and the signed sale — and how to spot them before they cost you clients.',
    bodyEn: `## The problem is almost never the campaign

A business losing clients doesn’t always see where it’s coming from. The reflex is to blame the ad: bad targeting, a tired creative, insufficient budget. In most cases, the real problem is elsewhere — between two tools that don’t talk to each other.

Here are the five places where an acquisition chain breaks most often.

## 1. The gap between the ad’s promise and the landing page

A click on an ad creates a precise expectation. If the landing page doesn’t meet that expectation within a few seconds, the visitor leaves. Check: does your page’s headline repeat the same promise as the ad? Is social proof visible without scrolling?

## 2. The form that discourages more than it qualifies

Every extra field lowers completion rate. A ten-field form to capture a simple lead mostly filters out visitors in a hurry — often the most qualified ones. Ask for the minimum to start the conversation; the rest gets qualified on the call.

## 3. The lead that lands in an inbox, not a system

If a lead lands in a shared inbox before being manually entered into the CRM, two things happen: response time goes up, and some leads simply get lost. The lead should enter the CRM directly, with its source and context attached.

## 4. The follow-up that doesn’t exist, or arrives too late

Most sales don’t close on first contact. Without an automatic follow-up sequence — email, SMS, WhatsApp depending on the channel where the prospect is most responsive — every lead not converted immediately is a lead lost in silence.

## 5. No data to know what actually works

Without end-to-end tracking — from the click’s source to the signed contract — there’s no way to know which campaign actually brings in clients, and which one only brings in clicks. Many businesses optimize for cost per lead when the only metric that matters is cost per client.

## How to check it in your business

Take a real lead, entered last week, and follow it by hand: from the click to the final decision. Every manual re-entry, every silence longer than 24 hours, every step where no one knows who’s responsible — that’s a link to rebuild.

An acquisition system that holds connects these five points into a single chain, not five separate tools.`,
  },
  {
    slug: 'trois-niveaux-d-autonomie-pour-vos-agents-ia-et-ou-mettre-le-curseur',
    titleEn: 'Three levels of autonomy for your AI agents — and where to set the dial',
    categoryEn: 'AI Piloting', tagsEn: ['AI Agents', 'Governance', 'Automation'],
    excerptEn: 'An AI agent isn’t all-or-nothing. The real choice isn’t “should we automate,” but “how far.” Here’s a three-level framework to decide, domain by domain, where AI acts alone and where a human stays in control.',
    bodyEn: `## Autonomy isn’t a switch

Many businesses approach AI agents with a binary question: do we automate, or don’t we? That’s the wrong question. The right one is: at what level of autonomy should this agent operate, for this specific task?

Three levels are enough to cover nearly every case.

## Level 1 — Observation

The agent monitors, summarizes and alerts. It takes no action. This is the right level for anything analytical: spotting an anomaly on a dashboard, summarizing an inbox’s exchanges, flagging a client who hasn’t replied in ten days. The risk of error is zero, since nothing gets executed.

## Level 2 — Proposal

The agent prepares an action and submits it for approval before execution. A draft client reply, a draft invoice, a follow-up written but not sent. The human keeps the final decision, but gains the time spent drafting and preparing — often the longest part of the task.

## Level 3 — Autonomous execution

The agent acts alone, without prior approval, within a strictly defined scope. This is the right level for low-stakes, repetitive tasks with clear rules: confirming an appointment, sending an acknowledgment, updating a CRM status after a known action.

## Where to draw the line

The rule is simple: the more an error costs or the harder it is to fix, the lower you drop a level. On legal, tax and financial matters, level 3 should be avoided by default — an agent can prepare a contract or a filing, never approve it alone. On social media and first-line customer service, level 3 is often the right choice, provided there’s a clear exit to a human as soon as the situation falls outside the expected scope.

## A system, not a single switch

Good AI piloting doesn’t put every domain at the same level. Reporting can run at level 3, contract drafting at level 2, financial strategy at level 1. The dial gets set domain by domain, with the client, before the first deployment — not after the first incident.`,
  },
  {
    slug: 'pourquoi-whatsapp-est-le-bon-canal-pour-un-agent-ia-en-afrique-francophone',
    titleEn: 'Why WhatsApp is the right channel for an AI agent in French-speaking Africa',
    categoryEn: 'AI Piloting', tagsEn: ['WhatsApp', 'AI Agents', 'Africa'],
    excerptEn: 'In the US, an AI agent is piloted from Slack or a dashboard. In French-speaking West Africa, it’s WhatsApp. That choice isn’t a technical compromise — it’s the right starting point.',
    bodyEn: `## The channel decides adoption

A technically excellent AI agent installed on a channel no one opens stays unused. The channel question isn’t secondary: it decides whether the tool actually gets used day to day.

In French-speaking West Africa, that channel already exists, and everyone has already opened it today: WhatsApp.

## What that actually changes

Piloting an AI agent from WhatsApp rather than a dashboard changes several things at once:

- No new tool to learn. The business owner, assistant or salesperson already uses the app. Zero onboarding friction.
- No connection to maintain. A dashboard forgotten in a browser tab is useless. A WhatsApp message arrives where attention already is.
- A command in natural language, not a form. “Send me this week’s sales summary” replaces a three-click menu.
- A channel that works as well on 3G as on fiber. Network infrastructure varies widely by area; WhatsApp stays usable where a heavier web app would struggle.

## The use cases that benefit most

Piloting through WhatsApp is especially relevant for:

- appointment booking and calendar management,
- daily or weekly reporting sent without having to ask,
- qualifying incoming leads, before handing off to a salesperson,
- first-line customer support, for the questions that come back every week.

## One limit to know

WhatsApp isn’t suited to everything. A complex analysis with several tables, a long history to review, detailed technical configuration — these uses are still better served by a dedicated interface. The right system combines both: WhatsApp for daily use and quick commands, a web space for what needs more visual room.

## The real challenge isn’t the technology

The WhatsApp Business API, language models capable of understanding a command in casual French, integration with existing business tools — all of that is accessible today. The real work is elsewhere: mapping the commands actually useful to a specific business owner, and building the agent around their real use, not around a list of generic features.`,
  },
  {
    slug: 'cinq-questions-a-trancher-avant-de-cadrer-une-application-metier',
    titleEn: 'Five questions to settle before scoping a business application',
    categoryEn: 'Web & Apps', tagsEn: ['Application', 'Scoping', 'Product'],
    excerptEn: 'Most business applications abandoned after a year weren’t abandoned because of the code, but because of the initial scoping. Five questions cover most of the mistakes, before writing a single line of development.',
    bodyEn: `## The code is almost never the problem

A poorly scoped business application almost always ends the same way: too many secondary features, not enough depth on the core need, and a team that eventually goes back to their old spreadsheet within a few months.

Here are the five questions that avoid that outcome, to settle before developing anything.

## 1. What decision should this application let you make faster?

An application doesn’t exist to store data, but to enable a decision: approving credit, validating an order, prioritizing a service call. If the target decision isn’t clear, the application drifts into a mere data-entry tool.

## 2. Who really uses it, every day?

Not “who might use it someday,” but who opens it every morning. Designing for that specific user — their technical level, their context, their field constraints — beats designing for an average profile that doesn’t exist.

## 3. Which complete loop should ship first?

A first version shouldn’t half-cover every feature: it should fully cover a single business loop, from trigger to result. Inventory management that only handles inflow without outflow isn’t an incomplete version — it’s a tool that’s useless.

## 4. What does it already need to talk to?

An application that lives isolated from accounting, the CRM or the invoicing tool recreates exactly the problem it was supposed to solve: manual re-entry and diverging data. The necessary integrations get decided at scoping time, not at the end of the project.

## 5. Who evolves it in six months?

A business need changes. An undocumented application, built without clear architecture, becomes a burden the moment anyone other than its creator has to touch it. The question isn’t just “does it work today,” but “does it get fixed and extended easily in six months.”

## Good scoping fits on one page

Scoping that clearly answers these five questions rarely runs more than a page. That’s a good sign: the clarity of a scope shows in how simply it can be explained, not in how thick it is.`,
  },
  {
    slug: 'le-referencement-pour-les-ia-ce-qui-compte-quand-chatgpt-repond-a-votre-place',
    titleEn: 'AI search optimization: what matters when ChatGPT answers instead of you',
    categoryEn: 'Strategy', tagsEn: ['SEO', 'AI', 'Search'],
    excerptEn: 'A growing share of searches no longer go through a list of blue links, but through a directly generated answer. What that changes for a site that wants to be found — and cited — by conversational engines.',
    bodyEn: `## One search in two no longer clicks

When a user asks ChatGPT, Perplexity or the AI built into a search engine a question, they get an answer directly — sometimes without ever visiting a site. To be present in that answer, a site needs to be understood differently than the way Google understood it ten years ago.

Here’s what actually matters.

## Content needs to be readable without JavaScript

The language models powering these answers read the raw content sent by the server, not what appears after JavaScript runs in a browser. A site whose main content only exists client-side — loaded afterward by an application — is often invisible or misunderstood by these systems. Server-side rendering (SSR) isn’t just a speed question anymore: it’s a condition of existing at all.

## Structured data is worth a written explanation

JSON-LD tags — Organization, FAQPage, Article, Product — give models an explicit, unambiguous version of the information: who you are, what you offer, which questions you answer. A language model always prefers structured data over a guess made from free text. It’s the difference between “probably an agency” and “Organization, located in Cotonou, offering three named services.”

## Consistency matters more than volume

A model that finds two different versions of the same price or the same figure on a site doesn’t pick one at random: it becomes cautious, or cites the less committal piece of information. A site with ten consistent pages beats a site with a hundred pages that contradict each other.

## Verifiable content beats content that brags

Models are trained to spot promotional tone and weigh it differently from factual content. An article that explains a reasoning, a method or a technical choice is more likely to get cited than a page that stacks superlatives without backing them up.

## A new file to know: llms.txt

An emerging convention proposes that a site expose, at its root, an llms.txt file: a structured, up-to-date text summary, designed to be read directly by a language model rather than inferred from a full HTML page. It’s not a replacement for the rest — it’s an additional entry point, complementary to classic SEO.

## What doesn’t change

AI search optimization doesn’t cancel out classic SEO: both rely on the same foundations — clear content, logical structure, accurate information. The difference is that these foundations now count for two audiences at once: human visitors, and the systems answering on their behalf.`,
  },
]

async function run() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  console.log('Connecté à MongoDB.')
  let updated = 0, missing = 0
  for (const t of translations) {
    const res = await ArticleModel.updateOne({ slug: t.slug }, { $set: {
      titleEn: t.titleEn, categoryEn: t.categoryEn, tagsEn: t.tagsEn, excerptEn: t.excerptEn, bodyEn: t.bodyEn,
      readingTimeEn: readingTime(t.bodyEn),
      seoEn: { metaTitle: t.titleEn.slice(0, 70), metaDescription: t.excerptEn.slice(0, 170) },
    } })
    if (res.matchedCount) updated++; else { missing++; console.warn('Pas trouvé :', t.slug) }
  }
  console.log(`Articles : ${updated} mis à jour, ${missing} non trouvés.`)
  await mongoose.disconnect()
}
run().catch(err => { console.error(err); process.exit(1) })
