package challenge.web.json;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.Community;
import challenge.service.CommunityService;

@RestController
@RequestMapping("/community")
public class CommunityController {

    CommunityService communityService;

    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }
    
   @RequestMapping("add")
   @ResponseStatus(HttpStatus.CREATED)
    public void add(Community community) throws Exception {
            communityService.add(community);
    }
    
    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("no") int no) throws Exception {
       communityService.delete(no);
    }
    
    @RequestMapping("list")
    public Object list(
            ) {
        return communityService.list();
    }
    
    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(Community community) throws Exception {
        communityService.update(community);
    }
    
    @RequestMapping("{no}")
    public Community view(@PathVariable int no) throws Exception {
        return communityService.get(no);
    }
    
}
