/**
 * Fills in prices and sold-out states from the live calendar.
 *
 * The page ships with no prices in the HTML at all. That is deliberate: a price
 * baked at build time is a price that can be wrong, and a wrong price on a
 * hotel site is a complaint at the front desk. If the calendar is unreachable
 * the price line simply stays hidden and the booking button still works.
 */
(function () {
  var fmt = new Intl.NumberFormat('en-NP')

  function paint(rooms) {
    rooms.forEach(function (r) {
      var el = document.querySelector('[data-room="' + r.channelRoomId + '"]')
      if (!el) return
      var price = el.querySelector('[data-price]')
      var state = el.querySelector('[data-state]')
      if (price && r.fromPrice) {
        price.textContent = 'NPR ' + fmt.format(r.fromPrice)
        price.hidden = false
      }
      if (state) {
        state.textContent = r.available ? '' : 'No nights left'
        el.classList.toggle('is-sold', !r.available)
      }
    })
  }

  function load(checkIn, checkOut) {
    var qs = checkIn && checkOut ? '?checkIn=' + checkIn + '&checkOut=' + checkOut : ''
    fetch('/api/availability.json' + qs)
      .then(function (r) { return r.json() })
      .then(function (d) { if (d.ok) paint(d.rooms) })
      .catch(function () { /* calendar down: leave the page as published */ })
  }

  load()

  var form = document.getElementById('avail-form')
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      load(document.getElementById('ci').value, document.getElementById('co').value)
      document.getElementById('rooms').scrollIntoView({behavior: 'smooth'})
    })
  }
})()
