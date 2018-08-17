package challenge.service;

import java.util.List;

import challenge.domain.Member;
import challenge.domain.ProgramMember;

// 트레이너 - 회원관리
public interface ProgramMemberService {
    List<ProgramMember> listWithPname(int trnNo);
    List<ProgramMember> listWithLect(int uno);
    List<ProgramMember> list(int trnNo); // 전체 프로그램에 참여중인 회원 목록
    List<ProgramMember> listWithSearch(int pno, int trnNo, String uName); 
    List<ProgramMember> listWithSearchAll(int trnNo, String uName);
    List<ProgramMember> list(int pno, int trnNo); // 해당 프로그램에 참여중인 회원 목록
    List<ProgramMember> get(int pno, int userNo); // 한 회원의 정보 상세보기
    Member getWithUserNo(int userNo);
    int add(ProgramMember programMember);
    int updateReview(ProgramMember programMember);
    int deleteReview(ProgramMember programMember);
    List<ProgramMember> reviewList(int pno);
    int reviewCount(int no);
    int reviewScore(int no);
    int pmemberCount(int no);
    int trainerReviewCount(int uno);
    int trainerReviewScore(int uno);
    List<ProgramMember> trainerReviewList(int uno);
}
