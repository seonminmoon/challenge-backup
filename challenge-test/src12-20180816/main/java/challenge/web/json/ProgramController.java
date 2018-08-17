package challenge.web.json;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import challenge.domain.Program;
import challenge.service.ProgramService;

@RestController
@RequestMapping("/program")
@SessionAttributes("loginUser")
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

    @RequestMapping("listCard/{cno}/{pageNo}/{pageSize}")
    public Object list(
            @PathVariable int cno,
            @PathVariable int pageNo,
            @PathVariable int pageSize) {
        return programService.listCard(cno, pageNo, pageSize);
    }
    
    @RequestMapping("listCard/{cno}")
    public Object listCh(@PathVariable int cno) {
        return programService.selectListChallenge(cno);
    }
    
    @RequestMapping("listCardWithKeyword/{keyword}")
    public Object list(@PathVariable String keyword) {
        return programService.listCardWithKeyword(keyword);
    }
    
    
    @RequestMapping("listCardWithProgoal/{progoal}")
    public Object listCardWithProgoal(@PathVariable String progoal) {
        return programService.listCardWithProgoal(progoal);
    }
    
    @RequestMapping("countCardsWithProgramGoal")
    public Object list(@RequestParam(value="programGoals[]") String[] programGoals) {
        return programService.countCardsWithProgramGoal(programGoals);
    }
    
    @RequestMapping("listProgram/{trainerNo}")
    public Object list(@PathVariable int trainerNo) {
        return programService.listProgram(trainerNo);
    }
    
    @RequestMapping("listTurnProgram/{trainerNo}/{name}")
    public Object listTurn(@PathVariable int trainerNo, 
            @PathVariable String name) {
        return programService.listTurnProgram(trainerNo, name);
    }
    
    @RequestMapping("typeList")
    public Object typeList(@RequestParam(value="pType[]") String[] pType) {
        return programService.listWithProgramType(pType);
    }
    
    @RequestMapping("priceList")
    public Object priceList() {
        return programService.listWithPrice();
    }
    
    @RequestMapping("dateList")
    public Object dateList() {
        return programService.listWithStartDate();
    }
    
    @RequestMapping("mainList") 
    public Object mainList(
            ) {
        return programService.mainList();
    }
    
    @RequestMapping("/pList/{pageNo}/{pageSize}")  // 프로그램 가격 검색 
    public Object priceList(
                            @RequestParam("minPrice") int min,
                            @RequestParam("maxPrice") int max,
                            @PathVariable int pageNo,
                            @PathVariable int pageSize
                            ) {
        return programService.priceList(min,max,pageNo,pageSize);
    }
    @RequestMapping("pList")  // 프로그램 가격 검색 
    public Object priceList(
                            @RequestParam("minPrice") int min,
                            @RequestParam("maxPrice") int max
                            ) {
        return programService.pList(min,max);
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
    
    @RequestMapping("listPage/{pageNo}/{pageSize}")
    public Object listPage(
            @PathVariable int pageNo,
            @PathVariable int pageSize) {
        return programService.pagingListCard(pageNo, pageSize);
    }
    
    @RequestMapping("pagingListCard/{pageNo}/{pageSize}")
    public Object pagingListCard(
            @PathVariable int pageNo,
            @PathVariable int pageSize) {
        return programService.pagingListCard(pageNo, pageSize);
    }
    
    @RequestMapping("pagingListProgoal/{programGoal}/{pageNo}/{pageSize}")
    public Object pagingListProgoal(
            @PathVariable String programGoal,
            @PathVariable int pageNo,
            @PathVariable int pageSize) {
        return programService.pagingListProgoal(programGoal, pageNo, pageSize);
    }
    
    @RequestMapping("pagingListKeyword/{keyword}/{pageNo}/{pageSize}")
    public Object pagingListKeyword(
            @PathVariable String keyword,
            @PathVariable int pageNo,
            @PathVariable int pageSize) {
        return programService.pagingListKeyword(keyword, pageNo, pageSize);
    }
    

}
