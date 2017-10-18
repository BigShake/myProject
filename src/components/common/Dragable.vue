<style lang="less" scoped>
.dragable-item {
    cursor: move;
    outline: none;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
    user-select:none;
}
</style>


<template>
<div class="dragable-item" @mousedown="handleMouseDown($event)" ref="dragableItem">
    <slot></slot>
</div>
</template>

<script>
export default {
    data() {
        return {
            disX: 0,
            disY: 0,
            zIndex: 1
        };
    },
    props: {
        params: {
            default: {
                data: "default temp drag block data"
            }
        }
    },
    mounted() {
    },
    methods: {
        handleMouseDown(event2) {
            let event = event2 || window.event;
            // let _this = this;
            let el = event.currentTarget;
            let oDrag = el;
            const tempBlockHeight = 50;
            const tempBlockWidth = 100;
            this.disX = event.clientX - tempBlockWidth / 2;
            this.disY = event.clientY - tempBlockHeight / 2;
            let oTemp = document.createElement("div");
            oTemp["id"] = "temp";
            const tempBlockStyle = {
                left: this.disX + "px",
                top: this.disY + "px",
                zIndex: this.zIndex++,
                position: "fixed",
                height: "50px",
                width: "100px",
                backgroundColor: "rgba(150,150,150,0.7)",
                cursor: "move",
                pointerEvents: "none"
            };
            for (const key in tempBlockStyle) {
                oTemp.style[key] = tempBlockStyle[key];
            }
            localStorage.setItem("tempDragBlockData", JSON.stringify(this.params));
            document.body.appendChild(oTemp);
            document.onmousemove = function(event1) {
                let _event = event1 || window.event;
                var iL = _event.clientX - tempBlockWidth / 2;
                var iT = _event.clientY - tempBlockHeight / 2;
                // var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
                // var maxT = document.documentElement.clientHeight - oDrag.offsetHeight
                // iL <= 0 && (iL = 0);
                // iT <= 0 && (iT = 0);
                // iL >= maxL && (iL = maxL);
                // iT >= maxT && (iT = maxT);
                oTemp.style.left = iL + "px";
                oTemp.style.top = iT + "px";
                return false;
            };
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
                // oDrag.style.left = oTemp.style.left;
                // oDrag.style.top = oTemp.style.top;
                // oDrag.style.zIndex = oTemp.style.zIndex;
                document.body.removeChild(oTemp);
                oDrag.releaseCapture && oDrag.releaseCapture();
                localStorage.removeItem("tempDragBlockData");
                return true;
            };
            // el.setCapture && el.setCapture();
            return false;
        }
    }
};
</script>

