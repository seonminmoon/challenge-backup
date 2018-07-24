package challenge.service;

import java.util.List;

import challenge.domain.ProgramMember;

// 트레이너 - 회원관리
public interface ProgramMemberService {
    List<ProgramMember> list(); // 프로그램에 참여중인 회원 목록
    ProgramMember get(String email); // 한 회원의 정보 상세보기
}
