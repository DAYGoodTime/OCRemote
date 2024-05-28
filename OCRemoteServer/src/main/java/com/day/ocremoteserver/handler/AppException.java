package com.day.ocremoteserver.handler;

import org.noear.solon.annotation.Component;
import org.noear.solon.core.handle.Context;
import org.noear.solon.core.handle.Filter;
import org.noear.solon.core.handle.FilterChain;
import org.noear.solon.core.handle.Result;

@Component //index 为顺序位（不加，则默认为0）
public class AppException implements Filter {
    @Override
    public void doFilter(Context ctx, FilterChain chain) throws Throwable {
        try {
            chain.doFilter(ctx);
        } catch (Throwable e) {
            e.printStackTrace();
            ctx.render(Result.failure(500, "服务端运行出错"));
        }
    }
} 