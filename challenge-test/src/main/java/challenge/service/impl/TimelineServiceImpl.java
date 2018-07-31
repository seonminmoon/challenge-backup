// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.PostDao;
import challenge.dao.TimelineDao;
import challenge.domain.Comment;
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
    public List<Timeline> list(int pageNo, int pageSize) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("startRowNo", (pageNo - 1) * pageSize);
        params.put("pageSize", pageSize);

        return timelineDao.selectList(params);
    }
    
    
    // 강사님이 알려주신 서버에서 요청하는 방법
    /*
    @Override
    public List<Timeline> listWithComment(int pageNo, int pageSize) {
        List<Timeline> timelines = this.list(pageNo, pageSize);
        ArrayList<Integer> cardNos = new ArrayList<>();
        for (Timeline tl : timelines) {
            cardNos.add(tl.getNo());
        }
        ArrayList<Comment> comments = commentDao.list(cardNos);
        
        for (Timeline tl : timelines) {
            tl.setComment(extractComment(comments, tl.getNo()));
        }
        
        return timelines;
    }
    
    private ArrayList<Comment> extractComment(List<Comment> comments, int cardNo) {
        ArrayList<Comment> cardComment = new ArrayList<>();
        for (Comment c : comments) {
            if (c.getTimelineNo() == cardNo)
                cardComment.add(c);
        }
        return cardComment;
    }
    */

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

    @Override
    public int timelineLikeCount(int no) {
        return timelineDao.timelineLikeCount(no);
    }

    @Override
    public void timelineLike(int pno, int pono, int uno) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("pno", pno);
        params.put("pono", pono);
        params.put("uno", uno);
        timelineDao.timelineLike(params);
    }

    @Override
    public void timelineLikeCancle(int pno, int pono, int uno) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("pno", pno);
        params.put("pono", pono);
        params.put("uno", uno);
        timelineDao.timelineLikeCancle(params);
    }
    @Override
    public boolean isChecked(int pno, int pono, int uno) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("pno", pno);
        params.put("pono", pono);
        params.put("uno", uno);
        return timelineDao.timelineLikeCheck(params) > 0 ? true : false;
    }
}