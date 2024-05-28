import { ElLoading } from "element-plus";

/**将字节转成可读的单位 */
export function FormatNumber(num:number,type?:"byte"|"count",scale:number=0){
    if(!type) type = "byte";
    if(num === undefined || Number.isNaN(num)) return "NaN?" 
    let result = ""
    if(num > 1024*1024){
        if(num > 1024*1024*1000){
            //转换成GB单位
            result = `${(num / (1024*1024*1024)).toFixed(scale)}${type=="byte"?"GB":"G"}`
        }else{
            //转换成MB单位
            result = `${(num / (1024*1024)).toFixed(scale)}${type=="byte"?"MB":"M"}`
        }
    }else{
        if(num > 1024){
            result = `${(num / (1024)).toFixed(scale)}${type=="byte"?"KB":"K"}`
        }else{
            result = num + "";
        }
    }
    return result;
}
/**加载组件 */
export function Loading(target: string){
    let LoadingService = ElLoading.service({
      target:target,
      lock: true,
      fullscreen: false,
    });
    return LoadingService;
  };