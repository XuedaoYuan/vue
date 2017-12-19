<template>
    <div class="common-table" :data-tableid="tableId" :class="'table'+tableId">
        <el-table border ref="elTable"
            @select="__select"
            @select-all="__selectAll"
            @row-click="__rowClick"
            @row-dblclick="__rowDbClick"
            @selection-change="__selectionChange"
            @sort-change="__sortChange"
            @current-change="__currentChange"
            @cell-click="__cellClick"
            @cell-mouse-enter="__cellMouseEnter"
            @cell-mouse-leave="__cellMouseLeave"
            :max-height="maxHeight"
            :data="data"
            :fit="fit"
            highlight-current-row
            :stripe="stripe"
            v-loading.body="listLoading">
            <template v-for="(h, i) in headers">
            <el-table-column v-if="h.type"
                :type="h.type"
                :prop="h.prop"
                :label="h.label"
                :fixed="h.fixed || null"
                :width="h.width"
                :align="h.align || 'center'"
                :header-align="h.headerAlign || 'center'"
                :sortable="h.sortable || false"
                :fomatter="h.fomatter"
                :label-class-name="h.className"
            >
            </el-table-column>
            <el-table-column v-else :key="h.prop"
                :prop="h.prop"
                :label="h.label"
                :fixed="h.fixed || null"
                :width="h.width"
                :align="h.align || 'left'"
                :header-align="h.headerAlign || 'center'"
                :sortable="h.sortable"
                :fomatter="h.fomatter"
                :label-class-name="h.required?'required-col':''"
                ref="elTableColumn"
                show-overflow-tooltip >
                <!-- <span v-if="h.type"></span> -->
                <template slot-scope="scope">
                    <template v-if="!h.template && !h.editable">
                        <template v-if="h.filter">
                            <slot name="filter" :text="h.filter" :index="scope.$index"></slot>
                        </template>
                        <template v-else>
                            <zk-span :value="scope.row[h.prop]" :index="scope.$index" :prop="h.prop" :digit="h.digit" :type="h.dataType" @limitDigit="limitDigit"></zk-span>
                        </template>
                    </template>
                    <template v-else>
                        <template v-if="h.template!='radio' && (!editObj[scope.$index] || !editObj[scope.$index][h.prop])">
                            <span v-if="h.filter">
                                <slot name="filter" :text="h.template" :index="scope.$index"></slot>
                            </span>
                            <zk-span v-else :value="scope.row[h.prop]" :index="scope.$index" :prop="h.prop" :digit="h.digit" :type="h.dataType" @limitDigit="limitDigit"></zk-span>
                        </template>
                        <template v-if="h.template=='radio' || (editObj[scope.$index] && editObj[scope.$index][h.prop])">
                            <span v-if="h.editable" :class="{'editable':h.template!='radio'}">
                                <el-input size="mini" v-model="scope.row[h.prop]"></el-input>
                            </span>
                            <span v-else :class="{'editable':h.template!='radio'}">
                                <slot name="default" :text="h.template" :index="scope.$index"></slot>
                            </span>
                        </template>
                    </template>
                </template>
            </el-table-column>
            </template>
        </el-table>
    </div>
</template>
<script>
import Vue from "vue";
import moment from "moment"
import deepCopy from "util"
import { Message } from 'element-ui'
import jQuery from 'jquery';
import ZkSpan from './zk-span';

export default {
    name: 'CommonTable',
    components: {
        ZkSpan
    },
    props: {
        headers: Array,
        data: {
            type: Array,
            default: [],
            required: true,
        },
        stripe: {
            type: Boolean,
            default: false,
        },
        fit: {
            type: Boolean,
            default: true
        },
        listLoading: {
            type: Boolean,
            default: true
        },
        "max-height": {
            type: Number,
            dafault: 400
        },
        "list-loading": {
            type: Boolean,
            default: false
        },
        rowSelection: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            reRender: true,
            editObj: {},
            lastData: [],
            _index: undefined,
            tableId: new Date().getTime(),
            selectedId: Number,
            selectedIndex: Number,
            selectedProp: String,
            isTriggerBlur: true
        };
    },
    mounted(){
        this.$nextTick(()=>{
            if (eventBus._events['validateTable']) {
                delete eventBus._events['validateTable'];
            }
            eventBus.$on('validateTable', (obj)=>{
                var data = obj.data;
                var headers = obj.headers;
                var validate = true;
                var validateText = ''
                if (headers && headers.length > 0) {
                    for(var h of headers) {
                        if (h.required) {
                            for(var d of data) {
                                if (!d[h.prop]) {
                                    if (d[h.prop] === 0 || d[h.prop] === '0') {
                                    }else {
                                        validate = false;
                                        validateText = h['label'] + '为必填字段';
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                if (!validate) {
                     Message({
                      message: validateText,
                      type: 'warning',
                      duration: 3 * 1000
                    });
                }
                obj.success(validate);
                return validate;
            });
        });
    },
    methods: {
        toggleRowSelection(row, selected) {
            this.$refs.elTable.toggleRowSelection(row, selected);
        },
        limitDigit(index, prop, val) {
            this.data[index][prop] = val;
        },
        __select(selection, row) {
            this.$emit("select", selection,row);
        },
        __selectAll(selection) {
            this.$emit("select-all", selection);
        },
        __rowClick(row) {
            if (this.rowSelection) {
                this.$refs.elTable.toggleRowSelection(row);
            }
            this.$emit("row-click", row);
        },
        __rowDbClick(row) {
            this.$emit("row-db-click", row);
        },
        __selectionChange(selection) {
            this.$emit("selection-change", selection);
        },
        __sortChange({ column, prop, order }) {
            this.$emit("sort-change", { column, prop, order });
        },
        __currentChange(selection) {
            this.$emit("current-change", selection);
        },
        __cellClick(row, column, cell) {
            $(cell).off('mouseup')
            $(cell).on('mouseup',(e)=>{
                let event = e || window.event;
                event.stopPropagation();
            });
            if (this.$store.getters.selectedTableId != jQuery(cell).parents('.common-table')[0].dataset.tableid) {
                $(document).trigger('mouseup');
            }
            this.isTriggerBlur = false;
            if (eventBus._events['changeTrigger']) {
                delete eventBus._events['changeTrigger'];
            }
            eventBus.$on('changeTrigger', (val) => {
                this.isTriggerBlur = val;
            });

            this.selectedId = jQuery(cell).parents('.common-table')[0].dataset.tableid;
            this.$store.dispatch('setTableId', jQuery(cell).parents('.common-table')[0].dataset.tableid);
            if (document.querySelector('.editable .el-dialog__wrapper') && (document.querySelector('.editable .el-dialog__wrapper').style.display == 'block' || document.querySelector('.editable .el-dialog__wrapper').style.display ==  '')) {
                return;
            }
            if (!this.data[0].$index) {
                this.data.forEach((obj, index)=>{
                    obj.$index = index;
                });
            }
            if (this.editObj[row.$index] && this.editObj[row.$index][column.property]) {
                // 重复点击同一个单元格 不生效
                return;
            }

            this.editObj = {};
            this._index = row.$index;
            this.selectedIndex = row.$index;
            this.selectedProp = column.property;
            // console.log('primary => ', this.selectedIndex, this.selectedProp);
            this.editObj[row.$index] = {};
            this.editObj[row.$index][column.property] = true;
            this.$emit("cell-click", row, column, cell);

            

            this.$nextTick(() => {
                if (eventBus._events['tabKeyToggle']) {
                    delete eventBus._events['tabKeyToggle'];
                }
                eventBus.$on('tabKeyToggle', (e)=>{
                    e.preventDefault();
                    if (document.querySelector('.editable .el-dialog__wrapper') && document.querySelector('.editable .el-dialog__wrapper').style.display != 'none') {
                    }else {
                        this.tabKeyDown(this);
                    }
                });

            });

        },
        __cellMouseEnter(row, column, cell) {
            this.$emit("cell-mouse-enter", row, column, cell);
        },
        __cellMouseLeave(row, column, cell) {
            this.$emit("cell-mouse-leave", row, column, cell);
        },
        __headerClick(column, e) {
            // let headers = this.headers;
            // headers[2]=[headers[3], headers[3]=headers[2]][0]
            // console.log(this.headers);
            // eventBus.$emit('headersChange',this);
            var selectedCol = document.querySelector('thead>tr .' + column.id);
            var node = selectedCol.cloneNode(true);
            node.className = 'custom-move';
            node.style.width = column.realWidth + 'px';
            var e = event || window.event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = e.pageX || e.clientX + scrollX;
            var y = e.pageY || e.clientY + scrollY;
            console.log('x: ' , x , '\ny: ' , y);
            document.querySelector('body').appendChild(node);
            node.style.left = x - node.offsetWidth/2 + 'px';
            node.style.top = y - node.offsetHeight/2 + 'px';

        },
        __mousemove() {
        },
        tabKeyDown(vm) {
            for (var i = 0; i < vm.headers.length; i++) {
                // if (vm.headers[i]['prop'] && Object.keys(vm.editObj[vm._index]).indexOf(vm.headers[i]['prop']) != -1) {
                if (vm.headers[i]['prop'] && vm.editObj[vm._index][vm.headers[i]['prop']]) {
                    vm.editObj = {};
                    vm.editObj[vm._index] = {};
                    if (i == vm.headers.length - 1) {
                        vm.editObj = {};
                        vm._index++;
                        i = 0;
                        var j = 0;
                        while(j < vm.headers.length - i){
                            j++;
                            if (vm.headers[i+j]['template'] || vm.headers[i+j]['editable']) {
                                vm.editObj[vm._index] = {};
                                vm.editObj[vm._index][vm.headers[i+j]['prop']] = true;
                                vm.selectedIndex = vm._index;
                                vm.selectedProp = vm.headers[i+j]['prop'];
                                return;
                            }
                        }
                        return;
                    }
                    var j = 0;
                    while(j < vm.headers.length - i){
                        j++;
                        if (vm.headers[i+j]['template'] || vm.headers[i+j]['editable']) {
                            vm.editObj[vm._index][vm.headers[i+j]['prop']] = true;
                            vm.selectedIndex = vm._index;
                            vm.selectedProp = vm.headers[i+j]['prop'];
                            return;
                        }
                    }
                }
            }
        }

    },
    filters: {
        parseTime(val) {
            if (val && val != '') {
                return moment(val).format('YYYY-MM-DD HH:mm:ss')
            }else {
                return '';
            }

        }
    },
    // computed: {
    //     $index() {
    //         return this.data[0].$index;
    //     }
    // },
    watch: {
        data: {
            immediate: true,
            // deep: true,
            handler(val, oldVal) {
                val.forEach((obj, index)=>{
                    obj.$index = index;
                });
            }
        },
        editObj: {
            // immediate: true,
            // deep: true,
            handler(val, oldVal) {

                let vm = this;
                let selectedIndex = vm.selectedIndex;
                let selectedProp = vm.selectedProp;
                // console.log('before: ', selectedIndex, selectedProp, '..vm.editObj[selectedIndex][selectedProp] => ', vm.editObj[selectedIndex][selectedProp]);
                vm.$nextTick(()=>{
                    if (document.querySelector('.editable input')) {
                        let myCls = '.table' + vm.selectedId + ' .editable input';
                        let input = jQuery(document.querySelector(myCls));
                        input.focus();
                        input.off('focus');  //避免重复绑定
                        input.select();
                        input.off('select');  //避免重复绑定
                        if (document.querySelector('.editable .el-dialog__wrapper')) {
                        }else {
                            // if (!vm.isTriggerBlur) {
                            //     vm.isTriggerBlur = true;
                            //     return;
                            // }
                            // console.log('vm.isTriggerBlur=> ', vm.isTriggerBlur);
                            // input.off('blur');  //避免重复绑定
                            // input.blur(()=>{
                            //     $(document).on('mouseup', ()=>{
                            //         setTimeout(()=>{
                            //             if (vm.editObj[selectedIndex]) {
                            //                 vm.editObj[selectedIndex][selectedProp] = false;
                            //                 vm.$refs.elTable.doLayout();
                            //                 $(document).off('mouseup');  //避免重复绑定
                            //                 // console.log('after: ', selectedIndex, selectedProp, '..vm.editObj[selectedIndex][selectedProp] => ', vm.editObj[selectedIndex][selectedProp]);
                            //             }
                            //         }, 150);
                            //     })
                            // })
                        }
                    }
                })

            }
        },
        isTriggerBlur(val, oldVal) {
            if (val) {
                let vm = this;
                let selectedIndex = vm.selectedIndex;
                let selectedProp = vm.selectedProp;
                vm.$nextTick(()=>{
                    if (document.querySelector('.editable input')) {
                        let myCls = '.table' + vm.selectedId + ' .editable input';
                        let input = jQuery(document.querySelector(myCls));
                        // if (document.querySelector('.editable .el-dialog__wrapper')) {
                        // }else {
                            // console.log('isTriggerBlur=> ', vm.isTriggerBlur);
                            // input.off('blur');  //避免重复绑定
                            // input.blur(()=>{
                                // $(document).on('mouseup', ()=>{
                                    setTimeout(()=>{
                                        if (vm.editObj[selectedIndex]) {
                                            vm.editObj[selectedIndex][selectedProp] = false;
                                            vm.$refs.elTable.doLayout();
                                            // $(document).off('mouseup');  //避免重复绑定
                                            // console.log('after: ', selectedIndex, selectedProp, '..vm.editObj[selectedIndex][selectedProp] => ', vm.editObj[selectedIndex][selectedProp]);
                                        }
                                    }, 150);
                                // })
                            // })
                        // }
                    }
                })
            }
        }
    }
}



//----------------------------example----------------------------
// <template>
//     <div>
//         <el-button @click="onClick">获取list</el-button>
//         <common-table
//         :data="list"
//         :maxHeight="300"
//         :fit="true"
//         :headers="headers"
//         @cell-click="handleCellClick"
//         >
//             <template slot-scope="scope">
//                 <div v-if="scope.text == 'select'">
//                     <el-select v-model="value4" clearable placeholder="请选择">
//                         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
//                         </el-option>
//                     </el-select>
//                 </div>
//                 <div v-if="scope.text == 'date'">
//                     <el-date-picker v-model="list[scope.index]['date']" type="date" placeholder="选择日期">
//                     </el-date-picker>
//                 </div>
//                 <div v-if="scope.text == 'input'">
//                     <el-input v-model="list[scope.index]['name']"></el-input>
//                 </div>
//             </template>
//         </common-table>
//     </div>
// </template>
//
//
// --js代码--
//
// const headers = [
//     { prop: 'checkbox', width: 100, type: 'selection'},
//     { prop: 'date', label: '日期', template: 'date', editable: true },
//     { prop: 'name', label: '姓名', template: 'input' },
//     { prop: 'address', label: '地址' }
// ];
// const baseList = [{
//                 date: '2016-05-03',
//                 name: '王小虎',
//                 address: '上海市普陀区金沙江路 1518 弄'
//             }, {
//                 date: '2016-05-02',
//                 name: '王小虎',
//                 address: '上海市普陀区金沙江路 1518 弄'
//             }, {
//                 date: '2016-05-04',
//                 name: '王小虎',
//                 address: '上海市普陀区金沙江路 1518 弄'
//             }, {
//                 date: '2016-05-01',
//                 name: '王小虎',
//                 address: '上海市普陀区金沙江路 1518 弄'
//             }, {
//                 date: '2016-05-08',
//                 name: '王小虎',
//                 address: '上海市普陀区金沙江路 1518 弄'
//             }, {
//                 date: '2016-05-06',
//                 name: '王小虎',
//                 address: '上海市普陀区金沙江路 1518 弄'
//             }, {
//                 date: '2016-05-07',
//                 name: '王小虎',
//                 address: '上海市普陀区金沙江路 1518 弄'
//             }];
// export default {
//     data() {
//         return {
//             options: [{
//                 value: '选项1',
//                 label: '黄金糕'
//             }, {
//                 value: '选项2',
//                 label: '双皮奶'
//             }, {
//                 value: '选项3',
//                 label: '蚵仔煎'
//             }, {
//                 value: '选项4',
//                 label: '龙须面'
//             }, {
//                 value: '选项5',
//                 label: '北京烤鸭'
//             }],
//             value4: '',
//             value1: '',
//             headers: headers,
//             list: baseList

//         }
//     },
//     methods: {
//         handleCellClick(row, column, cell) {
//             console.log(row, column, cell);
//         },
//         onClick() {
//             console.log(this.list);
//         }
//     }
// }

//

//----------------------------example----------------------------
</script>
<style rel="stylesheet/scss" lang="scss">
.custom-move {
    text-align: center;
    padding: 0;
    height: 23px;
    line-height: 23px;
    padding-right: 10px;
    padding-left: 10px;
    background-color: #eef1f6;
    color: #5a5e66;
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    opacity: 0.8;
}

.required-col>div::before {
    content: '*';
    color: #ff4949;
    margin-right: 4px;
    font-weight: 700;
    font-size: 16px;
    line-height: 1;
}

</style>