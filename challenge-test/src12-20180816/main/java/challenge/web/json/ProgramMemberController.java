package challenge.web.json;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import challenge.domain.Member;
import challenge.domain.ProgramMember;
import challenge.domain.User;
import challenge.service.ProgramMemberService;

@RestController
@RequestMapping("/programMember")
@SessionAttributes("loginUser")
public class ProgramMemberController {

    ProgramMemberService programMemberService;

    public ProgramMemberController(ProgramMemberService programMemberService) {
        this.programMemberService = programMemberService;
    }
    @RequestMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public Object add(@ModelAttribute("loginUser") User loginUser,
            ProgramMember programMember) throws Exception {
        programMember.setUserNo(loginUser.getUserNo());
        programMemberService.add(programMember);
        return programMember;
    }
    
    @RequestMapping("pList/{trnNo}")
    public List<ProgramMember> listWithPname(@PathVariable int trnNo) throws Exception {
        return programMemberService.listWithPname(trnNo);
    }
    
    @RequestMapping("sList/{pno}/{trnNo}/{uname}")
    public List<ProgramMember> listWithSearch(
            @PathVariable int pno,
            @PathVariable int trnNo,
            @PathVariable String uname) throws Exception {
        return programMemberService.listWithSearch(pno, trnNo, uname);
    }
    
    @RequestMapping("sList/{trnNo}/{uname}")
    public List<ProgramMember> listWithSearchAll(
            @PathVariable int trnNo,
            @PathVariable String uname) throws Exception {
        return programMemberService.listWithSearchAll(trnNo, uname);
    }

    @RequestMapping("lList/{uno}")
    public List<ProgramMember> listWithLect(@PathVariable int uno) throws Exception {
        return programMemberService.listWithLect(uno);
    }
    
    @RequestMapping("list/{trnNo}")
    public List<ProgramMember> list(@PathVariable int trnNo) throws Exception {
        return programMemberService.list(trnNo);
    }

    @RequestMapping("list/{pno}/{trnNo}")
    public List<ProgramMember> list(@PathVariable int pno,
            @PathVariable int trnNo) throws Exception {
        return programMemberService.list(pno, trnNo);
    }

    @RequestMapping("{pno}/{userNo}")
    public List<ProgramMember> view(
            @PathVariable int pno,
            @PathVariable int userNo) throws Exception {
        return programMemberService.get(pno, userNo);
    }

    @RequestMapping("{userNo}")
    public Member listWithUserNo(
            @PathVariable int userNo) throws Exception {
        return programMemberService.getWithUserNo(userNo);
    }
    
    @RequestMapping("updateReview")
    @ResponseStatus(HttpStatus.OK) // 기본 값이 OK이다.
    public void updateReview(ProgramMember programMember) throws Exception {
        programMemberService.updateReview(programMember);
    }
    
    @RequestMapping("deleteReview")
    @ResponseStatus(HttpStatus.OK) // 기본 값이 OK이다.
    public void deleteReview(ProgramMember programMember) throws Exception {
        programMemberService.deleteReview(programMember);
    }
    
    
    @RequestMapping("reviewList/{pno}")
    @ResponseStatus(HttpStatus.OK) // 기본 값이 OK이다.
    public List<ProgramMember> reviewList(@PathVariable int pno) throws Exception {
        return programMemberService.reviewList(pno);
    }
    
    @RequestMapping("reviewCount/{pno}")
    public int reviewCount(@PathVariable int pno) throws Exception {
        return programMemberService.reviewCount(pno);
    }
    
    @RequestMapping("reviewScore/{pno}")
    public int reviewScore(@PathVariable int pno) throws Exception {
        return programMemberService.reviewScore(pno);
    }
    
    @RequestMapping("pmemberCount/{pno}")
    public int pmemberCount(@PathVariable int pno) throws Exception {
        return programMemberService.pmemberCount(pno);
    }
    
    @RequestMapping("trainerReviewCount/{uno}")
    public int trainerReviewCount(@PathVariable int uno) throws Exception {
        return programMemberService.trainerReviewCount(uno);
    }
    @RequestMapping("trainerReviewScore/{uno}")
    public int trainerReviewScore(@PathVariable int uno) throws Exception {
        return programMemberService.trainerReviewScore(uno);
    }
    
    @RequestMapping("trainerReviewList/{uno}")
    @ResponseStatus(HttpStatus.OK) // 기본 값이 OK이다.
    public List<ProgramMember> trainerReviewList(@PathVariable int uno) throws Exception {
        return programMemberService.trainerReviewList(uno);
    }
    
}

//ver 55 - JSON 데이터를 출력하는 페이지 컨트롤러 생성






