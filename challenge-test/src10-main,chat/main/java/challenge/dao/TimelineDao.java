package challenge.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import challenge.domain.Timeline;

public interface TimelineDao {
    int delete(int no);
    List<Timeline> selectList(Map<String,Object> params);
    int insert(Timeline timeline);
//    int update(String picture, int no);
    Timeline selectOne(int no);
    int timelineLikeCount(int no);
    int timelineLikeCheck(Map<String,Object> params);
    int timelineLike(Map<String,Object> params);
    int timelineLikeCancle(Map<String,Object> params);
    int timelineLikeDeleteWithtmlNo(int no);
    int update(HashMap<String, Object> paramsTimeline);
}
