(function(Mock) {
    //获取药品分类列表
    Mock.mock(
        global.API_PREFIX + "/drugClassify/getDrugList",
        "post",
        require("../../../data/drugClassify/getDrugList.js").default
    );
    //新增
    Mock.mock(
        global.API_PREFIX + "/drugClassify/addDrugClassify",
        "post",
        require("../../../data/drugClassify/addDrugClassify.js").default
    );
    //修改
    Mock.mock(
        global.API_PREFIX + "/drugClassify/updateDrug",
        "post",
        require("../../../data/drugClassify/updateDrug.js").default
    );
    //删除
    Mock.mock(
        global.API_PREFIX + "/drugClassify/deleteDrug",
        "post",
        require("../../../data/drugClassify/deleteDrug.js").default
    );
    //搜索
    Mock.mock(
        global.API_PREFIX + "/drugClassify/searchDrug",
        "post",
        require("../../../data/drugClassify/searchDrug.js").default
    );
})(require("mockjs"));
