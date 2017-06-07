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
@Path("/depot")
public class API_Depot {
    // The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media type "text/plain"
    @Produces(MediaType.APPLICATION_XML)
    @Consumes(MediaType.APPLICATION_XML)
    public String sendDepot() {
        List<FileDescription> fileList = FileAnalysis.getFileDescriptionList(0);

        String returnedValue = "<depot>";

        returnedValue+= "<id>1</id>";

        returnedValue += "<files>";

        for(int i=0; i<fileList.size(); i++) {
            returnedValue +=("<file>" +
                    "<id>" + fileList.get(i).getId() + "</id>" +
                    "<name>" + fileList.get(i).getName() + "</name>" +
                    "</file>"
            );
        }
        returnedValue += "</files>";

        List<Similarity> similaritiesList = FileAnalysis.getSimilarities();

        returnedValue += "<similarities>";

        for(int i=0; i<similaritiesList.size(); i++) {
            returnedValue +=("<similarity>" +
                    "<file1>" + similaritiesList.get(i).getFile1() + "</file1>" +
                    "<file2>" + similaritiesList.get(i).getFile2() + "</file2>" +
                    "<percent>" + similaritiesList.get(i).getPercent() + "</percent>" +
                    "<type>" + similaritiesList.get(i).getType() + "</type>" +
                    "</similarity>"
            );
        }
        returnedValue += "</similarities>";

        returnedValue += "</depot>";
        System.out.println(returnedValue);
        // Return some cliched textual content
        return returnedValue;
    }

}
