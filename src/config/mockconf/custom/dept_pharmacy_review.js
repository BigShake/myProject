(function(Mock) {

    Mock.mock(
        global.API_PREFIX + "/deptPharmacyReview/getDeptList",
        "post",
        require("../../../data/deptPharmacyReview/getDeptList.js").default
    );

    Mock.mock(
        global.API_PREFIX + "/deptPharmacyReview/getDrugList",
        "post",
        require("../../../data/deptPharmacyReview/getDrugList.js").default
    );

    Mock.mock(
        global.API_PREFIX + "/deptPharmacyReview/getOutDeptDrugList",
        "post",
        require("../../../data/deptPharmacyReview/getOutDeptDrugList.js").default
    );

   
})(require("mockjs"));
