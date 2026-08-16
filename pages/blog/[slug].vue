<template><div v-if="article"><article><PageHero :kicker="`${lf(article.category,article.categoryEn)} · ${lf(article.readingTime,article.readingTimeEn)} ${$t('card.min')}`" :description="lf(article.excerpt,article.excerptEn)">{{ lf(article.title,article.titleEn) }}</PageHero><div class="container-shell py-16 lg:py-24"><img v-if="coverUrl" :src="coverUrl" :alt="lf(article.title,article.titleEn)" class="mx-auto mb-12 max-w-3xl rounded-2xl object-cover shadow-[var(--elev-3)]"/><div class="prose-novatrix mx-auto max-w-3xl" v-html="html"/></div></article><CtaBand/></div></template>
<script setup lang="ts">
import { demoArticles } from '~/shared/demo'
import type { PublicArticle } from '~/shared/types'
const { locale } = useI18n()
const lf = useLocaleField()
const route=useRoute(),fallback=demoArticles.find(a=>a.slug===route.params.slug)
const {data:article}=await useFetch<PublicArticle>(`/api/articles/${route.params.slug}`,{default:()=>fallback as PublicArticle})
if(!article.value)throw createError({statusCode:404,statusMessage:locale.value==='en'?'Article not found':'Article introuvable'})
const localizedSeoTitle=computed(()=>lf(article.value!.seo?.metaTitle,article.value!.seoEn?.metaTitle)||lf(article.value!.title,article.value!.titleEn))
const localizedSeoDesc=computed(()=>lf(article.value!.seo?.metaDescription,article.value!.seoEn?.metaDescription)||lf(article.value!.excerpt,article.value!.excerptEn))
const cld=useCloudinaryUrl()
const coverUrl=computed(()=>cld(article.value?.coverImageKey,'w_1200,h_675,c_fill'))
const ogImageUrl=computed(()=>coverUrl.value||(article.value?.seo?.ogImage?`${useRuntimeConfig().public.siteUrl}${article.value.seo.ogImage}`:''))
useSeoMeta({ title: () => localizedSeoTitle.value, description: () => localizedSeoDesc.value, ogImage: () => ogImageUrl.value || undefined })
const html=computed(()=>useSafeMarkdown(lf(article.value?.body,article.value?.bodyEn)||''))
const site=useRuntimeConfig().public.siteUrl
useHead(computed(()=>({script:[{type:'application/ld+json',children:JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:lf(article.value!.title,article.value!.titleEn),description:lf(article.value!.excerpt,article.value!.excerptEn),inLanguage:locale.value,image:ogImageUrl.value?[ogImageUrl.value]:undefined,datePublished:article.value!.publishedAt,dateModified:article.value!.publishedAt,articleSection:lf(article.value!.category,article.value!.categoryEn),keywords:lf(article.value!.tags,article.value!.tagsEn)?.join(', ')||undefined,wordCount:(lf(article.value!.body,article.value!.bodyEn)||'').split(/\s+/).length,mainEntityOfPage:{'@type':'WebPage','@id':`${site}/blog/${article.value!.slug}`},author:{'@type':'Organization',name:'NovatrixAI',url:site},publisher:{'@type':'Organization',name:'NovatrixAI',logo:{'@type':'ImageObject',url:`${site}/favicon-192x192.png`}}})}]})))
</script>
