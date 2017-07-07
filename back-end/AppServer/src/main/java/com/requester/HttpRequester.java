package main.java.com.requester;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

public class HttpRequester {

    public String createParameterString(Map<String, String> urlParameters)
    {
        String urlParametersString = "";
        for (String i : urlParameters.keySet()){
            urlParametersString += i + "=" + urlParameters.get(i) + "&";
        }
        if (urlParametersString.length() > 0)
            urlParametersString = urlParametersString.substring(0,urlParametersString.length() - 1);
        return urlParametersString;
    }

    public String executeGet(String targetURL)
    {
        return executeGet(targetURL, "");
    }

    public String executeGet(String targetURL, Map<String, String> urlParameters) {
        return executeGet(targetURL, createParameterString(urlParameters));
    }

    public String executeGet(String targetURL, String urlParameters) {
        targetURL += "?" + urlParameters;
        HttpURLConnection connection = null;

        try {
            //Create connection
            URL url = new URL(targetURL);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(
                    new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    public String executePost(String targetURL) {
        return executePost(targetURL, "");
    }

    public String executePost(String targetURL, Map<String, String> urlParameters) {
        System.out.println(urlParameters.toString());
        return executePost(targetURL, createParameterString(urlParameters));
    }

    public String executePost(String targetURL, String urlParameters) {
        HttpURLConnection connection = null;

        try {
            //Create connection
            URL url = new URL(targetURL);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type",
                    "application/x-www-form-urlencoded");

            connection.setRequestProperty("Content-Length",
                    Integer.toString(urlParameters.getBytes().length));
            connection.setRequestProperty("Content-Language", "en-US");

            connection.setUseCaches(false);
            connection.setDoOutput(true);

            //Send request
            DataOutputStream wr = new DataOutputStream (
                    connection.getOutputStream());
            wr.writeBytes(urlParameters);
            wr.close();

            //Get Response
            InputStream is = connection.getInputStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            StringBuilder response = new StringBuilder(); // or StringBuffer if Java version 5+
            String line;
            while ((line = rd.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            rd.close();
            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }
}