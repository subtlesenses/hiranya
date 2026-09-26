import {toHTML} from '@portabletext/to-html'
import {sanityClient, isConfigured, HOME_QUERY} from './sanity'
import {seed} from './seed'

/**
 * One call, used by the page. If Sanity is not configured yet — a fresh clone,
 * or a developer working offline in Patan — the seed content is served instead
 * so the site still builds. Nothing downstream knows which it got.
 */
export async function getHomeContent() {
  if (!isConfigured) return {...seed, source: 'seed' as const}

  try {
    const d: any = await sanityClient()!.fetch(HOME_QUERY)
    if (!d?.settings) {
      console.warn('[sanity] No published house settings yet; keeping existing site content.')
      return {...seed, source: 'seed' as const}
    }
    return {
      source: 'sanity' as const,
      settings: {
        ...d.settings,
        statementHtml: toHTML(d.settings?.statement ?? []),
        hostBodyHtml: toHTML(d.settings?.hostBody ?? []),
        cafeBodyHtml: toHTML(d.settings?.cafeBody ?? []),
        said: d.settings?.said ?? seed.settings.said,
      },
      storeys: (d.storeys ?? []).map((s: any) => ({...s, bodyHtml: toHTML(s.body ?? [])})),
      rooms: d.rooms ?? [],
      calendar: d.calendar ?? [],
      quotes: d.quotes ?? [],
      whatsOn: d.whatsOn ?? [],
    }
  } catch (err) {
    console.error('[sanity] falling back to seed content:', err instanceof Error ? err.message : err)
    return {...seed, source: 'seed' as const}
  }
}
