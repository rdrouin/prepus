package main.java.com.servlet;

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
        String id = req.getParameter("depot");
        FileAnalysis.launchAnalysis(Integer.parseInt(id));
        res.setContentType("text/plain");
        res.setCharacterEncoding( "UTF-8" );
        PrintWriter out = res.getWriter();
        out.println(id);

    }

}
