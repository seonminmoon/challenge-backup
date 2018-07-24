// 서비스 컴포넌트 - 메시지 관련 업무를 처리할 객체
package challenge.service;

import java.util.List;

import challenge.domain.Message;

public interface MessageService {
    List<Message> list();
    Message get(int no);
    int add(Message post);
    int delete(int no);
}