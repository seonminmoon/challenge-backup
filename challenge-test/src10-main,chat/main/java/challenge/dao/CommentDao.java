package challenge.dao;

import java.util.List;
import java.util.Map;

import challenge.domain.Comment;

public interface CommentDao {
    int delete(int no);
    List<Comment> selectList();
    int insert(Comment comment);
    int update(Comment comment);
    Comment selectOne(int no);
    List<Comment> listWithNo(int no);

    // 타임라인 카드 삭제시 코멘트 모두 삭제하기 위해.
    int deleteAllWithTMLNo(int no);
}
