// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

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
    public List<Message> list(int pageNo, int pageSize) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("startRowNo", (pageNo - 1) * pageSize);
        params.put("pageSize", pageSize);
        
        return MessageDao.selectList(params);
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