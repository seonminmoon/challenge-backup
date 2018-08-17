package challenge.web.json;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.CommuMedia;
import challenge.service.CommuMediaService;

@RestController
@RequestMapping("/commuMedia")
public class CommuMediaController {

    CommuMediaService commuMediaService;

    public CommuMediaController(CommuMediaService commuMediaService) {
        this.commuMediaService = commuMediaService;
    }
    
   @RequestMapping("add")
   @ResponseStatus(HttpStatus.CREATED)
    public void add(CommuMedia commuMedia) throws Exception {
            commuMediaService.add(commuMedia);
    }
    
    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("no") int no) throws Exception {
       commuMediaService.delete(no);
    }
    
    @RequestMapping("list")
    public Object list(
            ) {
        return commuMediaService.list();
    }
    
    @RequestMapping("ListNo/{commuNo}")
    public List<CommuMedia> list(@PathVariable int commuNo) throws Exception {
        return commuMediaService.ListNo(commuNo);
    }
    
    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(CommuMedia commuMedia) throws Exception {
        commuMediaService.update(commuMedia);
    }
    
    @RequestMapping("{no}")
    public CommuMedia view(@PathVariable int no) throws Exception {
        return commuMediaService.get(no);
    }
    
}
