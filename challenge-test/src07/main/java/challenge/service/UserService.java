package challenge.service;

import java.util.List;

import challenge.domain.User;

public interface UserService {
 // 서비스 컴포넌트에서 메서드명을 지을 때는 
    // 업무 용어를 사용하라!
    List<User> list();
    User get(int userNo);
    int add(User user);
    int update(User user);
    int update2(User user);
    int update3(User user);
    int updateNotimg(User user);
    int delete(int userNo);
    User getWithId(String id);
    boolean isExist(String id, String password);
}

