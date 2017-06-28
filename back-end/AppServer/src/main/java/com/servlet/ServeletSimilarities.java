package main.java.com.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import main.java.com.simpleproject.Depot;
import main.java.com.simpleproject.Similarity;
import main.java.com.simpleproject.FileAnalysis;

/**
 * Created by Olivier on 2017-06-07.
 */
public class ServeletSimilarities extends HttpServlet {
    public void doGet( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException{

        String returnedValue = "";
        String path = request.getPathInfo() != null ? request.getPathInfo():"/";
        String depotNumber[] = path.split("/");
        response.setContentType("text/json");
        response.setCharacterEncoding( "UTF-8" );

        if (depotNumber.length > 0)
        {
            try {
                if (Integer.parseInt(depotNumber[1]) > 0) {
                    returnedValue = "{" + Similarity.getSimilarities(depotNumber[1]) + "}";
                }
            }
            catch (NumberFormatException e)
            {
                returnedValue = "BAD REQUEST: Could not parse \"" +  depotNumber[1] + "\" as an integer.";
                response.setContentType("text/plain");
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        }
        else
        {
            returnedValue = "BAD REQUEST: \"" +  request.getRequestURI() + "\" is not a valid path.";
            response.setContentType("text/plain");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }

        PrintWriter out = response.getWriter();
        out.println(returnedValue);



    }
}
