// // import { getPackageNumber } from 'utils';//时间

// ;(function() {
//     const vueNumberOnly = {};
//     vueNumberOnly.install = Vue => {
//         // 正负数 整数 小数 整形
//         Vue.directive('numberOnly', {
//             bind: function(el, binding, vNode) {
//                 var _dc_ = binding.value;
//                 // 根据包装单位 判断小数位数
//                 if(binding.value){
//                     if(Number.isInteger(binding.value)){
//                         // Nothing
//                     } else{
//                         // _dc_=getPackageNumber(binding.value) || 0;
//                     }
//                 }
//                 // if (!_dc_) {
//                 //     return;
//                 // }
//                 var _ic_ = binding.arg;
//                 var _abs_ = binding.modifiers || {};
//                 var ___decimal_count___ = _dc_ == 0 ? 0 : _dc_ || 4;
//                 var ___int_count___ = _ic_ < 1 ? 1 : _ic_ || 10;
//                 var init_value = el.__vue__.value;
//                 var oDiv = el; //当前元素
//                 var self = this; //上下文

//                 el.inputHandler = (e) => {

//                     // const input = e.target;
//                     // if (input.value === '') {
//                     //     input.value = input._num_value = "";
//                     // } else if (input.pattern) {
//                     //     if (!input.value.match(new RegExp(input.pattern))) {
//                     //         if ((input.value.indexOf('-') <= 1 && input.value.indexOf('-') != -1) || input.value == '-') {
//                     //             console.log(111);
//                     //             input.value = '-';
//                     //         } else {
//                     //             input.value = input._num_value;
//                     //         }
//                     //     } else {
//                     //         input._num_value = input.value;
//                     //         const dotIndex = input.value.indexOf('.');
//                     //         if (___decimal_count___ == 0) {
//                     //             input.value = Number(input.value).toString();
//                     //             input.value = input.value.split('.')[0];
//                     //             input._num_value = input.value;
//                     //         } else {
//                     //             if (dotIndex != -1) {
//                     //                 if (dotIndex !== input.value.length - 1) {
//                     //                     // input.value = Number(input.value).toString();
//                     //                 }
//                     //             } else {
//                     //                 input.value = Number(input.value).toString();
//                     //             }
//                     //         }
//                     //
//                     //     }
//                     // }

//                     const input = e.target;
//                     if (___decimal_count___ == 0) {//整数
//                         var regExp = '';
//                         if (_abs_.abs) {
//                             regExp = "^[0-9]?\\d{0," + ___int_count___ + "}$";
//                         }else {
//                             regExp = "^[\\+\\-]?\\d{0," + ___int_count___ + "}$";
//                         }
//                         if (!e.target.value.match(new RegExp(regExp))) {
//                             if(e.target.o_value){
//                                 e.target.value = e.target.o_value;
//                             }else {
//                                 e.target.value = init_value;
//                             }
//                         } else {
//                             if (e.target.value.match(/^\.\d+$/)) e.target.value = 0 + e.value;
//                             if (e.target.value.match(/^\.$/)) e.target.value = 0;
//                             e.target.o_value = e.target.value;
//                         }
//                         // if (e.target.value.length == 0) e.target.value = 0;
//                     } else {//小数
//                         var regExp = '';
//                         if (_abs_.abs) {
//                             regExp = "^(?:[0-9]?\\d{0," + ___int_count___ + "}(?:\\.\\d{0," + ___decimal_count___ + "})?|\\.\\d{0," + ___decimal_count___ + "}?)?$";
//                         }else {
//                             regExp = "^(?:[\\+\\-]?\\d{0," + ___int_count___ + "}(?:\\.\\d{0," + ___decimal_count___ + "})?|\\.\\d{0," + ___decimal_count___ + "}?)?$";
//                         }
//                         if (!e.target.value.match(new RegExp(regExp))) {
//                             if(e.target.o_value){
//                                 e.target.value = e.target.o_value;
//                             }else {
//                                 e.target.value = init_value;
//                             }
//                         } else {
//                             if (e.target.value.match(/^\.\d+$/)) e.target.value = 0 + e.target.value;
//                             if (e.target.value.match(/^\.$/)) e.target.value = 0;
//                             e.target.o_value = e.target.value;
//                         }
//                         // if (e.target.value.length == 0) e.target.value = 0;
//                     }
//                     if (e.target.value.indexOf("+") == 0) {
//                         if (e.target.value.length == 1) {
//                             e.target.value.length == 0;
//                         } else {
//                             e.target.value = e.target.value.substring(1)
//                         }
//                     }
//                     if (e.target.value.match(/^-?(0|[1-9]\d*)(\.\d+)?$/)) {

//                     } else {
//                         if(e.target.value
//                             && !(e.target.value.indexOf("-") == 0  && e.target.value.length == 1)
//                             && e.target.value.indexOf(".") != e.target.value.length -1){
//                             if (e.target.value.indexOf("-00") == 0) {
//                                 e.target.value = '-' + Number(e.target.value);
//                             } else {
//                                 e.target.value = Number(e.target.value);
//                             }
//                         }
//                     }



//                     input.value = e.target.value;
//                     // alert(input.value)
//                     if (input.vNode) {
//                         input.vNode.componentInstance.setCurrentValue(input.value);
//                         if (input.vNode.data.model) {
//                             input.vNode.data.model.callback(input.value);
//                         }
//                     }
//                 };

//                 $("input[type='text']", oDiv).each((e, input) => {
//                     input.pattern = "^-?[0-9]{1," + ___int_count___ + "}(\\.[0-9]{0," + ___decimal_count___ + "})?$";
//                     input._num_value = Number(init_value) || 0;
//                     input.vNode = vNode;
//                     $(input).on("input", el.inputHandler);
//                 });

//                 /*
//                 el.handler = function (e) {
//                     // if (!e.target.value.match(/^[\+\-]?\d*?\.?\d*?$/)) e.target.value = e.target.t_value; else e.target.t_value = e.target.value;
//                     // if (e.target.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) e.target.o_value = e.target.value;
//                     // if(e.target.value == 'undefined' || e.target.value == 'null'){
//                     //     e.target.value = null;
//                     // }
//                     const newValue = e.target.value;
//                     if (___decimal_count___ == 0) {//整数
//                         if (!newValue.match(new RegExp("^[\\+\\-]?\\d{0," + ___int_count___ + "}$"))) {
//                             setTimeout(function () {
//                                 if(e.target.t_value){
//                                     e.target.value = e.target.t_value;
//                                 }else {
//                                     e.target.value = init_value;
//                                 }
//                             }, 1);
//                             e.preventDefault();
//                             return false;
//                         } else {
//                             e.target.t_value = e.target.value;
//                         }
//                         if (newValue.match(new RegExp("^[\\+\\-]?\\d{0," + ___int_count___ + "}$"))) {
//                             e.target.o_value = e.target.value;
//                         }
//                     } else {//小数
//                         if (!newValue.match(new RegExp("^(?:[\\+\\-]?\\d{0," + ___int_count___ + "}(?:\\.\\d{0," + ___decimal_count___ + "})?|\\.\\d{0," + ___decimal_count___ + "}?)?$"))) {
//                             setTimeout(function () {
//                                 if(e.target.t_value){
//                                     e.target.value = e.target.t_value;
//                                 }else {
//                                     e.target.value = init_value;
//                                 }
//                             }, 1);
//                             e.preventDefault();
//                             return false;
//                         } else {
//                             e.target.t_value = e.target.value;
//                         }
//                         if (newValue.match(new RegExp("^(?:[\\+\\-]?\\d{0," + ___int_count___ + "}(?:\\.\\d{0," + ___decimal_count___ + "})?)?$"))) {
//                             e.target.o_value = e.target.value;
//                         }
//                     }

//                 }.bind(this);


//                 oDiv.addEventListener('input', el.handler);

//                 oDiv.firstElementChild.handler = function (e) {
//                     if (___decimal_count___ == 0) {//整数
//                         if (!e.target.value.match(new RegExp("^[\\+\\-]?\\d{0," + ___int_count___ + "}$"))) {
//                             if(e.target.o_value){
//                                 e.target.value = e.target.o_value;
//                             }else {
//                                 e.target.value = init_value;
//                             }
//                         } else {
//                             if (e.target.value.match(/^\.\d+$/)) e.target.value = 0 + e.value;
//                             if (e.target.value.match(/^\.$/)) e.target.value = 0;
//                             e.target.o_value = e.target.value;
//                         }
//                         if (e.target.value.length == 0) e.target.value = 0;
//                     } else {//小数
//                         if (!e.target.value.match(new RegExp("^(?:[\\+\\-]?\\d{0," + ___int_count___ + "}(?:\\.\\d{0," + ___decimal_count___ + "})?|\\.\\d{0," + ___decimal_count___ + "}?)?$"))) {
//                             if(e.target.o_value){
//                                 e.target.value = e.target.o_value;
//                             }else {
//                                 e.target.value = init_value;
//                             }
//                         } else {
//                             if (e.target.value.match(/^\.\d+$/)) e.target.value = 0 + e.target.value;
//                             if (e.target.value.match(/^\.$/)) e.target.value = 0;
//                             e.target.o_value = e.target.value;
//                         }
//                         if (e.target.value.length == 0) e.target.value = 0;
//                     }
//                     if (e.target.value.indexOf("+") == 0) {
//                         if (e.target.value.length == 1) {
//                             e.target.value.length == 0;
//                         } else {
//                             e.target.value = e.target.value.substring(1)
//                         }
//                     }
//                 }.bind(this);
//                 oDiv.firstElementChild.addEventListener('blur', oDiv.firstElementChild.handler);
//                 */
//             },
//             // update: function(el, ) {

//             // },
//             unbind: function(el, binding) {
//                 var oDiv = el; //当前元素
//                 var self = this; //上下文
//                 //el.removeEventListener('input', el.handler);
//                 $("input", el).off("input", el.inputHandler);
//             }
//         });
//     };
//     if (typeof exports == 'object') {
//         module.exports = vueNumberOnly
//     } else if (typeof define == 'function' && define.amd) {
//         define([], () => vueNumberOnly)
//     } else if (window.Vue) {
//         window.vueNumberOnly = vueNumberOnly;
//         Vue.use(vueNumberOnly)
//     }


// })();
// export default vueNumberOnly
//

export function vueNumberOnly(Vue) {
         // 正负数 整数 小数 整形
       Vue.directive('numberOnly', {
            bind: function(el, binding, vNode) {
                var _dc_ = binding.value;
                // 根据包装单位 判断小数位数
                if(binding.value){
                    if(Number.isInteger(binding.value)){
                        // Nothing
                    } else{
                        _dc_=getPackageNumber(binding.value) || 0;
                    }
                }
                // if (!_dc_) {
                //     return;
                // }
                var _ic_ = binding.arg;
                var _abs_ = binding.modifiers || {};
                var ___decimal_count___ = _dc_ == 0 ? 0 : _dc_ || 4;
                var ___int_count___ = _ic_ < 1 ? 1 : _ic_ || 10;
                var init_value = el.__vue__.value || '';
                var oDiv = el; //当前元素
                var self = this; //上下文

                el.inputHandler = (e) => {

                    // const input = e.target;
                    // if (input.value === '') {
                    //     input.value = input._num_value = "";
                    // } else if (input.pattern) {
                    //     if (!input.value.match(new RegExp(input.pattern))) {
                    //         if ((input.value.indexOf('-') <= 1 && input.value.indexOf('-') != -1) || input.value == '-') {
                    //             console.log(111);
                    //             input.value = '-';
                    //         } else {
                    //             input.value = input._num_value;
                    //         }
                    //     } else {
                    //         input._num_value = input.value;
                    //         const dotIndex = input.value.indexOf('.');
                    //         if (___decimal_count___ == 0) {
                    //             input.value = Number(input.value).toString();
                    //             input.value = input.value.split('.')[0];
                    //             input._num_value = input.value;
                    //         } else {
                    //             if (dotIndex != -1) {
                    //                 if (dotIndex !== input.value.length - 1) {
                    //                     // input.value = Number(input.value).toString();
                    //                 }
                    //             } else {
                    //                 input.value = Number(input.value).toString();
                    //             }
                    //         }
                    //
                    //     }
                    // }

                    const input = e.target;
                    if (___decimal_count___ == 0) {//整数
                        let regExp = '';
                        if (_abs_.abs) {
                            regExp = "^[0-9]?\\d{0," + ___int_count___ + "}$";
                        }else {
                            regExp = "^[\\+\\-]?\\d{0," + ___int_count___ + "}$";
                        }
                        if (!e.target.value.match(new RegExp(regExp))) {
                            if(e.target.o_value){
                                e.target.value = e.target.o_value;
                            }else {
                                e.target.value = init_value;
                            }
                        } else {
                            if (e.target.value.match(/^\.\d+$/)) e.target.value = 0 + e.value;
                            if (e.target.value.match(/^\.$/)) e.target.value = 0;
                            e.target.o_value = e.target.value;
                        }
                        // if (e.target.value.length == 0) e.target.value = 0;
                    } else {//小数
                        let regExp = '';
                        if (_abs_.abs) {
                            regExp = "^(?:[0-9]?\\d{0," + ___int_count___ + "}(?:\\.\\d{0," + ___decimal_count___ + "})?|\\.\\d{0," + ___decimal_count___ + "}?)?$";
                        }else {
                            regExp = "^(?:[\\+\\-]?\\d{0," + ___int_count___ + "}(?:\\.\\d{0," + ___decimal_count___ + "})?|\\.\\d{0," + ___decimal_count___ + "}?)?$";
                        }
                        console.log('regExp',regExp);
                        if (!e.target.value.match(new RegExp(regExp))) {
                            if(e.target.o_value){
                                e.target.value = e.target.o_value;
                            }else {
                                e.target.value = init_value;
                            }
                        } else {
                            if (e.target.value.match(/^\.\d+$/)) e.target.value = 0 + e.target.value;
                            if (e.target.value.match(/^\.$/)) e.target.value = 0;
                            e.target.o_value = e.target.value;
                        }
                        // if (e.target.value.length == 0) e.target.value = 0;
                    }
                    if (e.target.value.indexOf("+") == 0) {
                        if (e.target.value.length == 1) {
                            e.target.value.length == 0;
                        } else {
                            e.target.value = e.target.value.substring(1)
                        }
                    }
                    if (e.target.value.match(/^-?(0|[1-9]\d*)(\.\d+)?$/)) {

                    } else {
                        if(e.target.value
                            && !(e.target.value.indexOf("-") == 0  && e.target.value.length == 1)
                            && e.target.value.indexOf(".") != e.target.value.length -1){
                            if (e.target.value.indexOf("-00") == 0) {
                                e.target.value = '-' + Number(e.target.value);
                            } else {
                                e.target.value = Number(e.target.value);
                            }
                        }
                    }



                    input.value = e.target.value;
                    // alert(input.value)
                    if (input.vNode) {
                        input.vNode.componentInstance.setCurrentValue(input.value);
                        if (input.vNode.data.model) {
                            input.vNode.data.model.callback(input.value);
                        }
                    }
                };

                $("input[type='text']", oDiv).each((e, input) => {
                    input.pattern = "^-?[0-9]{1," + ___int_count___ + "}(\\.[0-9]{0," + ___decimal_count___ + "})?$";
                    input._num_value = Number(init_value) || 0;
                    input.vNode = vNode;
                    $(input).on("input", el.inputHandler);
                });

                /*
                el.handler = function (e) {
                    // if (!e.target.value.match(/^[\+\-]?\d*?\.?\d*?$/)) e.target.value = e.target.t_value; else e.target.t_value = e.target.value;
                    // if (e.target.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) e.target.o_value = e.target.value;
                    // if(e.target.value == 'undefined' || e.target.value == 'null'){
                    //     e.target.value = null;
                    // }
                    const newValue = e.target.value;
                    if (___decimal_count___ == 0) {//整数
                        if (!newValue.match(new RegExp("^[\\+\\-]?\\d{0," + ___int_count___ + "}$"))) {
                            setTimeout(function () {
                                if(e.target.t_value){
                                    e.target.value = e.target.t_value;
                                }else {
                                    e.target.value = init_value;
                                }
                            }, 1);
                            e.preventDefault();
                            return false;
                        } else {
                            e.target.t_value = e.target.value;
                        }
                        if (newValue.match(new RegExp("^[\\+\\-]?\\d{0," + ___int_count___ + "}$"))) {
                            e.target.o_value = e.target.value;
                        }
                    } else {//小数
                        if (!newValue.match(new RegExp("^(?:[\\+\\-]?\\d{0," + ___int_count___ + "}(?:\\.\\d{0," + ___decimal_count___ + "})?|\\.\\d{0," + ___decimal_count___ + "}?)?$"))) {
                            setTimeout(function () {
                                if(e.target.t_value){
                                    e.target.value = e.target.t_value;
                                }else {
                                    e.target.value = init_value;
                                }
                            }, 1);
                            e.preventDefault();
                            return false;
                        } else {
                            e.target.t_value = e.target.value;
                        }
                        if (newValue.match(new RegExp("^(?:[\\+\\-]?\\d{0," + ___int_count___ + "}(?:\\.\\d{0," + ___decimal_count___ + "})?)?$"))) {
                            e.target.o_value = e.target.value;
                        }
                    }

                }.bind(this);

              
                oDiv.addEventListener('input', el.handler);

                oDiv.firstElementChild.handler = function (e) {
                    if (___decimal_count___ == 0) {//整数
                        if (!e.target.value.match(new RegExp("^[\\+\\-]?\\d{0," + ___int_count___ + "}$"))) {
                            if(e.target.o_value){
                                e.target.value = e.target.o_value;
                            }else {
                                e.target.value = init_value;
                            }
                        } else {
                            if (e.target.value.match(/^\.\d+$/)) e.target.value = 0 + e.value;
                            if (e.target.value.match(/^\.$/)) e.target.value = 0;
                            e.target.o_value = e.target.value;
                        }
                        if (e.target.value.length == 0) e.target.value = 0;
                    } else {//小数
                        if (!e.target.value.match(new RegExp("^(?:[\\+\\-]?\\d{0," + ___int_count___ + "}(?:\\.\\d{0," + ___decimal_count___ + "})?|\\.\\d{0," + ___decimal_count___ + "}?)?$"))) {
                            if(e.target.o_value){
                                e.target.value = e.target.o_value;
                            }else {
                                e.target.value = init_value;
                            }
                        } else {
                            if (e.target.value.match(/^\.\d+$/)) e.target.value = 0 + e.target.value;
                            if (e.target.value.match(/^\.$/)) e.target.value = 0;
                            e.target.o_value = e.target.value;
                        }
                        if (e.target.value.length == 0) e.target.value = 0;
                    }
                    if (e.target.value.indexOf("+") == 0) {
                        if (e.target.value.length == 1) {
                            e.target.value.length == 0;
                        } else {
                            e.target.value = e.target.value.substring(1)
                        }
                    }
                }.bind(this);
                oDiv.firstElementChild.addEventListener('blur', oDiv.firstElementChild.handler);
                */
            },
            // update: function(el, ) {

            // },
            unbind: function(el, binding) {
                let oDiv = el; //当前元素
                let self = this; //上下文
                //el.removeEventListener('input', el.handler);
                $("input", el).off("input", el.inputHandler);
            }
        });
}
