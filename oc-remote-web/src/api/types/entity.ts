export interface Result<T> {
    success:boolean,
    message:string,
    data:T | null,
}

export type CPUInfo = {
    ID:number | string, //cpu编号
    name:string, //cpu名字
    storage:number | string, //cpu容量
    coprocessors:number | string //协处理器数量
    CraftingItem?: AEItem,//正在合成的物品
    busy:boolean,//是否正在合成中
}
export type AEItem = {
    label: string,/** 物品displayName */
    hasTag: boolean, /** 是否有NBT */
    damage: number, /** damage */
    isCraftable: boolean,  /** 是否可以调用合成 */
    size: number,  /** 物品数量 */
    maxSize: number, /** 物品最大折叠数量 */
    name: string,/** 物品id */
    maxDamage: number
}
export type AECPUTask = {
    id:number, /**CPU ID */
    pendings:AEItem[], /* *计划合成中的物品 */
    craftings:AEItem[], /** 合成中的物品 */
    finalOutput:AEItem /** 最终合成物品 */
    busy:boolean /** 是否正在合成中 */
}
export type EnergyInfo = {
    used:string,
    total:string,
    in:string,
    out:string,
    time:string,
}