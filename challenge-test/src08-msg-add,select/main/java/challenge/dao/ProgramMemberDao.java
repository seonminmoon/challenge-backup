package challenge.dao;

import java.util.List;

import challenge.domain.Member;
import challenge.domain.ProgramMember;

// 트레이너 - 회원관리
public interface ProgramMemberDao {
    List<ProgramMember> pNameList(int trnNo); // 프로그램 이름 리스트
    List<ProgramMember> lectList(int uno); // 회원이 수강중인 프로그램 이름 리스트
    List<ProgramMember> selectList(int trnNo); // 전체 리스트
    List<ProgramMember> selectListWithProgram(int pno, int trnNo); // 프로그램에 속한 회원 목록 뽑기
    List<ProgramMember> selectOne(int pno, int userNo); // 한명만 선택해서 보기
    Member selectListWithUno(int userNo); // 유저가 듣는 프로그램 모든 정보 받아오기
    int insert(ProgramMember programMember);
    int updateReview(ProgramMember programMember);
    List<ProgramMember> reviewList(int pno);
    int reviewCount(int no);
    int reviewScore(int no);
}



