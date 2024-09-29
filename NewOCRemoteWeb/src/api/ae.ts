import { CPUInfoResponse, CPUTask, Item } from "@/types/types";
import http from "@/utils/http/request";
import { AxiosResponse } from "axios";

export async function getAEItems():Promise<AxiosResponse<Item[]>> {
    return http.get(`/api/ae/items`)
}
export async function getAECPUInfos():Promise<AxiosResponse<CPUInfoResponse>> {
    return http.get(`/api/ae/cpu/infos`)
}
export async function getAECPUTask(id:string | number):Promise<AxiosResponse<CPUTask>> {
    return http.get(`/api/ae/cpu/info/${id}`)
}
