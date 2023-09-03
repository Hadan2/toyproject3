function isPassword(asValue) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
   //8 ~ 16자 영문, 숫자 조합
    return regExp.test(asValue);
  }

  function isId(asValue) {
    var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
   //영문자로 시작하는 영문자 또는 숫자 6~20자
    return regExp.test(asValue);
  }

  function isTitle(asValue) {
    var regExp = /^(?:[A-Za-z가-힣]{1,20})$/g;
   //영문자로 시작하는 영문자 또는 숫자 6~20자
    return regExp.test(asValue);
  }

  function isDate(asValue) {
    var regExp = /^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/g;
   //영문자로 시작하는 영문자 또는 숫자 6~20자
    return regExp.test(asValue);
  }

  export {isPassword, isId, isTitle, isDate};
  