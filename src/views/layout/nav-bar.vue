<template>
	<nav>
    <el-row class="elRow"> <!-- 618 -->
      <el-col :span="11">
        <div class="logo">
            <img src="../../assets/logo_top_line.png"/>
            <h1>ERP管理平台</h1>
        </div>

      </el-col>
      <el-col :span="8" style="text-align: right;">  <!-- 450 -->
        <p>欢迎登入：<span style="color:blue">物产企通事通科技</span>&nbsp;&nbsp;<span>2017.12.17 16:32:56</span></p>
      </el-col>
      <el-col :span="4" style="padding-left:50px " class="btns"> <!-- 225 -->
          <!-- <el-button size="mini" round>首页</el-button> -->
          <!-- <el-button size="mini" round>退出</el-button> -->
          <div class="btn-index">
            <i class="icon-home"></i>
            <span>首页</span>
          </div>
          <div class="btn-index">
            <i class="icon-quit"></i>
            <span>退出</span>
          </div>
      </el-col>
    </el-row>
	</nav>
</template>

<script>
	export default {
		name: 'NavBar',
		data() {
			return {
				test: this.$store.state.test
			}
		},
		computed: {
			tags(){
				return this.$store.state.tags;
			}
		}
	}
</script>

<style lang="scss" scoped>
	nav {
    width: 100%;
    min-width:1250px;
    height: 80px;
    background-color: #203243;
    position:relative;
    line-height:80px;
        p{
            margin: 0;
            color:#fff;
            font-family:'MicrosoftYaHei';
            font-size:14px;
        }
        h1{
          padding-left: 235px;
          color:#fff;
          font-size:20px;
          font-weight:bold;
        }
        .btns{
            margin-right:10px;
        }
        .elRow{
          //padding-top:40px;
        }
        .elRow .btn-index{
            width:75px;
            height:30px;
            border:1px solid #fff;
            border-radius:18px;
            display:inline-block;
            color:#fff;
            line-height:26px;
            text-align:right;
            padding-right:10px;
            box-sizing: border-box;
            position:relative;
            cursor:pointer;
        }
        .elRow .btn-index span{
            font-size:14px;
        }
        .elRow  .logo img{
            width:160px;
            position:absolute;
            top:15px;
            left:28px;
            vertical-align:middle;
        }
        .icon-home{
            width:20px;
            height:20px;
            display:inline-block;
            background:url(../../assets/icon_home_top.png) no-repeat center;
            position:absolute;
            top:4px;
            left: 10px;
        }
        .icon-quit{
            width:20px;
            height:20px;
            display:inline-block;
            background:url(../../assets/icon_quit_top.png) no-repeat center;
            position:absolute;
            top:4px;
            left: 10px;
        }
	}
</style>
