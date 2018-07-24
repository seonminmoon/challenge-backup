package challenge.web.json;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.Comment;
import challenge.service.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController {

    CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }
    
    @RequestMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public void add(Comment comment) throws Exception {
        commentService.add(comment);
    }
    
    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("no") int no) throws Exception {
       commentService.delete(no);
    }
    
    @RequestMapping("list")
    public Object list() {
        return commentService.list();
    }
    
    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(Comment comment) throws Exception {
        commentService.update(comment);
    }
    
    @RequestMapping("{no}")
    public Comment view(@PathVariable int no) throws Exception {
        return commentService.get(no);
    }
    
    @RequestMapping("listWithNo/{no}")
    public Object listWithNo(@PathVariable int no) throws Exception {
        return commentService.listWithNo(no);
    }
    
}
