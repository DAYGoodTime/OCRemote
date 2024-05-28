package features;

import cn.hutool.core.util.IdUtil;
import com.day.ocremoteserver.App;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.noear.solon.test.HttpTester;
import org.noear.solon.test.SolonJUnit4ClassRunner;
import org.noear.solon.test.SolonTest;

import java.io.IOException;
import java.util.UUID;

@RunWith(SolonJUnit4ClassRunner.class)
@SolonTest(App.class)
public class HelloTest extends HttpTester {
    @Test
    public void hello() throws IOException {
        System.out.println();
    }
}