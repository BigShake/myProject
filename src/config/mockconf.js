import Config from './config';

let result = {
    start: function () {}
};

/**
 * 接口请求拦截处理函数 (配置[mock.js配置])
 */
function startMock() {
    require("./mockconf/common.js");
    //标准库
    require("./mockconf/standard_library/specification.js");//说明书
    require("./mockconf/standard_library/incompatibility.js");//配伍禁忌
    //自定义
    require("./mockconf/custom/super_specification.js");//超说明书设置
    require("./mockconf/custom/dept_pharmacy_review.js");//病区审方设置
    require("./mockconf/custom/patient_pharmacy_review.js");//病人审方设置
    //系统设置
    require("./mockconf/system_settings/drug_classification.js");//药品分类
    require("./mockconf/system_settings/patient_synchronization.js");//病人同步模块
    require("./mockconf/system_settings/pcSynchronization.js");//频次同步
    require("./mockconf/system_settings/error_type.js");//错误类型
    require("./mockconf/system_settings/population_division.js");//人群划分
    require("./mockconf/system_settings/drugClassifyBinding.js");//分类绑定模块
    require("./mockconf/system_settings/drug_matching.js");//药品匹配
    require("./mockconf/system_settings/dept_sync.js");//病区同步
    require("./mockconf/system_settings/useage_sync.js");//用法同步
    //用户管理
    require("./mockconf/user_settings/user_management.js");//用户管理
}

if (Config.env === "development") {
    result = {
        start: startMock
    };
}

export default result;
