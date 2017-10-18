import axios from "axios";
let util = {
    locals: { 
        //存储单个属性
        set: function(key, value) {
            window.localStorage[key] = value;
        }, 
        //读取单个属性
        get: function(key, defaultValue) {
            return window.localStorage[key] || defaultValue;
        }, 
        //存储对象，以JSON格式存储
        setObject: function(key, value) {
            window.localStorage[key] = JSON.stringify(value);
        }, 
        //读取对象
        getObject: function(key) {
            return window.localStorage[key] ? JSON.parse(window.localStorage[key]) : null;
        },
        //删除某一键值对
        removeItem: function(key) {
            return window.localStorage.removeItem(key);
        },
        //清空整个localStorage
        clearLocalStorage: function() {
            return window.localStorage.clear();
        }
    }
};
util.title = function (title) {
    const _title = title ? title + ' - 药品知识库管理后台' : '药品知识库管理后台';
    window.document.title = _title;
};
util.request = function(url, data) {
    let _data = data || {};
    return axios({
        method: "post",
        url: url,
        headers: global.SERVER_HEADER,
        data: _data
    });
};

//表格高度
util.getHeight = () => {
    let windowHeight = window.innerHeight;
    const nav = 60;
    const header = 40;
    const btnContainer = 70;
    const pageContainer = 52;
    return windowHeight - nav - header - btnContainer - pageContainer;
};
// util.oneOf = function(value, validList) {
//     for (let i = 0; i < validList.length; i++) {
//         if (value === validList[i]) {
//             return true;
//         }
//     }
//     return false;
// };

export default util;
