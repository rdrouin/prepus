package main.java.com.requester;

import main.java.com.simpleproject.ProjectProperties;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;


public class ElasticRequester{
    private static RestClient requester;

    public static RestClient getInstance() {
        ProjectProperties properties = ProjectProperties.getInstance();
        if (requester == null) {
            Integer bob = Integer.parseInt(properties.getProperty("elastic.port"));
            requester = RestClient.builder(
                    new HttpHost(properties.getProperty("elastic.url"), Integer.parseInt(properties.getProperty("elastic.port")))).build();
        }
        return requester;
    }
}
