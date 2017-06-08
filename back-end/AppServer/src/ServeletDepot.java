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

        String returnedValue = "<depot>";

        returnedValue += "<id>1</id>";

        returnedValue += "<files>";

        for (int i = 0; i < fileList.size(); i++) {
            returnedValue += ("<file>" +
                    "<id>" + fileList.get(i).getId() + "</id>" +
                    "<name>" + fileList.get(i).getName() + "</name>" +
                    "</file>"
            );
        }
        returnedValue += "</files>";

        List<Similarity> similaritiesList = FileAnalysis.getSimilarities();

        returnedValue += "<similarities>";

        for (int i = 0; i < similaritiesList.size(); i++) {
            returnedValue += ("<similarity>" +
                    "<file1>" + similaritiesList.get(i).getFile1() + "</file1>" +
                    "<file2>" + similaritiesList.get(i).getFile2() + "</file2>" +
                    "<percent>" + similaritiesList.get(i).getPercent() + "</percent>" +
                    "<type>" + similaritiesList.get(i).getType() + "</type>" +
                    "</similarity>"
            );
        }
        returnedValue += "</similarities>";

        returnedValue += "</depot>";
        response.setContentType("text/xml");
        response.setCharacterEncoding( "UTF-8" );
        PrintWriter out = response.getWriter();
        out.println(returnedValue);
    }
}
