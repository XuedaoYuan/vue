<template>
    <section class="tab-bar">
        <div :key="routePath" class="el-tabs el-tabs--card el-tabs--top">
            <div class="el-tabs__header">
                <div class="el-tabs__nav-wrap" :class="{'is-scrollable': isScroll}">
                    <template v-if="isScroll">
                        <span class="el-tabs__nav-prev is-disabled"><i class="el-icon-arrow-left" @mousedown="leftScroll" @mouseup="clearTimer" @mouseout="clearTimer"></i></span>
                        <span class="el-tabs__nav-next"><i class="el-icon-arrow-right" @mousedown="rightScroll" @mouseup="clearTimer" @mouseout="clearTimer"></i></span>
                    </template>
                    <div class="el-tabs__nav-scroll">
                        <div role="tablist" class="el-tabs__nav" :style="{'transform': 'translateX('+xLength+'px)'}">
                            <template v-for="(item, index) in editableTabs">
                                <div v-if="index == 0" id="tab-index" aria-controls="pane-index" role="tab" class="el-tabs__item" aria-selected="true" :class="{'is-active':editableTabsValue==item.name}" :name="item.name" @click="onTabClick(item)">{{item.title}}</div><div v-if="index != 0" aria-controls="pane-1" role="tab" class="el-tabs__item is-closable" :class="{'is-active':editableTabsValue==item.name}" :name="item.name" @click="onTabClick(item)">{{item.title}}<span class="el-icon-close" @click="onRemoveTab(item.name)"></span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
var tid = undefined;
export default {
    data() {
        return {
            editableTabsValue: 'index',
            editableTabs: [{
                title: '首页',
                name: 'index',
                path: '/',
                menuIndex: '/'
            }],
            removeFlg: false,
            xLength: 0,   //需要平移的横坐标
            isScroll: false,
            tabIndex: 0,
            perSec: 30  //每0.1秒移动距离
        }
    },
    methods: {
        leftScroll() {
            //向左平移
            tid = setInterval(()=>{
                if (this.xLength + this.perSec >= 0) {
                    this.xLength = 0;
                }else {
                    this.xLength += this.perSec;
                }
            }, 100);
        },
        rightScroll() {
            //向右平移
            let navScrollWidth = document.querySelector('.el-tabs__nav-scroll').offsetWidth;
            let navWidth = document.querySelector('.el-tabs__nav').offsetWidth;
            tid = setInterval(()=>{
                if (Math.abs(this.xLength - this.perSec) + navScrollWidth >= navWidth) {
                   this.xLength = -(navWidth - navScrollWidth);
                }else {
                    this.xLength -= this.perSec;
                }
                
            }, 100);
        },
        clearTimer() {
            //清除定时器
            clearInterval(tid);
        },
        addTab(tabName, path, menuIndex) {
            let newTabName = ++this.tabIndex + '';
            this.$route.meta.count = newTabName;
            this.editableTabs.push({
                title: tabName,
                name: tabName,
                path: path,
                menuIndex: menuIndex
            });
            this.editableTabsValue = tabName;

            //新增后判断标签页长度是否够显示
            this.$nextTick(()=>{
                let navScrollWidth = document.querySelector('.el-tabs__nav-scroll').offsetWidth;
                let navWidth = document.querySelector('.el-tabs__nav').offsetWidth;
                if (navWidth + this.xLength > navScrollWidth) {
                    this.xLength = -(navWidth - navScrollWidth);
                }

            });
            
        },
        onRemoveTab(targetName, e) {
            let event = e || window.event;
            event.stopPropagation();
            this.removeFlg = true;
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }
            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            for (let i = 0; i < tabs.length; i++) {
                if (activeName == tabs[i].name) {
                    this.$router.push(tabs[i].path);
                    eventBus.$emit('tabClick', tabs[i].menuIndex || tabs[i].path);
                    break;
                }
            }
        },
        onTabClick(item) {
            if (item.name != this.editableTabsValue) {
                if (!this.removeFlg) {
                    this.$router.push(item.path);
                    this.editableTabsValue = item.name;
                }
                eventBus.$emit('tabClick', item.menuIndex || item.path);
            }
        }
    },
    computed: {
        routePath() {
            this.$nextTick(()=>{
                //是否需要平移
                let navScrollWidth = document.querySelector('.el-tabs__nav-scroll').offsetWidth;
                let navWidth = document.querySelector('.el-tabs__nav').offsetWidth;
                if (navWidth > navScrollWidth) {
                    this.isScroll = true;
                }else {
                    this.isScroll = false;
                }
            })

            var menuIndex;
            if (this.$route.params && this.$route.params.type) {
                var params = this.$route.params;
                var paramsArr = Object.keys(params)
                var regStr = '(.*)';
                for (var i = 0; i < paramsArr.length; i++) {
                    regStr += '\/{1}.*';
                }
                var reg = new RegExp(regStr);
                menuIndex = this.$route.path.replace(reg, '$1');
            } else {
                menuIndex = this.$route.path;
            }
            if (this.$route.name !== undefined && !this.removeFlg) {
                // this.$route.meta.noCache = false;
                if (this.editableTabs.length > 0 && "Tab 1" == this.editableTabs[0].title) {
                    this.editableTabs[0].title = this.$route.name;
                    this.editableTabs[0].path = this.$route.fullPath;
                    this.editableTabs[0].menuIndex = menuIndex;
                    this.editableTabs[0].name = "1";
                    this.editableTabsValue = "1";
                } else {
                    var addFlg = true;
                    for (let i = 0; i < this.editableTabs.length; i++) {
                        if (this.$route.name == this.editableTabs[i].title) {
                            addFlg = false;
                            this.editableTabsValue = this.editableTabs[i].name;
                            this.editableTabs[i].path = this.$route.fullPath;

                            //当前被选项移到指定位置
                            this.$nextTick(()=>{
                                let navScrollWidth = document.querySelector('.el-tabs__nav-scroll').offsetWidth;
                                let navWidth = document.querySelector('.el-tabs__nav').offsetWidth;
                                let activeLeft = document.querySelector('.el-tabs__nav .is-active').offsetLeft;
                                if (Math.abs(this.xLength) > activeLeft) {
                                    this.xLength = -activeLeft;
                                }else if (activeLeft + this.xLength >= navScrollWidth) {
                                    this.xLength = -(navWidth - navScrollWidth);
                                }
                            });
                        }
                    }

                    if (addFlg) {
                        this.addTab(this.$route.name, this.$route.fullPath, menuIndex);
                    }
                }
            }
            this.removeFlg = false;
        }
    }
}

function getOffsetLeft(obj) {
    var tmp = obj.offsetLeft;
    var val = obj.offsetParent;
    while (val != null) {
        tmp += val.offsetLeft;
        val = val.offsetParent;
    }
    return tmp;
}

</script>
<style scoped>
.el-tabs--card>.el-tabs__header .el-tabs__nav {
    border-left: 0;
    border-radius: 0 4px 0 0;
}
.el-tabs__nav-scroll {
    /*overflow-x: scroll;*/
}

</style>
