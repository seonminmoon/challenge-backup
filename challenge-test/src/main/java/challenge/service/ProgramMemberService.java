package challenge.service;

import java.util.List;

import challenge.domain.ProgramMember;

// 트레이너 - 회원관리
public interface ProgramMemberService {
    List<ProgramMember> listWithPname(int trnNo);
    List<ProgramMember> list(int trnNo); // 전체 프로그램에 참여중인 회원 목록
    List<ProgramMember> list(int pno, int trnNo); // 해당 프로그램에 참여중인 회원 목록
    List<ProgramMember> get(int pno, int userNo); // 한 회원의 정보 상세보기
    List<ProgramMember> getWithUserNo(int userNo);
    int add(ProgramMember programMember);
}
