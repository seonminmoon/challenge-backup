// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.ProgramDao;
import challenge.dao.ProgramMediaDao;
import challenge.domain.Program;
import challenge.service.ProgramService;


@Service
public class ProgramServiceImpl implements ProgramService {

    ProgramDao programDao;
    ProgramMediaDao programMediaDao; 
    
    public ProgramServiceImpl(ProgramDao programDao, ProgramMediaDao programMediaDao) {
        this.programDao = programDao;
        this.programMediaDao = programMediaDao;
    }
    
    @Override
    public List<Program> list(int pageNo, int pageSize) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("startRowNo", (pageNo - 1) * pageSize);
        params.put("pageSize", pageSize);
        return programDao.selectList();
    }
    
    @Override
    public List<Program> listCard() {
        return programDao.selectListCard();
    }
    
    @Override
    public List<Program> listProgram(int trainerNo) {
        return programDao.selectTrainerProgram(trainerNo);
    }
    
    @Override
    public List<Program> mainList() {
        return programDao.mainList();
    }
    
    @Override
    public int delete(int no) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("programNo", no);
        
        //programMemberDao.delete(params);
        //taskDao.deleteByProgram(name);
        
        // 팀 회원과 팀 작업을 삭제한 다음에 예외가 발생한다면
        // 이전에 삭제한 작업은 취소(rollback)되어야 한다.
        // 트랜잭션을 사용하지 않는다면 auto commit이기 때문에 롤백되지 않는다.
        // 테스트를 하려면 다음을 주석 풀고 테스트해봐라
        // int result = 100 / 0;
        
        return programDao.delete(no);
    }

    @Override
    public Program getWithMedia(int no) {
        Program program = programDao.selectOneWithMedia(no);
        return program;
    }
    
    @Override
    public int add(Program program) {
        return programDao.insert(program);
    }
    
    public int update(Program program) {
        return programDao.update(program);
    }

    @Override
    public Program get(int no) {
        return programDao.selectOne(no);
    }

    /*@Override
    public boolean isMember(String programName, String memberId) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("programName", programName);
        params.put("memberId", memberId);
        
        return programMemberDao.isExist(params);
    }
    
    @Override
    public int addMember(String programName, String memberId) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("programName", programName);
        params.put("memberId", memberId);
        
        return programMemberDao.insert(params);
    }*/
    
    /*@Override
    public int deleteMember(String programName, String memberId) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("programName", programName);
        params.put("memberId", memberId);
        
        return programMemberDao.delete(params);
    }
    
    @Override
    public List<Member> getMembersWithEmail(String programName) {
        return programMemberDao.selectListWithEmail(programName);
    }*/
}
