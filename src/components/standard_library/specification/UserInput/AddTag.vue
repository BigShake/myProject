<style lang="less">
@import "../../../../styles/difinitions";

    .AddTag {
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
            .add-tag {
                display: inline-flex;
                justify-content: space-between;
                align-items: center;
                .Tag-size();
                max-height: 30px;
                .ivu-tag-text {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .add-btn {
                .Tag-size();
            }
        }
        //添加
        .add-container {
            .add-input {
                width: 50%;
            }
        }
        //完成编辑后
        .item {
            width: 24%;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 30px;
            border: 1px solid @c-main;
            border-radius: 3px;
            padding: 0 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            margin-right: 1%;
        }
    }
</style>

<template>
    <div class="AddTag">
        <!-- 可编辑状态 -->
        <div v-if="isEdit">
            <Row class-name="content-container" type="flex" justify="start" v-if="isEdit">
                <Col span="6" v-for="item in list" :key="item">
                    <Tag class="add-tag" :name="item" closable @on-close="deleteItem" :title="item">
                        {{ item }}
                    </Tag>
                </Col>
                <Col span="6">
                    <Button class="add-btn" icon="add" type="info" size="small" @click="addItem"> </Button>
                </Col>
            </Row>
            <Row class="add-container" v-show="!ableAdd">
                <Input class="add-input" v-model="itemModel" :placeholder="placeholder" :maxlength="64"></Input>
                <Button @click="confirmAddItem">确认添加</Button>
            </Row>
        </div>
        <!-- 不可编辑状态 -->
        <div v-else>
            <Row>
                <Col class="item" span="6" v-for="item in list" :key="item" :title="item">
                    {{ item }}
                </Col>
            </Row>
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

            //是否可继续添加
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
                this.list.push(this.itemModel);
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
