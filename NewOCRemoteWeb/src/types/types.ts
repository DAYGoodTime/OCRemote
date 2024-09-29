type Item = {
    label:string,
    name:string,
    size:number,
    maxSize:number,
    damage:number,
    isCraftable:boolean
}
type CPUInfo = {
    storage: number,
    name:string,
    busy:boolean,
    coprocessors:number,
    ID:string,
    CraftingItem?:Item
}
type CPUInfoResponse = {
    idle_cpus:number,
    total_cpus:number,
    infos:CPUInfo[]
}
type CPUTask = {
    id:number,
    craftings:Item[],
    storeds:Item[],
    pendings:Item[],
    finalOutput:Item,
    busy:boolean
}
export type { Item,CPUInfo,CPUInfoResponse,CPUTask }