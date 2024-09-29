<script setup lang="tsx">
import {
  CardTitle,
  Card,
  CardContent,
  CardHeader,
} from "@/shadcn/component/ui/card";
import { CPUInfo, Item } from "@/types/types";
import { FormatByte } from "@/utils/number";
import { VirualTableRow } from "@/components/VirualTable";
import Button from "@/components/Button.vue";
import ItemView from "@/components/ItemView";
import { useAEStore } from "@/store/aestore";
import VirualTable from "@/components/VirualTable";
import { useRouter } from "vue-router";

const items: CPUInfo[] = [
  {
    storage: 1024,
    name: "",
    busy: false,
    coprocessors: 10,
    ID: "1",
  },
  {
    storage: 1024 * 2 * 1024,
    name: "12313",
    busy: false,
    coprocessors: 10,
    ID: "2",
  },
];
const ErrorItem:Item = {
  label: "ErrorItem",
  name: "error",
  size: 0,
  maxSize: 0,
  damage: 0,
  isCraftable: false
}
const RowRecord: VirualTableRow<CPUInfo>[] = [
  {
    label: "CPU序号",
    value: "ID",
  },
  {
    label: "CPU名称",
    render: (row) => <>{row.name ?? "<未命名>"}</>,
  },
  {
    label: "CPU容量",
    render: (row) => <>{FormatByte(row.storage, 0)}</>,
  },
  {
    label: "正在合成的物品",
    render: (row) => (
      <>
        {row.busy ? <ItemView viewonly={true} size="small" item={row.CraftingItem ?? ErrorItem }></ItemView> : "暂无合成"}
      </>
    ),
  },
  {
    label: "协处理器数量",
    value: "coprocessors",
  },
  {
    label: "操作",
    type: "operation",
    class: "flex flex-col gap-4 flex-warp md:flex-row ",
    style: {textWrap:"nowrap"}
  },
];
const AEStore = useAEStore();
const router = useRouter();
const toDetial = (obj: CPUInfo) => {
  router.push({path:`/order/${obj.ID}`})
};
</script>
<template>
  <div class="flex h-full">
    <Card class="w-full">
      <CardHeader>
        <CardTitle class="md:text-4xl">CPU 合成情况</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="rounded-md border-zinc-300 border-2 p-4">
          <VirualTable :list="AEStore.CPUInfoQuery.data?.infos" :rows="RowRecord">
            <template #operation="{ obj, row }">
              <Button v-if="(obj as CPUInfo).busy" @click="toDetial(obj)"
                >查看详情</Button
              >
              <Button
                class="btn-error"
                v-if="(obj as CPUInfo).busy"
                @click="toDetial(obj)"
                >取消</Button
              >
            </template>
          </VirualTable>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
