import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useSettingStore = defineStore('setting', () => {
    const MenuTitle = ref("钢铁男孩の基地") //菜单标题
  
    return { MenuTitle }
  })