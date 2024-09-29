const Killo = 1000;
const Million = Killo*1000;
const Gillion = Million*1000;
const Tillion = Gillion*1000;
/**将数量转成可读的单位 */
export function FormatNumber(num:number,scale:number=1){
    if(num === undefined || Number.isNaN(num)) return "NaN"
    if(num < Killo) return num.toString();
    if(num < Million) return `${(num / Killo).toFixed(scale)}K`
    if(num < Gillion) return `${(num / Million).toFixed(scale)}M`
    if(num < Tillion) return `${(num / Gillion).toFixed(scale)}G`
    return `${(num / Tillion).toFixed(scale)}T`
}
const KB = 1024;
const MB = KB*1024;
const GB = MB*1024;
const TB = GB*1024;
/**将字节转成可读的单位 */
export function FormatByte(num:number,scale:number = 1){
    /** 无限大 */
    if(num === -9223372036854751616) return "Inf Byte"
    if(num === undefined || Number.isNaN(num)) return "NaN"
    if(num < KB) return num.toString();
    if(num < MB) return `${(num / KB).toFixed(scale)}KB`
    if(num < GB) return `${(num / MB).toFixed(scale)}MB`
    if(num < TB) return `${(num / GB).toFixed(scale)}GB`
    return `${(num / TB).toFixed(scale)}TB`
}