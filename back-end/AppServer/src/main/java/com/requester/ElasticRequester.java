package main.java.com.requester;

public class ElasticRequester extends HttpRequester {
    private static ElasticRequester requester;
    private String url;


    public static ElasticRequester getInstance(){
        if (requester == null)
            requester = new ElasticRequester();
        return requester;
    }

    private ElasticRequester(){
        super();
        url = "http://s6ie1702.gel.usherbrooke.ca:5601/";
    }

    // TODO drouinr Composer la nature d'un message vers elastic search
    public String executeGet()
    {
        return super.executeGet(url);
    }
}
