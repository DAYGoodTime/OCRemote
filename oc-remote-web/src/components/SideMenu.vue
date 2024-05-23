<template>
  <ul class="menu bg-base-200 w-56 h-full">
    <li class="menu-title text-2xl">{{ setting.MenuTitle }}</li>
    <li v-for="(item, index) in routers" class="p-2">
      <RouterLink :to="item.path" active-class="active">
        <Icon :icon="item.meta.icon" width="2rem" height="2rem" />
        {{ item.meta.text }}
      </RouterLink>
    </li>
  </ul>
</template>
<script setup>
import { useSettingStore } from "../store/setting";
import { routers } from "../router/routers";
const setting = useSettingStore();

defineOptions({
  name: "SideMenu",
});
</script>
<style scoped></style>
