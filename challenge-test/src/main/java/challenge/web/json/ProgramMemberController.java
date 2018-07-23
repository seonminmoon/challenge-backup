package challenge.web.json;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.ProgramMember;
import challenge.service.ProgramMemberService;

@RestController
@RequestMapping("/programMember")
public class ProgramMemberController {

    ProgramMemberService programMemberService;

    public ProgramMemberController(ProgramMemberService programMemberService) {
        this.programMemberService = programMemberService;
    }
        
    @RequestMapping("list")
    public Object list() {
        return programMemberService.list();
    }
    
    @RequestMapping("list/{no}")
    public Object list(@PathVariable int no) {
        return programMemberService.list(no);
    }
    
    @RequestMapping("{no}/{userNo}")
    public List<ProgramMember> view(
            @PathVariable int no,
            @PathVariable int userNo) throws Exception {
        return programMemberService.get(no, userNo);
    }
    
}

//ver 55 - JSON 데이터를 출력하는 페이지 컨트롤러 생성






