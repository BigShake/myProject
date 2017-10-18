(function(Mock) {
    //获取病区列表
    Mock.mock(
        global.API_PREFIX + "/deptSync/getList",
        "post",
        require("../../../data/deptSync/getList.js").default
    );

    //获取病人信息
    Mock.mock(
        global.API_PREFIX + "/patient/getList",
        "post",
        require("../../../data/patient/getList.js").default
    );

    //同步病区
    Mock.mock(
        global.API_PREFIX + "/patient/synchronization",
        "post",
        require("../../../data/patient/synchronization.js").default
    );
})(require("mockjs"));
