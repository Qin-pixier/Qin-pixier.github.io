<template>
    <ul :class="simpleWrapClasses"  v-if="props.simple">
        <li
           
            :class="prevClasses"
            @click.stop="prev">
            <a><ysyz-icon type="left"></ysyz-icon></a>
        </li>
        <div :class="simplePagerClasses" :title="currentPage + '/' + allPages">
            <input
                type="text"
                :value="currentPage"
                autocomplete="off"
                spellcheck="false"
                @keydown="keyDown"
                @keyup="keyUp"
                @change="keyUp">
            <span>/</span>
            {{ allPages }}
        </div>
        <li
           
            :class="nextClasses"
            @click.stop="next">
            <a><ysyz-icon type="right"></ysyz-icon></a>
        </li>
    </ul>
    <ul :class="wrapClasses" v-else>
        <span :class="`${prefix}-total`" v-if="props.showTotal">
            <slot> 共{{ total }} <template v-if="props.total <= 1">页</template><template v-else>条</template></slot>
        </span>
        <li
            :class="prevClasses"
            @click.stop="prev">
            <a><template v-if="props.prevText !== ''">{{ props.prevText }}</template><ysyz-icon type="left"></ysyz-icon></a>
        </li>
        <li title="1" :class="firstPageClasses" @click.stop="changePage(1)"><a>1</a></li>
        <li  v-if="currentPage > 5" :class="`${prefix}-item-jump-prev`" @click.stop="fastPrev"><ysyz-icon type="left"></ysyz-icon><ysyz-icon type="left"></ysyz-icon></li>
        <li  v-if="currentPage === 5" :class="`${prefix}-item`" @click.stop="changePage(currentPage - 3)"><a>{{ currentPage - 3 }}</a></li>
        <li  v-if="currentPage - 2 > 1" :class="`${prefix}-item`" @click.stop="changePage(currentPage - 2)"><a>{{ currentPage - 2 }}</a></li>
        <li  v-if="currentPage - 1 > 1" :class="`${prefix}-item`" @click.stop="changePage(currentPage - 1)"><a>{{ currentPage - 1 }}</a></li>
        <li  v-if="currentPage != 1 && currentPage != allPages" :class="[`${prefix}-item`,`${prefix}-item-active`]"><a>{{ currentPage }}</a></li>
        <li  v-if="currentPage + 1 < allPages" :class="`${prefix}-item`" @click.stop="changePage(currentPage + 1)"><a>{{ currentPage + 1 }}</a></li>
        <li  v-if="currentPage + 2 < allPages" :class="`${prefix}-item`" @click.stop="changePage(currentPage + 2)"><a>{{ currentPage + 2 }}</a></li>
        <li  v-if="allPages - currentPage === 4" :class="`${prefix}-item`" @click.stop="changePage(currentPage + 3)"><a>{{ currentPage + 3 }}</a></li>
        <li  v-if="allPages - currentPage >= 5" :class="`${prefix}-item-jump-next`" @click.stop="fastNext"><ysyz-icon type="right"></ysyz-icon><ysyz-icon type="right"></ysyz-icon></li>
        <li  v-if="allPages > 1" :class="lastPageClasses" @click.stop="changePage(allPages)"><a>{{ allPages }}</a></li>
        <li
            :class="nextClasses"
            @click.stop="next">
            <a><template v-if="props.nextText !== ''">{{ props.nextText }}</template>
                <ysyz-icon type="right"></ysyz-icon></a>
        </li>
        <optionVue
            :show-sizer="showSizer"
            :page-size="currentPageSize"
            :page-size-opts="pageSizeOpts"
            :placement="placement"
            :transfer="transfer"
            :show-elevator="showElevator"
            :_current.once="currentPage"
            :current="currentPage"
            :all-pages="allPages"
            :is-small="isSmall"
            @on-size="onSize"
            @on-page="onPage">
            <slot></slot>
        </optionVue>
    </ul>
</template>

<script lang="ts">
export default {
  name: "ysyz-page",
};
</script>
<script setup lang="ts">
import myValidat from './func';
import { computed, ref ,watch} from 'vue';
import optionVue from './option.vue';
const emit=  defineEmits(["update:current",'on-change','on-prev', 'on-next','on-page-size-change'])

const props = defineProps({
    current: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
                default: 0
            },
            pageSize: {
                type: Number,
                default: 10
            },
            pageSizeOpts: {
                type: Array,
                default () {
                    return [10, 20, 30, 40];
                }
            },
            placement: {
                validator (value:string) {
                    return myValidat(value, ['top', 'bottom']);
                },
                default: 'bottom'
            },
            transfer: {
                type: Boolean,
                default:false
            },
            size: {
                validator (value:string) {
                    return myValidat(value, ['small']);
                }
            },
            simple: {
                type: Boolean,
                default: false
            },
            showTotal: {
                type: Boolean,
                default: false
            },
            showElevator: {
                type: Boolean,
                default: false
            },
            showSizer: {
                type: Boolean,
                default: false
            },
            className: {
                type: String
            },
            styles: {
                type: Object
            },
            prevText: {
                type: String,
                default: ''
            },
            nextText: {
                type: String,
                default: ''
            }

})
const prefix = 'ysyz-page'
let currentPage= ref(props.current);
const currentPageSize = ref(props.pageSize)
watch(()=>props.current,(val:any)=>{
    
    let maxPage = Math.ceil(val/currentPageSize.value)
    if(maxPage < currentPage.value){
        currentPage.value = (maxPage === 0 ? 1: maxPage)
    }
})
watch(()=>currentPage.value,(val)=>{
    currentPage.value = val
})
watch(()=>currentPageSize.value,(val)=>{
    currentPageSize.value = val
})
const isSmall = computed(()=>{
    return !!props.size
})
const allPages = computed(()=>{
    const allPage = Math.ceil(props.total / currentPageSize.value)
    console.log(props.total)
    return (allPage === 0) ? 1:allPage;
})
const simpleWrapClasses = computed(()=>{
    return [
        `${prefix}`,
        `${prefix}-simple`,
        {
            [`${props.className}`]:!!props.className
        }
    ]
})
const simplePagerClasses = computed(()=>{
    return `${prefix}-simple-pager`
})
const wrapClasses = computed(()=>{
    return [
        `${prefix}`,
        {
            [`${props.className}`]:!!props.className,
            'mini':!!props.size
        }
    ]
})
const prevClasses = computed(()=>{
    return [
        `${prefix}-prev`,
        {
            [`${prefix}-disabled`]:currentPage.value === 1,
            [`${prefix}-custom-text`]: props.prevText !== ''
        }
    ]
})
const nextClasses = computed(()=>{
    return [
        `${prefix}-prev`,
        {
            [`${prefix}-disabled`]:currentPage.value === allPages.value,
            [`${prefix}-custom-text`]: props.prevText !== ''
        }
    ]
})
const firstPageClasses  = computed(()=>{
    return [
            `${prefix}-item`,
            {
                [`${prefix}-item-active`]:currentPage.value === 1
            }
        ];
})
const lastPageClasses = computed(()=>{
    return [
            `${prefix}-item`,
            {
                [`${prefix}-item-active`]: currentPage.value === allPages.value
            }
        ];
})
const changePage = (page:any)=>{
    if(currentPage.value != page){
        currentPage.value = page;
        emit('update:current', page)
        emit('on-change', page)
    }
}
const prev = ()=>{
    const current = currentPage.value;
    if (current <= 1) {
        return false;
    }
    emit('on-prev',current-1)
    changePage(current - 1);
    console.log('触发前一个')
}
const next = ()=>{
    const current = currentPage.value;
    if (current >= allPages.value) {
        return false;
    }
    emit('on-next', current+1)
    changePage(current + 1);
    console.log('触发后一个')
}
const fastPrev = ()=>{
    const page = currentPage.value- 5;
    if (page > 0) {
        changePage(page);
    } else {
        changePage(1);
    }
}
const fastNext = ()=>{
    const page = currentPage.value + 5;
    if (page > allPages.value) {
        changePage(allPages.value);
    } else {
        changePage(page);
    }  
}
const onSize = (pageSize:any)=>{
    currentPageSize.value = pageSize;
    emit('on-page-size-change', pageSize);
    changePage(1);
}
const onPage = (page:any)=>{
    changePage(page)
}
const keyDown = (e:any)=>{
    const key = e.keyCode;
    const condition = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key === 8 || key === 37 || key === 39;

    if (!condition) {
        e.preventDefault();
    }
}
const keyUp = (e:any)=>{
    const key = e.keyCode;
    const val = parseInt(e.target.value);

    if (key === 38) {
        prev();
    } else if (key === 40) {
        next();
    } else if (key === 13) {
        let page = 1;

        if (val > allPages.value) {
            page = allPages.value;
        } else if (val <= 0 || !val) {
            page = 1;
        } else {
            page = val;
        }

        e.target.value = page;
        changePage(page);
    }
}
</script>

<style lang="scss" scoped>
$prefix : ysyz-page;
.#{$prefix}{
    &:after {
        display: block;
        height: 0;
        clear: both;
        overflow: hidden;
        visibility: hidden;
    }
    &-item {
        display: inline-block;
        //float: left;
        vertical-align: middle;
        min-width: 32px;
        height: 32px;
        line-height: 30px;
        margin-right: 4px;
        text-align: center;
        list-style: none;
        background-color: #fff;
        user-select: none;
        cursor: pointer;
        font-family: Arial;
        font-weight: 500;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        //transition: all @transition-time @ease-in-out;
        transition: border .2s ease-in-out, color .2s ease-in-out;

        a {
            font-family: "Monospaced Number";
            margin: 0 6px;
            text-decoration: none;
            color: #515a6e;
            //transition: none;
        }

        &:hover {
            border-color: $primary;
            a {
                color:$primary;
            }
        }

        &-active {
            border-color: $primary;

            a, &:hover a {
                color:$primary;
            }
        }
    }
    &-item-jump-prev, &-item-jump-next {
        &:after {
            display: block;
            letter-spacing: 1px;
            color: #ccc;
            text-align: center;
        }

        i{
            display: none;
        }

        &:hover {
            &:after{
                display: none;
            }
            i{
                display: inline;
            }
        }
    }

    &-item-jump-prev:hover {
        i:after {
            content: "\F115";
            margin-left: -8px;
        }
    }

    &-item-jump-next:hover {
        i:after {
            content: "\F11F";
            margin-left: -8px;
        }
    }

    &-prev{
        margin-right: 4px;
    }

    &-item-jump-prev,
    &-item-jump-next{
        margin-right: 4px;
    }

    &-prev,
    &-next,
    &-item-jump-prev,
    &-item-jump-next {
        display: inline-block;
        vertical-align: middle;
        user-select: none;
        //float: left;
        min-width: 32px;
        height: 32px;
        line-height: 30px;
        list-style: none;
        text-align: center;
        cursor: pointer;
        color: #666;
        font-family: Arial;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        transition: all .2s ease-in-out;
    }
    &-item-jump-prev,
    &-item-jump-next{
        border-color: transparent;
    }

    &-prev,
    &-next {
        background-color: #fff;

        a {
            color: #666;
            font-size: 14px;
        }

        &:hover {
            border-color: $primary;

            a {
                color: $primary;
            }
        }
    }

    &-disabled {
        opacity: .5;
        cursor: not-allowed;
        a {
            color: #ccc;
        }
        &:hover {
            border-color: #dcdee2;
            a {
                color: #ccc;
                cursor: not-allowed;
            }
        }
    }

    &-options {
        display: inline-block;
        vertical-align: middle;
        //float: left;
        margin-left: 15px;
        &-sizer {
            display: inline-block;
            //float: left;
            margin-right: 10px;
        }

        &-elevator {
            display: inline-block;
            vertical-align: middle;
            //float: left;
            height: 32px;
            line-height: 32px;

            input {
                border-radius: 4px;
                margin: 0 8px;
                width: 50px;
                
            }
        }
    }

    &-total {
        display: inline-block;
        //float: left;
        height: 32px;
        line-height: 32px;
        margin-right: 10px;
    }

    &-simple &-prev,
    &-simple &-next {
        margin: 0;
        border: 0;
        height: 24px;
        line-height: normal;
        font-size: 18px;
    }

    &-simple &-simple-pager {
        display: inline-block;
        //float: left;
        margin-right: 8px;
        vertical-align: middle;

        input {
            width: 30px;
            height: 24px;
            margin: 0 8px;
            padding: 5px 8px;
            text-align: center;
            box-sizing: border-box;
            background-color: #fff;
            outline: none;
            border: 1px solid #dcdee2;
            border-radius: 4px;
            transition: border-color .2s ease-in-out;

            &:hover {
                border-color: $primary;
            }
        }

        span{
            padding: 0 8px 0 2px;
        }
    }

    &-custom-text, &-custom-text:hover{
        border-color: transparent;
    }
}
.#{$prefix}{
    &.mini &-total {
        height: 24px;
        line-height: 24px;
    }

    &.mini &-item {
        border: 0;
        margin: 0;
        min-width: 24px;
        height: 24px;
        line-height: 24px;
        border-radius: 3px;
    }

    &.mini &-prev,
    &.mini &-next {
        margin: 0;
        min-width: 24px;
        height: 24px;
        line-height: 24px - 2px;
        border: 0;

        a {
            i:after {
                height: 24px;
                line-height: 24px;
            }
        }
    }

    &.mini &-item-jump-prev,
    &.mini &-item-jump-next {
        height: 24px;
        line-height: 24px;
        border: none;
        margin-right: 0;
    }

    &.mini &-options {
        margin-left: 8px;
        &-elevator {
            height: 24px;
            line-height: 24px;

            input {
                .input-small{
                width: 44px;

                }
            }
        }
    }
}
</style>
