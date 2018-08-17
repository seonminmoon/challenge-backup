package challenge.web.json;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.Message;
import challenge.service.MessageService;

@RestController
@RequestMapping("/message")
public class MessageController {

    MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }
    
   @RequestMapping("add")
   @ResponseStatus(HttpStatus.CREATED)
    public void add(Message message) throws Exception {
            messageService.add(message);
    }
    
    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam int no
            ) throws Exception {
        
            messageService.delete(no);
    }
    
    @RequestMapping("list1/{userNo}/{utype}")
    public Object sendMsgList(
        @PathVariable int userNo,
        @PathVariable int utype,
        @MatrixVariable(defaultValue="1") int pageNo,
        @MatrixVariable(defaultValue="5") int pageSize) {
        return messageService.sendMsgList(userNo, utype, pageNo, pageSize);
    }
    
    @RequestMapping("list2/{userNo}/{utype}")
    public Object receiveMsgList(
        @PathVariable int userNo,
        @PathVariable int utype,
        @MatrixVariable(defaultValue="1") int pageNo,
        @MatrixVariable(defaultValue="5") int pageSize) {
        return messageService.receiveMsgList(userNo, utype, pageNo, pageSize);
    }
    
    @RequestMapping("{no}")
    public Message view(
            @PathVariable int no) throws Exception {
        return messageService.get(no);
    }
    
}
