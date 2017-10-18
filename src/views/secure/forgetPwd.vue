<style lang="less" scoped>
.step-container {
    display: block;
    margin: 30px auto;
    width: 60%;
}
.step-content-panel {
    width: 400px;
    display: block;
    margin: 0 auto;
}
</style>


<template>
    <div>
        <div class="step-container">
            <Steps :current="currentStep">
                <Step title="身份验证"></Step>
                <Step title="修改密码"></Step>
                <Step title="管理员审核"></Step>
                <Step title="完成"></Step>
            </Steps>
        </div>
        <div class="step-content-panel">
            <div v-if="currentStep === 0">
                <Form :model="step1Form" :rules="step1FormRule" label-position="top">
                    <Form-item label="请输入你需要找回密码的账户名" prop="account">
                        <Input :value="step1Form.account"></Input>
                    </Form-item>
                    <Form-item label="请输入获取的6位数短信验证码" prop="verify">
                        <Row>
                            <Col span="15"><Input :value="step1Form.verify"></Input></Col>
                            <Col span="9"><Button style="width: 100%">获取验证码</Button></Col>
                        </Row>
                    </Form-item>
                    <Form-item>
                        <Button @click="nextStep()">下一步</Button>
                    </Form-item>
                </Form>
            </div>
            <div v-if="currentStep === 1">
                <div style="margin-top: 60px;">新密码（6-12个字符）</div>
                <div style="margin-bottom:30px;"><Input></Input></div>
                <div>确认新密码</div>
                <div style="margin-bottom:30px;"><Input></Input></div>
                <Button @click="nextStep()">下一步</Button>
            </div>
            <div v-if="currentStep === 2">
                <div style="text-align: center;">
                    <div style="margin-top: 60px; margin-bottom: 60px;">
                        <div>
                            <Icon type="coffee" style="font-size: 40px;"></Icon>
                        </div>
                        管理员正在审核，请耐心等待
                    </div>
                    <Button @click="nextStep()">刷新</Button>
                </div>
            </div>
            <div v-if="currentStep === 3">
                <div style="text-align: center;">
                    <div style="margin-top: 60px; margin-bottom: 60px;">
                        <div>
                            <Icon type="ios-checkmark" style="font-size: 40px;"></Icon>
                        </div>
                        审核已通过
                    </div>
                    <Button @click="goToMainPage()">进入医生端页面</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentStep: 0,
            step1Form: {
                account: "",
                verify: ""
            },
            step1FormRule: {
                account: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                verify: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        nextStep() {
            this.currentStep++;
        },
        goToMainPage() {
            this.$router.push("/");
        }
    }
};
</script>
