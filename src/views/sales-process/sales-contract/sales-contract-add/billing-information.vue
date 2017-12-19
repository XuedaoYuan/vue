<template>
<div class="allTemplate">
    <el-form ref="form" label-width="120px" :model="tempAll">
        <el-row :gutter="6">
          <el-col :span="6">
            <el-form-item label="开票方" prop="name">
              <el-col>
              <el-input v-model="tempAll.name" size="mini"></el-input></el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开票方地址" prop="name">
              <el-col>
              <el-input v-model="tempAll.code" size="mini"></el-input></el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开票方银行账号" prop="code">
              <el-col>
              <el-input v-model="tempAll.code" size="mini"></el-input></el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开票方开户行" prop="name">
              <el-col>
              <el-input v-model="tempAll.name" size="mini"></el-input></el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="6">
          <el-col :span="6">
            <el-form-item label="开票方电话" prop="name">
              <el-col>
              <el-input v-model="tempAll.name" size="mini"></el-input></el-col>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
</div>
</template>


<script>
export default {
    data(){
        return {
            tempAll:{},

        }
    }
}
</script>
<style scoped>
.el-form-item {
    margin-bottom:0;
}
</style>
