package challenge.service;

public interface FacebookService {

    <T> T me(String accessToken, Class<T> type);
}