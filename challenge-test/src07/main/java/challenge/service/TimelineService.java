// 서비스 컴포넌트 - 게시물 관련 업무를 처리할 객체
package challenge.service;

import java.util.List;
import java.util.Map;

import challenge.domain.Timeline;

public interface TimelineService {
    // 서비스 컴포넌트에서 메서드명을 지을 때는 
    // 업무 용어를 사용하라!
    List<Timeline> list(int pageNo, int pageSize);
    Timeline get(int no);
    int add(Timeline timeline);
    int update(Timeline timeline);
    int delete(int no);
    int timelineLikeCount(int no);
    boolean isChecked(int pno, int pono, int uno);
    void timelineLikeCancle(int pno, int pono, int uno);
    void timelineLike(int pno, int pono, int uno);
}