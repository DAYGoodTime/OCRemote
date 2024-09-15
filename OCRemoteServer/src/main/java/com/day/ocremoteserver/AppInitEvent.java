package com.day.ocremoteserver;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.lang.Dict;
import cn.hutool.json.JSONUtil;
import org.noear.solon.annotation.Component;
import org.noear.solon.core.event.AppLoadEndEvent;
import org.noear.solon.core.event.EventListener;
import org.noear.solon.core.util.IoUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@Component
public class AppInitEvent  implements EventListener<AppLoadEndEvent> {

    private static final Logger log = LoggerFactory.getLogger(AppInitEvent.class);

    @Override
    public void onEvent(AppLoadEndEvent appLoadEndEvent) throws Throwable {
        //初始化
        Path currentPath = Paths.get(System.getProperty("user.dir"));
        App.rootPath = currentPath;
        log.info("当前Root路径:{}", currentPath);
        try{
            this.SyncRemoteCode();
        }catch (RuntimeException e){
            log.error("同步代码失败:{}",e.getLocalizedMessage(),e);
        }
        //初始化label转义
        File miscFolder = Configuration.MiscPath.toFile();
        if(!miscFolder.exists()){
            miscFolder.mkdirs();
        }
        App.LabelDict = this.LoadLabelDict(miscFolder);
    }

    public void SyncRemoteCode () throws Throwable {
        File OCFolder = Configuration.OCCodePath.toFile();
        if(OCFolder.exists() && OCFolder.isDirectory()){
            for (File luaFile : OCFolder.listFiles()) {
                try(FileInputStream fis = new FileInputStream(luaFile)){
                    String result = IoUtil.transferToString(fis);
                    CommandHelper.sendCommand(result);
                }

            }
        }
    }

    public Map<String,Object> LoadLabelDict(File folder){
        File file = new File(folder, "label.json");
        if(!file.exists()) FileUtil.touch(file);
        String s = FileUtil.readUtf8String(file);
        if(s.isEmpty()) return new HashMap<>();
        return JSONUtil.parseObj(s).getRaw();
    }
}
