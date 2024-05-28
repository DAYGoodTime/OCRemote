package com.day.ocremoteserver.controller;

import com.day.ocremoteserver.App;
import com.day.ocremoteserver.Configuration;
import com.day.ocremoteserver.component.AEManagerCommand;
import com.day.ocremoteserver.entity.AEItem;
import com.day.ocremoteserver.entity.CPUInfo;
import com.day.ocremoteserver.entity.CPUTask;
import com.day.ocremoteserver.schame.response.CPUInfoResponse;
import org.noear.snack.ONode;
import org.noear.solon.core.handle.Context;
import org.noear.solon.annotation.Controller;
import org.noear.solon.annotation.Get;
import org.noear.solon.annotation.Mapping;
import org.noear.solon.core.handle.DownloadedFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

@Controller
public class AEManagerController {

    @Get
    @Mapping("api/ae/cpu/info/{cpu_id}")
    public CPUTask GetCpuInfo(int cpu_id) {
        return AEManagerCommand.GetCpuInfo(cpu_id);
    }

    @Get
    @Mapping("api/ae/cpu/infos")
    public CPUInfoResponse GetCpuInfos() {
        List<CPUInfo> cpuInfoList = AEManagerCommand.getCpuInfoList();
        int total = cpuInfoList.size();
        long free = cpuInfoList.stream().filter(info -> !info.busy).count();
        return new CPUInfoResponse(total, (int) free, cpuInfoList);
    }

    @Get
    @Mapping("api/ae/order/{count}/{damage}/{name}")
    public boolean OrderItem(int count, int damage, String name) {
        return AEManagerCommand.OrderItem(count, damage, name);
    }

    @Get
    @Mapping("api/ae/order/cancel/{cpu_id}")
    public String CancelOrder(int cpu_id) {
        AEManagerCommand.Cancel(cpu_id);
        return "OK";
    }

    @Get
    @Mapping("api/ae/items")
    public List<AEItem> GetAENetWorkItems() {
        return AEManagerCommand.getAllNetWorkItem();
    }

    @Get
    @Mapping("api/ae/item/{damage}/{name}")
    public String GetItemImg(int damage, String name, Context ctx) throws IOException {
        String fileName;
        if (damage != 0) {
            fileName = name + "_" + damage + ".png";
        } else fileName = name + ".png";
        if("MissionItem".equals(name)) {
            fileName = "MissionItem.png";
        }
        File imageFolder = App.rootPath.resolve(Configuration.ItemIconPath).normalize().toFile();
        File image = new File(imageFolder, fileName);
        if (!image.exists()) {
            //可能是不需要副id的图片
            fileName = name + ".png";
            image = new File(imageFolder, fileName);
            if (!image.exists()) {
                image = new File(imageFolder, Configuration.MissItemName);
            }
        }
        try (FileInputStream imageStream = new FileInputStream(image)) {
            DownloadedFile file = new DownloadedFile("image/jpg", imageStream, fileName);
            file.asAttachment(false);
            ctx.outputAsFile(file);
        }
        return fileName;
    }
}
