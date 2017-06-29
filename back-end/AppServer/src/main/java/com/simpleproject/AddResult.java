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



    public static void insertResult(int doc_1, int doc_2,int methode, int pourcentage, String commentaire, String text1, String text2) {
        try {
            Class.forName("org.postgresql.Driver");
            Connection conn = DriverManager.getConnection(url, user, passwd);
            //Création d'un objet Statement
            Statement state = conn.createStatement();
            //Query d'insert
            String query = "INSERT INTO iteration2.Ressemble (id, doc_id, met_id, pourcentage, commantaire, text1, text2) VALUES ("+doc_1+", "+doc_2+", "+methode +", "+pourcentage+", \'"+commentaire+"\', \' "+text1+" \', \' "+text2+" \')";
            state.executeUpdate(query);
            state.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
