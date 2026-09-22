// Lead prices are indicative; Beds24 validates the stay and confirms reservations.
(function () {
  var form = document.getElementById('avail-form')
  var ci = document.getElementById('ci'), co = document.getElementById('co')
  var guests = document.getElementById('gs')
  function sync() {
    co.setCustomValidity(co.value && ci.value && co.value <= ci.value ? 'Choose a departure after arrival.' : '')
    document.querySelectorAll('[data-booking]').forEach(function (a) {
      var url = new URL(a.href)
      if (ci.value && co.value > ci.value) {
        url.searchParams.set('checkin', ci.value)
        url.searchParams.set('numnight', String(Math.round((Date.parse(co.value) - Date.parse(ci.value)) / 86400000)))
      } else {
        url.searchParams.delete('checkin'); url.searchParams.delete('numnight')
      }
      url.searchParams.set('numadult', guests.value)
      a.href = url.href
    })
  }
  if (form) {
    form.addEventListener('input', sync)
    form.addEventListener('change', sync)
    form.addEventListener('submit', function(e) { sync(); if (!form.reportValidity()) e.preventDefault() })
    sync()
  }
  fetch('/api/availability.json')
    .then(function(r) { if (!r.ok) throw new Error('Unavailable'); return r.json() })
    .then(function(d) {
      if (!d.ok || !Array.isArray(d.rooms)) return
      d.rooms.forEach(function(r) {
        if (!/^\d+$/.test(r.channelRoomId)) return
        document.querySelectorAll('[data-room="' + r.channelRoomId + '"]').forEach(function(el) {
          var price = el.querySelector('[data-price]'), state = el.querySelector('[data-state]')
          if (price && Number.isFinite(r.fromPrice) && r.fromPrice > 0 && r.currency === 'USD') {
            price.textContent = 'From ' + new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',currencyDisplay:'code'}).format(r.fromPrice)
            price.hidden = false
            if (state) state.textContent = ''
          }
        })
      })
    }).catch(function() { /* Booking links remain usable if indicative prices fail. */ })
})()
