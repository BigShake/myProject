<style lang="less">
    .DrugClassificationOperation {
        
        .btn-container {
            display: inline-flex;
            justify-content: flex-end;
            align-items: center ;

            .btn:not(:first-child) {
                margin-left: 15px;
            }
        }
    }
</style>

<template>
    <div class="DrugClassificationOperation" v-if="isShowComponent">
        <div class="btn-container">
            <IconBtn class="btn" iconName="edit" title="编辑药品" :onBtnClick="jumpEditGroupPage"></IconBtn>
            <IconBtn class="btn" iconName="delete" title="删除药品" :onBtnClick="handleDeleteGroup"></IconBtn>
        </div>
    </div>
</template>

<script>
import util from "../../../libs/util";
export default {
    props: {
        //药品id
        drugId: {
            type: Number,
            default: 1
        },
        //是否有权限 0有
        hasAuth: {
            type: Number,
            default: 0
        }
    },
    computed: {
        //根据权限判断是否展示此组件
        isShowComponent () {
            if (this.hasAuth === 0) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        /**
         * 跳转到编辑药品页面
         * 
         * @event IconBtn#click
         */
        jumpEditGroupPage () {
            // const routeParam = this.drugId;
            // this.$router.push("/patient_edit_group/" + routeParam);
        },

        /**
         * 删除药品,激活modal
         * 
         * @event IconBtn#click
         */
        handleDeleteGroup () {
            //删除药品(模态框确认的回调)
            let deleteGroup = () => {
                let _this = this;
                let param = {
                    "drugId": _this.drugId
                };
                util.request(global.API_PREFIX + "/standardDrug/deleteDrug", param
                ).then(function(response) {
                    if (response.data.code === 1) {
                        _this.$Message.success(response.data.mess);
                        _this.$emit('drug-delete', true);
                    } else {
                        _this.$Message.error(response.data.mess);
                        _this.$emit('drug-delete', false);
                    }
                });
            };

            //模态框配置
            let config = {
                'title': '删除药品分类名称',
                'content': '是否删除该药品分类名称',
                'okText': '确认',
                'cancelText': '取消',
                'onOk': deleteGroup
            };
            
            this.$Modal.confirm(config);
        }
    }
};
</script>
