package challenge.dao;

import java.util.List;

import challenge.domain.Community;

public interface CommunityDao {
    int delete(int no);
    List<Community> selectList();
    List<Community> selectListNotice();
    int insert(Community community);
    int update(Community community);
    Community selectOne(int no);
}
