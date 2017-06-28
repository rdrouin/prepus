package main.java.com.servlet;

import main.java.com.simpleproject.Depot;

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
public class ServeletDepot extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {
        String depotNumber[] = request.getPathInfo().split("/");
        String returnedValue = "";

        response.setContentType("text/json");
        response.setCharacterEncoding( "UTF-8" );
        if (depotNumber.length >= 1)
        {
            try {
                returnedValue = Depot.GetOneDepotFilesSimilarities(Integer.parseInt(depotNumber[1]));
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
            returnedValue = Depot.GetAllDepot();
        }


        PrintWriter out = response.getWriter();
        out.println(returnedValue);
    }
}
