package main.java.com.simpleproject;

import java.util.List;

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

    public static String str(String[] list)
    {
        return "{\"file1\":\"" + list[0] +
                "\",\"file2\":\"" + list[1] +
                "\",\"percent\":\"" + list[2] +
                "\",\"type\":\"" + list[3] +
                "\",\"text1\":\"" + list[4] +
                "\",\"text2\":\"" + list[5] +
                "\"}";
    }

    public static String getSimilarities(String remise_id)
    {
        String returnedValue = "\"similarities\":[";
        List<String[]> table =  PostgreContacter.call("select distinct ressemble.id, ressemble.doc_id, ressemble.pourcentage, ressemble.met_id, ressemble.text1, ressemble.text2 from iteration2.ressemble\n" +
                "join iteration2.document on ressemble.id = document.id or ressemble.doc_id = document.id\n" +
                "join iteration2.remise on remise.id = document.rem_id where remise.id = " + remise_id);
        for( String[] row: table ){
            returnedValue += str(row) + ",";
        }
        if (table.size() > 0)
        {
            returnedValue = returnedValue.substring(0, returnedValue.length() - 1);
        }
        returnedValue += "]";
        return returnedValue;
    }
}
