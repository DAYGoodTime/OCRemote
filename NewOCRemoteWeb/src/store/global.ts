
import { defineStore } from "pinia"
import { ref } from "vue"


export const useGlobalStore = defineStore('global', () => {
    const ImageSize = ref<'small'|'middle'|'large'>('middle')
    return { ImageSize }
  })