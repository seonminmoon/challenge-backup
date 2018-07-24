package challenge.dao;

import java.util.List;

import challenge.domain.User;

public interface UserDao {
    int delete(int userNo);
    List<User> selectList();
    int insert(User user);
    int update(User user);
    User selectOne(int userNo);
}
