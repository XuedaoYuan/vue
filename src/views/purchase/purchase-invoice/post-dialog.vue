<template>
  <div class="management dailog"  id="checkDialog">
    <el-dialog
      title="您确认要过账吗?"
      :visible.sync="showFlag"
      width="33%"
      top="20%"
      @close="closeDialog"
     >
      <el-radio-group v-model="radio">
        <el-radio label="71000030">通 过</el-radio>
        <el-radio label="71000040">驳 回</el-radio>
      </el-radio-group>
      <div style="text-align: right;margin-top: 19px;margin-bottom: -7px;">
         <span slot="footer" class="dialog-footer" >
         <el-button size="small" @click="closeDialog">取 消</el-button>
         <el-button size="small" type="primary" @click="submit">确 定</el-button>
      </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: {
      postDialogShow: Boolean,
    },
    data(){
      return {
        showFlag: false,
        radio:"71000030",  // 71000030 通过 , 71000040驳回
      }
    },
    watch: {
      postDialogShow(){
        this.radio = '71000030';
        this.showFlag = this.postDialogShow;
      },
    },
    methods: {
      closeDialog(){
        this.$emit('closeItem');
      },
      submit(){
        this.$emit('childevent',this.radio);
      }
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" >
  #checkDialog .el-dialog__body {
    padding: 18px 20px;
    color: #5a5e66;
    line-height: 4px;
    font-size: 14px;
  }
</style>
