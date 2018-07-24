package challenge.dao;

import java.util.List;

import challenge.domain.Message;

public interface MessageDao {
    List<Message> selectList();
    int delete(int no);
    int insert(Message message);
    Message selectOne(int no);
}
