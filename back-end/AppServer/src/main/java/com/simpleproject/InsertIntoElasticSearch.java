package main.java.com.simpleproject;
import main.java.com.requester.ElasticRequester;
import main.java.com.requester.HttpRequester;
import main.java.com.requester.PostgreRequester;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Response;
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
import java.io.IOException;
import java.net.InetAddress;
import java.util.*;

public class InsertIntoElasticSearch {

    public static boolean createPipeline(){
        RestClient requester = ElasticRequester.getInstance();

        HttpEntity body = new NStringEntity("{ \"description\" : \"Extract attachment information\", \n" +
                "  \"processors\": [\n" +
                "    {\n" +
                "      \"attachment\": {\n" +
                "        \"field\": \"data\",\n" +
                "        \"indexed_chars\": -1\n" +
                "      }\n" +
                "    }\n" +
                "  ] \n" +
                "}\n",ContentType.APPLICATION_JSON);
        try {
            requester.performRequest("PUT","_ingest/pipeline/attachment", Collections.<String,String>emptyMap(), body);
        } catch (IOException e) {
            //e.printStackTrace();

            return false;
        }

        return true;
    }

    public static boolean createMapping(String id){
        RestClient requester = ElasticRequester.getInstance();

        HttpEntity body = new NStringEntity("{\n" +
                "  \"mappings\": {\n" +
                "    \"document\" : {\n" +
                "      \"properties\" : {\n" +
                "        \"attachment\": {\n" +
                "          \"properties\": {\n" +
                "            \"content\": {\n" +
                "              \"type\": \"text\",\n" +
                "              \"fields\": {\n" +
                "                \"keyword\": {\n" +
                "                  \"type\": \"keyword\"\n" +
                "                },\n" +
                "                \"stemmed\": {\n" +
                "                  \"type\": \"text\",\n" +
                "                  \"analyzer\": \"french\"\n" +
                "                },\n" +
                "                \"bigrammes\": {\n" +
                "                  \"type\": \"text\",\n" +
                "                  \"analyzer\": \"bigrammes\"\n" +
                "                },\n" +
                "                \"trigrammes\": {\n" +
                "                  \"type\": \"text\",\n" +
                "                  \"analyzer\": \"trigrammes\"\n" +
                "                }\n" +
                "              }\n" +
                "            },\n" +
                "            \"content_length\": {\n" +
                "              \"type\": \"long\"\n" +
                "            },\n" +
                "            \"content_type\": {\n" +
                "              \"type\": \"text\",\n" +
                "              \"fields\": {\n" +
                "                \"keyword\": {\n" +
                "                  \"type\": \"keyword\"\n" +
                "                }\n" +
                "              }\n" +
                "            },\n" +
                "            \"language\": {\n" +
                "              \"type\": \"text\",\n" +
                "              \"fields\": {\n" +
                "                \"keyword\": {\n" +
                "                  \"type\": \"keyword\"\n" +
                "                }\n" +
                "              }\n" +
                "            }\n" +
                "          }\n" +
                "        }\n" +
                "      }\n" +
                "    }\n" +
                "  },\n" +
                "  \"settings\": {\n" +
                "    \"analysis\": {\n" +
                "      \"analyzer\": {\n" +
                "        \"bigrammes\": {\n" +
                "          \"type\": \"custom\",\n" +
                "          \"tokenizer\": \"standard\",\n" +
                "          \"char_filter\": [\n" +
                "            \"html_strip\"\n" +
                "            ],\n" +
                "            \"filter\" : [\n" +
                "              \"lowercase\",\n" +
                "              \"bigrammes_filter\"\n" +
                "              ]\n" +
                "        },\n" +
                "        \"trigrammes\" : {\n" +
                "          \"type\": \"custom\",\n" +
                "          \"tokenizer\": \"standard\",\n" +
                "          \"char_filter\": [\n" +
                "            \"html_strip\"\n" +
                "            ],\n" +
                "            \"filter\" : [\n" +
                "              \"lowercase\",\n" +
                "              \"trigrammes_filter\"\n" +
                "              ]\n" +
                "        }\n" +
                "      },\n" +
                "      \"filter\": {\n" +
                "        \"bigrammes_filter\": {\n" +
                "          \"type\" : \"shingle\",\n" +
                "          \"max_shingle_size\" : 2,\n" +
                "          \"min_shingle_size\" : 2,\n" +
                "          \"output_unigrams\" : false,\n" +
                "          \"output_unigrams_if_no_shingles\" : true\n" +
                "        },\n" +
                "        \"trigrammes_filter\": {\n" +
                "          \"type\" : \"shingle\",\n" +
                "          \"max_shingle_size\" : 3,\n" +
                "          \"min_shingle_size\" : 3,\n" +
                "          \"output_unigrams\" : false,\n" +
                "          \"output_unigrams_if_no_shingles\" : true\n" +
                "        }\n" +
                "      }\n" +
                "    }\n" +
                "  }\n" +
                "}\n",ContentType.APPLICATION_JSON);
        try {
            requester.performRequest("PUT",id, Collections.<String,String>emptyMap(), body);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
    public static void analyseMeta(String travail, String depot){
        RestClient requester = ElasticRequester.getInstance();
        ProjectProperties properties = ProjectProperties.getInstance();

        Map<String, String> paramMap = new HashMap<String, String>();
        paramMap.put("q", "*:*");
        paramMap.put("pretty", "true");

        HttpEntity body = new NStringEntity("{" +
                "\"_source\":[\"attachment.author\",\"attachment.content\"],\n" +
                "\"query\": {\n" +
                "\"match_all\": {" +
                "}\n" +
                "}" +
                "}",ContentType.APPLICATION_JSON);
        try{
            //get all author
            Response indexResponse = requester.performRequest("GET","/"+travail+"/"+depot+"/_search", Collections.<String,String>emptyMap(), body);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void encoder(int depot) {
        createPipeline();
        String travailFromRemiseQuery = "SELECT tra_id from iteration2.remise WHERE id = " + depot + ";";
        String insertQuery;
        List<String[]> result = PostgreRequester.call(travailFromRemiseQuery);
        String travail_id = "0";
        for( String[] row: result ){
            travail_id = row[0];
        }
        createMapping(travail_id);

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
            ProjectProperties properties = ProjectProperties.getInstance();
            //HttpRequester requester = new HttpRequester();

            List<String> l_id = new ArrayList<>();
            for( String[] row: result ){
                //push files in elasticSearch
                String path = properties.getProperty("document.path")+ row[1] + row[2];
                if (new File(path).exists()) {
                    HttpEntity body = new NStringEntity("{" +
                            "\"data\":\"" + PdfTo64.encoder(properties.getProperty("document.path") + row[1] + row[2]) + "\"" +
                            "}",ContentType.APPLICATION_JSON);
                    l_id.add(row[0]);
                    //requester.executePost("http://s6ie1702.gel.usherbrooke.ca:9300" + "/"+travail_id+"/"+depot+"/"+row[0], "", body);
                    HashMap<String,String> param = new HashMap<String,String>();
                    param.put("pipeline", "attachment");

                    requester.performRequest("PUT","/"+travail_id+"/"+depot+"/"+row[0],param, body);
                }
            }


            //requester.close();
            analyseMeta(travail_id,travail_id);

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
