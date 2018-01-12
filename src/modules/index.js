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

const NumberAbbreviate = () => {
  var units
  if (!(this instanceof NumberAbbreviate)) {
    // function usage: abbrev(n, decPlaces, units)
    var n = arguments[0]
    var decPlaces = arguments[1]
    units = arguments[2]
    var ab = new NumberAbbreviate(units)
    return ab.abbreviate(n, decPlaces)
  }
  // class usage: new NumberAbbreviate(units)
  units = arguments[0]
  this.units = units == null ? ['k', 'm', 'b', 't'] : units
}

NumberAbbreviate.prototype._abbreviate = function (number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces)

  for (var i = this.units.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3)

    if (size <= number) {
      number = Math.round(number * decPlaces / size) / decPlaces

      if ((number === 1000) && (i < this.units.length - 1)) {
        number = 1
        i++
      }

      number += this.units[i]

      break
    }
  }

  return number
}

NumberAbbreviate.prototype.abbreviate = function (number, decPlaces) {
  var isNegative = number < 0
  var abbreviatedNumber = this._abbreviate(Math.abs(number), decPlaces || 0)

  return isNegative ? '-' + abbreviatedNumber : abbreviatedNumber
}

export const numberAbbreviate = NumberAbbreviate
