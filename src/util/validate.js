/**
 * Created by wengsiqi on 2017/12/12.
 */
/* 手机号*/
export function validatMobilePhone(str) {
  var phone = /^1[3|4|5|7|8][0-9]{9}$/;//手机号
  if(phone.test(str)){
    return true
  }
  return false;
}
/* 身份证*/
export function validatIdentityCard(str) {
  var  identityCard = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;//手机号
  if(identityCard.test(str)){
    return true
  }
  return false;
}

/* 手机号 电话号码（区号）*/
export function validatePhone(str) {
  var phone = /^1[3|4|5|7|8][0-9]{9}$/;//手机号
  var telephone=/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/; //电话区号
  if(phone.test(str) || telephone.test(str)){
    return true
  }
  return false;
}
