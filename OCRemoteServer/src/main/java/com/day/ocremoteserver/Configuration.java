package com.day.ocremoteserver;

import java.nio.file.Path;

public class Configuration {
    //物品图标文件夹
    public static Path ItemIconPath = App.rootPath.resolve("../itempanel_icons").normalize();
    //外部OC代码文件夹
    public static Path OCCodePath = App.rootPath.resolve("../OC").normalize();

    public static String MissItemName = "MissionItem.png";
    public static final long EventTimeOutLimit = 2;
}
