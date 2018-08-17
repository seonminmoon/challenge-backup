// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.CommuMediaDao;
import challenge.dao.CommunityDao;
import challenge.dao.PostDao;
import challenge.domain.CommuMedia;
import challenge.service.CommuMediaService;


@Service
public class CommuMediaServiceImpl implements CommuMediaService {

    CommuMediaDao commuMediaDao;
    CommunityDao communityDao;
    PostDao postDao;
    
    public CommuMediaServiceImpl(CommuMediaDao commuMediaDao, CommunityDao communityDao, PostDao postDao) {
        this.commuMediaDao = commuMediaDao;
        this.communityDao = communityDao;
        this.postDao = postDao;
    }
    
    @Override
    public List<CommuMedia> list() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return commuMediaDao.selectList();
    }
    

    @Override
    public CommuMedia get(int no) {
        return commuMediaDao.selectOne(no);
    }

    @Override
    public int add(CommuMedia commuMedia) {
        return commuMediaDao.insert(commuMedia);
    }

    @Override
    public int update(CommuMedia commuMedia) {
        return commuMediaDao.update(commuMedia);
    }
    @Override
    public int delete(int no) {
        return commuMediaDao.delete(no);
        
    }

    @Override
    public List<CommuMedia> ListNo(int cmuno) {
        return commuMediaDao.ListNo(cmuno);
    }

}