<template>
  <div class="master">
    <h2
      class="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white m-4"
    >
      CPU状态:
    </h2>
    <div class="max-w-full min-h-96 bg-gray-100 rounded-box mt-10 mx-4 p-6">
      <p class="mb-2">CPU编号:{{ info?info.ID:'' }}</p>
      <p class="mb-2">CPU名称:{{ info?info.name:''  }}</p>
      <p class="mb-2 text-2xl font-bold">最终产物:</p>
      <Item :name="AEStore.CurrentCPUTask.finalOutput.label" 
      :size="AEStore.CurrentCPUTask.finalOutput.size"
      :item="AEStore.CurrentCPUTask.finalOutput"
      :canOrder="false"/>
      <p class="my-2 text-2xl font-bold">合成中:</p>
      <div class="my-4 items flex flex-row flex-wrap">
      <Item
        v-for="(item, index) in AEStore.CurrentCPUTask.craftings"
        :key="index"
        :name="item.label"
        :canOrder="false"
        :size="item.size"
        :item="item"
      />
    </div>
      <p class="my-2 text-2xl font-bold">计划合成:</p>
      <div class="my-4 items flex flex-row flex-wrap">
      <Item
        v-for="(item, index) in AEStore.CurrentCPUTask.pendings"
        :key="index"
        :name="item.label"
        :canOrder="false"
        :size="item.size"
        :item="item"
      />
    </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAEStore } from "../store/ae";
import { onBeforeMount, onMounted, ref } from "vue";
import type { AECPUTask, CPUInfo } from "../api/types/entity";
import { ElMessage } from "element-plus";
import { getCpuCraftingTask } from "../api/modules/AE";
import Item from "../components/Item.vue";
import { Loading } from "../utils";

const AEStore = useAEStore();
const route = useRoute();
const router =useRouter();
const info = ref<CPUInfo>({
  ID: "1",
  name: "",
  storage: "",
  coprocessors: "",
  busy: false
})
onBeforeMount(() => {
  if(route.params.index){
    info.value = AEStore.CPUInfoList[Number(route.params.index)];
    if(!info.value||!info.value.busy){
      ElMessage({
        type:"warning",message:"cpu空闲中"
      })
      router.push({
        name:"AE"
      })
    }
  }
});
onMounted(async()=>{
    const loading = Loading(".master")
    //获取任务信息
    await getTask(info.value.ID as number)
    loading.close();
})
const getTask = async (id:number) =>{
    let res = await getCpuCraftingTask(id);
    if(res.success){
      AEStore.CurrentCPUTask = res.data as AECPUTask;
    }else{
      ElMessage({
        type:"warning",message:"获取失败"
      })
    }
}
</script>
