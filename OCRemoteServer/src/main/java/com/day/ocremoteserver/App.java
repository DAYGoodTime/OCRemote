package com.day.ocremoteserver;

import org.noear.solon.Solon;
import org.noear.solon.annotation.SolonMain;
import org.noear.solon.web.cors.CrossFilter;

import java.nio.file.Path;

@SolonMain
public class App {

    public static Path rootPath;

    public static void main(String[] args) {
        Solon.start(App.class, args,app->{
            app.filter(-1, new CrossFilter().allowedOrigins("*"));
        });
    }
}