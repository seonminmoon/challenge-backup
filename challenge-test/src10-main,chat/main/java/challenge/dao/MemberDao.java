package challenge.dao;

import java.util.List;

import challenge.domain.Member;

public interface MemberDao {
    int delete(int userNo);
    List<Member> selectList();
    int insert(Member member);
    int update(Member member);
    Member selectOne(int userNo);
}
