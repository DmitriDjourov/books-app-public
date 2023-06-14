package tech.ksergei.bookslibrary.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class JWTParser {

  public static String extractEmail(String token) {
    String email = payloadJWTExtraction(token, "\"sub\"");
    if (email != null)
      return email;
    return "";
  }

  public static String extractUserType(String token) {
    String userType = payloadJWTExtraction(token, "\"userTypeRole\"");
    if (userType != null)
      return userType;
    return "";
  }

  public static String payloadJWTExtraction(String token, String tag) {

    token.replace("Bearer ", "");

    String[] chunks = token.split("\\.");
    Base64.Decoder decoder = Base64.getUrlDecoder();

    String payload = new String(decoder.decode(chunks[1]));

    String[] entries = payload.split(",");
    Map<String, String> map = new HashMap<String, String>();

    for (String entry : entries) {
      String[] keyValue = entry.split(":");
      if (keyValue[0].equals(tag)) {

        int remove = 1;
        if (keyValue[1].endsWith("}")) {
          remove = 2;
        }
        keyValue[1] = keyValue[1].substring(0, keyValue[1].length() - remove);
        keyValue[1] = keyValue[1].substring(1);

        map.put(keyValue[0], keyValue[1]);
      }
    }
    if (map.containsKey(tag)) {
      return map.get(tag);
    }
    return null;
  }
}