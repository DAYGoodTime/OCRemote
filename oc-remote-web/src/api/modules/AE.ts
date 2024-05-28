import { request } from "../request";
import { AECPUTask, AEItem, Result } from "../types/entity";
import { CPUInfoResponse } from "../types/response";

export async function getCPUInfo():Promise<Result<CPUInfoResponse>> {
    return await request("GET",`/ae/cpu/infos`);
}
export async function getALLItem():Promise<Result<AEItem[]>> {
    return await request("GET",`/ae/items`);
}
export async function getCpuCraftingTask(id:number):Promise<Result<AECPUTask>> {
    return await request("GET",`/ae/cpu/info/${id}`);
}
export async function callOrderItem(name:string,damage:number,count:number):Promise<Result<boolean>>{
    return await request("GET",`/ae/order/${count}/${damage}/${name}`)
}
export async function cancelTask(cpu_id:number):Promise<Result<any>> {
    return await request("GET",`/ae/order/cancel/${cpu_id}`);
}