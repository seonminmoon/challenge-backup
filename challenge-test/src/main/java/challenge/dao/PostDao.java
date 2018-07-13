package challenge.dao;

import java.util.List;

import challenge.domain.Post;

public interface PostDao {
    int delete(int no);
    List<Post> selectList();
    int insert(Post post);
    int update(Post post);
    Post selectOne(int no);
}
