// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.PostDao;
import challenge.domain.Post;
import challenge.service.PostService;


@Service
public class PostServiceImpl implements PostService {

    PostDao postDao;
    
    public PostServiceImpl(PostDao postDao) {
        this.postDao = postDao;
    }
    
    @Override
    public List<Post> list() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return postDao.selectList();
    }
    
    @Override
    public int delete(int no) {
        return postDao.delete(no);
    }

    @Override
    public Post get(int no) {
        Post post = postDao.selectOne(no);
        return post;
    }
    
    @Override
    public int add(Post post) {
        return postDao.insert(post);
    }
    
    public int update(Post post) {
        return postDao.update(post);
    }
}