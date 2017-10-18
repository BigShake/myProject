
<style lang="less">
@import "../../styles/difinitions";

.modify_password {
    height: 100%;
    padding: 30px 0;

    .content-container {
        .center () {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .center();
        height: 100%;
        background-color: #fff;

        .form-container {
            .ivu-input {
                width: 300px;
                border-color: @c-table-border;
                
                &:hover {
                    border-color: @c-table-border;
                }
            }

            .ivu-input-wrapper {
                width: auto;
            }

            .ivu-form .ivu-form-item-label {
                .font-s();
            }
            .new-pwd-item {
                display: flex;

                .new-pwd-tip {
                    margin-left: 10px;
                    .font-xs();
                }
            }
        }

        .submit-info-container {
            // .center();
            .info-icon-container {
                .center();
            }
        }
    }
}
</style>

<template>
    <div class="modify_password">
        <div class="content-container">
            <div class="form-container" v-if="isForm">
                <Form ref="formModel" :model="formModel" :rules="formRule" label-position="top">
                    <Form-item label="请输入新密码" prop="oldPwd">
                        <Input type="text" v-model="formModel.oldPwd"></Input>
                    </Form-item>
                    <Form-item label="请输入旧密码" prop="newPwd">
                        <div class="new-pwd-item">
                            <Input v-model="formModel.newPwd"></Input>
                            <span class="new-pwd-tip">(6-12字符)</span>
                        </div>
                    </Form-item>
                    <Form-item label="确认密码" prop="confirmPwd">
                        <Input type="text" v-model="formModel.confirmPwd"></Input>
                    </Form-item>
                    <Form-item>
                        <Button @click="handleSubmit('formModel')">下一步</Button>
                    </Form-item>
                </Form>
            </div>
            <div class="submit-info-container" v-else>
                <div class="info-icon-container">
                    <Icon type="checkmark-circled" size="30" color="#45c8bc"></Icon>
                </div>
                <div>密码设置成功</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isForm: true,
            formModel: {
                oldPwd: "",
                newPwd: "",
                confirmPwd: ""
            },
            formRule: {
                oldPwd: [
                    { required: true, message: '请填写旧密码', trigger: 'blur' }
                ],
                newPwd: [
                    { required: true, message: '请填写新密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
                    { type: 'string', max: 12, message: '密码长度不能大于12位', trigger: 'blur' }
                ],
                confirmPwd: [
                    { required: true, message: '请确认新密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // this.$Message.success('验证成功!');
                    this.isForm = false;
                    // this.$router.push("/specification");
                } else {
                    this.$Message.error('验证失败!');
                }
            });
        }
    }
};
</script>
