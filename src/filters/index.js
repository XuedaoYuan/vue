import moment from 'moment';

export function parseTime2(val) {

  if (!val) {
    return '';
  }

  return moment(val).format('YYYY-MM-DD');
}

export function parseDate(val) {

  if (!val) {
    return '';
  }

  return moment(val).format('YYYY-MM-DD HH:mm:ss');
}

export function parseTime(time, cFormat) {
  if (!time) {
    // Nothing
    return null;
  }
  // 如果时间 format 则返回 2017/10/19 mbp-yhm
  if (time.toString().indexOf('-') >= 0) {
    return time;
  }

  if (arguments.length === 0) {
    return null;
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }


  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time == 'object') {
    date = time;
  } else {
    date = new Date(parseInt(time));
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}



// 包装方式
export function parsePackType(val) {
  val += '';
  switch (val) {
    case "71350010":
      return '编织袋'
      break;
    case '71350020':
      return '中兴编织袋'
      break;
    case '71350030':
      return '纸箱'
      break;
    case '71350040':
      return '托盘'
      break;
    case '71350050':
      return '其他'
      break;
    case 71350010:
      return '编织袋'
      break;
    case 71350020:
      return '中兴编织袋'
      break;
    case 71350030:
      return '纸箱'
      break;
    case 71350040:
      return '托盘'
      break;
    case 71350050:
      return '其他'
      break;
    default:
      return ''
      break;
  }
}


// 采购类型
export function parsepoGrType(val) {
  val += '';
  switch (val) {
    case "72300010":
      return '国内采购'
      break;
    case '72300020':
      return '自营进口'
      break;
    case '72300030':
      return '代理进口'
      break;
    default:
      return ''
      break;
  }
}


// 过账状态--单据状态
export function parsePoGrStatus(val) {
  if (val == '70300010') {
    return '保存';
  } else if (val == '70300020') {
    return '已过账';
  } else if (val == '70300030') {
    return '已冲销';
  } else if (val == '70300040') {
    return '已开票';
  } else if (val == '70300050') {
    return '已关闭'
  } else {
    return '';
  }
}

export function parseOperationType(val) {
  if (val == "74050010") {
    return "入库单";
  } else if (val == "74050020") {
    return "暂收单"
  } else {
    return "";
  }
}

export function parseSoRoStatus(val) {
  if (val == '71050010') {
    return '保存';
  } else if (val == '71050020') {
    return '已过账';
  } else if (val == '71050030') {
    return '已冲销'
  } else {
    return '';
  }
}
// 销退类型
export function parsePinBackType(val) {
  if (val == '72900030') {
    return '换货';
  } else if (val == '72900010') {
    return '冲销';
  } else if (val == '72900020') {
    return '退货'
  } else {
    return '';
  }
}
