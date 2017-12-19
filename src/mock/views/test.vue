<template>
  <div class="test" style="padding: 0px 10px 10px;">
    <el-button @click.native="onClick" size="small">获取list</el-button>
    <el-button @click.native="getMenu" size="small">获取测试菜单</el-button>
    <el-button @click.native="getUser" size="small">获取用户信息</el-button>
    <el-button @click.native="getButton" size="small">获取按钮信息</el-button>
    <form id="form1" action="#" method="post" enctype="multipart/form-data">
      <input type="file" name="file" size="50" />
      <input type="text" name="_sysid_" size="50" value="9a7acdeb00001a7f" hidden="true" />
      <input type="button" value="上传" @click="upload" />
    </form>
    <common-table :data="list" :maxHeight="300" :fit="true" :reRender="reRender" :headers="headers" @cell-mouse-enter="handleCellMouseEnter" @cell-mouse-leave="handleCellMouseLeave">
      <template slot="filter" slot-scope="scope">
        <div v-if="scope.text == 'companyFilter'">
          <span>{{list[scope.index]['company'] | companyFilter}}</span>
        </div>
      </template>
      <template slot="default" slot-scope="scope">
        <div v-if="scope.text == 'select'">
          <el-select v-model="value4" clearable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div v-if="scope.text == 'date'">
          <el-date-picker size="mini" v-model="list[scope.index]['date']" type="date" placeholder="选择日期" @change="handleChange" ref="datePicker">
          </el-date-picker>
        </div>
        <div v-if="scope.text == 'company'">
          <el-select size="mini" v-model="list[scope.index]['company']">
            <el-option v-for="(val, key) in companyList" :key="key" :label="val" :value="key">
            </el-option>
          </el-select>
        </div>
      </template>
    </common-table>
    <div>
      <el-button @click.native="apiTest">接口测试</el-button>
      <el-button @click.native="sumbmit">提交测试</el-button>
    </div>
    <div style="width:500px;">
      <h1>test xdyuan</h1>
      <div>
        <two-input @childEvent="childEvent" inputLabel="公司选择"></two-input>
      </div>
    </div>
    <el-button type="text" @click="open4">点击打开 Message Box</el-button>
    {{tempAll}}
    <el-form ref="form" label-width="100px" :model="tempAll">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="经营主体" prop="main1">
            <el-col :span="24">
              <management-subject @childevent="childEventHandlerMainInfo" :querySelect="tempAll.companyName"></management-subject>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门" prop="main1">
            <el-col :span="24">
              <department-select @childevent="childEventHandlerDepartment"></department-select>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="selectSearch">
      <el-select style="float:left;" size="mini" v-model="value1" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <div style="display: inline-block;
    background: #f1e7e7;
    height: 20px;
    border: 1px solid #ccc;
    float: left;" class="myicon">
        <i class="el-icon-search"></i>
      </div>
    </div>
    <div>NP test {{np}}</div>
    <el-button type="warning" size="mini" @click="checkBtn" >审核</el-button>   <div>{{checkReturn}}</div>
    <check-dialog  :checkDialogShow="checkDialogShow" @childevent="checkStatus" @closeItem="closeCheckDialog"></check-dialog>
    <common-upload @uploadedFile="uploadedFile"></common-upload>
  </div>
</template>
<script>
/**
 * ============================
 * @Author: Xuedao Yuan
 * @DateTime: 2017-11-22 16:50:21
 * @Des: 公共组件，可以传入title 绑定childEvent，双击选择需要的
 * ============================
 */

import twoInput from '../../components/two-input.vue'

import ManagementSubject from 'components/common-select/management-subject.vue' //经营主体
import DepartmentSelect from 'components/common-select/department-select.vue' //部门
import CheckDialog from '@/components/common-dialog/check-dialog.vue' //人员
import CommonUpload from '@/components/common-upload/common-upload' //上传

import NP from 'number-precision'
// import MyButton from 'mock/components/button';

// const ENUMS = {
//   company: {
//     '1': '浙江竹开信息',
//     '2': '浙江万国',
//     '3': '开课吧',
//     '4': '汇文教育',
//     '5': '阿里巴巴'
//   }
// }
const headers = [
  { prop: 'checkbox', width: 100, type: 'selection' },
  { prop: 'date', dataType: 'Date', label: '日期', template: 'date' },
  { prop: 'name', label: '姓名', editable: true, required: true },
  { prop: 'address', label: '地址', editable: true },
  { prop: 'age', label: '年龄', digit: "0"},
  { prop: 'company', label: '经营主体', filter: 'companyFilter' }
];
const baseList = [{
  date: '',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  age: '0',
  company: '74010190'
}, {
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  age: 1,
  company: '74010190'
}, {
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  age: 14,
  company: '74010190'
}, {
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  age: '14',
  company: '74010190'
}, {
  date: '2016-05-08',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  age: '14',
  company: '74010190'
}, {
  date: '2016-05-06',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  age: '14',
  company: '74010190'
}, {
  date: '2016-05-07',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  age: '14',
  company: '74010190'
}];
export default {
  data() {
    return {
      np: 0,
      value: '',
      reRender: true,
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
      value4: '',
      value1: '',
      checkReturn: '',
      headers: headers,
      list: baseList,
      tempAll: {
        companyName: "物产", //经营主体
        orgName: null, //部门
      },
      companyList: ENUMS['7401'],
      checkDialogShow: false,
      btnStr: '<el-button type="warning" size="small">创建</el-button>',
      fileList:[]
    }
  },
  mounted() {
    this.headers[5].filters = function(val) {
      return ENUMS.company[val];
    };

    this.np = NP.plus(0.1, 0.2);
  },
  methods: {
    uploadedFile(val){
        this.fileList = val;
        console.log(this.fileList);
    },
    checkBtn(){
      this.checkDialogShow =true;
    },
    closeCheckDialog(val){
      this.checkDialogShow =false;
    },
    checkStatus(val){
      this.checkReturn = val;
      this.checkDialogShow =false;
    },
    upload() {
      console.log(111);
      var formData = new FormData(document.getElementById("form1"));
      console.log('=====');

      console.log(formData);
      $.ajax({
        url: "http://osstest.zjmiec.cn/uploadFile.file",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
          //window.clearInterval(timer);
          console.log(data);
          alert("上传成功");
        },
        error: function(e) {
          alert("错误！！");
          //window.clearInterval(timer);
        }
      });

    },

    getButton() {
      this.btnStr = '<el-button type="warning" size="small">创建</el-button>';
      $.ajax({
        url: 'http://10.22.209.142:8080/cotton-web/userPermiss/permissionList.json',
        type: 'post',
        data: {
          "authToken": "e04b3e350000000a",
          "systemId": "9a7acdeb00001a7f"
        },
        success: function(data) {
          console.log('button', data);
        }
      })
    },
    getMenu() {
      //测试获取目录
      $.ajax({
        url: 'http://authtest.zjmiec.cn/auth-web/userApi/getAuthData',
        type: 'post',
        data: {
          "token": "e04b3e350000000a",
          "systemId": "9a7acdeb00001a7f"
        },
        success: function(data) {
          console.log('menu', data);
        }
      })
    },
    getUser() {
      //测试获取目录
      $.ajax({
        url: 'http://authtest.zjmiec.cn/auth-web/userApi/getUser',
        type: 'post',
        data: {
          "userToken": "e04b3e350000000a",
        },
        success: function(data) {
          console.log('user', data);
        }
      })
    },
    sumbmit() {
      eventBus.$emit('validateTable', {
        data: this.list, //表示表格数据
        headers: this.headers, //表示表头数据
        success: (valid) => { //成功回掉
          if (valid) {
            //校验通过后，代码书写处
            alert('校验通过!')
          } else {
            //检验不通过的提示已统一加，这里可以不写代码
          }
        }
      })
    },
    open4() {
      var a = '1547856000000';
      console.log(a.parseTime('YYYY-MM-DD HH:mm:ss'));
      console.log(this.list[0].date);
      console.log(this.list[0].date.parseTime('YYYY-MM-DD HH:mm:ss'));
    },
    childEvent(row) {
      // console.log(row.name);
    },
    handleCellClick(row, column, cell) {},
    onClick() {
      this.list.push({
        date: '1231231',
        name: '23123',
        address: '123123',
        age: '123123',
      });
      // console.log(this.list);
    },
    handleBlur() {
      // this.show = false;
    },
    handleChange(val) {
      // console.log(val, this.$refs.datePicker);
      // eventBus.$emit('cell-blur')
    },
    handleCellMouseEnter(row, column, cell) {

    },
    handleCellMouseLeave(row, column, cell) {

    },
    onAddRow() {
      this.list.push({
        date: '1231231',
        name: '23123',
        address: '123123',
        age: '123123',
      });
      // console.log(this.list);
    },
    apiTest() {
      doQueryWithPage().then(() => {

      });
    },
    childEventHandlerMainInfo(val) { //经营主体
      if (val) {
        this.tempAll.companyName = val.companyName;
      } else {
        this.tempAll.companyName = '';
      }
    },
    childEventHandlerDepartment(val) { //部门
      if (val) {
        this.tempAll.orgName = val.orgName;
      } else {
        this.tempAll.orgName = '';
      }
    },

  },
  filters: {
    companyFilter(val) {
      return ENUMS['7401'][val];
    }
  },
  watch: {},
  components: {
    twoInput,
    ManagementSubject,
    DepartmentSelect,
    CheckDialog,
    CommonUpload
  }

}

</script>
