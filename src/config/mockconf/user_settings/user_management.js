(function(Mock) {
    //展示所有用户
    // "content":"admin"
    // "currentPage": 1,
    // "totalPage": 1,
    // "totalNum": 0,
    // "perPage": 10
    Mock.mock(
        global.API_PREFIX + "/user/query",
        "post",
        require("../../../data/user/query.js").default
    );

    // 创建用户
    // "account":"test1",
    // "password":"3BB1F36C1BEB091CA7BF230DA38821FE",
    // "userType":"1"
    Mock.mock(
        global.API_PREFIX + "/user/create",
        "post",
        require("../../../data/user/create.js").default
    );

    //修改用户
    // "account":"test1",
    // "id":"2",
    // "userType":"3"
    Mock.mock(
        global.API_PREFIX + "/user/update",
        "post",
        require("../../../data/user/update.js").default
    );

    //删除用户
    // "account":"test1",
    // "id":"2"
    Mock.mock(
        global.API_PREFIX + "/user/delete",
        "post",
        require("../../../data/user/delete.js").default
    );

    //修改密码
    //     "account":"test1",
    //     "id":"2",
    //    "password":"3BB1F36C1BEB091CA7BF230DA38821FE"
    Mock.mock(
        global.API_PREFIX + "/user/updatePass",
        "post",
        require("../../../data/user/updatePass.js").default
    );

    //个人修改密码
    //     "account":"test1",
    //     "id":"2",
    //    "password":"3BB1F36C1BEB091CA7BF230DA38821FE"，
    //    "newPassword":"a"
    Mock.mock(
        global.API_PREFIX + "/user/updatePassForPer",
        "post",
        require("../../../data/user/updatePassForPer.js").default
    );

    //解锁
    // "account":"test1",
    // "id":"2"
    Mock.mock(
        global.API_PREFIX + "/user/unlock",
        "post",
        require("../../../data/user/unlock.js").default
    );

})(require("mockjs"));
