<!-- 主页面，也是能源站页面 -->
<template>
  <div class="flex flex-row w-full">
    <div class="basis-1/4 m-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">当前电量</h2>
          <p class="font-mono text-3xl my-2">{{ PowerStore.Current }} EU</p>
        </div>
      </div>
    </div>
    <div class="basis-1/4 m-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">平均输入</h2>
          <p class="font-mono text-3xl my-2">{{ PowerStore.AvgInput }} EU/t</p>
        </div>
      </div>
    </div>
    <div class="basis-1/4 m-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">平均输出</h2>
          <p class="font-mono text-3xl my-2">{{ PowerStore.AvgOutput }} EU/t</p>
        </div>
      </div>
    </div>
    <div class="basis-1/4 m-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
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
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePowerStore } from "../store/power";
import PowerIoChart from "../components/PowerIOChart.vue";

const PowerStore = usePowerStore();
</script>
<style scoped>
</style>

