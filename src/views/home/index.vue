<template>
    <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, key) in testItem" :key="key">
            <p>{{ item.name }}</p>
        </el-carousel-item>
    </el-carousel>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {
            testItem: [
                { name: '通知' },
                { name: '1、测试工作主要担当者为胡涛、周棋康，不仅需要对页面控制测试，还需要对程序所有按钮功能测试，并对后台数据完整性进行测试以及校验' },
                { name: '2、测试BUG一律通过禅道进行管理，要求开发人员每日登入禅道查看bug；' },
                { name: '3、当天12点以前登入禅道bug需要在当天处理完成，如有特殊原因不能处理，需要和测试人员说明情况。' },
                { name: '4、开发人员处理完成，发布到测试环境自测通过后，将禅道BUG标记已解决。' },
                { name: '5、测试人员测试确认后，禅道bug标记关闭，并将归属责任填写到禅道关键字栏位，如前端-某某某；' }
            ]
        }
    }
}

</script>
<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

</style>
