<template>
  <div class="allTemplate creditAdd" >
    <div class="info" style="margin-bottom: 15px">
      <el-button type="primary" icon="el-icon-search" size="mini" @click="submitForm('ruleForm')">保 存</el-button>
        <el-button type="info" @click.native="onClick" size="mini" >取 消</el-button>
      <el-form ref="ruleForm" :rules="rules" label-width="100px" :model="ruleForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="申请单号" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
             <el-form-item label="申请日期" prop="date" required>
                <el-date-picker type="date" placeholder="开始时间" v-model="ruleForm.date1"
                                  style="width: 100%;" size="mini"></el-date-picker>
             </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请人" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="经营主体" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用证类别" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开证金额" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="折美元金额" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="交货期限/天" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="目的港" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="币别" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用证属性" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="起运港" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国际贸易条款" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用证性质" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="溢短装数量" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="付款期限/天" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预计到港日" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最迟装期" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用证有效期" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="付款条款" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产国别" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预计付款日" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审批状态" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="到单签收人" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产厂商" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用证号" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购合同号" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="开证银行" prop="name">
              <el-input disabled v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承兑金额" prop="region">
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="" prop="type">
              <el-checkbox v-model="checked">是否完全承兑</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="checked">是否完全付款</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="hundred-percent-input">
          <el-col :span="24">
            <el-form-item label="备注" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data(){
      return {
        checked:true,
        title: 'order2!',
        tempAll: {
          name: "",
          date1: '',
          date2: '',
          region: '',
        },
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],

        },
        opt: [{
          value: '选项1',
          label: '黄金糕'
        }],
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      }
    }  ,
    methods: {
      onClick() {

        // if (this.$route.params.type == 'add') {
        // router.push({name:this.$route.name, {params: {type: 'add'}}});
        // }
        this.$router.push({ params: { type: 'list' } });
//        console.log(this.$route);
//        console.log(router);
      },
     submitForm(formName) {
//        this.$refs[formName].validate((valid) => {
//          if (valid) {
//            alert('submit!');
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//        });
     },
//      resetForm(formName) {
//        this.$refs[formName].resetFields();
//      }
    }
  }

</script>
<style>
  .creditAdd .el-row{
      margin-bottom: 18px;
    }

</style>
