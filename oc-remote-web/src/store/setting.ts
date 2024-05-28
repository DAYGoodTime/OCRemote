import { defineStore } from "pinia"
import { ref } from "vue"

export const useSettingStore = defineStore('setting', () => {
    const MenuTitle = ref("钢铁男孩の基地") //菜单标题
    const ItemBaseUrl = "http://localhost:125/api/ae/item" //物品图标url的基地址
    const ItemBoxSize = ref<"large"|"medium"|"small">("large"); 
    return { MenuTitle,ItemBaseUrl,ItemBoxSize }
  })