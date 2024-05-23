import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const usePowerStore = defineStore('power', () => {
    const Total = ref(100);//能量总量
    const Current = ref(10);//当前电量
    const AvgInput = ref(50);//平均输入
    const AvgOutput = ref(60);//平均输出
    const Precent = computed(() => (Current.value / Total.value).toFixed(2) )//占比
  
    return { Total,Current,AvgInput,AvgOutput,Precent }
  })