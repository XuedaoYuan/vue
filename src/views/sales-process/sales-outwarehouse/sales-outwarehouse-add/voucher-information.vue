<template>
<div class="allTemplate" style="margin-bottom:24px">
    <el-form ref="form" label-width="120px" :model="tempAll">
        <el-row :gutter="6">
          <el-col :span="6">
            <el-form-item label="出库凭证标识" prop="salesType">
              <el-col>
                <el-select v-model="tempAll.salesType" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in salesType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="6">
          <el-col :span="6">
            <el-form-item label="出库凭证编号" prop="salesType">
              <el-col>
                <el-input v-model="tempAll.name" size="mini" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="6">
          <el-col :span="12">
            <el-form-item label="推送失败的原因" prop="salesType">
              <el-col>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="tempAll.textarea"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
</div>
</template>


<script>

const outwarehouseIf = [//确认出库
  {value: '1',label: '是'},
  {value: '0',label: '否'},
]
const salesType = [//销售类型
  {value: '1',label: '国外销售'},
  {value: '0',label: '国内销售'},
]
const listStatus = [//销售类型
  {value: '1',label: '添加'},
  {value: '0',label: '创建'},
]

export default {
    data(){
        return {
            tempAll:{
              trueout:"0",
              salesType:"0",
              listStatus:"0",
            },
            outwarehouseIf:outwarehouseIf,
            salesType:salesType,
            listStatus:listStatus,
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],

        }
    }
}
</script>
<style scoped>
/* .el-form-item {
    margin-bottom:0;
} */
</style>