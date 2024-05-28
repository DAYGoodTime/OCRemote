import { getInstance } from "../request";

export async function getEnergyInfo(){
    return await (getInstance()).request({
        method:"GET",
        url:"energy/info/keep",
        headers: {
            'Accept': 'text/event-stream',
          },
        responseType: 'stream',
        adapter: 'fetch'
    });
}