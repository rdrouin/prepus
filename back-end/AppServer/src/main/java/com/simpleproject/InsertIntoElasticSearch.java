package main.java.com.simpleproject;
import main.java.com.requester.ElasticRequester;
import main.java.com.requester.HttpRequester;
import main.java.com.requester.PostgreRequester;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.script.ScriptType;
import org.elasticsearch.script.mustache.SearchTemplateRequestBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import org.json.JSONObject;

import java.io.File;
import java.net.InetAddress;
import java.util.*;

public class InsertIntoElasticSearch {

    public static void encoder(int depot) {
        String travailFromRemiseQuery = "SELECT tra_id from iteration2.remise WHERE id = " + depot + ";";
        String insertQuery;
        List<String[]> result = PostgreRequester.call(travailFromRemiseQuery);
        String travail_id = "0";
        for( String[] row: result ){
            travail_id = row[0];
        }

        if (depot == 0) {
            insertQuery = "SELECT id, location, nom from iteration2.document;";
        } else {
            insertQuery = "SELECT id, location, nom from iteration2.document WHERE rem_id = " + depot + ";";
        }
        result = PostgreRequester.call(insertQuery);

        // Concatenate path and filename to return
        try {
            //connecting to ElasticSearch
            RestClient requester = ElasticRequester.getInstance();


            //HttpRequester requester = new HttpRequester();

            List<String> l_id = new ArrayList<>();
            ProjectProperties prop = ProjectProperties.getInstance();
            for( String[] row: result ){
                //push files in elasticSearch
                String path = prop.getProperty("document.path")+ row[1] + row[2];
                if (new File(path).exists()) {
                    HttpEntity body = new NStringEntity("{" +
                            "\"data\":\"" + PdfTo64.encoder(prop.getProperty("document.path") + row[1] + row[2]) + "\"" +
                            "}");
                    l_id.add(row[0]);
                    //requester.executePost("http://s6ie1702.gel.usherbrooke.ca:9300" + "/"+travail_id+"/"+depot+"/"+row[0], "", body);
                    requester.performRequest("PUT","/"+travail_id+"/"+depot+"/"+row[0], Collections.<String,String>emptyMap(), body);
                }
            }

            requester.close();

           /* for (Iterator<String> i = l_id.iterator(); i.hasNext(); ) {
                String item = i.next();
                GetResponse response = client.prepareGet(travail_id, Integer.toString(depot), item).get();
                String test = String.valueOf(response.getSourceAsString());

                JSONObject obj = new JSONObject(test);
                String bob = ((JSONObject) (obj.get("attachment"))).get("content").toString();
                bob = bob.replaceAll("\\n", "").replaceAll("\\s+", " ");
                String[] words = bob.split(" ");
                List<String> search = new ArrayList<String>();
                //System.out.println(words.length);
                int numberofquatuor = words.length / 10;
                int rand = 0;
                StringJoiner joiner = new StringJoiner(" ");
                joiner.add("01").add("02").add("03");
                Random r = new Random();
                for (int j = 0; j < numberofquatuor; j++) {
                    //System.out.println(r.nextInt(words.length));
                    rand = r.nextInt(words.length);
                    Arrays.copyOfRange(words, rand, rand + 4);
                    if (rand + 4 < words.length)
                        search.add(String.join(" ", Arrays.copyOfRange(words, rand, rand + 4)));
                }

                // Final
                //System.out.println(words.length / 10);
                for (int j = 0; j < search.size(); j++) {

                    Map<String, Object> template_params = new HashMap<>();
                    template_params.put("param_gender", search.get(j));
                    SearchResponse res = new SearchTemplateRequestBuilder(client)
                            .setScript("{\n  \"query\" : {\n" +
                                    "            \"match_phrase\" : {\n" +
                                    "                \"attachment.content\" : \"{{param_gender}}\"\n" +
                                    "            }\n" +
                                    "        }\n}")
                            .setScriptType(ScriptType.INLINE)
                            .setScriptParams(template_params)
                            //.setScript("template_gender")
                            //.setScriptType(ScriptType.FILE)
                            //.setScriptParams(template_params)
                            .setRequest(new SearchRequest())
                            .get()
                            .getResponse();
//                            SearchResponse res = client.prepareSearch(travail_id)
//
//                                    .setQuery(QueryBuilders.queryStringQuery(search.get(j))).setSearchType("match_phrase")                 // Query
//                                    .get();
                    String testboo = String.valueOf(res.getHits());

                    SearchHits hits = res.getHits();

                    for (SearchHit hit : hits) {
                        //Map<String, SearchHitField> fields = hit.getFields();
                        //SearchHitField field = fields.get("id");

                        if (!hit.getId().equals(item)) {
                            AddResult.insertResult(Integer.parseInt(item), Integer.parseInt(hit.getId()), 2, (int) (hit.getScore()), "elastic", search.get(j), search.get(j));
                            // System.out.println(search.get(j)+ "  "+ item);
                            //System.out.println(hit.getId());
                            // System.out.println( hit.getScore());
                        }
                    }
                    //JSONObject.internalResponse
                    //System.out.println(res.internalResponse);
                }
            }*/
        }
        catch (Exception e) {
            e.printStackTrace();
        }

    }
}
