<template>
    <div class="allTemplate">
        <div class="info" style="margin-bottom: 15px">
            <el-form ref="form" label-width="110px" :model="tempAll">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="创建人" prop="createdBy">
                            <el-col :span="24">
                                <el-input v-model="tempAll.createdBy" size="mini" :disabled="true"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="修改人" prop="updatedBy">
                            <el-col :span="24">
                                <el-input v-model="tempAll.updatedBy" size="mini" :disabled="true"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="过账人" prop="postPersonName">
                            <el-col :span="24">
                                <el-input v-model="tempAll.postPersonName" size="mini" :disabled="true"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="创建时间" prop="createdTime">
                            <el-col :span="24">
                               <el-date-picker
                                  v-model="tempAll.createdTime"
                                  type="date"
                                  placeholder="选择日期"
                                  style="width: 100%;"
                                  size="mini"
                                  :disabled="true">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="修改时间" prop="updatedTime">
                            <el-col :span="24">
                                <el-date-picker
                                  v-model="tempAll.updatedTime"
                                  type="date"
                                  placeholder="选择日期"
                                  style="width: 100%;"
                                  size="mini"
                                  :disabled="true">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="过账时间" prop="postDate">
                            <el-col :span="24">
                                <el-date-picker
                                  v-model="tempAll.postDate"
                                  type="date"
                                  placeholder="选择日期"
                                  style="width: 100%;"
                                  size="mini"
                                  :disabled="true">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {
            tempAll:{
                createdBy:'',//创建人
                createdTime:'',//创建时间
                updatedBy:'',//修改人
                updatedTime:'',//修改时间
                postPersonName:'',//过账人
                postDate:'',//过账时间
            }
        }
    },
    methods: {

    }
}
</script>
<style scoped>

</style>
