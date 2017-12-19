<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div class="searchAndResetBtns">
        <div>
          <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="small">重置</el-button>
        </div>
      </div>
      <el-form ref="form" label-width="80px" :model="tempAll">
        <el-row>
          <el-col :span="6">
            <el-form-item label="物料编号">
              <el-input v-model="tempAll.manageSubName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="物料名称">
              <el-input v-model="tempAll.bizOrgName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="线纱形式">
              <el-select size="mini" v-model="tempAll.operationType" placeholder="请选择">
                <el-option label="COM" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="原料组成">
              <el-input v-model="tempAll.currencyName" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="湿纱比例" prop="supplierName">
              <el-input v-model="tempAll.supplierName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支数">
              <el-input v-model="tempAll.poGrNo" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单纱及股线">
              <el-input v-model="tempAll.warehouseName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="纱线用途">
              <el-select size="mini" v-model="tempAll.operationType" placeholder="请选择">
                <el-option label="COM" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="品牌" prop="operationType">
              <el-input v-model="tempAll.warehouseName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="染色等级">
              <el-input v-model="tempAll.poContractNo" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分类及捻度及色号">
              <el-input v-model="tempAll.lbNo" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检验类别">
              <el-input v-model="tempAll.updatedBy" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="特殊说明">
              <el-input v-model="tempAll.updatedBy" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="btns">
      <el-button type="warning" size="mini" @click="handleCreateNewDetail">创建</el-button>
      <el-button type="warning" size="mini" @click="handleEdit">修改</el-button>
      <el-button type="warning" size="mini">审核</el-button>
      <el-button type="warning" size="mini">取消审核</el-button>
      <el-button type="warning" size="mini">删除</el-button>
      <el-button type="warning" size="mini">提交ERP</el-button>
    </div>
    <div class="commonTable">
      <common-table :data="list" highlight-current-row :maxHeight="400" :fit="true" ref="multipleTable" border @row-db-click="handleDblClick" :headers="headers" @selection-change="">
        <!-- <template slot="filter" slot-scope="scope">
          <div v-if="scope.text=='poGrType'">
            <span>{{list[scope.index].poGrType | parsepoGrType}}</span>
          </div>
        </template> -->
        <!--  <template slot="default" slot-scope="scope">
            
          </template> -->
      </common-table>
    </div>
    <div class="pagination">
      <!--  /*pageInfo: {
        total: 0,
        pageSize: 5, //每页几条数据
        currentPage: 1, //第几页
        total: 0
      }*/ -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>

/*商品属性命名规则

品名构成：纺纱形式+原料组成+混纺比例+支数+单纱/股线+纱线用途+（品牌、分类、捻度、染色等级）
例：“OET/C70/3010S/2D旭日AAA”代表的是旭日牌包漂白气流纺涤棉70/30的10S机织用双股线
说明：1、纺纱形式代码表：
气流纺-OE、环锭纺-RING、赛络纺-SIRO、涡流纺-MVS 。。。

2、原料组成：
棉花-C  粘胶-R 涤纶-T。。。
如果是多种原料组成以”/”分隔，占比大的原料居前，例：T/C代表涤棉混纺
T/R/C代表涤粘棉混纺

3、混纺比例：
对应前面的原料组成描述具体比例采用百分比数据,中间以“/”分隔。
比如之前是T/C，这里是70/30，那么代表涤纶占70%，棉占30%；
特别说明：如果是单一原料的，混纺比例这里不写100，而是以空缺来体现，
比如 OEC10S就代表100%棉花的气流纺纱。

4、支数：我们系统中的支数都代表英支，以数字+”S”来表示

5、单纱及股线：以“/”+数字来表示，数字表示组成股线的单纱根数。例如30S/2代表由2根30S单纱并成的股线
特殊说明：如果是单纱那么“/1”不用体现，缺省

6、纱线用途（如针织、机织等）：
K代表针织用纱  D代表机织用纱K/D代表机针织双用纱
该字段必须填写，不得缺省

7、品牌：该字段用于区分供应商

8、染色等级：该字段为（包漂代号：AAA，可漂代号：AA，染色代号：A）。

9、分类及捻度及色号等：该字段主要用于区分供应商及特殊纱线（比如色纱，强捻纱等），以及染色等级（包漂代号：AAA，可漂代号：AA，染色代号：A）。

10、特殊说明：由于远东阿里山牌已经在市场上形成习惯的体系分类，沿用原来的YKO101，YKO100，YKO121这样的分类体系，其他按新规则必填；


*/

const headers = [

  { type: 'selection', label: '行号', fixed: true },
  { prop: 'poGrNo', width: "180px", align: 'center', label: "物料编号" },
  { prop: 'poGrType', width: "140px", align: 'center', label: "物料名称", },
  { prop: 'operationType', width: "140px", align: 'center', label: "纱线形式", },
  { prop: 'certificatesDate', width: "140px", align: 'center', label: "原料组成" },
  { prop: 'manageSubName', width: "140px", align: 'center', label: "混纱比例" },
  { prop: 'bizOrgName', width: "120px", align: 'center', label: "支数" },
  { prop: 'supplierName', width: "120px", align: 'center', label: "单纱及股线" },
  { prop: 'warehouseName', width: "120px", align: 'center', label: "纱线用途" },
  { prop: 'baseRate', width: "120px", align: 'center', label: "品牌" },
  { prop: 'billNo', width: "120px", align: 'center', label: "染色登记" },
  { prop: 'currencyName', width: "120px", align: 'center', label: "分类及捻度及色号" },
  { prop: 'poGrStatus', width: "120px", align: 'center', label: "检验类别", filter: 'poGrStatus' },
  { prop: 'actReceiveAmt', width: "120px", align: 'center', label: "退税率", digit: 2 },
  { prop: 'poOrginAmt', width: "160px", align: 'center', label: "特殊", },

]

export default {
  data() {
    return {
      tempAll: {

      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      headers: headers,
      list: [

      ]
    }
  },
  methods: {
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    handleCreateNewDetail() {
      this.$store.dispatch('toggleCurrentView', {
        ProductMain: {
          view: 'add',
          // params: {test: 'tetstststststst'}
        }
      });
    },
    handleEdit() {
      this.$store.dispatch('toggleCurrentView', {
        ProductMain: {
          view: 'edit',
          params: { id: 'tetstststststst' }
        }
      });
    },
    handleDblClick() {
      this.$store.dispatch('toggleCurrentView', {
        ProductMain: {
          view: 'look',
          params: { id: 'tetstststststst' }
        }
      });
    },

  },
  created() {

  },

}

</script>
<style type="text/css">
.btns {
  margin-bottom: 5px;
}

</style>
