package challenge.web.json;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.Challenge;
import challenge.service.ChallengeService;

@RestController
@RequestMapping("/challenge")
public class ChallengeController {

    ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }
    
   @RequestMapping("add")
   @ResponseStatus(HttpStatus.CREATED)
    public void add(Challenge challenge) throws Exception {
            challengeService.add(challenge);
    }
    
    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("no") int no) throws Exception {
       challengeService.delete(no);
    }
    @RequestMapping("mainList")
    public Object mainList() {
        return challengeService.list();
    }
    @RequestMapping("list")
    public Object list() {
        return challengeService.list();
    }
    
    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(Challenge challenge) throws Exception {
        challengeService.update(challenge);
    }
    
    @RequestMapping("{no}")
    public Challenge view(@PathVariable int no) throws Exception {
        return challengeService.get(no);
    }
    
}
