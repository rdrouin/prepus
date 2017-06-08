import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * Created by Olivier on 2017-06-07.
 */
public class ServeletFiles extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {

        List<FileDescription> fileList = FileAnalysis.getFileDescriptionList(0);

        fileList.get(0);

        String returnedValue = "<files>";

        for(int i=0; i<fileList.size(); i++) {
            returnedValue +=("<file>" +
                    "<id>" + fileList.get(i).getId() + "</id>" +
                    "<name>" + fileList.get(i).getName() + "</name>" +
                    "</file>"
            );
        }
        returnedValue += "</files>";
        System.out.println(returnedValue);
        // Return some cliched textual content


    }

}
