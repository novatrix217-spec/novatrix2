<template>
  <div class="dashboard-proof">
    <div class="dashboard-proof-head">
      <span class="dashboard-proof-badge"><BarChart3 class="h-4 w-4"/>{{ t.badge }}</span>
      <span class="dashboard-proof-period">{{ period }}</span>
    </div>

    <div class="dashboard-proof-metrics">
      <div class="dashboard-metric" style="--metric-accent: var(--primary)">
        <p class="dashboard-metric-value">{{ prospects }}</p>
        <p class="dashboard-metric-label">{{ t.prospects }}</p>
      </div>
      <div class="dashboard-metric" style="--metric-accent: #C2410C">
        <p class="dashboard-metric-value">{{ purchases }}</p>
        <p class="dashboard-metric-label">{{ t.purchases }}</p>
      </div>
      <div class="dashboard-metric" style="--metric-accent: #15803D">
        <p class="dashboard-metric-value">{{ revenue }}</p>
        <p class="dashboard-metric-label">{{ t.revenue }}</p>
      </div>
      <div class="dashboard-metric" style="--metric-accent: #166534">
        <p class="dashboard-metric-value">{{ roi }}</p>
        <p class="dashboard-metric-label">{{ t.roi }}</p>
      </div>
    </div>

    <div class="dashboard-proof-table" role="table" :aria-label="t.tableLabel">
      <div class="dashboard-table-row dashboard-table-head" role="row">
        <span role="columnheader">{{ t.month }}</span>
        <span role="columnheader">{{ t.prospectsShort }}</span>
        <span role="columnheader">{{ t.purchasesShort }}</span>
        <span role="columnheader">{{ t.revenueShort }}</span>
      </div>
      <div v-for="row in rows" :key="row.month" class="dashboard-table-row" role="row">
        <span role="cell">{{ row.month }}</span>
        <span role="cell">{{ row.prospects }}</span>
        <span role="cell">{{ row.purchases }}</span>
        <span role="cell">{{ row.revenue }}</span>
      </div>
      <div class="dashboard-table-row dashboard-table-total" role="row">
        <span role="cell">{{ t.total }}</span>
        <span role="cell">{{ totalProspects }}</span>
        <span role="cell">{{ totalPurchases }}</span>
        <span role="cell">{{ totalRevenue }}</span>
      </div>
    </div>

    <p class="dashboard-proof-note">{{ t.note }}</p>
  </div>
</template>
<script setup lang="ts">
import { BarChart3 } from 'lucide-vue-next'

// Reproduction stylisée d'un dashboard client réel (CRM automatisé pour une agence
// partenaire), pas une capture d'écran : mêmes chiffres, présentés dans le design du site.
// Client anonymisé à sa demande — cf. brief preuve résultats 2026-09-14.
const props = defineProps<{
  period: string
  prospects: string
  purchases: string
  revenue: string
  roi: string
  rows: { month: string; prospects: string; purchases: string; revenue: string }[]
  totalProspects: string
  totalPurchases: string
  totalRevenue: string
}>()

const { locale } = useI18n()
const t = computed(() => locale.value === 'en' ? {
  badge: 'client CRM dashboard', tableLabel: 'Monthly recap',
  prospects: 'Prospects', purchases: 'Purchases', revenue: 'Total revenue', roi: 'Total ROI',
  month: 'Month', prospectsShort: 'Prospects', purchasesShort: 'Purchases', revenueShort: 'Revenue', total: 'Total',
  note: 'Real figures from an agency partner\'s CRM, automated by NovatrixAI. Client kept anonymous at their request.',
} : {
  badge: 'tableau de bord CRM client', tableLabel: 'Récapitulatif mensuel',
  prospects: 'Prospects', purchases: 'Achats', revenue: 'CA total', roi: 'ROI total',
  month: 'Mois', prospectsShort: 'Prospects', purchasesShort: 'Achats', revenueShort: 'CA', total: 'Total',
  note: 'Chiffres réels issus du CRM d\'une agence partenaire, automatisé par NovatrixAI. Client anonymisé à sa demande.',
})
</script>
<style scoped>
.dashboard-proof {
  border-radius: 1.25rem;
  border: 1px solid var(--border-subtle);
  background: var(--surface);
  padding: 1.75rem;
  box-shadow: var(--elev-2);
}
.dashboard-proof-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
}
.dashboard-proof-badge {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  padding: .4rem .9rem;
  font-size: .7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .04em;
}
.dashboard-proof-period {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: .75rem;
  color: var(--muted);
}
.dashboard-proof-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: .9rem;
  margin-top: 1.5rem;
}
@media (min-width: 640px) {
  .dashboard-proof-metrics { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
.dashboard-metric {
  border-radius: .9rem;
  border: 1px solid var(--border-subtle);
  border-top: 3px solid var(--metric-accent);
  background: var(--bg-elevated);
  padding: 1rem 1.1rem;
}
.dashboard-metric-value {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--metric-accent);
}
.dashboard-metric-label {
  margin-top: .25rem;
  font-size: .75rem;
  color: var(--muted);
}
.dashboard-proof-table {
  margin-top: 1.75rem;
  border-radius: .9rem;
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}
.dashboard-table-row {
  display: grid;
  grid-template-columns: 1.2fr repeat(3, 1fr);
  gap: .5rem;
  padding: .65rem 1rem;
  font-size: .8rem;
}
.dashboard-table-row:nth-child(even):not(.dashboard-table-total) { background: var(--surface-soft); }
.dashboard-table-head {
  background: var(--ink);
  color: #fff;
  font-weight: 700;
  font-size: .7rem;
  text-transform: uppercase;
  letter-spacing: .03em;
}
.dashboard-table-total {
  font-weight: 800;
  border-top: 1px solid var(--border-subtle);
}
.dashboard-table-row > span:not(:first-child) { text-align: right; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.dashboard-proof-note {
  margin-top: 1.25rem;
  font-size: .75rem;
  line-height: 1.5;
  color: var(--muted);
}
</style>
