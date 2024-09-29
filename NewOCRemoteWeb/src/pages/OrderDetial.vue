<script setup lang="tsx">
import {Search } from "lucide-vue-next";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcn/component/ui/tabs";
import { Card, CardContent, CardHeader } from "@/shadcn/component/ui/card";
import { CPUTask, Item } from "@/types/types";
import { Input } from "@/shadcn/component/ui/input";
import { FormatByte } from "@/utils/number";
import { computed, ref } from "vue";
import { getAECPUTask } from "@/api/ae";
import { useQuery } from "vue-query";
import LoadingSke from "@/components/LoadingSke";
import { useGlobalStore } from "@/store/global";
import { match } from "pinyin-pro";
import ItemView from "@/components/ItemView";
import { useAEStore } from "@/store/aestore";

const props = defineProps({
  id: String,
});
const AEStore = useAEStore();
const CurrentCPUInfo = computed(() => {
  let info = AEStore.RawCPUInfo?.infos.find((i) => i.ID == props.id);
  if (info) return info;
  return {
    storage: 0,
    name: "",
    busy: false,
    coprocessors: 0,
    ID: "Loading~",
  };
});
const EmptyTask: CPUTask = {
  id: 0,
  craftings: [],
  storeds: [],
  pendings: [],
  finalOutput: {
    label: "InvildItem",
    name: "",
    size: 0,
    maxSize: 0,
    damage: 0,
    isCraftable: false,
  },
  busy: false,
};
const fetchCPUTask = (): Promise<CPUTask> => {
  return new Promise((resolve, reject) => {
    if (props.id) {
      getAECPUTask(props.id).then((res) => {
        if (res.status == 200) {
          resolve(res.data);
        } else {
          reject("NetWorkError");
        }
      });
    } else {
      resolve(EmptyTask);
    }
  });
};
const TaskQuery = useQuery("AETaskQuery", fetchCPUTask, {
  refetchIntervalInBackground: false,
  refetchOnWindowFocus: false,
});
const globalStore = useGlobalStore();
const ItemSearchWord = ref("");
const getItems = computed(() => (type: "crafting" | "pending" | "storeds") => {
  let task = TaskQuery.data.value;
  if (task) {
    let list;
    switch (type) {
      case "crafting":
        list = task.craftings;
        break;
      case "pending":
        list = task.pendings;
        break;
      case "storeds":
        list = task.storeds;
        break;
    }
    if (ItemSearchWord.value.length > 1) {
      return list.filter(
        (i) =>
          i.label.includes(ItemSearchWord.value) ||
          match(i.label, ItemSearchWord.value, { continuous: true }) != null
      );
    } else return list;
  }
});
let SearchTimer: NodeJS.Timeout | null = null;
const handleSearch = (val: string | number) => {
  if (SearchTimer) clearTimeout(SearchTimer);
  SearchTimer = setTimeout(() => {
    ItemSearchWord.value = val.toString();
  }, 250);
};
const EmptyItem: Item = {
  label: "ErrorItem",
  name: "",
  size: 0,
  maxSize: 0,
  damage: 0,
  isCraftable: false,
};
</script>
<template>
  <div class="flex w-full">
    <Card class="w-full">
      <CardHeader>
        <div class="flex flex-col rounded-md border-zinc-300 border-2 p-4">
          <div>CPU名称: {{ CurrentCPUInfo.name }}</div>
          <div>容量: {{ FormatByte(CurrentCPUInfo.storage) }}</div>
          <div>协处理器数量: {{ CurrentCPUInfo.coprocessors }}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="rounded-md border-zinc-300 border-2 p-4">
          <div class="relative flex items-center w-fit mb-4">
            <Search class="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索物品"
              class="w-full appearance-none bg-background pl-8 shadow-none"
              @update:model-value="handleSearch"
            />
          </div>
          <Tabs default-value="output" class="w-[400px]">
            <TabsList>
              <TabsTrigger value="crafting"> 合成中 </TabsTrigger>
              <TabsTrigger value="pending"> 待合成 </TabsTrigger>
              <TabsTrigger value="storeds"> 缓存 </TabsTrigger>
              <TabsTrigger value="output"> 产物 </TabsTrigger>
            </TabsList>
            <TabsContent value="crafting">
              <Card>
                <div class="p-6">
                  <LoadingSke :show="TaskQuery.isLoading.value" />
                  <div class="flex flex-row flex-wrap w-full gap-2">
                    <ItemView
                      :item="item"
                      :size="globalStore.ImageSize"
                      :viewonly="true"
                      v-for="item in getItems('crafting')"
                    ></ItemView>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="pending">
              <Card>
                <div class="p-6">
                  <LoadingSke :show="TaskQuery.isLoading.value" />
                  <div class="flex flex-row flex-wrap w-full gap-2">
                    <ItemView
                      :item="item"
                      :size="globalStore.ImageSize"
                      :viewonly="true"
                      v-for="item in getItems('pending')"
                    ></ItemView>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="storeds">
              <Card>
                <div class="p-6">
                  <LoadingSke :show="TaskQuery.isLoading.value" />
                  <div class="flex flex-row flex-wrap w-full gap-2">
                    <ItemView
                      :item="item"
                      :size="globalStore.ImageSize"
                      :viewonly="true"
                      v-for="item in getItems('storeds')"
                    ></ItemView>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="output">
              <ItemView
                :size="globalStore.ImageSize"
                :viewonly="true"
                :item="
                  TaskQuery.data.value
                    ? TaskQuery.data.value.finalOutput
                    : EmptyItem
                "
              />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
