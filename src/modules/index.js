export const deleteCookie = (name) => {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

export const setCookie = (cname, cvalue, exdays) => {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export const getCookie = (cname) => {
  var name = cname + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const numberToAbbreviations = (value) => {
  let suffixes = ['', 'k', 'm', 'b', 't']
  let suffixNum = Math.floor(('' + value).length / 3)
  let shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2))
  if (shortValue % 1 !== 0) {
    const shortNum = shortValue.toFixed(1) // eslint-disable-line
  }
  return shortValue + suffixes[suffixNum]
}
