package challenge.dao;

import java.util.List;

import challenge.domain.ProgramMember;

// 트레이너 - 회원관리
public interface ProgramMemberDao {
    List<ProgramMember> selectList(); // 전체 리스트
    ProgramMember selectOne(String email); // 한명만 선택해서 보기
}
