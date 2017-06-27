package test.java.com.simpleproject;

import main.java.com.simpleproject.Similarity;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by AustinDidierTran on 2017-06-27.
 */
public class SimilarityTest {
    @Test
    public void getFile1() throws Exception {
        Similarity testSimilarity = new Similarity(1, 2, 3, 4);

        assertEquals(testSimilarity.getFile1(), 1);
    }

    @Test
    public void getFile2() throws Exception {
        Similarity testSimilarity = new Similarity(1, 2, 3, 4);

        assertEquals(testSimilarity.getFile2(), 2);
    }

    @Test
    public void getPercent() throws Exception {
        Similarity testSimilarity = new Similarity(1, 2, 3, 4);

        assertEquals(testSimilarity.getPercent(), 3);
    }

    @Test
    public void getType() throws Exception {
        Similarity testSimilarity = new Similarity(1, 2, 3, 4);

        assertEquals(testSimilarity.getType(), 4);
    }

}