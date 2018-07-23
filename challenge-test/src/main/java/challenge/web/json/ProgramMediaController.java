package challenge.web.json;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.ProgramMedia;
import challenge.service.ProgramMediaService;

@RestController
@RequestMapping("/programMedia")
public class ProgramMediaController {

    ProgramMediaService programMediaService;

    public ProgramMediaController(ProgramMediaService programMediaService) {
        this.programMediaService = programMediaService;
    }
    
   @RequestMapping("add")
   @ResponseStatus(HttpStatus.CREATED)
    public void add(ProgramMedia programMedia) throws Exception {
            programMediaService.add(programMedia);
    }
    
    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("no") int no) throws Exception {
       programMediaService.delete(no);
    }
    
    @RequestMapping("list")
    public Object list(
            ) {
        return programMediaService.list();
    }
    
    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(ProgramMedia programMedia) throws Exception {
        programMediaService.update(programMedia);
    }
    
    @RequestMapping("{no}")
    public ProgramMedia view(@PathVariable int no) throws Exception {
        return programMediaService.get(no);
    }
    
}
