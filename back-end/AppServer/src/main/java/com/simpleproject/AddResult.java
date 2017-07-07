package main.java.com.simpleproject;

import main.java.com.requester.PostgreRequester;


public class AddResult {

    public static void insertResult(int doc_1, int doc_2,int methode, int pourcentage, String commentaire, String text1, String text2) {
        PostgreRequester.call("INSERT INTO iteration2.Ressemble (doc_1, doc_2, met_id, pourcentage, commantaire, text1, text2) VALUES ("+doc_1+", "+doc_2+", "+methode +", "+pourcentage+", \'"+commentaire+"\', \' "+text1+" \', \' "+text2+" \')");
    }
}
