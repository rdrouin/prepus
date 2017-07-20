package main.java.com.simpleproject;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

/**
 * Created by Olivier on 2017-06-28.
 */
public class PdfTo64 {

    public static String encoder(String path) throws Exception {

        String[] splitPath = path.split("\\.");
        String extension = splitPath[1];

        if (!extension.equals("pdf")) {
            throw new UnsupportedOperationException();
        }

        File file = new File(path);

        if (!file.exists()) {
            throw new Exception("File does not exist");
        }

        //Reading and encoding files
        byte fileContent[] = Files.readAllBytes(file.toPath());
        String result64 = javax.xml.bind.DatatypeConverter.printBase64Binary(fileContent);
        
        return result64;
    }
}
