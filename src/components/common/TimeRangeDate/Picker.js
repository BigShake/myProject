import Picker from './Picker.vue';
import DatePanel from './Panel.vue';
import Vue from 'vue';

const getPanel = function (type) {
    return DatePanel;
};
export default {
    mixins: [Picker],
    props: {
        type: {
            default: 'date'
        },
        value: {}
    },
    created () {
        if (!this.currentValue) {
            this.currentValue = '';
        }

        const panel = getPanel(this.type);
        this.Panel = new Vue(panel);
    }
};
