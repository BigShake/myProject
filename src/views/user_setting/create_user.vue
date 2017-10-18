<style lang="less">
@import "../../styles/difinitions";

.create_user {
    .center () {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    height: 100%;
    padding: 30px 0;

    .content-container {

    }

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

    .submit-info-container {
            // .center();
            .info-icon-container {
                .center();
            }
        }
}
</style>

<template>
    <div class="create_user">
        <div class="step-container">
            <Steps :current="currentStep">
                <Step title="验证临时账号"></Step>
                <Step title="添加新账号"></Step>
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
                 <div class="submit-info-container">
                    <div class="info-icon-container">
                        <Icon type="checkmark-circled" size="30" color="#45c8bc"></Icon>
                    </div>
                    <div>密码设置成功</div>
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
