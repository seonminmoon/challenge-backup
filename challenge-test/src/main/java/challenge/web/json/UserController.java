package challenge.web.json;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.User;
import challenge.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
   @RequestMapping("add")
   @ResponseStatus(HttpStatus.CREATED)
    public void add(User user) throws Exception {
            userService.add(user);
    }
    
    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("userNo") int userNo) throws Exception {
       userService.delete(userNo);
    }
    
    @RequestMapping("list")
    public Object list(
            ) {
        return userService.list();
    }
    
    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(User user) throws Exception {
        userService.update(user);
    }
    @RequestMapping("update2")
    @ResponseStatus(HttpStatus.OK)
    public void update2(User user) throws Exception {
        userService.update2(user);
    }
    @RequestMapping("update3")
    @ResponseStatus(HttpStatus.OK)
    public void update3(User user) throws Exception {
        userService.update3(user);
    }
    @RequestMapping("updateNotimg")
    @ResponseStatus(HttpStatus.OK)
    public void updateNotimg(User user) throws Exception {
        userService.updateNotimg(user);
    }
    
    
    @RequestMapping("{userNo}")
    public User view(@PathVariable int userNo) throws Exception {
        return userService.get(userNo);
    }
    
}
