package com.day.ocremoteserver.entity;

public class Command {
    public int cid;
    public String lua;
    public String result;
    public Command(int cid, String lua) {
        this.cid = cid;
        this.lua = lua;
    }
}
