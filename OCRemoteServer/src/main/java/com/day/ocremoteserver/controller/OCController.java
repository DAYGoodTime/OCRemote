package com.day.ocremoteserver.controller;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.lang.Dict;
import cn.hutool.json.JSONObject;
import com.day.ocremoteserver.App;
import com.day.ocremoteserver.CommandHelper;
import com.day.ocremoteserver.Configuration;
import com.day.ocremoteserver.entity.Command;
import com.day.ocremoteserver.schame.Dictionary;
import org.noear.snack.ONode;
import org.noear.solon.annotation.Controller;
import org.noear.solon.annotation.Mapping;
import org.noear.solon.core.handle.Context;
import org.noear.solon.core.handle.MethodType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Controller
public class OCController {

    private static final Logger log = LoggerFactory.getLogger(OCController.class);

    @Mapping(method = MethodType.POST,value = "api/command")
    public String sendCommand(Context ctx) throws IOException, ExecutionException, InterruptedException {
        ONode node = ONode.load(ctx.body());
        Command res = CommandHelper.sendCommand(node.get("lua").getString());
        return res.result;
    }
    @Mapping(method = MethodType.GET,value = "api/OCReport")
    public String PushEvent(Context ctx){
        if(CommandHelper.commandQueue.isEmpty()){
            ctx.status(204);
            return null;
        }else {
            Map<Integer,String> map = new HashMap<>();
            CommandHelper.commandQueue.forEach((k, v)->{
                map.put(k,v.lua);
            });
            return ONode.stringify(map);
        }
    }
    @Mapping(method = MethodType.POST,value = "api/OCReport")
        public String report(Context ctx) throws IOException {
        log.info("report Result!");
        Map<String,String> map = ONode.loadStr(ctx.body()).toObject(Map.class);
        for(Map.Entry<String,String> entry:map.entrySet()){
            String k = entry.getKey();
            String v = entry.getValue();
            Integer cid = Integer.parseInt(k);
            if(CommandHelper.commandQueue.containsKey(cid)){
                Command cmd = CommandHelper.commandQueue.get(cid);
                cmd.result = v;
                CommandHelper.commandQueue.remove(cid);
                CommandHelper.future.complete(cmd);
            }

        }
        return "OK";
    }



    @Mapping(method = MethodType.POST,value = "maintain/dict/upload")
    public String uploadDict(Dictionary dict){
        App.LabelDict.put(dict.name,dict.value);
        JSONObject json = new JSONObject();
        json.putAll(App.LabelDict);
        File file = new File(Configuration.MiscPath.toFile(), "label.json");
        FileUtil.writeUtf8String(json.toJSONString(4), file);
        return "OK";
    }

    @Mapping(method = MethodType.GET,value = "maintain/dict")
    public String dict(){
        JSONObject json = new JSONObject();
        json.putAll(App.LabelDict);
        return json.toJSONString(4);
    }
}