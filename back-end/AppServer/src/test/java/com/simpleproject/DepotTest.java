package com.simpleproject;

import org.junit.Rule;
import org.junit.Test;

import main.java.com.simpleproject.Depot;
import org.junit.rules.ExpectedException;

import static org.junit.Assert.*;

/**
 * Created by AustinDidierTran on 2017-07-19.
 */
public class DepotTest {
    @Rule
    public final ExpectedException exception = ExpectedException.none();

    @Test
    public void str() throws Exception {
        String testString = Depot.str("1234", "Austin");
        String expectedValue = "{\"id\": \"1234\",\"name\":\"Austin\"}";

        assertEquals(testString, expectedValue);
    }

    @Test
    public void str1() throws Exception {
        String testString = Depot.str("1234", "1994-02-17", "false", "1", "Austin");
        String expectedValue = "{\"id\": \"1234\",\"date\": \"1994-02-17\",\"analyze\": \"false\",\"count\": \"1\",\"name\":\"Austin\"}";

        assertEquals(testString, expectedValue);
    }

    @Test
    public void sim() throws Exception {
        String list[] = new String[4];

        list[0] = "file1.pdf";
        list[1] = "file2.pdf";
        list[2] = "file3.pdf";
        list[3] = "file4.pdf";

        String testString = Depot.sim(list);
        String expectedValue = "{\"file1\":\"file1.pdf\",\"file2\":\"file2.pdf\",\"percent\":\"file3.pdf\",\"type\":\"file4.pdf\"}";

        assertEquals(testString, expectedValue);
    }

    @Test
    public void simNotEnoughArguments() throws Exception {
        String list[] = new String[3];

        list[0] = "file1.pdf";
        list[1] = "file2.pdf";
        list[2] = "file3.pdf";

        exception.expect(Exception.class);
        Depot.sim(list);
    }
}