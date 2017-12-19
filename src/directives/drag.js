(function(window, document) {
  const vueDrag = {};
  vueDrag.install = Vue => {
    // 拖拽控件
    Vue.directive('drag', {
      bind: function(el, binding) {
        let oDiv = el; //当前元素
        let self = this; //上下文


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

        var maxY = page.height / 100 * 15;

        oDiv.onmousedown = function(e) {

          if (e.layerY < 40 && e.srcElement.className == "" || e.srcElement.className == "el-dialog__header") {
            //鼠标按下，计算当前元素距离可视区的距离
            let disX = e.clientX - oDiv.offsetLeft;
            let disY = e.clientY - oDiv.offsetTop;

            document.onmousemove = function(e) {
              //通过事件委托，计算移动的距离
              let l = e.clientX - disX;
              let t = e.clientY - disY;
              // 缓变一下
              //移动当前元素
              oDiv.style.left = l + 'px';
              // oDiv.style.width = 'auto';
              // dialog有一个margin-top = 15vh
              console.log(maxY);
              if (t <= -maxY) {
                t = -maxY
              }
              oDiv.style.top = t + 'px';
              // //将此时的位置传出去
              // binding.value({x:e.pageX,y:e.pageY})
            };
            document.onmouseup = function(e) {

              document.onmousemove = null;
              document.onmouseup = null;
            };
          };
        }
      }
    });
  };
  if (typeof exports == 'object') {
    module.exports = vueDrag
  } else if (typeof define == 'function' && define.amd) {
    define([], () => vueDrag)
  } else if (window.Vue) {
    window.vueDrag = vueDrag;
    Vue.use(vueDrag)
  }
}(window, document));
