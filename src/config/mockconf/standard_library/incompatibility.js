(function(Mock) {
    //获取药品或者成份
    Mock.mock(
        global.API_PREFIX + "/incompatibility/addIncompatibilitySecond",
        "post",
        require("../../../data/incompatibility/addIncompatibilitySecond.js").default
    );

    // 药品或成份搜索
    //keyWord type1药品 2成份
    Mock.mock(
        global.API_PREFIX + "/incompatibility/searchFirst",
        "post",
        require("../../../data/incompatibility/searchFirst.js").default
    );

    // 获取配伍禁忌列表
    Mock.mock(
        global.API_PREFIX + "/incompatibility/searchIncompatibility",
        "post",
        require("../../../data/incompatibility/searchIncompatibility.js").default
    );

    // 获取药品
    Mock.mock(
        global.API_PREFIX + "/incompatibility/getDrugList",
        "post",
        require("../../../data/incompatibility/getDrugList.js").default
    );

    // 获取成分
    Mock.mock(
        global.API_PREFIX + "/incompatibility/getCompList",
        "post",
        require("../../../data/incompatibility/getCompList.js").default
    );

   
})(require("mockjs"));
