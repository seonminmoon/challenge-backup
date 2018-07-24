package challenge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.ProgramMemberDao;
import challenge.domain.ProgramMember;
import challenge.service.ProgramMemberService;

@Service
public class ProgramMemberServiceImpl implements ProgramMemberService {
    
    ProgramMemberDao programMemberDao;
    
    public ProgramMemberServiceImpl(ProgramMemberDao programMemberDao) {
        this.programMemberDao = programMemberDao;
    }
    
    @Override
    public List<ProgramMember> list() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return programMemberDao.selectList();
    }

    @Override
    public ProgramMember get(String email) {
        ProgramMember programMember = programMemberDao.selectOne(email);
        return programMember;
    }
}
