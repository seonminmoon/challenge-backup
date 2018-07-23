package challenge.service;

import java.util.List;

import challenge.domain.ProgramMember;

// 트레이너 - 회원관리
public interface ProgramMemberService {
    List<ProgramMember> list(); // 전체 프로그램에 참여중인 회원 목록
    List<ProgramMember> list(int no); // 해당 프로그램에 참여중인 회원 목록
    List<ProgramMember> get(int no, int userNo); // 한 회원의 정보 상세보기
}
