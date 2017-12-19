<template>
	<div class="content">
    <img src="../../assets/btn_up.png" @click="show2 = !show2" class="btn-up" v-show="show2">
    <img src="../../assets/btn_down.png" @click="show2 = !show2" class="btn-up" v-show="!show2">
    <el-collapse-transition>
      <nav-bar v-show="show2"></nav-bar>
    </el-collapse-transition>
		<!-- <el-col :span="4"> -->
    <img src="../../assets/btn_left.png" @click="show1 = !show1" class="btn-right" v-show="show1">
    <img src="../../assets/btn_right.png" @click="show1 = !show1" class="btn-right" v-show="!show1">
    <section :class='{menu:show1,menu2:!show1,fixed1:show2,fixed2:!show2}' @mouseenter="enter" @mouseleave="out" >
			<side-menu :isCollapse="isCollapse"></side-menu>
		</section>
		<section :class="{main1:(show1||show3),main2:(!show1&&!show3)}">
			<tab-bar></tab-bar>
			<router-view></router-view>
		</section>
		<!-- </el-col> -->
		<!-- <el-col :span="20"> -->

		<!-- </el-col> -->
	</div>
</template>
<script>
import { NavBar, SideMenu, AppMain, TabBar } from './'

export default {
	name: 'Layout',
	components: {
		NavBar,
		SideMenu,
		AppMain,
		TabBar
	},
	data() {
		return {
      show1:true,
      show2:true,
      show3:false,
      isCollapse:[]
		}
	},
  methods: {
    enter: function(){
      this.show3 = true;
    },
    out: function(){
      this.show3 = false;
    }
  },
  watch:{
    show3:function (val) {
      if(!val&&!this.show1){
          this.isCollapse=[];
      }
    },
    show1:function (val) {
      if(!val){
          this.isCollapse=[];
      }
    }
  }

}

</script>

<style lang="scss">
	.content {
		min-width: 1250px;
		max-width: 1920px;
		margin: 0 auto;
	}

  .main1 {
    width: calc(100% - 190px);
    float: left;
    min-width: 1060px;
    transition: .3s width;
    transition-timing-function: ease-in-out;
  }
  .main2 {
    width: calc(100% - 48px);
    float: left;
    min-width: 1060px;
    transition: .3s width;
    transition-timing-function: ease-in-out;
  }
  .main3{
    width: calc(100% - 190px);
    transition: .3s width;
    transition-timing-function: ease-in-out;
  }

	.menu {
		width: 190px;
		float: left;
    transition: .3s width;
    transition-timing-function: ease-in-out;
	}
  .menu2 {
		width: 48px;
		float: left;
    transition: .3s width;
    transition-timing-function: ease-in-out;
    .el-icon-arrow-down:before{
      display: none;
    }
    .el-submenu__title{
      padding-left: 14px !important;
      span{
        margin-left: 12px;
      }
    }
    #search{
      display: none;
    }
	}
  .menu2:hover{
    width: 190px;
    float: left;
    transition: .3s width;
    transition-timing-function: ease-in-out;
    .el-icon-arrow-down:before{
      display: block;
    }
  }

  .btn-up{
    width: 30px;
    float: left;
    position: fixed;
    top:2px;
    left: 0;
    z-index: 999999;
    opacity: 0;
  }
  .btn-up:hover,.btn-right:hover{
    opacity: 1;
    cursor: pointer;
  }
  .btn-right{
    width: 13px;
    float: left;
    position: fixed;
    /*top:82px;*/
    left: 0;
    z-index: 999999;
    opacity: 0;
  }
  .fixed1{
    top:85px;
  }
  .fixed2{
    top:10px;
  }
</style>
