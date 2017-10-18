<template>
<div style="margin: auto;">
    <Form :model="formItem" :label-width="80" style="width: 80%;">
    <FormItem label="人群名称">
        <Input v-model="formItem.crowdname" :value="formItem.crowdname" placeholder="请输入"></Input>
    </FormItem>
    <FormItem label="年龄上限(天)">
        <Input v-model="formItem.dayup" :value="formItem.dayup" placeholder="请输入"></Input>
    </FormItem>
    <FormItem label="年龄下限(天)">
        <Input v-model="formItem.daydown" :value="formItem.daydown" placeholder="请输入"></Input>
    </FormItem>
    <FormItem label="年龄上限(年)">
        <Input v-model="formItem.yearup" :value="formItem.yearup" placeholder="请输入"></Input>
    </FormItem>
    <FormItem label="年龄下限(年)">
        <Input v-model="formItem.yeardown" :value="formItem.yeardown" placeholder="请输入"></Input>
    </FormItem>
    <FormItem label="性别">
        <RadioGroup v-model="formItem.sex">
            <Radio label="1">男</Radio>
            <Radio label="0">女</Radio>
            <Radio label="3">不限</Radio>
        </RadioGroup>
    </FormItem>
    <FormItem label="特殊人群">
        <CheckboxGroup v-model="formItem.checkbox" @on-change="selectChange">
            <Checkbox label="孕妇"></Checkbox>
            <Checkbox label="哺乳人群"></Checkbox>
        </CheckboxGroup>
    </FormItem>
    <FormItem>
        <Button type="primary" style="width:100px;" @click="addpopulation(formItem)">确定</Button>
        <Button type="primary" style="width:100px;"  @click="cancel()">取消</Button>
    </FormItem>
</Form>
</div>

</template>

<script>
import util from "../../../libs/util";
export default {
    props: {
        todo: {
            id: "",
            crowdname: "",
            sex: "",
            yearup: "",
            yeardown: "",
            dayup: "",
            daydown: "",
            pregnancy: "",
            lactation: ""
        }
    },
    created() {
       
    },
    data() {
        return {
            formItem: {
                id: "",
                crowdname: "",
                sex: "",
                checkbox: [],
                yearup: "",
                yeardown: "",
                dayup: "",
                daydown: "",
                pregnancy: "",
                lactation: "",
                personType: ""
            }
        };
    },
    methods: {
        cancel () {
            this.addpopulation = false;
        },
        addpopulation(data) {
            let _this = this;
            let params = {
                "crowdname": data.crowdname,
                "yearup": data.yearup,
                "yeardown": data.yeardown,
                "dayup": data.dayup,
                "daydown": data.daydown,
                "sex": data.sex,
                "pregnancy": data.pregnancy,
                "lactation": data.lactation
            };
            util.request(global.API_PREFIX + "/drugKnowledge/crowdKind/addCrowd",
                params
            ).then(function(response) {
                if (response.data.code === "1" || response.data.code === 1) {
                    _this.$Message.success(response.data.mess);
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        setInitData(data) {
            let _this = this;
            _this.formItem = data;
        },
        selectChange() {
            // let _this = this;
            // if (_this.formItem.checkbox.length === 1) {
            //     let selectCheck = _this.formItem.checkbox[0];
            //     _this.formItem.checkbox = [];
            //     _this.formItem.checkbox[0] = selectCheck;
            //     _this.formItem.personType = selectCheck;
            //     _this.$set('formItem.personType', selectCheck);
            // } else {
            //     let selectCheck = _this.formItem.checkbox[0];
            //     _this.formItem.checkbox = [];
            //     // _this.formItem.checkbox.$set(_this.formItem.checkbox[0], selectCheck);
            //     _this.formItem.checkbox[0] = selectCheck;
            //     // _this.formItem.personType = selectCheck;
            //     _this.$set('formItem.personType', selectCheck);
            // }
            // //console.log(_this.formItem.checkbox);
        }
    }
};
</script>
