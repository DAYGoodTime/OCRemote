package com.day.ocremoteserver;

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

@Component
public class AppInitEvent  implements EventListener<AppLoadEndEvent> {

    private static final Logger log = LoggerFactory.getLogger(AppInitEvent.class);

    @Override
    public void onEvent(AppLoadEndEvent appLoadEndEvent) throws Throwable {
        //初始化
        Path currentPath = Paths.get(System.getProperty("user.dir"));
        App.rootPath = currentPath;
        log.info("当前Root路径:{}", currentPath);
        this.SyncRemoteCode();
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
}
