<template>
<div class="allTemplate">
    <el-form ref="form" label-width="120px" :model="tempAll" style="margin-top:16px">
        <el-row :gutter="6">
          <el-col :span="8">
            <el-form-item label="创建人" prop="createdBy">
              <el-col :span="18">
              <el-input v-model="tempAll.createdBy" size="mini" :disabled="true"></el-input></el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="修改人" prop="name">
              <el-col :span="18">
              <el-input v-model="tempAll.code" size="mini" :disabled="true"></el-input></el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="过账人" prop="code">
              <el-col :span="18">
              <el-input v-model="tempAll.code" size="mini" :disabled="true"></el-input></el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="6">
          <el-col :span="8">
            <el-form-item label="创建时间" prop="createdTime">
              <el-col :span="18">
              <el-input v-model="tempAll.createdTime" size="mini" :disabled="true"></el-input></el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="修改时间" prop="name">
              <el-col :span="18">
              <el-input v-model="tempAll.name" size="mini" :disabled="true"></el-input></el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="过账时间" prop="name">
              <el-col :span="18">
              <el-input v-model="tempAll.name" size="mini" :disabled="true"></el-input></el-col>
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
