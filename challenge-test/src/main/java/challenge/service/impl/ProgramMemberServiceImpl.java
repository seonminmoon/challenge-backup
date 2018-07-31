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
    public List<ProgramMember> listWithPname(int trnNo) {
        return programMemberDao.pNameList(trnNo);
    }
    
    @Override
    public List<ProgramMember> list(int trnNo) {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return programMemberDao.selectList(trnNo);
    }
    
    @Override
    public List<ProgramMember> list(int pno, int trnNo) {
        return programMemberDao.selectListWithProgram(pno, trnNo);
    }

    @Override
    public List<ProgramMember> get(int pno, int userNo) {
        return programMemberDao.selectOne(pno, userNo);
    }
    
    @Override
    public List<ProgramMember> getWithUserNo(int userNo) {
        return programMemberDao.selectListWithUno(userNo);
    }

    @Override
    public int add(ProgramMember programMember) {
        programMemberDao.insert(programMember);
        return programMemberDao.insert(programMember);
    }
}
