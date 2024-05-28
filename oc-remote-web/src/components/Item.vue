<template>
  <div
    :class="`bg-white rounded-box mb-2 mr-2 
  ${
    SettingStore.ItemBoxSize == 'large'
      ? 'w-20 h-20'
      : SettingStore.ItemBoxSize == 'medium'
      ? 'w-16 h-16'
      : 'w-12 h-12'
  }`"
  >
    <div
      class="tooltip w-full h-full rounded-box indicator"
      :data-tip="props.name"
    >
      <div
        class="indicator-item indicator-middle w-6 h-6 bg-base-200 rounded-full flex items-center justify-center"
        v-if="props.canOrder"
      >
        <button class="btn px-0 w-full h-full min-h-0" @click="orderItem">
          <Icon icon="bx:cart-add" width="1rem" height="1rem" />
        </button>
      </div>
      <span class="indicator-item indicator-bottom badge badge-neutral">{{
        FormatNumber(props.size, "count", 1)
      }}</span>
      <el-image
        class="rounded-box"
        v-if="props.name != 'NULL'"
        :src="GetImagePath"
        style="width: 100%; height: 100%"
        fit="cover"
      >
        <template #error>
          <div class="image-slot">加载失败了捏！</div>
        </template>
      </el-image>
      <p v-else>未获取到物品，是否安装了合成监控器?</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSettingStore } from "../store/setting";
import { useAEStore } from "../store/ae";
import { FormatNumber } from "../utils";
import { AEItem } from "@/api/types/entity";
import { computed } from "vue";


const props = defineProps({
  size: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    require: true,
  },
  canOrder: {
    type: Boolean,
    default: false,
  },
  item: {
    type:Object//哎，Vue怎么就不能简单的支持type呢（
  },
});
const SettingStore = useSettingStore();
const AEStore = useAEStore();
// const url = ref(`${SettingStore.ItemBaseUrl}${props.name}.png`);

const orderItem = () => {
  if (AEStore.DialogRef) {
    AEStore.DialogRef.showModal();
    if (props.item) {
      AEStore.CraftingItem = props.item as AEItem;
    }
  }
};
const GetImagePath = computed(()=>{
  let url;
  let name = props.name;
  if(!name || name.length < 1) name = "MissingItem"
  //液滴处理
  if(name.includes("液滴") || name.includes("drop of")){
    name = "___液滴";
  }
  //激光仓格式
  if(name.includes("/t")){
    name = name.replace("/","_")
  }
  //对名字提前编码一下，是在是太多问题了
  name = encodeURI(name);
  if(props.item){
    url = `${SettingStore.ItemBaseUrl}/${props.item.damage}/${name}`
  }else{
    url = `${SettingStore.ItemBaseUrl}/0/${name}`
  }
  return url;
})

</script>
<style scoped>
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 1rem;
}
.icon:active {
  transform: scale(0.95);
}
</style>
