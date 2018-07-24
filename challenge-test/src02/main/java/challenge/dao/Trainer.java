package challenge.dao;

import java.util.List;
import java.util.Map;

import challenge.domain.User;

public interface Trainer {
    int delete(String no);
    List<User> selectList(Map<String,Object> params);
    int insert(Trainer trainer);
    int update(Trainer trainer);
    User selectOne(String no);
    User selectOneWithPassword(Map<String,Object> params);
    int count(Map<String,Object> params);
}

