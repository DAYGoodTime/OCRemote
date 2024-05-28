import { defineStore } from "pinia";
import { ref } from "vue";
import { AECPUTask, AEItem, CPUInfo } from "../api/types/entity";

export const useAEStore = defineStore("ae", () => {
  const Title = ref("AE管理"); //页面标题
  const FreeCPUs = ref(5); //空闲CPU
  const TotalCPUs = ref(10); //总计CPU
  const DialogRef = ref<any>(); //合成对话框引用
  const CraftingItem = ref<AEItem>({
    label: "",
    hasTag: false,
    damage: 0,
    isCraftable: false,
    size: 0,
    maxSize: 0,
    name: "",
    maxDamage: 0
  }); //选择要合成的物品
  const CPUInfoList = ref<CPUInfo[]>([{
    ID: "1",
    name: "",
    storage: "1024",
    coprocessors: "512",
    CraftingItem: {
      name: "test"
    } as AEItem,
    busy: false
  }]); //CPU信息数组
  const AEItemList = ref<AEItem[]>([{
    label: "",
    hasTag: false,
    damage: 0,
    isCraftable: false,
    size: 0,
    maxSize: 0,
    name: "",
    maxDamage: 0
  }])
  const CurrentCPUTask = ref<AECPUTask>({
    pendings: [],
    craftings: [],
    finalOutput: {
      label: "",
      hasTag: false,
      damage: 0,
      isCraftable: false,
      size: 0,
      maxSize: 0,
      name: "",
      maxDamage: 0
    },
    busy: false,
    id: 0
  }); //当前正在合成的CPU任务
  return { Title, FreeCPUs, TotalCPUs, DialogRef, CraftingItem, CPUInfoList,AEItemList ,CurrentCPUTask};
});