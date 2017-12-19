/**
 * ============================
 * @Author: Xuedao Yuan
 * @DateTime: 2017-11-17
 * ============================
 */

export function getSubMenuIndex(str) {
  var b = str.split('/');
  var c = '';
  for (var i = 0, len = b.length; i < len - 2; i++) {
    if (i == 0) {
      c += b[i];
    } else {
      c += '/' + b[i];
    }

  }

  return c;
}


export function getPageSize() {
  var page = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  if (typeof page.width != "number") {
    if (document.compatMode == 'CSS1Compat') {
      page.width = document.documentElement.clientWidth;
      page.height = document.documentElement.clientHeight;
    } else {
      page.width = document.body.clientWidth;
      page.height = document.body.clientHeight;
    }
  }
  return page;
}

export function trim(str) {
  return str.replace(/^\s+|\s+$/g, '')
}








