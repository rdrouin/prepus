/**
 * Created by Olivier on 2017-06-07.
 */
public class Similarity {

    int file1;
    int file2;
    int percent;
    int type;

    public Similarity() {
        this.file1 = 1;
        this.file2 = 2;
        this.percent = 3;
        this.type = 4;
    }

    public Similarity(int file1, int file2, int percent, int type) {
        this.file1 = file1;
        this.file2 = file2;
        this.percent = percent;
        this.type = type;
    }

    public int getFile1() {
        return file1;
    }

    public int getFile2() {
        return file2;
    }

    public int getPercent() {
        return percent;
    }

    public int getType() {
        return type;
    }
}
