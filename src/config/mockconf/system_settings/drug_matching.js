(function(Mock) {
    //同步药品匹配
    //参数 无
    Mock.mock(
        global.API_PREFIX + "/drugMatching/synchronization",
        "post",
        require("../../../data/drugMatching/synchronization.js").default
    );
    //获取药品列表
    //参数 分页参数和分类id(classificationId)和药品名称or速查码(content)
    Mock.mock(
        global.API_PREFIX + "/drugMatching/getList",
        "post",
        require("../../../data/drugMatching/getList.js").default
    );
})(require("mockjs"));
