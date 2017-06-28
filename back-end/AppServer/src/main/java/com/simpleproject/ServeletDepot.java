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
public class ServeletDepot extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {

        List<FileDescription> fileList = FileAnalysis.getFileDescriptionList(0);

        String returnedValue = "{\"depot\":{";

        returnedValue += "\"id\" : \"1\",";   // TODO rdrouin 2017-06-07 De-hard-code this line

        returnedValue += "\"files\" : [";

        for (int i = 0; i < fileList.size(); i++) {
            returnedValue += (
                    "{\"id\" : \"" + fileList.get(i).getId() + "\"," +
                    "\"name\" : \"" + fileList.get(i).getName() + "\"},");
        }
        returnedValue = returnedValue.substring(0, returnedValue.length() - 1);
        returnedValue += "],";

        // TODO rdrouin 2017-06-07 Replace this part with a GET request to url "/similarities"
        List<Similarity> similaritiesList = FileAnalysis.getSimilarities();
        returnedValue += "\"similarities\" : [";
        for (int i = 0; i < similaritiesList.size(); i++) {
            returnedValue += ("{" +
                    "\"file1\" : \"" + similaritiesList.get(i).getFile1() + "\"," +
                    "\"file2\" : \"" + similaritiesList.get(i).getFile2() + "\"," +
                    "\"percent\" : \"" + similaritiesList.get(i).getPercent() + "\"," +
                    "\"type\"  : \"" + similaritiesList.get(i).getType() + "\"},");
        }
        returnedValue = returnedValue.substring(0, returnedValue.length() - 1);
        returnedValue += "]}}";

        response.setContentType("text/json");
        response.setCharacterEncoding( "UTF-8" );
        PrintWriter out = response.getWriter();
        out.println(returnedValue);
    }
}
