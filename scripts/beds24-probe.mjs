#!/usr/bin/env node
/**
 * Run this once, against the real account, before trusting normalise().
 *   BEDS24_REFRESH_TOKEN=... BEDS24_PROPERTY_ID=... node scripts/beds24-probe.mjs
 * It prints the raw calendar payload so you can check the field names.
 */
const BASE = 'https://api.beds24.com/v2'
const refresh = process.env.BEDS24_REFRESH_TOKEN
const propertyId = process.env.BEDS24_PROPERTY_ID
if (!refresh || !propertyId) {
  console.error('Set BEDS24_REFRESH_TOKEN and BEDS24_PROPERTY_ID first.')
  process.exit(1)
}
const auth = await fetch(`${BASE}/authentication/token`, {headers: {refreshToken: refresh}})
if (!auth.ok) { console.error('auth failed', auth.status, await auth.text()); process.exit(1) }
const {token} = await auth.json()
const start = new Date().toISOString().slice(0, 10)
const end = new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10)
const url = `${BASE}/inventory/rooms/calendar?propertyId=${propertyId}&startDate=${start}&endDate=${end}&includeNumAvail=true&includePrices=true`
const res = await fetch(url, {headers: {token, accept: 'application/json'}})
console.log(res.status)
console.log(JSON.stringify(await res.json(), null, 2).slice(0, 4000))
