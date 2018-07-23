package challenge.web.json;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.Member;
import challenge.service.MemberService;

@RestController
@RequestMapping("/member")
public class MemberController {

    MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
    
   @RequestMapping("add")
   @ResponseStatus(HttpStatus.CREATED)
    public void add(Member member) throws Exception {
            memberService.add(member);
    }
    
    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("memberNo") int memberNo) throws Exception {
       memberService.delete(memberNo);
    }
    
    @RequestMapping("list")
    public Object list(
            ) {
        return memberService.list();
    }
    
    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(Member member) throws Exception {
        memberService.update(member);
    }
    
    @RequestMapping("{memberNo}")
    public Member view(@PathVariable int memberNo) throws Exception {
        return memberService.get(memberNo);
    }
    
}
