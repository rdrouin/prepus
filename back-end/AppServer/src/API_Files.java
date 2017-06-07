import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by Olivier on 2017-06-07.
 */

// The Java class will be hosted at the URI path "/helloworld"
@Path("/files")
public class API_Files {
    // The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media type "text/plain"
    @Produces(MediaType.APPLICATION_XML)
    @Consumes(MediaType.APPLICATION_XML)
    public String sendSimilarities() {
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
        return returnedValue;
    }

}
