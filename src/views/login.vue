<style lang="less">
@import "../styles/difinitions.less";

.login-page-view {
    width: 100%;
    height: 100%;
    background: @c-main url(../images/logo.png) no-repeat;

    .login-container {
        @container-height: 300px;
        @container-width: 660px;
        @conteint-width: 326px;
        border-radius: 5px;
        position: absolute;
        margin: 0 auto;
        top: 50%;
        left: 50%;
        margin-top: -@container-height / 2;
        margin-left: -@container-width / 2;
        width: @container-width;
        height: @container-height;
        border: 1px solid #b4b4b4;
        box-shadow: 1px 1px 8px rgba(0,0,0,0.1);
        box-sizing: border-box;
        // padding: 45px (@container-width - @conteint-width) / 2;

        .login-logo-container {
            height: @container-height;
            background: @c-main url(../images/logo.png) no-repeat;
            // background-image: url(../images/logo.png);
        }
        
        .login-form-container {
            @padding-width: 30px;
            padding: @padding-width;

            .ivu-input {
                border-color: @c-table-border;
                
                &:hover {
                    border-color: @c-table-border;
                }
            }

            .login-form-title {
                .font-xl();
                font-weight: 600;
                color: @c-main;
                text-align: center;
                width: 100%;
                display: inline-block;
                margin-bottom: @padding-width;

                .white-space {
                    display: inline-block;
                    width: 2em;
                }
            }

            .password-input-item {
                margin-bottom: 0;
            }

            .login-btn {
                margin-top: 30px;

                .ivu-btn {
                    width: 100%;
                    font-size: 18px;
                    height: 40px;
                }
            }
        }
    }


    .logo-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 12.5%;
        min-width: 300px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        .font-l();
        // background-color: @c-main;
        // background-image: url(../images/logo.png);
        // background-position: 50% 50%;
        // background-repeat: no-repeat;
        // background-size: auto 60%;
        // display: inline-block;
        // vertical-align: middle;
    }

    // .footer-copyright {
    //     position: absolute;
    //     bottom: 0;
    //     margin-bottom: 10px;
    //     .font-xs();
    //     text-align: center;
    //     width: 100%;
    // }
}
</style>


<template>
    <div class="login-page-view">
        <!-- logo -->
        <div class="logo-container">药品知识库管理系统</div>
        <div class="login-container">
            <Row>
                <Col span="12" class-name="login-logo-container">
                </Col>
                <Col span="12" class-name="login-form-container">
                    <Row>
                        <Col span="24">
                            <span class="login-form-title">登<span class="white-space"></span>录</span>
                        </Col>
                    </Row>
                    <Form ref="loginForm" :model="loginForm" :rules="formRule">
                        <Row>
                            <Col span="24">
                                <Form-item prop="username">
                                    <Input type="text" v-model="loginForm.username" placeholder="账户">
                                        <!-- <Icon type="ios-person-outline" slot="prepend"></Icon> -->
                                    </Input>
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                                <Form-item prop="password" class="password-input-item">
                                    <Input type="password" v-model="loginForm.password" placeholder="密码">
                                        <!-- <Icon type="ios-locked-outline" slot="prepend"></Icon> -->
                                    </Input>
                                </Form-item>
                            </Col>
                        </Row>
                        <!-- <Row>
                            <Col span="24">
                                <div style="width: 100%; text-align: right;"><Button type="text" @click="$router.push('/secure/iforget')">忘记密码？</Button></div>
                            </Col>
                        </Row> -->
                        <Row class="login-btn">
                            <Col span="24">
                                <Form-item>
                                    <Button @click="handleSubmit('loginForm')">登录</Button>
                                </Form-item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
        <!-- <div class="footer-copyright">
            Copyright ©2015 Baxter Healthcare Ltd. All rights reserved. "Baxter" 与 "百特"均为百特国际有限公司注册商标。
        </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            formRule: {
                username: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$Message.success('登录成功');
                    this.$router.push("/specification");
                } else {
                    this.$Message.error('登录失败');
                }
            });
        }
    }
};
</script>

