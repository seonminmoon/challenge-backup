package challenge.service;

import java.util.List;

import challenge.domain.Member;

public interface MemberService {
 // 서비스 컴포넌트에서 메서드명을 지을 때는 
    // 업무 용어를 사용하라!
    List<Member> list();
    Member get(int userNo);
    int add(Member member);
    int update(Member member);
    int delete(int userNo);
}

