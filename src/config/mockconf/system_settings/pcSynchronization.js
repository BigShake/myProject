(function(Mock) {
    //获取频次列表
    Mock.mock(
        global.API_PREFIX + "/frequency/getList",
        "post",
        require("../../../data/frequency/getList.js").default
    );

    //同步病区
    Mock.mock(
        global.API_PREFIX + "/frequency/synchronization",
        "post",
        require("../../../data/frequency/synchronization.js").default
    );

})(require("mockjs"));
