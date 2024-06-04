package com.day.ocremoteserver;

import com.day.ocremoteserver.entity.Command;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CommandHelper {

    public static Map<Integer, Command> commandQueue = new HashMap<>();
    private static long cindex = 1;
    private static final Logger log = LoggerFactory.getLogger(CommandHelper.class);

    public static CompletableFuture<Command> future;

    public static Command sendCommand(String lua) {
        int cid = (int)(cindex++ % 1000L);
        Command cmd = new Command(cid, lua);
        commandQueue.put(cid, cmd);
        CompletableFuture<Command> future = new CompletableFuture<>();
        CommandHelper.future = future;
        Command result = null;
        try {
            result = future.get(Configuration.EventTimeOutLimit, TimeUnit.MINUTES);
        }catch (TimeoutException e){
            commandQueue.remove(cid);
            throw new RuntimeException("Command Time out: "+ lua);
        } catch (Exception e){
            log.error(e.getMessage());
            e.printStackTrace();
        }
        if(result==null||result.result.startsWith("e$")){
            String msg;
            if(result==null){
                msg = "\nLua:" + lua;
            }else{
                msg = "\nLua:" + lua + "\n"
                        +"stack:" + result.result;
            }
            throw new RuntimeException("Command executed fail: "+msg);
        }
        CommandHelper.future = null;
        return result;
    }
}
