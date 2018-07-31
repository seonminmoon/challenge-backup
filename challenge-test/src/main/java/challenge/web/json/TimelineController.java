package challenge.web.json;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.Timeline;
import challenge.service.TimelineService;

@RestController
@RequestMapping("/timeline")
public class TimelineController {

    TimelineService timelineService;

    public TimelineController(TimelineService timelineService) {
        this.timelineService = timelineService;
    }

    @RequestMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public void add(Timeline timeline) throws Exception {
        timelineService.add(timeline);
    }

    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("no") int no) throws Exception {
        timelineService.delete(no);
    }

    @RequestMapping("list/{pageNo}/{pageSize}")
    public Object list(
            @PathVariable int pageNo,
            @PathVariable int pageSize) {
        
        return timelineService.list(pageNo, pageSize);
    }


    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(Timeline timeline) throws Exception {
        timelineService.update(timeline);
    }

    @RequestMapping("{no}")
    public Timeline view(@PathVariable int no) throws Exception {
        return timelineService.get(no);
    }

    @RequestMapping("timelineLikeCount/{no}")
    public int timelineLike(@PathVariable int no) throws Exception {
        return timelineService.timelineLikeCount(no);
    }

    @RequestMapping("isChecked")
    public boolean isChecked(
            @RequestParam("pno") int pno,
            @RequestParam("pono") int pono,
            @RequestParam("uno") int uno) throws Exception {
        if (timelineService.isChecked(pno, pono, uno)) { // 이미 체크되어있다면
            return true;
        } else {
            return false;
        }
    }


    @RequestMapping("timelineLike")
    public int timelineLike(
            @RequestParam("pno") int pno,
            @RequestParam("pono") int pono,
            @RequestParam("uno") int uno) throws Exception {

        if (timelineService.isChecked(pno, pono, uno)) { // 이미 체크되어있다면
            // 좋아요 취소
            timelineService.timelineLikeCancle(pno, pono, uno);
            return 0;
        } else {
            // 좋아요 ㄱㄱ
            timelineService.timelineLike(pno, pono, uno);
            return 1;
        }
    }

}
