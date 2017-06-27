package main.java.com.simpleproject;

/**
 * Created by Olivier on 2017-06-07.
 */
public class FileDescription {
    int id;
    String name;

    public FileDescription(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
