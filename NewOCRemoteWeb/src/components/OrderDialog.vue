<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import BaseDialog from "./BaseDialog.vue";
import { Item } from "@/types/types";
import {
  onKeyDown,
  onKeyUp
} from "@vueuse/core";
import { Input } from "@/shadcn/component/ui/input";
import { baseUrl } from "@/utils/http/request";

const DialogRef = useTemplateRef("dialog");
const closeModal = () => {
  DialogRef.value?.closeModal();
};

const openModal = () => {
  DialogRef.value?.openModal();
};

defineExpose({
  closeModal,
  openModal,
});

const props = defineProps<{
  item: Item;
}>();
const CountList = [
  { label: "1", value: 1 },
  { label: "8", value: 8 },
  { label: "64", value: 64 },
  { label: "1024", value: 1024 },
];
const CountListBigger = [
  { label: "1M", value: 1000 * 1000 },
  { label: "10M", value: 1000 * 1000 * 10 },
  { label: "100M", value: 1000 * 1000 * 100 },
  { label: "1G", value: 1000 * 1000 * 1000 },
];
const useBigger = ref(false);
onKeyUp("Shift", () => {
  useBigger.value = false;
});
onKeyDown("Shift",() => {
    useBigger.value = true;
  },
  { dedupe: true }
);
const getCounter = computed(() => {
  return useBigger.value ? CountListBigger : CountList;
});
const orderCount = ref(1)
const PlusCount = (count:number,minus:boolean = false)=>{
  let res = orderCount.value;
  if(res === 1) res = 0;
  if(minus){
    res-=count;
  }else{
    res+=count;
  }
  if(res <= 0) res = 1;
  orderCount.value = res;
}
const processedUrl = computed(() => (item:Item)=>{
  return `${baseUrl}/api/ae/item/${item.damage}/${encodeURI(item.label)}`;
});
</script>
<template>
  <BaseDialog ref="dialog">
    <template #title> 预定合成 : {{ props.item.label }} </template>
    <template #default>
      <div>
        <div class="flex gap-4">
          <button class="btn w-16" v-for="ele in getCounter" :key="ele.label" @click="PlusCount(ele.value)">+{{ ele.label }}</button>
        </div>
        <div class="my-4 flex">
          <img class="w-12 h-12 border-2 rounded-lg mr-4" :src="processedUrl(props.item)"  />
          <Input class="w-fit mr-4 h-12" type="number" :modelValue="orderCount" />
          <button class="btn w-16 btn-craft h-12">合成</button>
        </div>
        <div class="flex gap-4">
          <button class="btn w-16" v-for="ele in getCounter" :key="ele.label" @click="PlusCount(ele.value,true)">-{{ ele.label }}</button>
        </div>
      </div>
    </template>
    <template #footerBtn>
      <button class="btn">Close</button>
    </template>
  </BaseDialog>
</template>
<style scoped>
.btn-craft{
  min-height: auto;
}
</style>
