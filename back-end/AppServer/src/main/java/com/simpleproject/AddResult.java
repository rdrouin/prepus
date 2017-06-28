package main.java.com.simpleproject;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

/**
 * Created by Olivier on 2017-06-05.
 */
public class AddResult {
    private static String url = "jdbc:postgresql://s6ie1702.gel.usherbrooke.ca:5432/postgres";
    private static String user = "administrateur";
    private static String passwd = "s6infoe17";

    public static void main(String[] args){
       // main.java.com.simpleproject.AddResult Connect1 = new main.java.com.simpleproject.AddResult();
       // Connect1.insertResult(1, 2, 1,90,"test", 1,3,2,4);
    }

    public static void insertResult(int doc_1, int doc_2,int methode, int pourcentage, String commentaire,int debut1, int fin1, int debut2, int fin2 ) {
        try {
            Class.forName("org.postgresql.Driver");
            Connection conn = DriverManager.getConnection(url, user, passwd);
            //Création d'un objet Statement
            Statement state = conn.createStatement();
            //Query d'insert
            String query = "INSERT INTO iteration2.Ressemble (id, doc_id, met_id,pourcentage,commantaire, debut1, fin1, debut2, fin2) VALUES ("+doc_1+", "+doc_2+", "+methode +", "+pourcentage+", \'"+commentaire+"\', "+debut1+", "+fin1+", "+debut2+", "+fin2+")";
            state.executeUpdate(query);
            state.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
