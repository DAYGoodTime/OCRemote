<script setup lang="ts">
import { Menu, Package2, Search, Undo2 } from "lucide-vue-next";
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn/component/ui/sheet";
import { Input } from "@/shadcn/component/ui/input";
import Navgation from "@/components/Navgation.vue";
import { useRoute, useRouter } from "vue-router";
import { useAEStore } from "@/store/aestore";
import Button from "@/components/Button.vue";
import { toast } from "vue-sonner";
import { useGlobalStore } from "@/store/global";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/component/ui/select";
const route = useRoute();
let SearchTimer: NodeJS.Timeout | null = null;
const handleSearch = (val: string | number) => {
  if (SearchTimer) clearTimeout(SearchTimer);
  SearchTimer = setTimeout(() => {
    AEStore.ItemSearchWord = val.toString();
  }, 250);
};
const AEStore = useAEStore();
const GlobalStore =useGlobalStore();
const router = useRouter();
const handleBack = () => {
  router.back();
};
</script>
<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span class="">钢铁男孩の秘密基地</span>
          </a>
        </div>
        <Navgation></Navgation>
      </div>
    </div>
    <div class="flex flex-col">
      <header
        class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
      >
        <Sheet>
          <SheetTrigger as-child>
            <button
              variant="outline"
              size="icon"
              class="shrink-0 md:hidden btn w-16 btn-compact btn-ghost"
            >
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" class="flex flex-col">
            <div
              class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6"
            >
              <RouterLink to="/" class="flex items-center gap-2 font-semibold">
                <Package2 class="h-6 w-6" />
                <span class="">钢铁男孩の秘密基地</span>
              </RouterLink>
            </div>
            <Navgation></Navgation>
          </SheetContent>
        </Sheet>
        <Button class="btn-ghost btn-xs md:btn-ghost md:btn-sm p-0" @click="handleBack"
          ><Undo2 clip="h-5 w-5"></Undo2
        ></Button>
        <div class="w-full flex" v-if="route.name == 'AEManager'">
          <div class="relative flex items-center">
            <Search class="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索物品"
              class="w-full appearance-none bg-background pl-8 shadow-none"
              @update:model-value="handleSearch"
            />
          </div>
          <button
            style="height: 2.25rem !important"
            class="btn btn-ghost mx-2 btn-compact w-12 btn-xs md:btn md:btn-ghost"
            :disabled="AEStore.ItemQuery.isFetching"
            @click="() => AEStore.ItemQuery.refetch()"
          >
            刷新
          </button>
        </div>
        <div class="w-full flex-1"></div>
        <Select v-model="GlobalStore.ImageSize">
          <SelectTrigger class="w-16">
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="small"> 小 </SelectItem>
              <SelectItem value="middle"> 中 </SelectItem>
              <SelectItem value="large"> 大 </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </header>
      <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
