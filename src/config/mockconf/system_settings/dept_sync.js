(function(Mock) {
    //同步病区
    //参数 无
    Mock.mock(
        global.API_PREFIX + "/deptSync/synchronization",
        "post",
        require("../../../data/deptSync/synchronization.js").default
    );
    //获取病区列表
    //参数 分页参数和病区名称(content)
    Mock.mock(
        global.API_PREFIX + "/deptSync/getList",
        "post",
        require("../../../data/deptSync/getList.js").default
    );
})(require("mockjs"));
