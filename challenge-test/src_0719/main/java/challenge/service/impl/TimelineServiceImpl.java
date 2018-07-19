// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.PostDao;
import challenge.dao.TimelineDao;
import challenge.domain.Timeline;
import challenge.service.TimelineService;


@Service
public class TimelineServiceImpl implements TimelineService {
    
    PostDao postDao;
    TimelineDao timelineDao;

    
    public TimelineServiceImpl(PostDao postDao, TimelineDao timelineDao) {
        this.postDao = postDao;
        this.timelineDao = timelineDao;
    }
    
    
    
    @Override
    public List<Timeline> list() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        List<Timeline> list = timelineDao.selectList();
        
        return timelineDao.selectList();
    }
    
    @Override
    public int delete(int no) {
        return timelineDao.delete(no);
    }

    @Override
    public Timeline get(int no) {
        Timeline timeline = timelineDao.selectOne(no);
        return timeline;
    }
    
    @Override
    public int add(Timeline timeline) {
        postDao.insert(timeline);
        return timelineDao.insert(timeline);
    }
    
    public int update(Timeline timeline) {
        return timelineDao.update(timeline);
    }

}