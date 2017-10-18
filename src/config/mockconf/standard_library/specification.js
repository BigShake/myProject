(function(Mock) {
    //获取溶媒
    Mock.mock(
        global.API_PREFIX + "/standardSpecification/getMenstruum",
        "post",
        require("../../../data/standardSpecification/getMenstruum.js").default
    );

    //获取内容设置
    // "drugCode":"H000247001"
    Mock.mock(
        global.API_PREFIX + "/standardDrug/getDrugContent",
        "post",
        require("../../../data/standardDrug/getDrugContent.js").default
    );

    //保存内容设置
    Mock.mock(
        global.API_PREFIX + "/standardDrug/saveDrugContent",
        "post",
        require("../../../data/standardDrug/saveDrugContent.js").default
    );

    //获取审方设置
    // "drugCode":"H000247001"
    Mock.mock(
        global.API_PREFIX + "/standardDrug/getPharmacyReview",
        "post",
        require("../../../data/standardDrug/getPharmacyReview.js").default
    );

    //保存审方设置
    Mock.mock(
        global.API_PREFIX + "/standardDrug/savePharmacyReview",
        "post",
        require("../../../data/standardDrug/savePharmacyReview.js").default
    );

    //获取药品列表
    // "content":"药品名称",
    // "classificationId":"1",
    // "confState":"已配置",
    // "perPage":10,
    // "currentPage": 1
    Mock.mock(
        global.API_PREFIX + "/standardDrug/getList",
        "post",
        require("../../../data/standardDrug/getList.js").default
    );
    
    //新增药品
    // "drugName":"你好112",
    // "isMenstruum":0
    Mock.mock(
        global.API_PREFIX + "/standardSpecification/addDrug",
        "post",
        require("../../../data/standardSpecification/addDrug.js").default
    );

    //编辑药品
    // "drugCode":"001",
    // "drugName":"修改",
    // "isMenstruum":1,
    // "status":false
    Mock.mock(
        global.API_PREFIX + "/standardSpecification/updateDrug",
        "post",
        require("../../../data/standardSpecification/updateDrug.js").default
    );

    //删除药品
    // "drugCode":"H000247001"
    Mock.mock(
        global.API_PREFIX + "/standardDrug/deleteDrug",
        "post",
        require("../../../data/standardDrug/deleteDrug.js").default
    );
})(require("mockjs"));
