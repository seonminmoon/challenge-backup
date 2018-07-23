// 서비스 컴포넌트 - 게시물 관련 업무를 처리할 객체
package challenge.service;

import java.util.List;

import challenge.domain.Comment;

public interface CommentService {
    // 서비스 컴포넌트에서 메서드명을 지을 때는 
    // 업무 용어를 사용하라!
    List<Comment> list();
    Comment get(int no);
    int add(Comment comment);
    int update(Comment comment);
    int delete(int no);
    List<Comment> listWithNo(int no);
}