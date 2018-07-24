package challenge.web.json;

import org.springframework.http.HttpStatus;
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
    
    @RequestMapping("list")
    public Object list(
            ) {
        return timelineService.list();
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
    
}
