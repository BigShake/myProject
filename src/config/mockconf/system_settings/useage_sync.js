(function(Mock) {
    //同步用法
    //参数 无
    Mock.mock(
        global.API_PREFIX + "/useageSync/synchronization",
        "post",
        require("../../../data/useageSync/synchronization.js").default
    );
    //获取用法列表
    //参数 分页参数和用法名称(content)
    Mock.mock(
        global.API_PREFIX + "/useageSync/getList",
        "post",
        require("../../../data/useageSync/getList.js").default
    );
})(require("mockjs"));
