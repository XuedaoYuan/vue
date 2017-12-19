import moment from 'moment';

Number.prototype.parseTime = function(formatter) {
  if (!this) {
    return '';
  }
  return moment(this).format(formatter);
}

Date.prototype.parseTime = function(formatter) {
  if (!this) {
    return '';
  }
  return moment(this).format(formatter);
}

String.prototype.parseTime = function(formatter) {
  if (!this) {
    return '';
  }
  return moment(Number(this)).format(formatter);
}

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '')
}
