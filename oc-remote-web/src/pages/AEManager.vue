<template>
  <div>
    <h2
      class="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white m-4"
    >
      {{ AEStore.Title }}
    </h2>

    <div class="max-w-full min-h-96 bg-gray-100 rounded-box mt-10 mx-4 p-6">
      <button class="btn mb-4" @click="refresh">刷新!</button>
      <!-- AECPU状态 -->
      <div class="aecpu collapse collapse-arrow bg-base-200 mb-8 w-full">
        <input
          type="checkbox"
          v-model="hasTask"
          :disabled="AEStore.CPUInfoList.length == 0"
          class="peer"
        />
        <div
          class="w-full collapse-title text-xl font-medium peer-checked:text-secondary-content"
        >
          AE CPU状态: 当前有 {{ AEStore.FreeCPUs }} 个空闲CPU,总共
          {{ AEStore.TotalCPUs }} 个。
        </div>
        <div class="collapse-content">
          <div class="min-h-36 max-h-96">
            <div class="overflow-x-auto">
              <table class="table">
                <!-- head -->
                <thead>
                  <tr class="text-xl">
                    <th>CPU序号</th>
                    <th>CPU名称</th>
                    <th>CPU容量</th>
                    <th>协处理器数量</th>
                    <th>正在合成</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="text-lg"
                    v-for="(cpu, index) in AEStore.CPUInfoList"
                    :key="cpu.ID"
                  >
                    <th class="">{{ cpu.ID }}</th>
                    <td class="">{{ cpu.name }}</td>
                    <td class="">
                      {{ FormatNumber(cpu.storage as number, "byte") }}
                    </td>
                    <td class="">{{ cpu.coprocessors }}</td>
                    <td class="" v-if="cpu.busy">
                      <Item
                        :name="
                          cpu.CraftingItem ? cpu.CraftingItem.label : 'NULL'
                        "
                        :canOrder="false"
                        :size="cpu.CraftingItem ? cpu.CraftingItem.size : 0"
                      />
                    </td>
                    <td class="" v-else>
                      
                    </td>
                    <td>
                      <button
                        class="btn bg-gray-500 mr-4"
                        @click="toCPUInfo(index)"
                      >
                        查看
                      </button>
                      <button
                        class="btn bg-red-500"
                        @click="cancelCraft(cpu.ID as number)"
                      >
                        取消
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- AE终端物品 -->
      <p class="text-xl font-semibold mb-4">AE点点菜菜</p>
      <div>
        <span>搜索: </span>
        <el-input class="!w-48" v-model="SearchContext" clearable>
          <template #prefix>
            <Icon
              icon="mdi:invoice-line-items"
              width="1.2rem"
              heigiht="1.2rem"
            ></Icon>
          </template>
        </el-input>
      </div>
      <div class="my-4 items flex flex-row flex-wrap">
        <Item
          v-for="(item, index) in GetFilterAEItem"
          :key="index"
          :name="item.label"
          :canOrder="item.isCraftable"
          :size="item.size"
          :item="item"
        />
      </div>
      <!-- 点菜弹窗 -->
      <dialog ref="order" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 class="font-bold text-lg mb-4">
            合成: {{ AEStore.CraftingItem.label }}
          </h3>
          <Item
            :name="AEStore.CraftingItem.label"
            :size="OrderNumber"
            :canOrder="false"
          />
          <div class="my-6">
            <span class="font-sans">合成数量: </span>
            <el-input-number v-model="OrderNumber" :min="1" :max="2147483647" />
          </div>
          <div class="flex flex-row flex-wrap my-4">
            <button class="btn mx-4 w-16" @click="ChangeOrderNumber(10)">
              +10
            </button>
            <button class="btn mx-4 w-16" @click="ChangeOrderNumber(64)">
              +64
            </button>
            <button class="btn mx-4 w-16" @click="ChangeOrderNumber(1024)">
              +1024
            </button>
          </div>
          <div class="flex flex-row flex-wrap my-4">
            <button class="btn mx-4 w-16" @click="ChangeOrderNumber(-10)">
              -10
            </button>
            <button class="btn mx-4 w-16" @click="ChangeOrderNumber(-64)">
              -64
            </button>
            <button class="btn mx-4 w-16" @click="ChangeOrderNumber(-1024)">
              -1024
            </button>
          </div>
          <div class="modal-action">
            <button
              class="btn btn-primary mr-4"
              @click="OrderItem(AEStore.CraftingItem, OrderNumber)"
            >
              下单!
            </button>
            <button
              class="btn"
              @click="
                () => {
                  if (AEStore.DialogRef) AEStore.DialogRef.close();
                }
              "
            >
              关闭
            </button>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Item from "../components/Item.vue";
import { useAEStore } from "../store/ae";
import { ElNotification } from "element-plus";
import { AEItem } from "../api/types/entity";
import {
  callOrderItem,
  cancelTask,
  getALLItem,
  getCPUInfo,
} from "../api/modules/AE";
import { CPUInfoResponse } from "../api/types/response";
import { FormatNumber, Loading } from "../utils";
import { useRouter } from "vue-router";

const AEStore = useAEStore();
const order = ref(null);
//global
const refresh = async () => {
  const AEITEMLoading = Loading(".items");
  const CPULoading = Loading(".aecpu");
  //获取CPU信息
  let cpuInfoRes = await getCPUInfo();
  if (cpuInfoRes.success) {
    let data = cpuInfoRes.data as CPUInfoResponse;
    AEStore.TotalCPUs = data.total_cpus;
    AEStore.FreeCPUs = data.idle_cpus;
    AEStore.CPUInfoList = data.infos;
    if (AEStore.CPUInfoList.length == 0) {
      hasTask.value = false;
    }
  }
  CPULoading.close();
  //获取所有AE物品
  let getAeItemRes = await getALLItem();
  if (getAeItemRes.success) {
    let tempList: AEItem[] = getAeItemRes.data as AEItem[];
    tempList.sort((item1, item2) => item2.size - item1.size);
    AEStore.AEItemList = tempList;
  }
  AEITEMLoading.close();
};

onMounted(() => {
  AEStore.DialogRef = order.value;
  refresh();
});
//Item List
const SearchContext = ref("");
const GetFilterAEItem = computed(() => {
  console.log("trigger");
  if (SearchContext.value.length > 0) {
    return AEStore.AEItemList.filter((item) =>
      item.label.includes(SearchContext.value)
    );
  } else {
    return AEStore.AEItemList;
  }
});
//order
const OrderNumber = ref(0); //预下单物品数量
const hasTask = ref(false);
const ChangeOrderNumber = (count: number) => {
  let raw = OrderNumber.value + count;
  if (OrderNumber.value == 1) raw = count;
  if (raw <= 0) {
    OrderNumber.value = 1;
  } else {
    OrderNumber.value = raw;
  }
};
const OrderItem = async (item: AEItem, count: number) => {
  let res = await callOrderItem(item.name, item.damage, count);
  if (res.success) {
    if (res.data) {
      ElNotification({
        type: "success",
        message: "下单成功!",
      });
    } else {
      ElNotification({
        type: "error",
        message: "下单失败!,请检查CPU是否空闲,且材料充足",
      });
    }
  }
  AEStore.DialogRef.close();
  OrderNumber.value = 1;
  refresh();
};
//btn event
const cancelCraft = async (id: number) => {
  await cancelTask(id);
  ElNotification({
    type: "success",
    message: "总之尝试取消了",
  });
  refresh();
};
const router = useRouter();
const toCPUInfo = (index: number) => {
  router.push({
    name: "CPUInfo",
    params: {
      index: index,
    },
  });
};
</script>
<style scoped></style>
