package challenge.web.json;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import challenge.service.ProgramMemberService;

@RestController
@RequestMapping("/programMember")
public class ProgramMemberController {

    ProgramMemberService programMemberService;

    public ProgramMemberController(ProgramMemberService programMemberService) {
        this.programMemberService = programMemberService;
    }
        
    @RequestMapping("list")
    public Object list(
            ) {
        return programMemberService.list();
    }
    
    @RequestMapping("{no}")
    public Object view(@PathVariable int no) throws Exception {
        return programMemberService.get(no);
    }
    
}

//ver 55 - JSON 데이터를 출력하는 페이지 컨트롤러 생성






