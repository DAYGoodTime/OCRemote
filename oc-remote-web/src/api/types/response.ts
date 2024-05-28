import { CPUInfo } from "./entity"

export type CPUInfoResponse = {
    idle_cpus:number,
    total_cpus:number,
    infos:Array<CPUInfo>
}