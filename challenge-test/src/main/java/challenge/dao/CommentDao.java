package challenge.dao;

import java.util.List;

import challenge.domain.Comment;

public interface CommentDao {
    int delete(int no);
    List<Comment> selectList();
    int insert(Comment comment);
    int update(Comment comment);
    Comment selectOne(int no);
    List<Comment> listWithNo(int no);
}
