// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.MessageDao;
import challenge.domain.Message;
import challenge.service.MessageService;


@Service
public class MessageServiceImpl implements MessageService {

    MessageDao MessageDao;
    
    public MessageServiceImpl(MessageDao MessageDao) {
        this.MessageDao = MessageDao;
    }
    
    @Override
    public List<Message> sendMsgList(int userNo, int utype, int pageNo, int pageSize) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("startRowNo", (pageNo - 1) * pageSize);
        params.put("pageSize", pageSize);
        params.put("userNo", userNo);
        params.put("utype", utype);
        return MessageDao.sendMsgList(params);
    }
    
    @Override
    public List<Message> receiveMsgList(int userNo, int utype, int pageNo, int pageSize) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("startRowNo", (pageNo - 1) * pageSize);
        params.put("pageSize", pageSize);
        params.put("userNo", userNo);
        params.put("utype", utype);
        return MessageDao.receiveMsgList(params);
    }
    @Override
    public int delete(int no) {

        return MessageDao.delete(no);
    }

    @Override
    public Message get(int no) {
        Message Message = MessageDao.selectOne(no);
        return Message;
    }
    
    @Override
    public int add(Message Message) {
        return MessageDao.insert(Message);
    }
    
}