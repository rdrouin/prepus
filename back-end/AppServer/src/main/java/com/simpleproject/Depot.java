package main.java.com.simpleproject;

import main.java.com.requester.PostgreRequester;

import java.util.List;

public class Depot {
    String id;
    String name;
    // List of files

    public static String str(String id, String name) {
        return "{\"id\": \"" + id + "\",\"name\":\"" + name + "\"}";
    }

    public static String sim(String[] list)
    {
        return "{\"file1\":\"" + list[0] + "\",\"file2\":\"" + list[1] + "\",\"percent\":\"" + list[2] + "\",\"type\":\"" + list[3] + "\"}";
    }

    public static String GetAllDepot(){
        // Replace with database call
        List<String[]> table =  PostgreRequester.call("select remise.id, travail.nom from iteration2.remise join iteration2.travail on remise.tra_id = travail.id");

        String returnedValue = "{\"depots\":[";
        for( String[] row: table ){
            returnedValue += str(row[0], row[1]) + ",";
        }
        returnedValue = returnedValue.substring(0, returnedValue.length() - 1);
        returnedValue += "]}";
        return returnedValue;
    };

    public static String GetOneDepotFilesSimilarities(int id)
    {
        List<String[]> table =  PostgreRequester.call("select document.id, document.nom from iteration2.document join iteration2.remise on remise.id = document.rem_id where remise.id = " + Integer.toString(id));

        String returnedValue = "{\"depot\":{\"id\":\"" + Integer.toString(id) + "\", \"files\":[";
        for( String[] row: table ){
            returnedValue += str(row[0], row[1]) + ",";
        }
        if (table.size() > 0)
        {
            returnedValue = returnedValue.substring(0, returnedValue.length() - 1);
        }
        returnedValue += "]," + Similarity.getSimilarities(Integer.toString(id)) + "}}";

        return returnedValue;

    }

}
