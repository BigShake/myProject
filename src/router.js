const routers = [{
    path: '/', redirect: '/account/modify_password'
},
{
    path: '/login',
    component: (resolve) => require(['./views/login.vue'], resolve)
},

{
    path: '/index',
    component: (resolve) => require(['./views/index.vue'], resolve)
},
{
    path: '/secure',
    component: (resolve) => require(['./views/secure.vue'], resolve),
    children: [{
        path: 'iforget',
        meta: {
            title: "忘记密码"
        },
        component: (resolve) => require(['./views/secure/forgetPwd.vue'], resolve)
    }, {
        path: 'active_account',
        meta: {
            title: "账号激活"
        },
        component: (resolve) => require(['./views/secure/activeAccount.vue'], resolve)
    }]
},
//账户
{
    path: '/account/modify_password',
    component: (resolve) => require(['./views/account/modify_password.vue'], resolve)
},
//标准库
{
    path: '/specification',
    component: (resolve) => require(['./views/standard_library/specification.vue'], resolve)
},
{
    path: '/add_incompatibility',
    component: (resolve) => require(['./views/standard_library/addincompatibility.vue'], resolve)
},
{
    path: '/modify_incompatibility',
    component: (resolve) => require(['./views/standard_library/modifyincompatibility.vue'], resolve)
},
{
    path: '/incompatibility',
    component: (resolve) => require(['./views/standard_library/incompatibility.vue'], resolve)
},
//自定义
{
    path: '/super_specification',
    component: (resolve) => require(['./views/custom/super_specification.vue'], resolve)
},
{
    path: '/ward_prescription',
    component: (resolve) => require(['./views/custom/ward_prescription.vue'], resolve)
},
{
    path: '/patient_prescription',
    component: (resolve) => require(['./views/custom/patient_prescription.vue'], resolve)
},
{
    path: '/trial_party_setting',
    component: (resolve) => require(['./views/custom/trial_party_setting.vue'], resolve)
},
{
    path: '/ward_trial_party_setting',
    component: (resolve) => require(['./views/custom/ward_trial_party_setting.vue'], resolve)
},
//系统设置
{
    path: '/drug_matching',
    component: (resolve) => require(['./views/system_settings/drug_matching.vue'], resolve)
},
{
    path: '/drug_classification',
    component: (resolve) => require(['./views/system_settings/drug_classification.vue'], resolve)
},
{
    path: '/bind_classification',
    component: (resolve) => require(['./views/system_settings/bind_classification.vue'], resolve)
},
{
    path: '/population_division',
    component: (resolve) => require(['./views/system_settings/population_division.vue'], resolve)
},
{
    path: '/error_type',
    component: (resolve) => require(['./views/system_settings/error_type.vue'], resolve)
},
{
    path: '/ward_synchronization',
    component: (resolve) => require(['./views/system_settings/ward_synchronization.vue'], resolve)
},

{
    path: '/patient_synchronization',
    component: (resolve) => require(['./views/system_settings/patient_synchronization.vue'], resolve)
},
{
    path: '/useage_synchronization',
    component: (resolve) => require(['./views/system_settings/useage_synchronization.vue'], resolve)
},
{
    path: '/frequency_synchronization',
    component: (resolve) => require(['./views/system_settings/frequency_synchronization.vue'], resolve)
},
//用户设置
{
    path: '/user_management',
    component: (resolve) => require(['./views/user_setting/user_management.vue'], resolve)
},
{
    path: '/user_management/create_user',
    component: (resolve) => require(['./views/user_setting/create_user.vue'], resolve)
},

{
    path: '/setting',
    component: (resolve) => require(['./views/personal/setting.vue'], resolve)
}
];
export default routers;
