(function(Mock) {
    //获取菜单接口
    Mock.mock(
        global.API_PREFIX + "/menu/get", 
        'post', 
        require("../../data/common/menu.json")
    );

    //登录
    // "account":"admin"
    // "password":"3BB1F36C1BEB091CA7BF230DA38821FE"
    Mock.mock(
        global.API_PREFIX + "/security/login",
        "post",
        require("../../data/common/login.js").default
    );

    //登出
    Mock.mock(
        global.API_PREFIX + "/security/logout",
        "post",
        require("../../data/common/logout.js").default
    );

})(require("mockjs"));
