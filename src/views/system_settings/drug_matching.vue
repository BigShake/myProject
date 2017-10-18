/*药品匹配页面*/
<style scoped lang="less">
// 页面样式 css less

</style>



<template>
    <div>
        <div class="title-content-block">
            <div>
                <h1 style="font-size:15px;">药品匹配</h1>
            </div>
        </div>
        <div >
            <div style="padding: 20px 0 5px 0">
                <Button style="margin-right: 20px;"  @click="syncBtnClick()">药品匹配</Button>
                <Select v-model="param.classificationId" @on-change="drugClassifyChange" style="width:100px" :clearable="true" placeholder="药品分类">
                    <Option v-for="item in drugClassifyList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                </Select>
                <div style="float: right;margin-right: 10px;">
                    <SearchInput placeholder="搜索" 
                        v-on:listen-search-change="changeResultByKeyword"
                        v-on:listen-search-click="searchResultByKeyword"></SearchInput>
                </div>
            </div>
            <Pager style="padding-top:10px;" ref="initPager" v-on:on-get-data="changePage">
                <Table :height="tableHeight" border :columns="drugColumns" :data="drugData"></Table>
            </Pager>
        </div>
        <Spin size="large" fix v-if="spinShow">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>  
    </div>   
</template>


<script>
import util from "../../libs/util";
export default {
    data() {
        return {
            spinShow: false, //遮影层
            modelConfig: { //模态框
                title: "药品匹配",
                content: "从HIS中同步药品进行匹配",
                onOk: this.matchingDrug
            },
            param: { //获取列表传参
                perPage: 20,
                currentPage: 1
            },
            drugClassifyList: [], //药品分类列表
            drugColumns: [ //表头
                {
                    title: '药品编号',
                    align: 'center',
                    key: 'tradeCode'
                },
                {
                    title: '通用名',
                    align: 'center',
                    key: 'baseName'
                },
                {
                    title: '药品分类',
                    align: 'center',
                    key: 'classifyName'
                },
                {
                    title: '商品名',
                    align: 'center',
                    key: 'tradeName'
                },
                {
                    title: '生产厂家',
                    align: 'center',
                    key: 'factory'
                },
                {
                    title: '速查码',
                    align: 'center',
                    key: 'fastNO'
                }
            ],
            drugData: [ //表格
            ]
        };
    },
    created() { //初始化方法
        this.getClassList(); //获取药品分类列表
        this.getDataList(); //获取药品列表
    },
    computed: {
        tableHeight () {
            return util.getHeight();
        }
    },
    methods: {
        //点击搜索框搜索按钮事件
        searchResultByKeyword() {
            this.param.currentPage = 1; //初始化搜索页面到第一页
            this.getDataList(); //获取药品列表
        },
        //药品分类改变事件
        drugClassifyChange() {
            this.param.currentPage = 1; //初始化搜索页面到第一页
            this.getDataList(); //获取药品列表
        },
        //搜索框内容改变事件
        changeResultByKeyword(value) {
            this.param.content = value;
        },
        //获取数据列表
        getDataList() {
            let _this = this; 
            util.request(global.API_PREFIX + "/drugMatching/getList",
                _this.param
            ).then(function(response) {
                if (response.data.code === 1) {
                    //处理数据
                    _this.drugData = response.data.data.list;
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
        //同步药品匹配
        syncBtnClick() {
            this.$Modal.confirm(this.modelConfig);//调用模态框
        },
        //匹配药品同步
        matchingDrug() {
            let _this = this; 
            _this.spinShow = true;//打开遮阴层
            util.request(global.API_PREFIX + "/drugMatching/synchronization"
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.$Message.info("同步成功");//提示用户同步成功
                    _this.param.currentPage = 1;//初始化搜索页面到第一页
                    _this.getDataList();//获取药品列表
                    _this.spinShow = false;//关闭遮阴层
                } else {
                    _this.$Message.error(response.data.mess);//报错
                    _this.spinShow = false;//关闭遮阴层
                }
            });
        },
        //获取药品分类下拉框数据
        getClassList() {
            let _this = this; 
            util.request(global.API_PREFIX + "/drugKnowledge/drugClassify/getDrugListNoPage"
            ).then(function(response) {
                if (response.data.code === 1) {
                    //处理数据
                    _this.drugClassifyList = [];
                    response.data.data.forEach(function (el) {
                        _this.drugClassifyList.push({
                            value: el.id,
                            label: el.classifyName
                        });
                    });
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        //改变页数事件
        changePage(data) {
            this.param.currentPage = data.currentPage; //获取当前页数
            this.param.perPage = data.perPage; //获取每页条数
            this.getDataList(); //获取药品列表
        }
    }
};
</script>

