package challenge.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import challenge.domain.Post;

public interface PostDao {
    int delete(int no);
    List<Post> selectList();
    int insert(Post post);
    int update(String content, int no);
    Post selectOne(int no);
    void update(HashMap<String, Object> paramsPost);
    int update(Post post);
    
    // 타임라인 카드 삭제시 코멘트 모두 삭제하기 위해.
    int deleteAllComments(Map<String,Object> params);
}
