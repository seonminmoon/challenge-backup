// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.TimelineDao;
import challenge.domain.Timeline;
import challenge.service.TimelineService;


@Service
public class TimelineServiceImpl implements TimelineService {

    TimelineDao timelineDao;

    
    public TimelineServiceImpl(TimelineDao timelineDao) {
        this.timelineDao = timelineDao;
    }
    
    
    
    @Override
    public List<Timeline> list() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
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
        return timelineDao.insert(timeline);
    }
    
    public int update(Timeline timeline) {
        return timelineDao.update(timeline);
    }

}