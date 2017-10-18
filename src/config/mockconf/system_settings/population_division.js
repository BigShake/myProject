(function(Mock) {
    //获取人群划分列表
    Mock.mock(
        global.API_PREFIX + "/crowdKind/getList",
        "post",
        require("../../../data/crowdKind/getList.js").default
    );
    //刪除人群划分
    Mock.mock(
        global.API_PREFIX + "/crowdKind/deleteCrowd",
        "post",
        require("../../../data/crowdKind/deleteCrowd.js").default
    );


})(require("mockjs"));
