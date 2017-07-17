package main.java.com.servlet;

import main.java.com.requester.HttpRequester;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ServletGoogleTest extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {

        HttpRequester http = new HttpRequester();
        String returnedValue = http.executeGet("https://www.google.ca");

        response.setContentType("text/html");
        response.setCharacterEncoding( "UTF-8" );

        PrintWriter out = response.getWriter();
        out.println(returnedValue);

    }
}