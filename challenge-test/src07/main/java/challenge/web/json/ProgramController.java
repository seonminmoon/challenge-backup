package challenge.web.json;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.Program;
import challenge.service.ProgramService;

@RestController
@RequestMapping("/program")
public class ProgramController {

    ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @RequestMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public void add(Program program) throws Exception {
        programService.add(program);
    }

    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("no") int no) throws Exception {
        programService.delete(no);
    }

    @RequestMapping("list{page}")
    public Object list(
            @PathVariable String page,
            @MatrixVariable(defaultValue="1") int pageNo,
            @MatrixVariable(defaultValue="3") int pageSize) {
        return programService.list(pageNo, pageSize);
    }

    @RequestMapping("listCard")
    public Object list(
            ) {
        return programService.listCard();
    }
    
    @RequestMapping("listProgram/{trainerNo}")
    public Object list(@PathVariable int trainerNo) {
        return programService.listProgram(trainerNo);
    }
    
    @RequestMapping("mainList")
    public Object mainList(
            ) {
        System.out.println("mainList 실행");
        return programService.mainList();
    }

    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(Program program) throws Exception {
        programService.update(program);
    }

    @RequestMapping("{no}")
    public Program view(@PathVariable int no) throws Exception {
        return programService.getWithMedia(no);
    }

}
