import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const usePowerStore = defineStore('power', () => {
    const Total = ref(100);//能量总量
    const Current = ref(70);//当前电量
    const AvgInput = ref(50);//平均输入
    const AvgOutput = ref(60);//平均输出
    const Precent = computed(() => Number((Current.value / Total.value).toFixed(2))  )//占比
    const IOChartTitle = ref("平均IO实时表")//AvgIO Chart
    const PowerStoreChartTitle = ref("电量存储情况表");//电量存储情况表
    const AvgInputData = ref<Array<Object>>([]);
    const AvgOutputData = ref<Array<Object>>([]);
    return { Total,Current,AvgInput,AvgOutput,Precent,IOChartTitle,PowerStoreChartTitle,AvgInputData,AvgOutputData }
  })