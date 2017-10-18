(function(Mock) {

    Mock.mock(
        global.API_PREFIX + "/superSpecification/getList",
        "post",
        require("../../../data/superSpecification/getList.js").default
    );

   
})(require("mockjs"));
