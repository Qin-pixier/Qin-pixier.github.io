<template>
  <li
    @click="clickItem"
    class="ysyz-menu-item"
    :class="itemClass"
    :style="itemStyle"
  >
    <slot></slot>
  </li>
</template>
<script lang="ts">
export default {
  name: "ysyz-menuItem",
};
</script>
<script setup lang="ts">
import { findComponentsUpward } from "../../src/utils/assits";
import { computed, getCurrentInstance, inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const padding = ref(30);
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  to: {
    type: Object,
  },
  replace: {
    type: Boolean,
    default: false,
  },
  target: {
    type: String,
  },
});

const mode = inject("mode");

const itemStyle = computed(() => {
  if (mode === "vertical")
    return `padding-left:${padding.value}px;padding-right:${
      padding.value > 30 ? 50 : 30
    }px`;
  else return "";
});

//状态控制
const active = ref(false);
const itemClass = computed(() => {
  return [
    active.value ? "ysyz-menu-item-active" : "",
    activeHorizontal.value ? "ysyz-menu-horizontal-active" : "",
  ];
});
const toAuto = inject("toAuto");
const replaceAuto = inject("replaceAuto");
const router = useRouter();
const activeHandle = () => {
  active.value = true;
  if (props.to) {
    if (props.replace) router.replace(props.to);
    else router.push(props.to);
  } else if (replaceAuto) {
    router.replace({ name: props.name });
  } else if (toAuto) {
    router.push({ name: props.name });
  } else if (props.target) {
    window.location.href = props.target;
  }
};
const disactiveHandle = () => {
  active.value = false;
};

//父子间通信用
const activeHorizontal = ref(false); //只对第一级菜单有实际意义。
let instance = getCurrentInstance();
let menuNode:any = null;
let outNode:any = null;
const clickItem = () => {
  if (mode === "vertical") menuNode.exposed?.clickItemHandle(props.name);
  else {
    outNode.exposed.ChildrenActiveHandleHorizontal(props.name, props.name);
    activeHandle();
  }
};
const activeHandleHorizontal = () => {
  if (outNode.type.name !== "ysyz-menu") return;
  activeHorizontal.value = true;
};
const disactiveHandleHorizontal = () => {
  activeHorizontal.value = false;
  active.value = false;
};

defineExpose({
  name: props.name,
  activeHandle,
  disactiveHandle,
  activeHandleHorizontal,
  disactiveHandleHorizontal,
  clickItem,
});
onMounted(() => {
  let menuList = findComponentsUpward(instance, ["ysyz-menu", "ysyz-submenu"]);
  padding.value *= menuList.length;
  outNode = menuList[0];
  menuNode = menuList.pop();
  menuNode.exposed?.addItemList(instance);
});
</script>

<style lang="scss" scoped></style>
