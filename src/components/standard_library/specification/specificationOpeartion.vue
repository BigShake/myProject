<style lang="less">
    .SpecificationOpeartion {
        
        .btn-container {
            display: inline-flex;
            justify-content: flex-end;
            align-items: center ;

            .btn:not(:first-child) {
                margin-left: 15px;
            }
        }
    }

    //编辑 模态框
    .specification-edit-modal {
        //混合-垂直居中
        .center () {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modal-content-row {
            margin: 10px 20px;

            .modal-content-col {
                min-height: 30px;
                .center();
            }
        }
        .footer-container {
            .center();
        }
    }
</style>

<template>
    <div class="SpecificationOpeartion">
        <div class="btn-container">
            <IconBtn class="btn" iconName="edit" title="编辑药品" :onBtnClick="handleEditDrug"></IconBtn>
            <IconBtn class="btn" iconName="delete" title="删除药品" :onBtnClick="handleDeleteDrug"></IconBtn>
        </div>
        <Modal
            v-model="editModal"
            title="编辑药品"
            :scrollable="true"
            :closable="false"
            :mask-closable="false"
            class-name="specification-edit-modal">
            <Row class-name="modal-content-row" align="middle" justify="center">
                <Col class-name="modal-content-col" span="8">药品名称</Col>
                <Col class-name="modal-content-col" span="16">
                    <Input v-model="drugNameModel" :maxlength="64"></Input>
                </Col>
            </Row>
            <Row class-name="modal-content-row" align="middle" justify="center">
                <Col class-name="modal-content-col" span="8">是否为溶媒</Col>
                <Col class-name="modal-content-col" span="16">
                    <RadioGroup v-model="isMenstruumModel">
                        <Radio label="是"></Radio>
                        <Radio label="否"></Radio>
                    </RadioGroup>
                </Col>
            </Row>
          
            <div class="footer-container" slot="footer">
                <Button @click="submitEdit">确定</Button>
                <Button type="dashed" @click="cancelEdit">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import util from "../../../libs/util";
export default {
    props: {
        //药品code
        drugCode: {
            type: String,
            default: ''
        },
        drugName: {
            type: String,
            default: ''
        },
        isMenstruum: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            editModal: false,
            drugNameModel: this.drugName,
            isMenstruumModel: this.isMenstruum === 0 ? '是' : '否'
            
        };
    },
    watch: {

    },
    computed: {
        //是否编辑药品名称的状态标志，编辑了则返回true，没有则false
        status () {
        }
    },
    methods: {
        /**
         * 编辑药品,激活modal
         * 
         * @event IconBtn#click
         */
        handleEditDrug () {
            this.editModal = true;
        },

        //编辑确认
        submitEdit () {
            let _this = this;
            if (this.drugNameModel.trim() === '') {
                _this.$Message.error('请填写药品名称');
            } else if (this.isMenstruumModel === '') {
                _this.$Message.error('请选择是否为溶媒');
            } else {
                let param = {
                    drugCode: this.drugCode,
                    drugName: this.drugNameModel,
                    isMenstruum: this.isMenstruumModel === '是' ? 0 : 1,
                    status: !(this.drugNameModel === this.drugName)
                };
                //编辑药品 接口
                util.request(global.API_PREFIX + "/standardSpecification/updateDrug", param
                ).then(function(response) {
                    if (response.data.code === 1) {
                        _this.$Message.success(response.data.mess);

                        _this.editModal = false;
                    } else {
                        _this.$Message.error(response.data.mess);
                    }
                });
            }
        },
        
        //关闭编辑模态框
        cancelEdit () {
            this.editModal = false;
        },


        /**
         * 删除药品,激活modal
         * 
         * @event IconBtn#click
         */
        handleDeleteDrug () {
            //删除药品(模态框确认的回调)
            let deleteGroup = () => {
                let _this = this;
                let param = {
                    "drugId": _this.drugId
                };
                util.request(global.API_PREFIX + "/standardDrug/deleteDrug", param
                ).then(function(response) {
                    if (response.data.code === 1) {
                        let mesObj = {
                            content: response.data.mess,
                            duration: 0
                        };
                        _this.$Message.success(mesObj);
                        _this.$emit('refresh-data', true);
                    } else {
                        _this.$Message.error(response.data.mess);
                        _this.$emit('refresh-data', false);
                    }
                });
            };

            //模态框配置
            let config = {
                'title': '删除药品',
                'content': '是否删除该药品?',
                'okText': '确认',
                'cancelText': '取消',
                'onOk': deleteGroup
            };
            
            this.$Modal.confirm(config);
        }
    }
};
</script>
