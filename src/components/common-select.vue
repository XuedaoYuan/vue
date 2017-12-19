<template>
  <div>
    <el-autocomplete popper-class="my-autocomplete" v-model="tempAll.name" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect">
      <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClickSearch">
  </i>
      <template slot-scope="props">
        <!-- 这是请求的数据 -->
        <div class="name">{{ props.item.value }}</div>
        <span class="addr">{{ props.item.address }}</span>
      </template>
    </el-autocomplete>
    <el-dialog @close="handleCancel" :visible.sync="dialogTableVisible" v-drag width="1000px" :title="inputLabel">
      <div class="searchForm">
        <el-row>
          <el-col :span="6">
            <div class="companyName companyNameLabel">公司代码:</div>
            <div class="companyName companyNameInput">
              <el-input size="small" v-model="company.code" placeholder="请输入公司代码"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="companyName companyNameLabel">公司名称:</div>
            <div class="companyName companyNameInput">
              <el-input size="small" v-model="company.name" placeholder="请输入公司名称"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="companyName companyNameLabel">公司简称:</div>
            <div class="companyName companyNameInput">
              <el-input size="small" v-model="company.shortname" placeholder="请输入公司简简称"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <el-button size="small" type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
            <el-button size="small" icon="el-icon-close" @click="onEmpty">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table highlight-current-row max-height="300" border @row-dblclick="handleRowDblclick" @row-click="handleRowClick" :data="gridData">
        <el-table-column property="date" label="日期" width="333px"></el-table-column>
        <el-table-column property="name" label="姓名" width="333px"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="4000">
        </el-pagination>
        <div class="footer">
          <el-button icon="el-icon-check" size="small" type="primary" @click="handleCheck">确定</el-button>
          <el-button @click="handleCancel" icon="el-icon-remove-outline" size="small">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    inputLabel: String,
    url: String, //根据URL获取数据来选择
    visible: Boolean
  },
  data() {
    return {

      highLight: true,
      selectedRow: null,
      name: '',
      code: '',
      tempAll: {
        code: '',
        name: ''
      },
      dialogTableVisible: false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄1'
      }, {
        date: '2016-05-04',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1518 弄2'
      }, {
        date: '2016-05-01',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1518 弄3'
      }, {
        date: '2016-05-03',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1518 弄4'
      }],
      company: {
        code: '',
        name: '',
        shortname: ''
      },
      formInline: {
        user: '',
        region: ''
      },
      currentPage: 1
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
    },
    handleRowClick(row) {
      this.selectedRow = row;
    },
    hanldeSearch() {
      this.dialogTableVisible = true;
      // this.$emit('hanldeSearch');
    },
    handleRowDblclick(row, e) {
      console.log(row, e);
      this.tempAll.name = row.name;
      this.dialogTableVisible = false;
      this.$emit('childEvent', row);
    },
    hanldeEmpty() {
      this.tempAll.name = ''
    },
    onSubmit() {
      console.log(11);
    },
    onEmpty() {
      this.company = {
        code: '',
        name: '',
        shortname: ''
      }
    },
    handleCurrentChange(val) {
      console.log(val + 'page');
      // ajax 拿取页面内容
    },
    handleCheck() {
      // this.tempAll.name = row.name;
      // this.dialogTableVisible = false;
      if (!this.selectedRow) {
        this.$message.error('请选择一条信息！');
        return;
      }
      this.$emit('childEvent', this.selectedRow);
    },
    handleCancel() {
      console.log('calcel-222');
      // this.dialogTableVisible = false;
      this.company = {
        code: '',
        name: '',
        shortname: ''
      }
      this.selectedRow = null;
      this.$emit('handleCancel');


    },
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
        { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
        { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
        { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
        { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
        { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
        { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
        { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
        { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
        { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
        { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
        { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
        { "value": "枪会山", "address": "上海市普陀区棕榈路" },
        { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
        { "value": "钱记", "address": "上海市长宁区天山西路" },
        { "value": "壹杯加", "address": "上海市长宁区通协路" },
        { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
        { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
        { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
        { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
        { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
        { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
        { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
        { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
        { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
        { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
        { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
        { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
        { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
        { "value": "浏阳蒸菜", "address": "天山西路430号" },
        { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
        { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
        { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
        { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
        { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
        { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
        { "value": "阳阳麻辣烫", "address": "天山西路389号" },
        { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
      ];
    },

    handleSelect(item) {
      console.log(item);
    },
    handleIconClickSearch() {
      console.log('icon');
      this.dialogTableVisible = true;
    }

  },
  created() {

  },
  mounted() {
    // ajax
    // this.gridData = result
    this.restaurants = this.loadAll();
  },
  watch: {
    visible: function(newVal) {
      console.log(newVal);
      this.selectedRow = null;
      this.dialogTableVisible = this.visible;
    }
  }
}

</script>
<style scoped>
span {
  float: left;
}

.companyName {
  float: left;
}

.companyNameLabel {
  width: 30%;
}

.companyNameInput {
  width: 65%;
}

.searchForm {
  padding-bottom: 20px
}

.pagination {
  margin-top: 10px;
}

.footer {
  text-align: center;
  margin-top: 20px;
}

</style>
