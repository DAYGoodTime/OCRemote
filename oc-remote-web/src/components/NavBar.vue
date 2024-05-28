<template>
     <div class="navbar bg-base-100">
        <div class="flex-1">
          <button class="btn px-0 w-16 h-16" @click="()=>router.back()">
            <Icon icon="fluent-emoji:back-arrow" width="3rem" height="3rem" />
          </button>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li><a>Link</a></li>
            <li>
              <details class="z-10">
                <summary>图标大小</summary>
                <ul class="p-2 bg-base-100 rounded-t-none">
                  <li @click="()=>Settings.ItemBoxSize = 'large'"><a>大</a></li>
                  <li @click="()=>Settings.ItemBoxSize = 'medium'"><a>中</a></li>
                  <li @click="()=>Settings.ItemBoxSize = 'small'"><a>小</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useSettingStore } from '../store/setting';

defineOptions({
    name:"NavBar"
})
const Settings = useSettingStore();
const router = useRouter();
</script>
<style scoped>
</style>