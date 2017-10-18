const Components = {
    install: function(Vue) {
        /**
         * 通用组件
         */
        Vue.component('CPager', require("./common/CPager.vue"));
        Vue.component('Pager', require("./common/Pager.vue"));
        Vue.component('TimeRangeDatePicker', require("./common/TimeRangeDate/Picker.js").default);
        Vue.component('Dragable', require("./common/Dragable.vue"));
        Vue.component('Throwable', require("./common/Throwable.vue"));
        Vue.component('UEditor', require("./common/UEditor.vue"));
        Vue.component('SearchInput', require("./common/SearchInput.vue"));
        Vue.component('IconBtn', require("./common/IconBtn.vue"));
      
        /**
         * 标准库
         */
        //内容设置和审方设置
        Vue.component('ContentAndExaminePrescription', require("./standard_library/specification/ContentAndExaminePrescription.vue"));
        Vue.component('ContentOption', require("./standard_library/specification/ContentOption.vue"));
        Vue.component('ExaminePrescriptionOption', require("./standard_library/specification/ExaminePrescriptionOption.vue"));
        Vue.component('SpecificationOpeartion', require("./standard_library/specification/SpecificationOpeartion.vue"));
        Vue.component('TableOne', require("./standard_library/specification/TableOne.vue"));
        Vue.component('TableTwo', require("./standard_library/specification/TableTwo.vue"));
        Vue.component('TableThree', require("./standard_library/specification/TableThree.vue"));
        Vue.component('TableFour', require("./standard_library/specification/TableFour.vue"));
        Vue.component('TableFive', require("./standard_library/specification/TableFive.vue"));
        //添加选择日期
        // Vue.component('AddDate', require("./standard_library/specification/UserInput/AddDate.vue"));
        //添加单行输入框
        Vue.component('AddInput', require("./standard_library/specification/UserInput/AddInput.vue"));
        //添加选择框
        Vue.component('AddSelect', require("./standard_library/specification/UserInput/AddSelect.vue"));
        //添加tag
        Vue.component('AddTag', require("./standard_library/specification/UserInput/AddTag.vue"));
        //添加文本域
        Vue.component('AddTextarea', require("./standard_library/specification/UserInput/AddTextarea.vue"));
        Vue.component('SelectFrequency', require("./standard_library/specification/UserInput/SelectFrequency.vue"));
        
        
        /**
         * 自定义
         */
        Vue.component('DrugClassificationOperation', require("./system_settings/drug_classification/DrugClassificationOperation.vue"));
        
        /**
         * 系统设置
         */

        //人群划分新增、修改组件
        Vue.component('AddPopulation', require("./system_settings/population_divsion/AddPopulation.vue"));
        Vue.component('ModifyPopulation', require("./system_settings/population_divsion/ModifyPopulation.vue"));

        /**
         * 用户管理
         */

    }
};

// 导出组件
export default Components;
