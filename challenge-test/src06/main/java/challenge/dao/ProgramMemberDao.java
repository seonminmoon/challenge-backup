package challenge.dao;

import java.util.List;

import challenge.domain.ProgramMember;

// 트레이너 - 회원관리
public interface ProgramMemberDao {
    List<ProgramMember> selectList(); // 전체 리스트
    List<ProgramMember> selectListWithProgram(int no); // 프로그램에 속한 회원 목록 뽑기
    List<ProgramMember> selectOne(int no, int userNo); // 한명만 선택해서 보기
    List<ProgramMember> selectListWithUno(int userNo); // 유저가 듣는 프로그램 모든 정보 받아오기
}



