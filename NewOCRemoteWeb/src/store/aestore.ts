import { getAECPUInfos, getAEItems } from "@/api/ae";
import { CPUInfoResponse, Item } from "@/types/types";
import { defineStore } from "pinia"
import { match } from "pinyin-pro";
import { computed, ref } from "vue"
import { useQuery } from "vue-query";

export const useAEStore = defineStore('ae', () => {
    const ItemSearchWord = ref("");
    const RawItemList = ref<Item[]>([]);
    const getItemList = computed(()=>{
        if(ItemSearchWord.value.length >=1){
           return RawItemList.value.filter(i=>i.label.includes(ItemSearchWord.value) || match(i.label,ItemSearchWord.value,{continuous:true}) != null )
        }else{
            return RawItemList.value;
        }
    })
    const fetchItems = async ()=>{
        let res = await getAEItems();
        if(res.status == 200){
            RawItemList.value = res.data;
            return res.data;
        }
        return null;
    }
    const ItemQuery = useQuery(
        "AEItems",
        fetchItems,
        {
            refetchIntervalInBackground:false,
            refetchOnWindowFocus:false
        }
      );
    const RawCPUInfo = ref<CPUInfoResponse>();
    const fetchCPUInfos = async () => {
        let res = await getAECPUInfos()
        if(res.status == 200){
            RawCPUInfo.value = res.data;
            return res.data;
        }
        return null;
    }
    const CPUInfoQuery = useQuery(
        "CPUInfo",
        fetchCPUInfos,
        {
            refetchIntervalInBackground:false,
            refetchOnWindowFocus:false
        }
    )
    return { getItemList, RawItemList, ItemSearchWord,ItemQuery,RawCPUInfo,CPUInfoQuery }
  })