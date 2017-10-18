<template>
    <Form :model="formItem" :label-width="80" style="width: 80%;">
        <FormItem label="人群名称">
            <Input v-model="formItem.crowdname" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="年龄上限(天)">
            <Input v-model="formItem.dayup" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="年龄下限(天)">
            <Input v-model="formItem.daydown" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="年龄上限(年)">
            <Input v-model="formItem.yearup" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="年龄下限(年)">
            <Input v-model="formItem.yeardown" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="性别">
            <RadioGroup v-model="formItem.sex">
                <Radio label="1">男</Radio>
                <Radio label="0">女</Radio>
                <Radio label="3">不限</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="特殊人群">
            <CheckboxGroup v-model="formItem.checkbox">
                <Checkbox label="孕妇"></Checkbox>
                <Checkbox label="哺乳人群"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem>
            <Button type="primary" style="width:100px;" @click="addpopulation(formItem)">确定</Button>
            <Button type="primary" style="width:100px;">取消</Button>
        </FormItem>
    </Form>
</template>

<script>
import util from "../../../libs/util";
export default {
    created() {
    },
    data() {
        return {
            formItem: {
                crowdname: "",
                sex: "3",
                checkbox: [],
                yearup: "",
                yeardown: "",
                dayup: "",
                daydown: "",
                pregnancy: "",
                lactation: ""
            }
        };
    },
    methods: {
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
        }
    }
};
</script>
