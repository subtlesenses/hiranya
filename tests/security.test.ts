import assert from 'node:assert/strict'
import test from 'node:test'
import {toHTML} from '@portabletext/to-html'
import {emphasisHtml, safeLinkHref, reviewSourceHref, serializeJsonLd} from '../src/lib/security'

test('the house heading preserves exact emphasis while escaping executable markup and entities', () => {
  assert.equal(emphasisHtml('An <em>eight-room homestay</em> & a courtyard.'), 'An <em>eight-room homestay</em> &amp; a courtyard.')
  const hostile = '</h2><img src=x onerror="alert(1)"><em onclick="alert(2)">text</em><script>alert(3)</script>'
  const html = emphasisHtml(hostile)
  assert.equal(html, '&lt;/h2&gt;&lt;img src=x onerror=&quot;alert(1)&quot;&gt;&lt;em onclick=&quot;alert(2)&quot;&gt;text</em>&lt;script&gt;alert(3)&lt;/script&gt;')
  assert.equal(emphasisHtml('&lt;img src=x onerror=alert(1)&gt;'), '&amp;lt;img src=x onerror=alert(1)&amp;gt;')
  assert.equal(emphasisHtml('<EM>caps</EM><strong>bold</strong>'), '&lt;EM&gt;caps&lt;/EM&gt;&lt;strong&gt;bold&lt;/strong&gt;')
  assert.equal(emphasisHtml(null), '')
})

test('editor links reject executable, disguised and protocol-relative destinations', () => {
  for (const href of [
    'javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'java\nscript:alert(1)', 'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)', '//untrusted.example/path', '\\untrusted.example/path', '/\\untrusted.example/path',
    'https:\\untrusted.example', 'https://trusted.example@untrusted.example', 'https://user:password@example.com',
    'https://exa\tmple.com', 'https://', 'http://example.com', '', undefined, null, 42,
  ]) assert.equal(safeLinkHref(href), null, String(href))
})

test('editor links retain local navigation and valid HTTPS review destinations', () => {
  for (const href of ['#rooms', '#the-host', '/book/?room=barahi&numadult=1', '/#good-to-know', 'https://www.airbnb.com/rooms/23432174', 'https://www.booking.com/hotel/np/hiranya-guest-house.html#tab-reviews']) {
    assert.equal(safeLinkHref(href), href)
  }
  assert.equal(safeLinkHref(' https://example.com/path '), 'https://example.com/path')
})

test('review source labels only receive their matching known platform link', () => {
  assert.equal(reviewSourceHref('Airbnb'), 'https://www.airbnb.com/rooms/23432174')
  assert.equal(reviewSourceHref('Booking.com'), 'https://www.booking.com/hotel/np/hiranya-guest-house.html#tab-reviews')
  for (const source of ['Google', 'Written to us directly', 'toString', '__proto__', 'javascript:alert(1)', undefined]) {
    assert.equal(reviewSourceHref(source), null)
  }
})

test('JSON-LD cannot terminate its script element and still round-trips as JSON', () => {
  const data = {name: '</ScRiPt><script>alert(1)</script>', description: '<!-- & > \u2028\u2029', checkoutTime: '12:00'}
  const serialized = serializeJsonLd(data)
  assert.doesNotMatch(serialized, /[<>&\u2028\u2029]/)
  assert.deepEqual(JSON.parse(serialized), data)
  assert.equal(serializeJsonLd(undefined), 'null')
})

test('PortableText retains safe rich text while escaping text and filtering script links', () => {
  const html = toHTML([{
    _type: 'block', _key: 'block', style: 'normal',
    markDefs: [{_type: 'link', _key: 'bad', href: 'javascript:alert(1)'}, {_type: 'link', _key: 'good', href: 'https://www.booking.com/'}],
    children: [
      {_type: 'span', _key: 'plain', text: '<img src=x onerror=alert(1)>', marks: []},
      {_type: 'span', _key: 'bold', text: 'strong', marks: ['strong']},
      {_type: 'span', _key: 'badlink', text: 'unsafe link text', marks: ['bad']},
      {_type: 'span', _key: 'goodlink', text: 'Booking.com', marks: ['good']},
    ],
  }])
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/)
  assert.match(html, /<strong>strong<\/strong>/)
  assert.match(html, /<a href="https:\/\/www\.booking\.com\/">Booking\.com<\/a>/)
  assert.doesNotMatch(html, /javascript:|<img/)
  assert.match(html, /unsafe link text/)
})
