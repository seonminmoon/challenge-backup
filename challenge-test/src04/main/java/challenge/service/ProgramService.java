// 서비스 컴포넌트 - 게시물 관련 업무를 처리할 객체
package challenge.service;

import java.util.List;

import challenge.domain.Program;

public interface ProgramService {
    // 서비스 컴포넌트에서 메서드명을 지을 때는 
    // 업무 용어를 사용하라!
    List<Program> list(int pageNo, int pageSize);
    List<Program> listCard();
    Program get(int no);
    //Program getWithMembers(String name);
    int add(Program program);
    int update(Program program);
    int delete(int no);
    //boolean isMember(String programName, String memberId);
    //int addMember(String programName, String memberId);
    //int deleteMember(String programName, String memberId);
    //List<Member> getMembersWithEmail(String programName);
}
