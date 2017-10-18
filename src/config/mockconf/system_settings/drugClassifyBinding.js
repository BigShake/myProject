(function(Mock) {
    // 查询已绑定药品名称/查看已绑定药品
    Mock.mock(
        global.API_PREFIX + "/drugClassifyBinding/searchDrugBinding",
        "post",
        require("../../../data/drugClassifyBinding/searchDrugBinding.js").default
    );
    //查询未绑定药品名称/查看未绑定药品
    Mock.mock(
        global.API_PREFIX + "/drugClassifyBinding/searchDrugUnBinding",
        "post",
        require("../../../data/drugClassifyBinding/searchDrugUnBinding.js").default
    );
    //获取所有分类名称（不分页处理）
    Mock.mock(
        global.API_PREFIX + "/drugClassify/getDrugList",
        "post",
        require("../../../data/drugClassify/getDrugList.js").default
    );
})(require("mockjs"));
