<style>
@import "styles/theme_default.less";
html,body {
    height: 100%;
}
</style>

<style lang="less">
    @import 'styles/common.less';
    @import 'styles/difinitions.less';
    .my-app{
        height: 100%;

        .layout {
            border: 1px solid #d7dde4;
            background: #f5f7f9;
            position: relative;
            height: 100%;
        }
        .row-full-height {
            height: 100%;
        }
        
        //导航栏高度
        @c-nav-height: 60px;

        //导航容器
        .layout-nav-container {
            height: @c-nav-height;
            width: 100%;
            //logo
            .logo-container {
                height: 60px;
                width: 100%;
                color: #fff;
                background-color: @c-main;
                .font-xl;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #cccccc;
            }
        }

        //右上角账户管理
        .account-container {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            height: 60px;
            right: 80px;
            z-index: 999;

            .ivu-tooltip-popper {
                // color: @c-table-border;
                .ivu-tooltip-arrow {
                    color: #fff;
                    // border-bottom-color: #fff;
                    border-bottom-color: @c-table-border !important;
                }
                .ivu-tooltip-inner {
                    background-color: @c-menu-bg;
                    color: @c-nav-title-font;

                    //每一项
                    .account-item {
                        .font-xs();

                        &.hover {
                            background-color: #f3f3f3;
                        }
                    }
                }
            }

            
        }

        //混合
        .content-mixins () {
            background-color: @c-content-bg;
            min-height: 200px;
            overflow: hidden;
            border-radius: 4px;
            height: 100%;
            box-sizing: border-box;
            overflow-y: auto;
        }
        .main-mixins (@padding: 0 30px) {
            padding: @padding;
            background: @c-content-bg;
            height: 100%;
            min-height: 100%;
        }

        //单页面容器
        .single-content-container {
            .content-mixins();
            
            .single-content-main {
                .main-mixins(0);
            }
        }

        //页面容器
        .layout-content-container {
            height: calc(~'100% - 60px');
            width: 100%;

            .layout-content {
            .content-mixins();

                .layout-content-main {
                    .main-mixins();
                }
            }
        }
    }   
</style>
<template>
<div class="my-app">
    <div class="layout">
        <Row type="flex" class-name = "row-full-height" v-if="isSinglePage">
            <i-col span="24">
                <div class="single-content-container">
                    <div class="single-content-main"><router-view></router-view></div>
                </div>
            </i-col>
        </Row>
        <Row type="flex" class-name = "row-full-height" v-else>
            <!-- 导航菜单 -->
            <Row class-name = "layout-nav-container">
                <Col span="4">
                    <div class="logo-container">药品知识库</div>
                </Col>
                <Col span="20">
                    <Menu
                        mode="horizontal"
                        theme="light"
                        :active-name="activeName"
                        :open-names="openSupMenus"
                        @on-select="onMenuSelect"
                        class="a">
                        <Submenu v-for="submenuitem in menuData" :key="submenuitem.menuId" :name="submenuitem.menuId">
                            <template slot="title">
                                <Icon :type="iconNameMap[submenuitem.menuId]"></Icon>
                                {{submenuitem.name}}
                            </template>
                            <Menu-item v-for="childitem in submenuitem.childs" :key="childitem.menuId" :name="childitem.url">
                                {{childitem.name}}
                            </Menu-item>
                        </Submenu>
                    </Menu>
                </Col>
            </Row>
            <div class="account-container">
                <Tooltip class="clickable" :always="false" placement="bottom">
                    <span>管理员</span>
                    <Icon type="arrow-down-b"></Icon>
                    <div slot="content">
                        <div class="account-item clickable" @click="$router.push('/account/modify_password')">修改密码</div>
                        <div class="account-item clickable" @click="logout">退出</div>
                    </div>
                </Tooltip>
            </div>
            <!-- 内容 -->
            <Row class-name = "layout-content-container">
                <div class="layout-content">
                    <div class="layout-content-main"><router-view></router-view></div>
                </div>
            </Row>
        </Row>
    </div>
</div>
</template>
<script>
import util from "./libs/util";
export default {
    data () {
        return {
            isSinglePage: true,
            menuData: [],
            menuDataObj: {},
            activeName: "",
            openSupMenus: [],
            iconNameMap: {
                "1": "standard-lib",
                "2": "custome",
                "3": "setting",
                "4": "one-person"
            },
            singlePageList: [
                "/login",
                "/secure/iforget",
                "/secure/active_account"
            ]
        };
    },
    mounted () {
    },
    beforeDestroy () {

    },
    methods: {
        onMenuSelect: function(name) {
            // if (name === "setting") {
            // } else if (name === "logout") {

            // } else {
            //     this.$router.push("/" + name);
            // }
            this.$router.push("/" + name);
        },
        rebuildMenuData: function(menuData) {
            var menuMap = [];
            var _this = this;
            var activeName = "";
            /**
             * 给菜单列表添加对应等级的子菜单
             * @param {map<string,object>} parentMenuMap 父菜单的键值对
             * @param {object} childMenuItem 子菜单项
             * @param {integer} level 子菜单级别
             * @returns {list<object>} 返回添加子菜单后的结果列表
             */
            function addMenuChilds(parentMenuMap, childMenuItem, level) {
                if (level === 2) {
                    for (const index in parentMenuMap) {
                        let tempPMenu = parentMenuMap[index];
                        if (childMenuItem.parentId === tempPMenu.menuId) {
                            if (_this.$route.path === "/" + childMenuItem.url) {
                                activeName = childMenuItem.url;
                            }
                            tempPMenu.childs.push(childMenuItem);
                            parentMenuMap[index] = tempPMenu;
                            break;
                        }
                    }
                } else if (level === 3) {
                    let breakAll = false;
                    for (const index in parentMenuMap) {
                        let parent2MenuMap = parentMenuMap[index].childs;
                        for (const index2 in parent2MenuMap) {
                            let tempPMenu = parent2MenuMap[index2];
                            if (childMenuItem.parentId === tempPMenu.menuId) {
                                if (_this.$route.path === "/" + childMenuItem.url) {
                                    activeName = childMenuItem.url;
                                }
                                if (typeof tempPMenu.childs === "undefined") {
                                    tempPMenu.childs = [];
                                }
                                tempPMenu.childs.push(childMenuItem);
                                parentMenuMap[index].childs[index2] = tempPMenu;
                                breakAll = true;
                                break;
                            }
                        }
                        if (breakAll) {
                            break;
                        }
                    }
                }

                return parentMenuMap;
            }
            for (const index in menuData) {
                let menuItem = menuData[index];
                if (parseInt(menuItem.level) === 1) {
                    menuMap.push({
                        name: menuItem.name, menuId: menuItem.menuId, childs: []
                    });
                }
            }
            for (const index in menuData) {
                let menuItem = menuData[index];
                if (parseInt(menuItem.level) === 2) {
                    menuMap = addMenuChilds(menuMap, menuItem, 2);
                }
            }
            for (const index in menuData) {
                let menuItem = menuData[index];
                if (parseInt(menuItem.level) === 3) {
                    menuMap = addMenuChilds(menuMap, menuItem, 3);
                }
            }
            return {
                menuMap: menuMap,
                activeName: activeName
            };
        },
        //获取菜单
        requestMenuData: function() {
            let _this = this;
            util.request(global.API_PREFIX + '/menu/get'
            ).then(function (response) {
                //渲染菜单
                _this.menuDataObj = _this.rebuildMenuData(response.data.rows);
            }).catch(function (error) {

            });
        }
    },
    computed: {
    },
    watch: {
        menuDataObj: function(curVal) {
            let _this = this;
            const menuDataObj = curVal;
            _this.activeName = menuDataObj.activeName;
            _this.openSupMenus.push(menuDataObj.menuMap[0].menuId);
            _this.menuData = menuDataObj.menuMap;
            this.$nextTick(function() {
                if (_this.$refs.menuRef) {
                    _this.$refs.menuRef.updateOpened();
                    _this.$refs.menuRef.updateActiveName();
                }
            });
        },
        '$route' (to, from) {
            if (this.singlePageList.indexOf(to.path) === -1) {
                this.isSinglePage = false;
            }
        }
    },
    created: function() {
        this.requestMenuData();
    }
};
</script>
