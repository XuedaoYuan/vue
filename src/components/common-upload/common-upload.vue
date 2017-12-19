<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :http-request="httpRequest"
    :before-upload="beforeUpload"
    :on-change="change"
    action=""
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button :loading="isLoading" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">{{btnContent}}</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>
<script>
  import {Message} from 'element-ui';

  export default {
  props: {

  },
  data() {
    return {
      fileList: [],
      formData:'',
      locked: false,
      isLoading:false,
      btnContent:'上传到服务器'
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload (file,fileList) {

    },
    change (file,fileList) {
      let formData = new FormData();
      for(var file of fileList){
        formData.append('file', file.raw);
      }
      formData.append('_sysid_', '9a7acdeb00001a7f');
      this.formData = formData;
    },
    httpRequest(request){
      var vm = this;
      if (this.locked) {
        return;
      }
      this.locked = true;
      this.isLoading = true;
      this.btnContent = '上传中';
      $.ajax({
        url: "http://osstest.zjmiec.cn/uploadFile.file",
        type: "post",
        data: this.formData,
        processData: false,
        contentType: false,
        success: function(data) {
          //window.clearInterval(timer);
          vm.locked = false;
          vm.isLoading = false;
          vm.btnContent = '上传到服务器';
          vm.$emit('uploadedFile', data.data);
          Message({
            type: 'success',
            message: "上传成功！",
            duration: 3 * 1000
          })
        },
        error: function(e) {
          vm.isLoading = false;
          vm.btnContent = '上传到服务器';
          Message({
            type: 'success',
            message: "错误！",
            duration: 3 * 1000
          })
          //window.clearInterval(timer);
        }
      });
    }
  },
  created() {

  },
  mounted() {

  },
  watch: {
    fileList:function (val) {
      console.log('=========');
      console.log(val);
    }
  }
}

</script>
<style scoped>

</style>
