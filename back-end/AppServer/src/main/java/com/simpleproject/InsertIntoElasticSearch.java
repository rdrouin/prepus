package com.simpleproject;
import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.nio.file.Files;
import java.sql.*;
import java.util.*;

/**
 * Created by Olivier on 2017-06-26.
 */
public class InsertIntoElasticSearch {

    private static String url = "jdbc:postgresql://s6ie1702.gel.usherbrooke.ca:5432/postgres";
    private static String user = "administrateur";
    private static String passwd = "s6infoe17";



    public static void encoder(int depot) {

            try {
                Class.forName("org.postgresql.Driver");
                Connection conn = DriverManager.getConnection(url, user, passwd);
                //Création d'un objet Statement

                Statement state = conn.createStatement();
                String remiseQuery = "SELECT tra_id from iteration2.remise WHERE id = " + depot + ";";
                ResultSet result = state.executeQuery(remiseQuery);
                String travail_id = null;
                while (result.next()) {
                     travail_id = result.getObject(1).toString();
                }
                //Query d'insert
                remiseQuery = "SELECT id, location, nom from iteration2.document WHERE rem_id = " + depot + ";";
                String noremiseQuery = "SELECT id, location, nom from iteration2.document;";
                String query = null;
                if (depot == 0) {
                    query = noremiseQuery;
                } else {
                    query = remiseQuery;
                }

                 result = state.executeQuery(query);
                // Get path and name columnid to concatenate
                ResultSetMetaData resultMeta = result.getMetaData();
                int pathID = 0;
                int nameID = 0;
                int ID = 0;
                for (int i = 1; i <= resultMeta.getColumnCount(); i++) {
                    if (resultMeta.getColumnLabel(i).equals("location")) {
                        pathID = i;
                    }
                    if (resultMeta.getColumnLabel(i).equals("nom")) {
                        nameID = i;
                    }
                    if (resultMeta.getColumnLabel(i).equals("id")) {
                        ID = i;
                    }
                }
                // Concatenate path and filename to return
                try {
                    //connecting to ElasticSearch
                    TransportClient client = new PreBuiltTransportClient(org.elasticsearch.common.settings.Settings.EMPTY)
                            .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("localhost"), 9300));

                   try {
                       CreateIndexResponse response1 = client.admin().indices().prepareCreate(travail_id)

                               .addMapping(Integer.toString(depot), "{ \"" + Integer.toString(depot) + "\": { \"properties\": { \"attachment\": { \"properties\": { \"content\": { \"type\": \"text\", \"fields\": { \"keyword\": { \"type\": \"keyword\" }, \"stemmed\": { \"type\": \"text\", \"analyzer\": \"french\" } } }, \"content_length\": { \"type\": \"long\" }, \"content_type\": { \"type\": \"text\", \"fields\": { \"keyword\": { \"type\": \"keyword\" } } }, \"language\": { \"type\": \"text\", \"fields\": { \"keyword\": { \"type\": \"keyword\" } } } } } } } }")
                               .get();
                   }catch (Exception e) {
                       System.out.println(e.getMessage());
                   }
                    List<String> l_id = new ArrayList<String>();
                    while (result.next()) {
                        //push files in elasticSearch
                        String path = GetPath.path() + result.getObject(pathID).toString() + result.getObject(nameID).toString();
                        if(new File(path).exists()) {
                            String json = "{" +
                            "\"data\":\"" + PdfTo64.encoder(GetPath.path() + result.getObject(pathID).toString() + result.getObject(nameID).toString()) + "\"" +
                            "}";
                            l_id.add(result.getObject(ID).toString());
                            IndexResponse response = client.prepareIndex(travail_id, Integer.toString(depot), result.getObject(ID).toString())
                            .setSource(json).setPipeline("attachment").execute()
                                    .actionGet();

                        }
                    }

                    for (Iterator<String> i =l_id.iterator(); i.hasNext(); ) {
                        String item = i.next();
                        GetResponse response = client.prepareGet(travail_id, Integer.toString(depot), item).get();
                        String test = String.valueOf(response.getSourceAsString());

                        JSONObject obj = new JSONObject(test);
                        String bob = ((JSONObject) (obj.get("attachment"))).get("content").toString();
                        bob = bob.replaceAll("\\n", "").replaceAll("\\s+", " ");
                        String[] words = bob.split(" ");
                        List<String> search = new ArrayList<String>();
                        System.out.println(words.length);
                        int numberofquatuor = words.length / 10;
                        int rand = 0;
                        StringJoiner joiner = new StringJoiner(" ");
                        joiner.add("01").add("02").add("03");
                        Random r = new Random();
                        for (int j =0; j < numberofquatuor; j++) {
                              //System.out.println(r.nextInt(words.length));
                              rand = r.nextInt(words.length);
                              Arrays.copyOfRange(words, rand, rand + 4);
                              if (rand + 4 < words.length)
                                search.add(String.join(" ", Arrays.copyOfRange(words, rand, rand + 4)));
                        }

                        // Final
                        System.out.println(words.length / 10);
                        for (int j =0; j < search.size(); j++) {
                            System.out.println(search.get(j));
//                            SearchResponse res = client.prepareSearch(travail_id)
//
//                                    .setQuery(QueryBuilders.queryStringQuery(search.get(j)))                 // Query
//                                    .get();
//                            String testboo = String.valueOf(res.getHits());

                        }
                    }
                    client.close();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                result.close();
                state.close();
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
    }
}
