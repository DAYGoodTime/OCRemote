<script setup lang="tsx">
import { getAECPUInfos } from "@/api/ae";
import ItemView from "@/components/ItemView";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/component/ui/card";
import { Progress } from "@/shadcn/component/ui/progress";
import { useAEStore } from "@/store/aestore";
import { useGlobalStore } from "@/store/global";
import { match } from "pinyin-pro"
import { computed, ref } from "vue";
import { useQuery } from "vue-query";
const imageSize = ref<"small" | "middle" | "large">("middle");
const AEStore = useAEStore();
const fetchCPUInfos = async () => {
  let res = await getAECPUInfos();
  AEStore.RawCPUInfo = res.data;
  return res.data;
};
const CPUInfoQuery = useQuery("AECPUInfo", fetchCPUInfos, {
  refetchIntervalInBackground: false,
  refetchOnWindowFocus: false,
});
const GetUsedCPUProgress = computed(()=>{
  if(CPUInfoQuery.data.value){
    let data = CPUInfoQuery.data.value;
    let usedCPU = data.total_cpus - data.idle_cpus;
    if(usedCPU == 0) return 0;
    return (usedCPU / data.total_cpus)*100
  }else return 0;
})
const globalStore = useGlobalStore()
</script>
<template>
  <div class="flex items-center">
    <Card>
      <CardHeader>
        <CardDescription class="text-xl md:text-2xl">
          处理器情况
        </CardDescription>
        <CardTitle class="text-2xl md:text-4xl"
          >{{
            CPUInfoQuery.data.value
              ? CPUInfoQuery.data.value.total_cpus -
                CPUInfoQuery.data.value.idle_cpus
              : 0
          }}
          /
          {{
            CPUInfoQuery.data.value ? CPUInfoQuery.data.value.total_cpus : 0
          }}</CardTitle
        >
      </CardHeader>
      <CardContent>
        <Progress v-model="GetUsedCPUProgress" class="h-4" />
      </CardContent>
    </Card>
  </div>
  <div class="rounded-lg border border-dashed shadow-sm p-4 max-w-full">
    <div v-if="AEStore.ItemQuery.isFetching" class="flex flex-col w-full">
      <div class="skeleton h-32 w-full mb-4"></div>
      <div class="skeleton h-4 w-full mb-4"></div>
      <div class="skeleton h-4 w-full mb-4"></div>
      <div class="skeleton h-4 w-3/4 mb-4" v-for="_i in 5"></div>
    </div>
    <div class="flex flex-row flex-wrap w-full gap-2" v-else>
      <ItemView
        :item="item"
        :size="globalStore.ImageSize"
        v-for="item in AEStore.getItemList"
      ></ItemView>
    </div>
  </div>
</template>
