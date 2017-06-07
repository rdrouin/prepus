import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by AustinDidierTran on 2017-06-07.
 */
public class FileDescriptionTest {
    @Test
    public void constructorAndGetters() throws Exception {
        FileDescription testFileDescription = new FileDescription(1, "testName");

        assertEquals(testFileDescription.getId(), 1);
        assertEquals(testFileDescription.getName(), "testName");
    }
}