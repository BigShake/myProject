(function(Mock) {
    //查看错误类型
    Mock.mock(
        global.API_PREFIX + "/errorType/getErrorType",
        "post",
        require("../../../data/errorType/getErrorType.js").default
    );
    //新增
    Mock.mock(
        global.API_PREFIX + "/errorType/addErrorType",
        "post",
        require("../../../data/errorType/addErrorType.js").default
    );
    //修改
    Mock.mock(
        global.API_PREFIX + "/drugClassify/updateDrug",
        "post",
        require("../../../data/drugClassify/updateDrug.js").default
    );
    //删除
    Mock.mock(
        global.API_PREFIX + "/errorType/deleteErrorType",
        "post",
        require("../../../data/errorType/deleteErrorType.js").default
    );
})(require("mockjs"));
