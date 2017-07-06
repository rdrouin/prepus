package main.java.com.simpleproject; /**
 * Created by emilearseneault on 2017-06-05.
 */

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FileAnalysis {

    private static String url = "jdbc:postgresql://s6ie1702.gel.usherbrooke.ca:5432/postgres";
    private static String user = "administrateur";
    private static String passwd = "s6infoe17";

    public static void main(String[] args)
    {
        launchAnalysis(23);
//        System.out.println("Program Start");
//        // GET FILE LIST
//        String path = "/Users/emilearseneault/Desktop/foremilio/src/TestingFile.txt";
//        List<String> filePathArray = getFileList(42);
//        System.out.println(filePathArray);
//        // ANALYSE
//        //getFileContent(path);
//        //getFileMetaData(path);
//        //getFileMetaData(filePathArray.get(0));
//
//        // Faire l'analyse ou les analyses
//        List<String> analyse = sizeAnalysis(filePathArray);
//        System.out.println(analyse);

        // Pass Analysis to Database
        // Pass objects : Doc 1, Doc 2, Methode, Commentaire, Pourcentage, Debut 1, Fin 1, Debut 2, Fin 2
        // Pour itération 1 : Doc 1, Doc 2, Methode (Size), Commentaire (SizeOfFile)


    }
    public static void launchAnalysis(int depot){
        System.out.println("Program Start");
        // GET FILE LIST
        String path = "/Users/emilearseneault/Desktop/foremilio/src/TestingFile.txt";
        HashMap<Integer,String> filePathArray = getFileList(depot);
       // System.out.println(filePathArray);

        List<String> analyse = sizeAnalysis(filePathArray);
        for (int i=0; i< analyse.size(); i++){

            System.out.println(analyse.get(i));
        }
        //System.out.println(analyse);

    }

    // To add params for similarities request +
    // Retrieve actual similarities
    public static List<Similarity> getSimilarities() {
        List<Similarity> similaritiesList = new ArrayList<Similarity>();

        Similarity s1 = new Similarity();
        Similarity s2 = new Similarity(5,6,7,8);

        similaritiesList.add(s1);
        similaritiesList.add(s2);

        return similaritiesList;
    }

    // To add params for similarities request +
    // Retrieve actual similarities
    public static List<FileDescription> getFileDescriptionList(int remiseID) {

        List<FileDescription> fileDescriptionList = new ArrayList<FileDescription>();

        FileDescription f1 = new FileDescription(1, "Salut");
        FileDescription f2 = new FileDescription(2, "Buche");
        FileDescription f3 = new FileDescription(5, "Tes");
        FileDescription f4 = new FileDescription(6, "Beau");

        fileDescriptionList.add(f1);
        fileDescriptionList.add(f2);
        fileDescriptionList.add(f3);
        fileDescriptionList.add(f4);

        return fileDescriptionList;
    }

    public static HashMap<Integer,String> getFileList(int remiseID) {

        HashMap<Integer,String> filePathList = new HashMap<Integer,String>();

        try {
            Class.forName("org.postgresql.Driver");
            Connection conn = DriverManager.getConnection(url, user, passwd);

            //Création d'un objet Statement
            Statement state = conn.createStatement();

            //Query d'insert
            String remiseQuery = "SELECT id, location, nom from itération1.document WHERE rem_id = " + remiseID + ";";
            String noremiseQuery = "SELECT id, location, nom from itération1.document;";
            String query = null;

            if (remiseID == 0) {
                query = noremiseQuery;
            }
            else {
                query = remiseQuery;
            }

            ResultSet result = state.executeQuery(query);

            // Get path and name columnid to concatenate
            ResultSetMetaData resultMeta = result.getMetaData();
            int pathID = 0;
            int nameID = 0;
            int ID =0;

            for(int i = 1; i <= resultMeta.getColumnCount();i++) {
                if (resultMeta.getColumnLabel(i).equals("location")){
                    pathID = i;
                }
                if (resultMeta.getColumnLabel(i).equals("nom")){
                    nameID = i;
                }
                if (resultMeta.getColumnLabel(i).equals("id")){
                    ID = i;
                }

            }

            // Concatenate path and filename to return
            String filePath = null;
            String fileName = null;
            while(result.next()) {
                    filePath = result.getObject(pathID).toString();
                    fileName = result.getObject(nameID).toString();
                    filePathList.put(Integer.parseInt(result.getObject(ID).toString()),filePath + fileName);

            }

            result.close();
            state.close();
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return filePathList;
    }

    public static void getFileContent(String filepathname)
    {
        File file = new File(filepathname);
        BufferedReader reader = null;


        List<String> fileArray = new ArrayList<String>();

        try {
            reader = new BufferedReader(new FileReader(file));
            String text = null;

            while ((text = reader.readLine()) != null) {
                fileArray.add(text);
            }
        }
        catch (IOException e) {
            System.out.println(e.getMessage());
            fileArray = null;
        }
        finally {
            try {
                if (reader != null) {
                    reader.close();
                }
            }
            catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }

        System.out.println(fileArray);
    }

    public static void getFileMetaData(String filepathname)
    {
        Path filepath = Paths.get(filepathname);

        try {
            BasicFileAttributes attr = Files.readAttributes(filepath, BasicFileAttributes.class);

            System.out.println("creationTime: " + attr.creationTime());
            System.out.println("lastAccessTime: " + attr.lastAccessTime());
            System.out.println("lastModifiedTime: " + attr.lastModifiedTime());

            System.out.println("isDirectory: " + attr.isDirectory());
            System.out.println("isOther: " + attr.isOther());
            System.out.println("isRegularFile: " + attr.isRegularFile());
            System.out.println("isSymbolicLink: " + attr.isSymbolicLink());
            System.out.println("size: " + attr.size());
        }
        catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public static long getSizeOfFile(String filepathname)
    {
        Path filepath = Paths.get(filepathname);
        long size = 0;

        try {
            BasicFileAttributes attr = Files.readAttributes(filepath, BasicFileAttributes.class);
            size = attr.size();
        }
        catch (IOException e) {
            System.out.println(e.getMessage());
        }
        return size;
    }

    public static List<String> sizeAnalysis(HashMap<Integer,String> filePathMap) {
        HashMap<Integer, Long> fileSizes = new HashMap<Integer, Long>(); // id, size

        List<Long> fileSizeArray = new ArrayList<Long>();
        List<Long> uniqueFileSize = new ArrayList<Long>();
        List<String> sameSizeNameTemp = new ArrayList<String>();
        List<Integer> sameSizeIndexTemp = new ArrayList<Integer>();
        List<String> analysisStringArray = new ArrayList<String>();

        String analysisString = "";

        // Mesure size
        int uniqueIndex = 0;
        boolean found = false;
        int i = 0;
        for (Map.Entry<Integer, String> entry : filePathMap.entrySet()) {
            fileSizes.put(entry.getKey(), getSizeOfFile(entry.getValue()));
        }

       /* for (int i = 0; i < filePathList.size(); i++)
        {
            fileSizeArray.add(getSizeOfFile(filePathList.get(i)));

            // Find uniques
            uniqueIndex = uniqueFileSize.size();
            found = false;

            while (uniqueIndex != 0 && found == false) {
                uniqueIndex--;
                if (fileSizeArray.get(i).equals(uniqueFileSize.get(uniqueIndex))) {
                    found = true;
                }
            }

            if (uniqueIndex == 0 && found == false) {
                uniqueFileSize.add(fileSizeArray.get(i));
            }
            uniqueIndex = 0;
        }*/

       // System.out.println(uniqueFileSize);

        // Find same sizes

        for (Map.Entry<Integer, String> entry1 : filePathMap.entrySet())
        {
            for (Map.Entry<Integer, String> entry2 : filePathMap.entrySet())
            {
                if (!entry1.getKey().equals(entry2.getKey()))
                if (fileSizes.get(entry1.getKey()).equals(fileSizes.get(entry2.getKey())))
                {
                    //AddResult.insertResult(entry1.getKey(),entry2.getKey(),1,100, fileSizes.get(entry2.getKey()).toString() ,"","" );
                    //System.out.println(entry1.getKey() +"  "+ entry2.getKey()+"  "+ fileSizes.get(entry2.getKey()).toString() );
                }
            }
        }




        return analysisStringArray;
    }
}
