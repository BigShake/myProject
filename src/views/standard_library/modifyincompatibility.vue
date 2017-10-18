<style scoped lang="less">

    .specification {
        //height: 100%;
        //头部
        .header-container {
            width: 100%;
            margin-bottom: 20px;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;

            .header-left {
                .left-item {
                    margin-right: 10px;
                }
                .left-select {
                    width: 100px;
                }
            }
            // .header-right {
            //     // display: relative;
            //     // float: left;
            // }
        }
        //内容
        .content-container {
            height: 100%;
            width: 100%;
            display: inline-flex;
            justify-content: space-between;
            
            //表格容器
            .content-table-container {
                height: 100%;
                width: 50%;
            }
            //选项卡容器
            .content-main-container {
                height: 100%;
                width: 50%;
            }
        }
    }
</style>

<template>
<div>
    <div class="title-content-block">
        <div>
            <h2>配伍禁忌</h2>
        </div>
    </div>
    <div style="padding: 30px">
    <Steps :current="current">
        <Step title="修改"></Step>
        <Step title="选择药品/成分"></Step>
    </Steps>
    </div>
    <div v-if="current === 0">
        <div style="text-align:center; padding: 10px 0;">
            <div style="padding: 10px;">
                <p>药品/成分</p>
                <Input v-model="drug" disabled style="width:300px"></Input>
            </div>
            <div style="padding: 10px;">
                <p>配伍类型</p>
                <Select v-model="formParam.errorType" style="width:300px" placeholder="配伍类型">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                </Select>
            </div>
            <div style="padding: 10px;">
                <p>配伍结果</p>
                <Select v-model="formParam.errorId" style="width:300px" placeholder="配伍结果">
                    <Option v-for="item in errorList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                </Select>
            </div>
            <div style="padding: 10px;">
                <p>说明</p>
                <Input v-model="formParam.explain" style="width:300px" :value="formParam.explain"></Input>
            </div>

             <div style="padding: 10px;">
                <Button style="width: 100px" type="primary" @click="next()">下一步</Button> 
                <Button style="width: 100px" type="primary" @click="last()">取消</Button>
             </div>
        </div>
    </div>
    <div v-if="current === 1 && formParam.errorType == 0">
        <div style="text-align:center; padding: 30px;">
            <div class="header-right">
                <SearchInput placeholder="搜索" 
                        v-on:listen-search-change="changeContentByKeyword"
                        v-on:listen-search-click="searchContentByKeyword"></SearchInput>
            </div>
            <div class="content-container">
                <div class="content-table-container">
                    <Pager ref="initPager" v-on:on-get-data="changePage">
                        <Table :columns="drugColumns" :data="drugList" :stripe="true" :border="true"></Table>
                    </Pager>
                </div>
                <div>
                    <Button style="width: 100px" type="primary" @click="last()">上一步</Button> 
                    <Button style="width: 100px" type="primary" @click="over()">完成</Button>
                </div>
            </div>
            <div>
            </div>
        </div>
    </div>
    <div v-if="current === 1 && formParam.errorType != 0">
        <div style="text-align:center; padding: 30px;">
            <div class="header-right">
                <SearchInput placeholder="搜索" 
                        v-on:listen-search-change="changeContentByKeyword"
                        v-on:listen-search-click="searchContentByKeyword"></SearchInput>
            </div>
            <div class="content-container">
                <div class="content-table-container">
                    <Pager ref="initPager" v-on:on-get-data="changePage">
                        <Table :columns="compColumns" :data="compList" :stripe="true" :border="true"></Table>
                    </Pager>
                </div>
                <div>
                    <Button style="width: 100px" type="primary" @click="last()">上一步</Button> 
                    <Button style="width: 100px" type="primary" @click="over()">完成</Button>
                </div>
            </div>
            <div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
import util from "../../libs/util";
export default {
    data () {
        return {
            formParam: {
                errorId: null,
                errorType: null,
                explain: ""
            },
            drug: "小儿氨酚黄那敏颗粒",
            current: 0,
            typeList: [
                {
                    value: 0,
                    label: '药品对药品'
                },
                {
                    value: 1,
                    label: '药品对成分'
                },
                {
                    value: 2,
                    label: '成分对成分'
                }
            ],
            errorList: [],
            drugColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '编号',
                    key: 'drugCode',
                    //width: 100,
                    align: 'left'
                },
                {
                    title: '药品分类',
                    key: 'classifyName',
                    //width: 100,
                    align: 'left'
                },
                {
                    title: '通用名',
                    key: 'drugName',
                    // width: 139,
                    align: 'tradeName'
                }
            ],
            drugList: [],
            compColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '成分',
                    key: 'ingredientsName',
                    //width: 100,
                    align: 'ingredientsName'
                }
            ],
            compList: []
        };
    },
    methods: {
        //下一步
        next () {
            if ((this.formParam.errorId === null) || (this.formParam.errorType === null)) {
                this.$Message.error("请选择配伍类型和配伍结果");
            } else {
                this.current = this.current + 1;
                this.changeStep();
            }
        },

        changeStep() {
            if (this.current === 0) {
                this.formParam.errorId = null;
                this.formParam.errorType = null;
            }
            this.getDrugOrCompParam = {
                perPage: 20,
                currentPage: 1,
                content: ""
            };
            this.getDataList();

        },
        //上一步
        last () {
            if (this.current === 0) {
                this.$router.push("/incompatibility");
            } else {
                this.current -= 1;
                this.changeStep();
            }
        },
        //完成
        over () {
            this.$router.push("/incompatibility");
            this.$Message.info("修改成功");
        },
        //改变药品列表搜索框事件
        changeContentByKeyword(value) {
            this.getDrugOrCompParam.content = value;
        },
        searchContentByKeyword() {
            this.getDrugOrCompParam.currentPage = 1; //初始化搜索页面到第一页
            this.getDataList(); //获取药品列表
        },
        changePage(data) {
            this.getDrugOrCompParam.currentPage = data.currentPage; //获取当前页数
            this.getDrugOrCompParam.perPage = data.perPage; //获取每页条数
            this.getDataList(); //获取药品列表
        },
        getDataList() {
            if (this.formParam.errorType === 0) {
                this.getDrugList();
            } else if (this.formParam.errorType !== 0) {
                this.getcompList();
            }
        },
        //获取配伍结果列表
        getErrorList() {
            let _this = this;
            util.request(global.API_PREFIX + "/errorType/getErrorType", {}
            ).then(function(response) {
                if (response.data.code === 1) {
                    //处理数据
                    _this.errorList = [];
                    response.data.data.forEach(function (el) {
                        _this.errorList.push({
                            value: el.id,
                            label: el.errorName
                        });
                    });
                } else {
                    _this.$Message.error(response.data.mess);
                }
               
            });
        },

        //获取药品列表
        getDrugList () {
            let _this = this;
            util.request(global.API_PREFIX + "/incompatibility/getDrugList", 
                _this.getDrugOrCompParam
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.drugList = response.data.data.list;
                    let pageData = {  
                        "currentPage": response.data.data.currentPage,
                        "perPage": response.data.data.perPage,
                        "total": response.data.data.totalNum,
                        "totalNum": response.data.data.totalNum
                    };
                    _this.$refs.initPager.setPageParam(pageData);
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },

        //获取成分列表
        getcompList () {
            let _this = this;
            util.request(global.API_PREFIX + "/incompatibility/getCompList", 
                _this.getDrugOrCompParam
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.compList = response.data.data.list;
                    // let pageData = {  
                    //     "currentPage": response.data.data.currentPage,
                    //     "perPage": response.data.data.perPage,
                    //     "total": response.data.data.totalNum,
                    //     "totalNum": response.data.data.totalNum
                    // };
                    //_this.$refs.initPager.setPageParam(pageData);
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        }
    },
    created () {
        this.getErrorList();
    }
};
</script>