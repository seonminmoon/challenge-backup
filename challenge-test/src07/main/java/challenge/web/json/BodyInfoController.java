package challenge.web.json;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.BodyInfo;
import challenge.service.BodyInfoService;

@RestController
@RequestMapping("/bodyInfo")
public class BodyInfoController {

    BodyInfoService bodyInfoService;

    public BodyInfoController(BodyInfoService bodyInfoService) {
        this.bodyInfoService = bodyInfoService;
    }
    
   @RequestMapping("add")
   @ResponseStatus(HttpStatus.CREATED)
    public void add(BodyInfo bodyInfo) throws Exception {
           bodyInfoService.add(bodyInfo);
    }
    
    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("no") int no) throws Exception {
            bodyInfoService.delete(no);
    }
    
    @RequestMapping("list")
    public Object list(
            ) {
        
        return bodyInfoService.list();
    }
    
    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(BodyInfo bodyInfo) throws Exception {
        bodyInfoService.update(bodyInfo);
    }
    
    @RequestMapping("{no}")
    public BodyInfo view(@PathVariable int no) throws Exception {
        return bodyInfoService.get(no);
    }
    
}
