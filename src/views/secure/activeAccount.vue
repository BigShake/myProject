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
.info-table-row {
    margin: 20px 0;
}
</style>


<template>
    <div>
        <div class="step-container">
            <Steps :current="currentStep">
                <Step title="验证临时账号"></Step>
                <Step title="添加新账号"></Step>
                <Step title="填写账号信息"></Step>
                <Step title="完成"></Step>
            </Steps>
        </div>
        <div class="step-content-panel">
            <div v-if="currentStep === 0">
                <div style="margin-top: 60px;">临时账号</div>
                <div style="margin-bottom:30px;"><Input></Input></div>
                <div>密码</div>
                <div style="margin-bottom:30px;"><Input></Input></div>
                <Button @click="nextStep()">下一步</Button>
            </div>
            <div v-if="currentStep === 1">
                <div style="margin-top: 60px;">账号</div>
                <div style="margin-bottom:30px;"><Input disabled :value="currentAccount"></Input></div>
                <div>密码</div>
                <div style="margin-bottom:30px;"><Input type="password"></Input></div>
                <div>确认新密码</div>
                <div style="margin-bottom:30px;"><Input type="password"></Input></div>
                <Button @click="nextStep()">下一步</Button>
            </div>
            <div v-if="currentStep === 2">
                <div>
                    <div>
                        注：账户激活后，“姓名、性别、所属医院”将不可修改，请谨慎填写
                    </div>
                    <div style="margin-bottom: 30px;">
                        <Row class="info-table-row" type="flex" align="middle">
                            <Col span="5"><span class="info-label">头像</span></Col>
                            <Col span="19">
                                <PatientHead></PatientHead>
                            </Col>
                        </Row>
                        <Row class="info-table-row" type="flex" align="middle">
                            <Col span="5"><span class="info-label">姓名</span></Col>
                            <Col span="19">
                                <Input></Input>
                            </Col>
                        </Row>
                        <Row class="info-table-row" type="flex" align="middle">
                            <Col span="5"><span class="info-label">性别</span></Col>
                            <Col span="19">
                                <Input></Input>
                            </Col>
                        </Row>
                        <Row class="info-table-row" type="flex" align="middle">
                            <Col span="5"><span class="info-label">手机号</span></Col>
                            <Col span="19">
                                <Input></Input>
                            </Col>
                        </Row>
                        <Row class="info-table-row" type="flex" align="middle">
                            <Col span="5"><span class="info-label">所属医院</span></Col>
                            <Col span="19">
                                <Input></Input>
                            </Col>
                        </Row>
                        <Row class="info-table-row" type="flex" align="middle">
                            <Col span="5"><span class="info-label">职位</span></Col>
                            <Col span="19">
                                <Input></Input>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col offset="5" span="19">
                            <Button @click="nextStep()">下一步</Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <div v-if="currentStep === 3">
                <div style="text-align: center;">
                    <div style="margin-top: 60px; margin-bottom: 60px;">
                        <div>
                            <Icon type="ios-checkmark" style="font-size: 40px;"></Icon>
                        </div>
                        新账号 “1356245685” 激活已完成
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
            currentAccount: "1356245685"
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
