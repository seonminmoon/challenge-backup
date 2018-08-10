// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.MemberDao;
import challenge.dao.UserDao;
import challenge.domain.Member;
import challenge.service.MemberService;


@Service
public class MemberServiceImpl implements MemberService {

    MemberDao memberDao;
    UserDao userDao;
    
    public MemberServiceImpl(MemberDao memberDao, UserDao userDao) {
        this.memberDao = memberDao;
        this.userDao = userDao;
    }
    
    
    @Override
    public List<Member> list() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return memberDao.selectList();
    }
    
    @Override
    public int delete(int userNo) {
        return memberDao.delete(userNo);
    }

    @Override
    public Member get(int userNo) {
        Member member = memberDao.selectOne(userNo);
        return member;
    }
    
    @Override
    public int add(Member member) {
        userDao.insert(member);
        return memberDao.insert(member);
    }
    
    public int update(Member member) {
        return memberDao.update(member);
    }
}