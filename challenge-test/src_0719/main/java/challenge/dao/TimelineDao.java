package challenge.dao;

import java.util.List;

import challenge.domain.Timeline;

public interface TimelineDao {
    int delete(int no);
    List<Timeline> selectList();
    int insert(Timeline timeline);
    int update(Timeline timeline);
    Timeline selectOne(int no);
}
