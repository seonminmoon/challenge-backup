// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.CommentDao;
import challenge.dao.PostDao;
import challenge.domain.Comment;
import challenge.service.CommentService;


@Service
public class CommentServiceImpl implements CommentService {
    
    PostDao postDao;
    CommentDao commentDao;

    
    public CommentServiceImpl(PostDao postDao, CommentDao commentDao) {
        this.postDao = postDao;
        this.commentDao = commentDao;
    }
    
    
    
    @Override
    public List<Comment> list() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        List<Comment> list = commentDao.selectList();
        
        return commentDao.selectList();
    }
    
    @Override
    public int delete(int no) {
        return commentDao.delete(no);
    }

    @Override
    public Comment get(int no) {
        Comment comment = commentDao.selectOne(no);
        return comment;
    }
    
    @Override
    public int add(Comment comment) {
        postDao.insert(comment);
        return commentDao.insert(comment);
    }
    
    public int update(Comment comment) {
        return commentDao.update(comment);
    }
    
    @Override
    public List<Comment> listWithNo(int no) {
        return commentDao.listWithNo(no);
    }

}