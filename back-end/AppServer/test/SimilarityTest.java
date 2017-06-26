import static org.junit.Assert.*;

/**
 * Created by AustinDidierTran on 2017-06-07.
 */
public class SimilarityTest {

    public void constructorAndGetters() throws Exception {
        Similarity testSimilarity = new Similarity(1, 2, 3, 4);

        assertEquals(testSimilarity.getFile1(), 1);
        assertEquals(testSimilarity.getFile2(), 2);
        assertEquals(testSimilarity.getPercent(), 3);
        assertEquals(testSimilarity.getType(), 4);
    }
}