import type {APIRoute} from 'astro'
import {beds24} from '../../lib/providers/beds24'

export const prerender = false

/**
 * The only part of the site that is not static.
 *
 * The browser asks this for prices and free nights; it never talks to Beds24
 * directly, so the API credentials stay on the server and a change of channel
 * manager never reaches the front end. Cached for five minutes at the edge:
 * long enough to absorb a burst, short enough that a room sold on Airbnb this
 * morning is gone from the site before lunch.
 */
export const GET: APIRoute = async ({url}) => {
  const checkIn = url.searchParams.get('checkIn')
  const checkOut = url.searchParams.get('checkOut')

  try {
    const rooms = checkIn && checkOut ? await beds24.getAvailability(checkIn, checkOut) : await beds24.getLeadPrices()

    return new Response(JSON.stringify({ok: true, checkIn, checkOut, rooms}), {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (err) {
    // A calendar outage must never take the website down. The page keeps its
    // published copy and hides the price line.
    console.error('[availability]', err)
    return new Response(JSON.stringify({ok: false, rooms: []}), {
      status: 200,
      headers: {'content-type': 'application/json', 'cache-control': 'no-store'},
    })
  }
}
