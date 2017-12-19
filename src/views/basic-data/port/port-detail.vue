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
                <el-form-item label="港口编号" prop="portCode">
                  <el-input v-model="formData.portCode" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="港口名称" prop="portName">
                  <el-input v-model="formData.portName" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属海关" prop="a">
                  <el-select v-model="formData.a" size="mini" placeholder="请选择">
                    <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="海关备案号" prop="a">
                  <el-input v-model="formData.a" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="港口性质" prop="a">
                  <el-select v-model="formData.a" size="mini" placeholder="请选择">
                    <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="港口类型" prop="a">
                  <el-select v-model="formData.a" size="mini" placeholder="请选择">
                    <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="固定电话" prop="a">
                  <el-input v-model="formData.a" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机" prop="a">
                  <el-input v-model="formData.a" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="EMAIL" prop="a">
                  <el-input v-model="formData.a" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="传真" prop="a">
                  <el-input v-model="formData.a" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="国家" prop="a">
                  <el-select v-model="formData.a" size="mini" placeholder="请选择">
                    <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="省份" prop="a">
                  <el-select v-model="formData.a" size="mini" placeholder="请选择">
                    <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="城市" prop="a">
                  <el-select v-model="formData.a" size="mini" placeholder="请选择">
                    <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="地址" prop="a">
                  <el-input v-model="formData.a" size="mini"></el-input>
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
  export default {
    data(){
      return {
        activeName: 'first',
        formData: {
          a: "无字段",
          portCode:'',//港口编号
          portName:'',//港口名称
        },
        opt: [{
          value: '选项1',
          label: '黄金糕'
        }],
      }
    },
    methods: {
      onClick() {
//        this.$router.push({ params: { type: 'list' } });
        this.$store.dispatch('toggleCurrentView', {
          PortDetail: {
            view: 'index'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      submitForm(formName) {

      },
    }
  }

</script>
<style>
</style>
