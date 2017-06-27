package main.java.com.simpleproject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * Created by Olivier on 2017-06-07.
 */
public class ServeletSimilarities extends HttpServlet {
    public void doGet( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException{

        List<Similarity> similaritiesList = FileAnalysis.getSimilarities();
        String returnedValue = "{\"similarities\":[";
        for(int i=0; i<similaritiesList.size(); i++) {
            returnedValue +=("{\"file1\":\"" +similaritiesList.get(i).getFile1() + "\"," +
                    "\"file2\":\"" +similaritiesList.get(i).getFile2() + "\"," +
                    "\"percent\":\"" +similaritiesList.get(i).getPercent() + "\"," +
                    "\"type\":\"" +similaritiesList.get(i).getType() + "\"},"
            );
        }
        returnedValue = returnedValue.substring(0,returnedValue.length()-1);
        returnedValue += "]}";

            response.setContentType("text/json");
            response.setCharacterEncoding( "UTF-8" );
            PrintWriter out = response.getWriter();
            out.println(returnedValue);



    }
}
