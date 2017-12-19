<template>
  <div class="allTemplate">
    <div class="saveAndCancelbtns">
      <el-button type="primary" size="small" @click="handleSave">保存</el-button>
      <el-button type="info" size="small" @click="handleCancel">取消</el-button>
    </div>
    <div class="infoDataTabs">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="抬头数据" name="first">
          <div class="tabPane tabPaneProductMain">
            <el-form ref="form" label-width="100px" :model="riseData">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="物料编号">
                    <el-input disabled v-model="riseData.manageSubName" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="物料名称">
                    <el-input v-model="riseData.goodsName" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="线纱形式">
                    <el-select size="mini" v-model="riseData.operationType" placeholder="请选择">
                      <el-option label="COM" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="原料组成">
                    <el-input v-model="riseData.currencyName" size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="湿纱比例" prop="supplierName">
                    <el-input v-model="riseData.supplierName" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="支数">
                    <el-input v-model="riseData.poGrNo" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单纱及股线">
                    <el-input v-model="riseData.warehouseName" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="纱线用途">
                    <el-select size="mini" v-model="riseData.operationType" placeholder="请选择">
                      <el-option label="COM" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="品牌" prop="operationType">
                    <el-input v-model="riseData.warehouseName" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="染色等级">
                    <el-input v-model="riseData.poContractNo" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="分类及捻度及色号">
                    <el-input v-model="riseData.lbNo" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="检验类别">
                    <el-input v-model="riseData.updatedBy" size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="特殊说明">
                    <el-input v-model="riseData.updatedBy" size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="footer">
      <div class="createAndDeleteAndCopyBtns">
        <el-button @click="" type="primary" size="small">创建</el-button>
        <el-button @click="" type="warning" size="small">删除</el-button>
        <!-- <el-button type="success" size="small">复制</el-button> -->
      </div>
    </div>
    <div>
      <common-table :data="list" highlight-current-row :maxHeight="400" :fit="true" ref="multipleTable" border @row-db-click="" :headers="headers" @selection-change="">
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text=='isMainParameters'">
            <el-checkbox v-model="list[scope.index].d"></el-checkbox>
          </div>
        </template>
         <template slot="default" slot-scope="scope">
             <!--  <div v-if="scope.text=='isMainParameters'">
                  
              </div> -->
          </template>
      </common-table>
      <div>{{list}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
const headers = [
  { prop: 'a', width: "300px", align: 'center', label: "检验项目" ,editable: true},
  { prop: 'b', width: "100px", align: 'center', label: "最大值", editable: true},
  { prop: 'c', width: "100px", align: 'center', label: "最小值", editable:true},
  { prop: 'd', width: "100px", align: 'center', label: "是否关键参数", filter: 'isMainParameters' },
]
export default {
  data() {
    return {
      riseData: {

      },
      activeName: 'first',
      list: [
        {a:'11', b: 'bb', c: 'cc', d: true},
        {a:'11', b: 'bb', c: 'cc', d: true},
        {a:'11', b: 'bb', c: 'cc', d: true},
        {a:'11', b: 'bb', c: 'cc', d: true},
      ],
      headers: headers
    }
  },
  methods: {
    handleSave() {

    },
    handleCancel() {
      this.$store.dispatch('toggleCurrentView', {
        ProductMain: {
          view: 'index',
          // params: {test: 'tetstststststst'}
        }
      });
    },
    handleTabClick(val) {

    }
  },
  created() {

  }
}

</script>
<style scoped>
.saveAndCancelbtns {
  padding: 0px 0 10px 0px;
}

.tabPaneProductMain {
  padding-bottom: 1px;
}

.createAndDeleteAndCopyBtns {
  margin-bottom: 5px;
}

</style>
