package main.java.com.simpleproject;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Raph on 2017-06-27.
 */
// TODO drouinr 2017-06-27 Singleton moi ca
public class PostgreContacter {
    private static String url = "jdbc:postgresql://s6ie1702.gel.usherbrooke.ca:5432/postgres";
    private static String user = "administrateur";
    private static String passwd = "s6infoe17";

    public static List<String[]> call(String query) {
        ArrayList<String> result = new ArrayList<String>();
        try {
            Class.forName("org.postgresql.Driver");
            Connection conn = DriverManager.getConnection(url, user, passwd);

            //Création d'un objet Statement
            Statement stm = conn.createStatement();


            ResultSet rs = stm.executeQuery(query);

            int nCol = rs.getMetaData().getColumnCount();
            List<String[]> table = new ArrayList<>();
            while( rs.next()) {
                String[] row = new String[nCol];
                for( int iCol = 1; iCol <= nCol; iCol++ ){
                    Object obj = rs.getObject( iCol );
                    row[iCol-1] = (obj == null) ?null:obj.toString();
                }
                table.add( row );
            }

            stm.close();
            return table;
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

}
