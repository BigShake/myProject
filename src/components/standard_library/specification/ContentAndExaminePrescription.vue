<style lang="less">
@import "../../../styles/difinitions";

.ContentAndExaminePrescription {

    .tab-container {
        
        .ivu-tabs-bar {
            height: 40px;
            min-height: 40px;
            margin-bottom: 0;

            .ivu-tabs-nav-container {
                height: 40px;
                min-height: 40px;
                
                margin: 0;
                
                .ivu-tabs-nav {
                    height: 40px;
                    min-height: 40px; 

                    .ivu-tabs-tab.ivu-tabs-tab-active {
                        border-top: 0;
                        color: @c-main;

                    }
                }
            }
        }
        

        .ivu-tabs-nav-scroll > .ivu-tabs-nav {
            width: 100%;
        }
        .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin-right: 0;
            width: 50%;
            height: 100%;
            border-radius: 0;
            background: #fff;

            &.hover {
                color: @c-main;
            }
        }

        .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: @c-main;
            position: absolute;
            top: 0;
            left: 0;
        }
    }
    
}

</style>

<template>
    <div class="ContentAndExaminePrescription">
        <div class="tab-container">
            <Tabs type="card">
                <TabPane label="内容设置" icon="party-content">
                    <ContentOption :isSuper="false"></ContentOption>
                    <!-- <ContentOption :option="contentOption"></ContentOption> -->
                    <!-- <ExaminePrescriptionOption></ExaminePrescriptionOption> -->
                </TabPane>
                <TabPane label="审方设置" icon="party-setting">
                    <!-- <ContentOption></ContentOption> -->
                    <!-- <ExaminePrescriptionOption :option="examinePrescriptionOption"></ExaminePrescriptionOption> -->
                    <ExaminePrescriptionOption :isSuper="false"></ExaminePrescriptionOption>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
// import util from "../../../libs/util";
export default {
    props: {
        //是否为超说明书
        isSuper: {
            type: Boolean,
            default: true
        },
        //内容设置
        contentOption: {
            type: Object,
            default: () => {}
        },
        //审方设置
        examinePrescriptionOption: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {

        };
    },
    methods: {
       
    }
};
</script>
