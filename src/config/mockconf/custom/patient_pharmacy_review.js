(function(Mock) {
    //获取药品或者成份
    Mock.mock(
        global.API_PREFIX + "/patientPharmacyReview/getDrugList",
        "post",
        require("../../../data/patientPharmacyReview/getDrugList.js").default
    );
    
    Mock.mock(
        global.API_PREFIX + "/patientPharmacyReview/getOutDrugList",
        "post",
        require("../../../data/patientPharmacyReview/getOutDrugList.js").default
    );

    Mock.mock(
        global.API_PREFIX + "/patientPharmacyReview/getOutPatientList",
        "post",
        require("../../../data/patientPharmacyReview/getOutPatientList.js").default
    );

    Mock.mock(
        global.API_PREFIX + "/patientPharmacyReview/getOutPatientList",
        "post",
        require("../../../data/patientPharmacyReview/getOutPatientList.js").default
    );

    Mock.mock(
        global.API_PREFIX + "/patientPharmacyReview/getPatientList",
        "post",
        require("../../../data/patientPharmacyReview/getPatientList.js").default
    );
   
})(require("mockjs"));
