<style lang="less" scoped>
@import "../../../styles/difinitions";
    .ContentOption {
        background-color: #fff;
        // margin-bottom: 300px;
        padding: 10px 0 20px 20px;
        // border: 1px solid @c-table-border;

        .edit-btn {
            font-family: @edit-btn-font;
        }
        
        .header {
            display: flex;
            justify-content: flex-end;
        }

        .block {
            min-height: 35px;
            margin-bottom: 10px;
        }

        .emphasize {
            display: inline-block;
            min-width: 5px;
            color: @c-emphasize;
        }
    }
</style>

<template>
    <div class="ContentOption" :style="{ height: this.comHeight + 'px' , overflow: 'auto'}">
        <div class="header block">
            <Button class="edit-btn" icon="edit" @click="save">{{ editText }}</Button>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize">*</span>
                    药品编号:
                </Col>
                <Col span="18">
                    <Input v-model="specificationId" disabled></Input>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize">*</span>
                    通用名:
                </Col>
                <Col span="18">
                    <Input v-model="baseName" disabled></Input>
                </Col>
            </Row>
        </div>
        <!-- v-if判断 是否为超说明书内容-->
        <div v-if="isSuper">
            <div class="block">
                <Row>
                    <Col span="6">
                        <span class="emphasize">*</span>
                        商品名:
                    </Col>
                    <Col span="18">
                        <Input v-model="tradeName" :readonly="!editStatus"></Input>
                    </Col>
                </Row>
            </div>
            <div class="block">
                <Row>
                    <Col span="6">
                        <span class="emphasize">*</span>
                        英文名:
                    </Col>
                    <Col span="18">
                        <Input v-model="enname" :readonly="!editStatus"></Input>
                    </Col>
                </Row>
            </div>
            <div class="block">
                <Row>
                    <Col span="6">
                        <span class="emphasize">*</span>
                        汉语拼音名:
                    </Col>
                    <Col span="18">
                        <Input v-model="pinyin" :readonly="!editStatus"></Input>
                    </Col>
                </Row>
            </div>
        </div>
        <!-- v-if结束 -->
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize">*</span>
                    主要成份:
                </Col>
                <Col span="18">
                    <AddTag :isEdit="editStatus" placeholder="在此输入新的主要成份"></AddTag>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize">*</span>
                    辅料:
                </Col>
                <Col span="18">
                    <AddTag :isEdit="editStatus" placeholder="在此输入新的辅料"></AddTag>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    适应症:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的适应症"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize">*</span>
                    规格:
                </Col>
                <Col span="18">
                    <AddTag :isEdit="editStatus" placeholder="在此输入新的规格"></AddTag>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize">*</span>
                    用法用量:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的用法用量"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    不良反应:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的不良反应"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize">*</span>
                    禁忌:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的禁忌"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize">*</span>
                    注意事项:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的注意事项"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    孕妇及哺乳期妇女用药:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的孕妇及哺乳期妇女用药"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    儿童用药:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的儿童用药"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    老年用药:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的老年用药"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    药物相互作用:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的药物相互作用"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    药物过量:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的药物过量"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    毒理研究:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的毒理研究"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    药理作用:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的药理作用"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    药代动力学:
                </Col>
                <Col span="18">
                    <AddTextarea :isEdit="editStatus" placeholder="在此输入新的药代动力学"></AddTextarea>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    性状:
                </Col>
                <Col span="18">
                    <Input v-model="characters" :readonly="!editStatus" placeholder="在此输入新的性状"></Input>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    贮藏:
                </Col>
                <Col span="18">
                    <Input v-model="storage" :readonly="!editStatus" placeholder="在此输入新的贮藏"></Input>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize"></span>
                    包装:
                </Col>
                <Col span="18">
                    <Input v-model="pack" :readonly="!editStatus" placeholder="在此输入新的包装"></Input>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize">*</span>
                    有效期:
                </Col>
                <Col span="18">
                    <Input v-model="validity" :readonly="!editStatus" placeholder="在此输入新的有效期"></Input>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    <span class="emphasize">*</span>
                    执行标准:
                </Col>
                <Col span="18">
                    <Input v-model="executiveStandard" :readonly="!editStatus" placeholder="在此输入新的包装"></Input>
                </Col>
            </Row>
        </div>
        <!-- v-if判断 是否为超说明书内容 -->
        <div v-if="isSuper">
            <div class="block">
                <Row>
                    <Col span="6">
                        <span class="emphasize">*</span>
                        批准文号:
                    </Col>
                    <Col span="18">
                        <AddInput :isEdit="editStatus" placeholder="在此输入新的批准文号"></AddInput>
                    </Col>
                </Row>
            </div>
            <div class="block">
                <Row>
                    <Col span="6">
                        <span class="emphasize"></span>
                        生产企业:
                    </Col>
                    <Col span="18">
                        <Input v-model="manufacturingEnterprise" :readonly="!editStatus" placeholder="在此输入新的生产企业"></Input>
                    </Col>
                </Row>
            </div>
            <div class="block">
                <Row>
                    <Col span="6">
                        <span class="emphasize"></span>
                        药物分类:
                    </Col>
                    <Col span="18">
                        <Input v-model="drugClassificationName" :readonly="!editStatus" placeholder="在此输入新的药物分类"></Input>
                    </Col>
                </Row>
            </div>
            <div class="block">
                <Row>
                    <Col span="6">
                        <span class="emphasize"></span>
                        核准日期:
                    </Col>
                    <Col span="18">
                        <Input v-model="approvedDate" :readonly="!editStatus" placeholder="在此输入新的核准日期"></Input>
                        <!-- <AddDate :isEdit="editStatus" :isMultiply="false"></AddDate> -->
                    </Col>
                </Row>
            </div>
            <div class="block">
                <Row>
                    <Col span="6">
                        <span class="emphasize"></span>
                        修改日期:
                    </Col>
                    <Col span="18">
                        <AddInput :isEdit="editStatus" placeholder="在此输入新的修改日期"></AddInput>
                        <!-- <AddDate :isEdit="editStatus" :isMultiply="true"></AddDate> -->
                    </Col>
                </Row>
            </div>
        </div>
        <!-- v-if结束 -->
    </div>
</template>

<script>
// import util from "../../../libs/util";
export default {
    props: {
        //是否为超说明书 默认是
        isSuper: {
            type: Boolean,
            default: true
        },
        option: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            editStatus: false,
            specificationId: 'H00003',
            baseName: '注射用紫杉醇脂质体',
            tradeName: '力扑素',
            enname: 'Paclitaxel Liposome for Injection',
            pinyin: 'Zhusheyong Zishanchunzhizhiti',


            characters: '本品为类白色或淡黄色块状物,微有卵磷脂腥味',
            storage: '遮光、密闭保存',
            pack: '西林瓶包装,一瓶/盒',
            validity: '18个月',
            executiveStandard: '国家药品监督管理局标准(试行)WS-718(X529)-2002',

            manufacturingEnterprise: '南京绿叶思科药业有限公司',
            drugClassificationName: '暂无',
            approvedDate: '2007年05月14日'

            // specificationId: this.option.specificationId,
            // baseName: this.option.baseName,
            // tradeName: this.option.tradeName,
            // enname: this.option.enname,
            // pinyin: this.option.pinyin,
            // mainComponent: this.option.mainComponent,
            // minorComponent: this.option.minorComponent,
            // indication: this.option.indication,
            // usage: this.option.usage,
            // adversereaction: this.option.adversereaction,
            // taboo: this.option.taboo,
            // notes: this.option.notes,
            // pregnantUse: this.option.pregnantUse,
            // childrenUse: this.option.childrenUse,
            // oldmanUse: this.option.oldmanUse,
            // drugInteractions: this.option.drugInteractions,
            // overdose: this.option.overdose,
            // toxicology: this.option.toxicology,
            // pharmacologic: this.option.pharmacologic,
            // pharmacokinetics: this.option.pharmacokinetics,
            // characters: this.option.characters,
            // storage: this.option.storage,
            // pack: this.option.pack,
            // validity: this.option.validity,
            // executiveStandard: this.option.executiveStandard,
            // approvalNumber: this.option.approvalNumber,
            // manufacturingEnterprise: this.option.manufacturingEnterprise,
            // drugClassificationName: this.option.drugClassificationName,
            // drugClassificationId: this.option.drugClassificationId,
            // approvedDate: this.option.approvedDate,
            // modifiedDate: this.option.modifiedDate
        };
    },
    computed: {
        //显示'保存'或'编辑'
        editText () {
            return (this.editStatus === true) ? '保存' : '编辑';
        },
        comHeight () {
            return window.innerHeight - 60 - 140;
        }
    },
    methods: {
        save () {
            this.editStatus = !this.editStatus;
            //调用接口
        }
    }
};
</script>
