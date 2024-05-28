<!-- 主页面，也是能源站页面 -->
<template>
  <div>
    <div class="flex flex-row w-full flex-wrap">
      <div class="flex-grow m-4">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">当前电量</h2>
            <p class="font-mono text-3xl my-2">{{ PowerStore.Current }} EU</p>
          </div>
        </div>
      </div>
      <div class="flex-grow m-4">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">平均输入</h2>
            <p class="font-mono text-3xl my-2">
              {{ PowerStore.AvgInput }} EU/t
            </p>
          </div>
        </div>
      </div>
      <div class="flex-grow m-4">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">平均输出</h2>
            <p class="font-mono text-3xl my-2">
              {{ PowerStore.AvgOutput }} EU/t
            </p>
          </div>
        </div>
      </div>
      <div class="flex-grow m-4">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body pb-1">
            <h2 class="card-title">能量储量</h2>
            <div class="flex flex-row">
              <span class="w-1/2 text-3xl my-2 text-justify mr-4">
                总量:{{ PowerStore.Total }}
              </span>
              <div class="w-1/2">
                <div
                  class="radial-progress text-primary"
                  :style="ProgressBarStyle"
                  role="progressbar"
                >
                  {{ PowerStore.Precent * 100 }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card bg-base-100 shadow-xl m-4 p-4">
      <PowerIoChart></PowerIoChart>
    </div>
    <div class="card bg-base-100 shadow-xl m-4 p-4">
      <PowerIoChart></PowerIoChart>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePowerStore } from "../store/power";
import PowerIoChart from "../components/PowerIOChart.vue";
import { getEnergyInfo } from "@/api/modules/Power";
import { EnergyInfo } from "@/api/types/entity";
const PowerStore = usePowerStore();

const ProgressBarStyle = ref({
  "--value": PowerStore.Precent * 100,
  "--size": "5rem",
});
onMounted(async () => {
  try {
    let streamResponse = await getEnergyInfo();
    const stream = streamResponse.data;
    const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) {
        let data = (value as string).split("\n");
        let obj: EnergyInfo = JSON.parse(data[3].substring(6).trim());
        PowerStore.Current = Number(obj.used);
        PowerStore.Total = Number(obj.total);
        PowerStore.AvgInput = Number(obj.in);
        PowerStore.AvgOutput = Number(obj.out);
        //process data
        if (PowerStore.AvgInputData.length > 200) {
          PowerStore.AvgInputData.shift();
        }
        let date = new Date(obj.time);
        PowerStore.AvgInputData.push({
          name: date.toString(),
          value: [
            date,
            Number(obj.in),
          ],
        });
        if (PowerStore.AvgOutputData.length > 200) {
          PowerStore.AvgInputData.shift();
        }
        PowerStore.AvgOutputData.push({
          name: date.toString(),
          value: [
            date,
            Number(obj.out),
          ],
        });
      }
    }
  } catch (err) {}
});
</script>
<style scoped></style>
