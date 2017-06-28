package test.java.com.simpleproject;

import main.java.com.simpleproject.FileDescription;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by AustinDidierTran on 2017-06-27.
 */
public class FileDescriptionTest {
    @Test
    public void getId() throws Exception {
        FileDescription testFileDescription = new FileDescription(1, "testName");

        assertEquals(testFileDescription.getId(), 1);
    }

    @Test
    public void getName() throws Exception {
        FileDescription testFileDescription = new FileDescription(1, "testName");

        assertEquals(testFileDescription.getName(), "testName");
    }

}