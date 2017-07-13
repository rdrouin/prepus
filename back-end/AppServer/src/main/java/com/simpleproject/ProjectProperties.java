package main.java.com.simpleproject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

/**
 * Created by Olivier on 2017-06-28.
 */
public class ProjectProperties extends Properties{
    static ProjectProperties prop;

    private ProjectProperties(){
        try {
//            System.out.println("Working Directory = " +
//                    System.getProperty("user.dir"));
            ClassLoader classLoader = ProjectProperties.class.getClassLoader();
            String url = classLoader.getResource("config.properties").getFile();
            url = url.replace("%20", " ");
            FileInputStream fileStream = new FileInputStream(url);
            this.load(fileStream);

            fileStream.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    static public ProjectProperties getInstance(){
        if (prop == null){
            prop = new ProjectProperties();
        }
        return prop;
    }

    public static String path(){
        Properties properties = new Properties();
        try {
//            System.out.println("Working Directory = " +
//                    System.getProperty("user.dir"));
            ClassLoader classLoader = InsertIntoElasticSearch.class.getClassLoader();
            FileInputStream fileStream = new FileInputStream(classLoader.getResource("config.properties").getFile());
            properties.load(fileStream);

            fileStream.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return properties.getProperty("document.path");
    }
}
