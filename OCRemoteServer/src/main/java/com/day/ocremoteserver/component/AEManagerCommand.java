package com.day.ocremoteserver.component;

import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import com.day.ocremoteserver.App;
import com.day.ocremoteserver.CommandHelper;
import com.day.ocremoteserver.entity.AEItem;
import com.day.ocremoteserver.entity.CPUInfo;
import com.day.ocremoteserver.entity.CPUTask;
import com.day.ocremoteserver.entity.Command;
import org.noear.snack.ONode;

import java.util.List;

public class AEManagerCommand {

    public static CPUTask GetCpuInfo(int cpuId){
        Command result = CommandHelper.sendCommand(StrUtil.format("return GetCpuInfo({})",cpuId));
        return ONode.deserialize(result.result,CPUTask.class);
    }

    public static List<CPUInfo> getCpuInfoList(){
        Command result = CommandHelper.sendCommand("return GetAllCpuInfo()");
        List<CPUInfo> cpus = ONode.loadStr(result.result).toObjectList(CPUInfo.class);
        for (int i = 0; i < cpus.size(); i++) {
            CPUInfo cpu = cpus.get(i);
            cpu.ID = i;
            //字典替换
            if(cpu.busy && cpu.CraftingItem!=null){
                if(App.LabelDict.containsKey(cpu.CraftingItem.label)){
                    cpu.CraftingItem.label = (String) App.LabelDict.get(cpu.CraftingItem.label);
                }
            }
        }
        return cpus;
    }

    public static boolean OrderItem(int count,int damage,String name){
        String id = StrUtil.format("C{}N",IdUtil.getSnowflake().nextIdStr());
        CommandHelper.sendCommand(StrUtil.format("{} = Craft('{}',{},{})", id, name, damage,count ));
        Command result = CommandHelper.sendCommand(StrUtil.format("return {}.isCanceled()",id));
        return result.result.contains("false");
    }

    public static void Cancel(int cpuId){
        CommandHelper.sendCommand(StrUtil.format("return CancelCrafting({})",cpuId));
    }

    public static List<AEItem> getAllNetWorkItem(){
        Command result = CommandHelper.sendCommand("return getAllItems()");
        return ONode.loadStr(result.result).toObjectList(AEItem.class);
    }
}
