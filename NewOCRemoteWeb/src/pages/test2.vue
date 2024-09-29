
<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/component/ui/select";
import type { Item } from "@/types/types";
import ItemView from "@/components/ItemView";
import OrderDialog from "@/components/OrderDialog.vue";
const testUrl =
  "http://localhost:125/api/ae/item/0/1k%E5%90%88%E6%88%90%E5%AD%98%E5%82%A8%E5%99%A8";
const imageSize = ref<"small" | "middle" | "large">("middle");
const item = ref<Item>({
  label: "16k合成器",
  name: "http://localhost:125/api/ae/item/0/1k%E5%90%88%E6%88%90%E5%AD%98%E5%82%A8%E5%99%A8",
  size: 11451,
  maxSize: 0,
  damage: 0,
  isCraftable: true,
});
const dialog = useTemplateRef("dialog")
const handlerOpen = () => {
  dialog.value?.openModal();
};
</script>

<template>
  <Select v-model="imageSize">
    <SelectTrigger class="w-36">
      <SelectValue placeholder="Select a size" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="small"> 小 </SelectItem>
        <SelectItem value="middle"> 中 </SelectItem>
        <SelectItem value="large"> 大 </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  Select : {{ imageSize }}
  <ItemView :item="item" :size="imageSize" />
  <button class="btn" @click="handlerOpen">open Dialog</button>
  <OrderDialog ref="dialog" :item="item"></OrderDialog>
</template>

<style scoped></style>
