package challenge.dao;

import java.util.List;
import java.util.Map;

import challenge.domain.Message;

public interface MessageDao {
    List<Message> sendMsgList(Map<String,Object> params);
    List<Message> receiveMsgList(Map<String,Object> params);
    int delete(int no);
    int insert(Message message);
    Message selectOne(int no);
}
