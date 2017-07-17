package main.java.com.simpleproject;
import main.java.com.requester.ElasticRequester;
import main.java.com.requester.HttpRequester;
import main.java.com.requester.PostgreRequester;
import org.apache.http.HttpEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;

import org.elasticsearch.script.ScriptType;
import org.elasticsearch.script.mustache.SearchTemplateRequestBuilder;
import org.json.HTTP;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import java.util.*;

public class InsertIntoElasticSearch {

    public static String InputStreamToString(InputStream in)
    {
        try {
            String response = "";
            while (in.available() != 0) {
                response += (char) in.read();
            }
            return response;
        }
            catch (Exception e) {
            return "";
        }
    }

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
            requester.performRequest("PUT","/_ingest/pipeline/attachment", Collections.<String,String>emptyMap(), body);
        } catch (IOException e) {
            e.printStackTrace();

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
            requester.performRequest("PUT","/"+id, Collections.<String,String>emptyMap(), body);
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

        HttpEntity body = new NStringEntity(
                "{\"_source\":[\"attachment.author\"],\n" +
                "\"query\": {" +
                    "\"match_all\": {}" +
                "}" +
                "}",ContentType.APPLICATION_JSON);
        try{
            //get all author
            Response indexResponse = requester.performRequest("GET","/"+travail+"/"+depot+"/_search", Collections.<String,String>emptyMap(), body);

            String response = InputStreamToString(indexResponse.getEntity().getContent());

            JSONObject jsonResponse = new JSONObject(response);
            int size = jsonResponse.getJSONObject("hits").getInt("total");
            JSONArray hits = jsonResponse.getJSONObject("hits").getJSONArray("hits");

            String author1, author2, id1, id2;
            for (int i = 0; i < size - 1; i++)
            {
                id1 = hits.getJSONObject(i).getString("_id");
                author1 =  hits.getJSONObject(i).getJSONObject("_source").getJSONObject("attachment").getString("author");
                for (int j = i + 1; j < size; j++)
                {
                    id2 = hits.getJSONObject(j).getString("_id");
                    System.out.println("Documents " + id1 + " " + id2);
                    author2 =  hits.getJSONObject(j).getJSONObject("_source").getJSONObject("attachment").getString("author");

                    if (author1.equals(author2))
                    {
                        System.out.println("Same author for documents " + id1 + " " + id2);
                        PostgreRequester.call("INSERT INTO iteration2.Ressemble (doc_1, doc_2, met_id, pourcentage, commantaire, text1, text2) VALUES ("+id1+", "+id2+", "+1 +", "+15+", \'Same author\', \' "+author1+" \', \' "+author2+" \')");
                    }
                }
            }

        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void  analyseTextuelle(String travail, String depot, List<String> idList) throws Exception{
        RestClient requester = ElasticRequester.getInstance();
        for (Iterator<String> i = idList.iterator(); i.hasNext(); ) {
            String item = i.next();

            HashMap<String,String> params = new HashMap<String,String>();
            params.put("_source", "attachment.content");

            Response indexResponse = requester.performRequest("GET","/"+travail+"/"+depot+"/" + item + "/_source", params);
            String response = InputStreamToString(indexResponse.getEntity().getContent());
            JSONObject obj = new JSONObject(response);
            response = obj.getJSONObject("attachment").getString("content");

            response = response.replaceAll("\\n", "").replaceAll("\\s+", " ");
            String[] sentences = response.split(". ");
            List<String> search = new ArrayList<String>();
            //System.out.println(words.length);
            int numberOfSentences = (int) (sentences.length * .25);
            int rand = 0;

            Random r = new Random();
            // Select random phrases to compare
            for (int j = 0; j < numberOfSentences; j++) {
                //System.out.println(r.nextInt(words.length));
                rand = r.nextInt(sentences.length);
                search.add(sentences[rand]);
            }

            // Cut down sentences to trigramme
            JSONObject trigrammes = new JSONObject();
            trigrammes.put("tokens",new JSONArray());
            for (int j = 0; j < search.size(); j++) {
                HttpEntity body = new NStringEntity(
                        "{\"analyzer\": \"trigrammes\", \n" +
                                "  \"text\": \"" + search.get(j) + "Jai une deuxième phrase\"}", ContentType.APPLICATION_JSON);

                indexResponse = requester.performRequest("GET", "/1/_analyze", Collections.emptyMap(), body);
                response = InputStreamToString(indexResponse.getEntity().getContent());

                obj = new JSONObject(response);
                trigrammes.getJSONArray("tokens").put(obj.getJSONArray("tokens"));
            }

            for (int j = 0; j < trigrammes.getJSONArray("tokens").length(); j++) {
                System.out.println(trigrammes.getJSONArray("tokens").getJSONObject(j).getString("token"));
            }

            // Final
            //System.out.println(words.length / 10);
            /*for (int j = 0; j < search.size(); j++) {
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
            }*/
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

            List<String> idList = new ArrayList<>();
            for( String[] row: result ){
                //push files in elasticSearch
                String path = properties.getProperty("document.path")+ row[1] + row[2];
                if (new File(path).exists()) {
                    HttpEntity body = new NStringEntity("{" +
                            "\"data\":\"" + PdfTo64.encoder(properties.getProperty("document.path") + row[1] + row[2]) + "\"" +
                            "}",ContentType.APPLICATION_JSON);
                    idList.add(row[0]);
                    //requester.executePost("http://s6ie1702.gel.usherbrooke.ca:9300" + "/"+travail_id+"/"+depot+"/"+row[0], "", body);
                    HashMap<String,String> param = new HashMap<String,String>();
                    param.put("pipeline", "attachment");

                    Response response = requester.performRequest("PUT","/"+travail_id+"/"+depot+"/"+row[0],param, body);
                    System.out.println(response);
                }
            }

            analyseMeta(travail_id, Integer.toString(depot));
            analyseTextuelle(travail_id, Integer.toString(depot), idList);
        }
        catch (Exception e) {
            e.printStackTrace();
        }

    }
}
