<style lang="less" scoped>

</style>


<template>
  <div>
    <script id="editor" type="text/plain" style="height: 300px;"></script>
  </div>
</template>

<script>
import '../../assets/ueditor/ueditor.config.js';
import '../../assets/ueditor/ueditor.all.min.js';
import '../../assets/ueditor/lang/zh-cn/zh-cn.js';
import '../../assets/ueditor/ueditor.parse.min.js';
export default {
    data () {
        return {
            editor: null
        };
    },
    props: {
        defaultMsg: {
            type: String
        },
        config: {
            type: Object
        }
    },
    mounted() {
        const _this = this;
        let config = {
            // autoHeightEnabled: true,
            minFrameHeight: 400
        };
        for (const key in this.config) {
            config[key] = this.config[key];
        }
        this.editor = UE.getEditor('editor', config); // 初始化UE
        this.editor.addListener("ready", function () {
            _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
        });
    },
    methods: {
        getUEContent() { // 获取内容方法
            return this.editor.getContent();
        }
    },
    destroyed() {
        this.editor.destroy();
    }
};
</script>
