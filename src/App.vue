<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  mounted() {
    eventBus.$on('headersChange', (vm) => {
      console.log(vm);
      vm.reRender = false;
      vm.headers[2] = [vm.headers[3], vm.headers[3] = vm.headers[2]][0]
      setTimeout(() => {
        vm.reRender = true;
      }, 50);

    });
  }
}

$(document).on('keydown', (e) => {
  e = e || window.event;
  var keyCode = e.which ? e.which : e.keyCode;
  if (keyCode == 9 && $(e.target).parents('.common-table').length > 0) {
    eventBus.$emit('tabKeyToggle', e);
  }
});

$(document).on('keyup', (e) => {
  // e = e || window.event;
  // var keyCode = e.which ? e.which : e.keyCode;
  // if (keyCode == 9 && $(e.target).parents('.common-table').length > 0) {
  eventBus.$emit('valueChange', e);
  // }
});


$(document).on('mouseup', () => {
  let val = true;
  // console.log('document-mouseup');
  eventBus.$emit('changeTrigger', val);
});


// $(document).on('keyup', (e)=>{
//   $(document).unbind('keydown');
// });


// $(document).mousemove((event) => {
//   // console.log(e)
//   var e = event || window.event;
//   var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
//   var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
//   var x = e.pageX || e.clientX + scrollX;
//   var y = e.pageY || e.clientY + scrollY;
//   console.log('x: ' , x , '\ny: ' , y);
//   // return { 'x': x, 'y': y };
// });

</script>
<style>
#app {
  font-family: '微软雅黑';
  /*-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;*/
}

</style>
