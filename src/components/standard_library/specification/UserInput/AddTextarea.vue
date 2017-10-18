<style lang="less">
    .AddTextarea {
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
            
            .ivu-btn.ivu-btn-icon-only {
                min-height: 30px;
                width: 100%;
            }
            .textarea-container {
                display: flex;

                //文本域
                .input-textarea {
                    width: 95%;
                    margin-bottom: 10px;
                }
                //文本域删除图标
                .delete-textarea {
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
        //
        .textarea-container {
            width: 100%;
            margin-bottom: 10px;
        }
    }
</style>

<template>
    <div class="AddTextarea">
        <!-- 可编辑状态 -->
        <div class="content-container" v-if="isEdit">
            
            <div class="textarea-container" v-for="(item, index) in list" :key="index">
                <Input class="input-textarea" v-model="item.value" type="textarea" :placeholder="placeholder" :rows="rows"></Input>
                <Button class="delete-textarea" icon="delete" type="info" @click="deleteItem"> </Button>
            </div>

            <div>
                <Button class="add-btn" icon="add" type="info" @click="addItem"> </Button>
            </div>

            <div class="add-container" v-show="!ableAdd">
                <Input class="add-input" v-model="itemModel" type="textarea" :placeholder="placeholder" :rows="rows" :maxlength="65535"></Input>
                <Button @click="confirmAddItem">确认添加</Button>
            </div>
        </div>
        <!-- 不可编辑状态 -->
        <div v-else>
            <div class="textarea-container" v-for="(item, index) in list" :key="index">
                <Input v-model="item.value" type="textarea" :readonly="!isEdit" :rows="rows" ></Input>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        //是否为编辑状态 默认不可编辑
        isEdit: {
            type: Boolean,
            default: false
        },

        //输入框的默认行
        rows: {
            type: Number,
            default: 3
        },
        //输入框的占位符
        placeholder: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            //已填写的list
            list: [],

            //是否可继续添
            ableAdd: true,

            //用户输入
            itemModel: ''
        };
    },
    computed: {
        //判断用户输入是否为空
        canSubmit () {
            return this.itemModel.toString().trim();
        }
    },
    methods: {

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
