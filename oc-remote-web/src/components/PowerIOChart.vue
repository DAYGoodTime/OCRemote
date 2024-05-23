<template>
    <button class="btn" @click="refresh">刷新</button>
    <ECharts class="w-full h-72" ref="iochart" :option="chartOptions" autoresize />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePowerStore } from "../store/power";

defineOptions({
    name:"PowerIOChart"
})

//power sotre
const PowerStore = usePowerStore()

const iochart = ref(null);
onMounted(() => {
});

//chart
// chart 
const test_run = ref(false);
let timer:number = -1
const refresh = ()=>{
  if(!test_run.value){
    test_run.value = true
    timer = setInterval(function () {
  for (var i = 0; i < 5; i++) {
    data.shift();
    data2.shift();
    data.push(randomData());
    data2.push(randomData(1000));
  }
  if(iochart.value){
    iochart.value.setOption({
    series: [
      {
        data: data
      },
      {
        data: data2
      }
    ]
  });
  }
}, 100);
  }else{
    if(timer){
      clearInterval(timer)
      test_run.value = false
    }
  }
}
function randomData(offset=0) {
  now = new Date(+now + oneDay);
  value = value + Math.random() * 21 - 10;
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value)+offset
    ]
  } as DataItem;
}
interface DataItem {
  name: string;
  value: [string, number];
}
let data:DataItem[] = [];
let data2:DataItem[] = [];
let now = new Date(1997, 9, 3);
let oneDay = 24 * 3600 * 1000;
let value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
  data.push(randomData());
  data2.push(randomData(1000));
}
//demo chart config
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ComposeOption } from 'echarts/core';
import type { LineSeriesOption } from 'echarts/charts';
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption
} from 'echarts/components';
import ECharts from "vue-echarts";

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | LineSeriesOption
>;
use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  GridComponent,
  CanvasRenderer
]);
const chartOptions = ref<EChartsOption>({
  title: {
    text: 'Traffic Sources',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      return (
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' : ' +
        params.value[1]
      );
    },
    axisPointer: {
      animation: false
    }
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      showSymbol: false,
      lineStyle:{
        width:6,
      },
      data: data
    },
    {
      name: 'Fake Data',
      type: 'line',
      showSymbol: false,
      lineStyle:{
        width:6,
      },
      itemStyle:{
        color:'green'
      },
      data: data2
    }
  ],
});
////
</script>