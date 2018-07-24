package challenge.dao;

import java.util.List;

import challenge.domain.Post;
import challenge.domain.User;

public interface MembDao {

        int delete(int no);
        List<Post> selectList();
        int insert(User user);
        int update(Memb memb);
        Post selectOne(int no);
        

}
