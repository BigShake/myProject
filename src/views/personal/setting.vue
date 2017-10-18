<style lang="less" scoped>
.tag-panel {
    padding: 50px;
}
.userinfo-row {
    height: 60px;
}
.userinfo-form-item {
    width: 300px;
    margin-bottom: 30px;
}
</style>


<template>
    <div>
        <div class="title-content-block">
            <Button :type="tagType === 'personalInfo' ? null : 'ghost'" @click="changeTag('personalInfo')" >个人资料</Button>
            <Button :type="tagType === 'changePwd' ? null : 'ghost'" @click="changeTag('changePwd')">修改密码</Button>
        </div>
        <div class="tag-panel">
            <div v-show="tagType === 'personalInfo'">
                <Row type="flex" align="middle" class="userinfo-row">
                    <Col span="3"><span class="userinfo-label">头像</span></Col>
                    <Col span="5">
                        <PatientHead size="50" url="http://112.64.32.192:9080/capd_android_web/uploadFolder/uploadImg//1492745885228.jpg"></PatientHead>
                    </Col>
                </Row>
                <Row type="flex" align="middle" class="userinfo-row">
                    <Col span="3"><span class="userinfo-label">姓名</span></Col>
                    <Col span="5">
                        <span>李雷</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle" class="userinfo-row">
                    <Col span="3"><span class="userinfo-label">性别</span></Col>
                    <Col span="5">
                        <span>女</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle" class="userinfo-row">
                    <Col span="3"><span class="userinfo-label">手机号</span></Col>
                    <Col span="5">
                        <span>13455655566</span>
                    </Col>
                    <Col span="3"><Button type="text"><Icon type="edit"></Icon>修改</Button></Col>
                </Row>
                <Row type="flex" align="middle" class="userinfo-row">
                    <Col span="3"><span class="userinfo-label">所属医院</span></Col>
                    <Col span="5">
                        <span>XXXXXXXXX医院</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle" class="userinfo-row">
                    <Col span="3"><span class="userinfo-label">职位</span></Col>
                    <Col span="5">
                        <span>主任医师</span>
                    </Col>
                    <Col span="3"><Button type="text"><Icon type="edit"></Icon>修改</Button></Col>
                </Row>
            </div>
            <div v-show="tagType === 'changePwd'">
                <div class="userinfo-form-item">定期修改密码，有助于保护您的账户安全</div>
                <div class="userinfo-form-item">
                    <div>原密码</div>
                    <Input type="password"></Input>
                </div>
                <div class="userinfo-form-item">
                    <div>新密码（6-12个字符）</div>
                    <Input type="password"></Input>
                </div>
                <div class="userinfo-form-item">
                    <div>确认新密码</div>
                    <Input type="password"></Input>
                </div>
                <Button>确认修改</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tagType: "personalInfo"
        };
    },
    methods: {
        changeTag(tagType) {
            this.tagType = tagType;
        }
    }
};
</script>

