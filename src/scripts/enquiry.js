// Carry the selected stay into the WhatsApp enquiry page.
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
})()
