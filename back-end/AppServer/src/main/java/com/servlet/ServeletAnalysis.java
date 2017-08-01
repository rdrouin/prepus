package main.java.com.servlet;

import main.java.com.simpleproject.InsertIntoElasticSearch;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import main.java.com.simpleproject.FileAnalysis;

/**
 * Created by Olivier on 2017-06-07.
 */
public class ServeletAnalysis extends HttpServlet {
    public void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        String idDepot = req.getParameter("depot");
        int metadata = Integer.parseInt(req.getParameter("metadata"));
        int similaritypercentage = Integer.parseInt(req.getParameter("similarityPercentage"));

        InsertIntoElasticSearch.encoder(Integer.parseInt(idDepot),metadata,similaritypercentage);
        //FileAnalysis.launchAnalysis(Integer.parseInt(id));
        res.setContentType("text/plain");
        res.setCharacterEncoding( "UTF-8" );
        PrintWriter out = res.getWriter();
        out.println(idDepot);

    }

}
