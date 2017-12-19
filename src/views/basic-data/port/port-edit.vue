<template>
  <div class="allTemplate creditAdd" >
    <div class="info">
      <el-button type="primary" icon="el-icon-search" size="mini" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button type="primary" icon="el-icon-search" size="mini" @click.native="onClick">取 消</el-button>
      <el-tabs v-model="activeName">
        <el-tab-pane label="一般信息" name="first">
          <el-form ref="ruleForm" label-width="100px" :model="formData" style="margin-top: 15px;min-height: 300px;">
            <el-row>
              <el-col :span="12">
                <el-form-item label="港口编号" prop="bsPtCode">
                  <el-input v-model="formData.bsPtCode" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="港口名称" prop="bsPtName">
                  <el-input v-model="formData.bsPtName" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属海关" prop="customs">
                  <el-select v-model="formData.customs" size="mini" placeholder="请选择">
                    <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="海关备案号" prop="customsNo">
                  <el-input v-model="formData.customsNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="港口性质" prop="bsPtNature">
                  <el-select v-model="formData.bsPtNature" size="mini" placeholder="请选择">
                    <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="港口类型" prop="bsPtStatus">
                  <el-select v-model="formData.bsPtStatus" size="mini" placeholder="请选择">
                    <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="固定电话" prop="fixedTel">
                  <el-input v-model="formData.fixedTel" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机" prop="phone">
                  <el-input v-model="formData.phone" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="EMAIL" prop="email">
                  <el-input v-model="formData.email" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="传真" prop="fax">
                  <el-input v-model="formData.fax" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="国家" prop="countryId">
                  <el-select v-model="formData.countryId" size="mini" placeholder="请选择">
                    <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="省份" prop="provinceId">
                  <el-select v-model="formData.provinceId" size="mini" placeholder="请选择">
                    <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="城市" prop="cityId">
                  <el-select v-model="formData.cityId" size="mini" placeholder="请选择">
                    <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="地址" prop="address">
                  <el-input v-model="formData.address" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {doGet,doCusUpdate} from 'api/basic-data/port/port.js';

  export default {
    props:{
      bsPtId:'',
    },
    data(){
      return {
        activeName: 'first',
        formData: {},
        listLoading: false,
        opt: [{
          value: '1003023',
          label: '黄金糕'
        }],
      }
    },
    created(){
      this.doreset();
    },
    methods: {
      onClick() {
        this.$store.dispatch('toggleCurrentView', {
          PortDetail: {
            view: 'index'
          }
        });
      },
      submitForm(formName) {
        this.$confirm('您确认要修改吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          doCusUpdate(this.formData).then(response => {
            if (response.data.status ==1) {
              this.$notify({
                title: '成功',
                message: '修改成功！',
                type: 'success',
                duration: 2000
              });
              this.doreset();
//               this.$refs['headerForm'].resetFields();
              this.$store.dispatch('toggleCurrentView', {
                PortDetail: {
                  view: 'index'
                }
              });
            }

          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      getData() {
        this.listLoading = true;
        doGet(this.bsPtId).then(response => {
          this.formData = response.data.data;
          this.listLoading = false;
        });
      },
      doreset(){
        this.formData = {
          bsPtCode:'',
          bsPtName:'',
          customs:'',
          customsNo:'',
          bsPtNature:'',
          bsPtStatus:'',
          fixedTel:'',
          phone:'',
          email:'',
          fax:'',
          countryId:'',
          provinceId:'',
          cityId:'',
          address:''
        };
        this.getData();
//        this.$refs['headerForm'].resetFields();
      },
    }
  }

</script>
<style>
</style>
