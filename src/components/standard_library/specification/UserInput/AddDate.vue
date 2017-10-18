<style lang="less">
@import "../../../../styles/difinitions";

    .AddDate {
        //混合-标签大小
        .Tag-size(@width: 90%) {
            width: @width;
            height: 100%;
            min-width: 70px;
            min-height: 30px;
            margin-right: 10px;
        }

        //内容
        .content-container {
            width: 100%;
            
            .input-container {
                display: flex;

                //文本域
                .input-main {
                    width: 95%;
                    margin-bottom: 10px;
                }
                //文本域删除图标
                .delete-input {
                    width: 5%;
                }
            }
            
            //添加按钮
            .add-btn {
                // margin-top: 10px;
                margin-bottom: 10px;
                width: 100%;
                height: 30px;
            }
             //添加
            .add-container {
                .add-input {
                    .Tag-size(100%);
                }
            }
        }
        .date-picker {
            width: 100%;
        }
    }
</style>

<template>
    <div class="AddDate">
        <!-- 多个日期 -->
        <div v-if="isMultiply">
            <!-- 可编辑状态 -->
            <div class="content-container" v-if="isEdit">
                
                <div class="input-container" v-for="(item, index) in list" :key="index">
                    <Input class="input-main" v-model="item.value" :placeholder="placeholder"></Input>
                    <Button class="delete-input" icon="delete" type="info" @click="deleteItem"> </Button>
                </div>

                <div>
                    <Button class="add-btn" icon="add" type="info" @click="addItem"> </Button>
                </div>

                <div class="add-container" v-show="!ableAdd">
                    <Input class="add-input" v-model="itemModel" :placeholder="placeholder" :maxlength="64"></Input>
                    <Button @click="confirmAddItem">确认添加</Button>
                </div>
            </div>
            <!-- 不可编辑状态 -->
            <div v-else>
                <div class="item" v-for="item in list" :key="item.value" :title="item.value">
                    {{ item.value }}
                </div>
            </div>
        </div>
        <!-- 单日期 -->
        <div v-else>
            <!-- 可编辑状态 -->
            <div class="content-container" v-if="isEdit">
                <DatePicker 
                    class="date-picker"
                    :value="singleDateModel"
                    format="yyyy年MM月dd日"
                    @on-change="dateChange"
                    :editable="false" 
                    :placeholder="placeholder">
                </DatePicker>
            </div>
            <!-- 不可编辑状态 -->
            <div v-else>
                <DatePicker class="date-picker" :value="singleDateModel" :readonly="true"></DatePicker>
            </div>    
        </div>
    </div>
</template>

<script>
export default {
    props: {
        //是否为编辑状态
        isEdit: {
            type: Boolean,
            default: false
        },

        //是否为单日期 默认为可添加多项日期
        isMultiply: {
            type: Boolean,
            default: false
        },
        
        //单日期
        //格式为yyyy-MM-dd
        singleDate: {
            type: String,
            default: ''
        },
        //多日期
        multiplyDate: {
            type: Array,
            default: () => []
        },

        //输入框的占位符
        placeholder: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            singleDateModel: this.singleDate,

            multiplyDateModel: this.multiplyDate,

            //已填写的list
            list: [],

            //是否可继续添
            ableAdd: true,

            //用户输入
            itemModel: ''
        };
    },
    computed: {

    },
    methods: {

        dateChange (data) {
            // console.log(data);
            this.singleDateModel = data;
        },

        //添加
        addItem () {
            //清空用户输入
            this.itemModel = '';
            //设置为不可添加 (显示输入框)
            this.ableAdd = false;
        },

        //确认添加
        confirmAddItem () {
            if (this.canSubmit) {
                //将用户输入推入已填写list
                this.list.push({ value: this.itemModel });
                //设置为可添加
                this.ableAdd = true;
            } else {
                this.$Message.warning({ content: '输入不可为空!' });
            }
        },

        //删除
        deleteItem (event, name) {
            const index = this.list.indexOf(name);
            this.list.splice(index, 1);
        }
    }
};
</script>
