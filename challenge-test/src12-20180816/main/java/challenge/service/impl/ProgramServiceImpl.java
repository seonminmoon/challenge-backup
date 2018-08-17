// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public List<Program> priceList(int min, int max,int pageNo, int pageSize) {
        Map<String,Object> params = new HashMap<>();
        params.put("minPrice",min);
        params.put("maxPrice",max);
        params.put("startRowNo", (pageNo - 1) * pageSize);
        params.put("pageSize", pageSize);
        return programDao.selectPrice(params);
    }
    
    @Override
    public List<Program> pList(int min, int max) {
        Map<String,Object> params = new HashMap<>();
        params.put("minPrice",min);
        params.put("maxPrice",max);
        return programDao.pList(params);
    }

    
//    @Override
//    public List<Program> listCard() {
//        return programDao.selectListCard();
//    }
    
    @Override
    public List<Program> selectListChallenge(int cno) {
        return programDao.selectListChallenge(cno);
    }
    
    @Override
    public List<Program> listCardWithKeyword(String keyword) {
        return programDao.selectListWithKeyword(keyword);
    }
    
    @Override
    public List<Program> listProgram(int trainerNo) {
        return programDao.selectTrainerProgram(trainerNo);
    }
    
    @Override
    public List<Program> listTurnProgram(int trainerNo, String name) {
        Map<String,Object> params = new HashMap<>();
        params.put("trainerNo", trainerNo);
        params.put("name", name);
        return programDao.selectTrainerProgramTurn(params);
    }
    
    @Override
    public List<Program> listWithProgramType(String[] pType) {
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("programTypeList", pType);
        return programDao.selectListWithProgramType(param);
    }
    
    
    @Override
    public List<Program> listWithPrice() {
        return programDao.selectListWithPrice();
    }
    
    @Override
    public List<Program> listWithStartDate() {
        return programDao.selectListWithStartDate();
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

    @Override
    public List<Integer> countCardsWithProgramGoal(String[] programGoals) {
        // TODO Auto-generated method stub
        List<String> proGoals = new ArrayList<String>();
        for (int i = 0; i < programGoals.length; i++) {
            proGoals.add(programGoals[i]);
        }
        
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("programGoals_list", proGoals);
        return programDao.countCardsWithProgramGoal(param);
    }

    @Override
    public List<Program> listCardWithProgoal(String progoal) {
        return programDao.listCardWithProgoal(progoal);
    }

    @Override
    public List<Program> pagingListCard(int pageNo, int pageSize) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("startRowNo", (pageNo - 1) * pageSize);
        params.put("pageSize", pageSize);

        return programDao.pagingListCard(params);
    }
    

    @Override
    public List<Program> pagingListProgoal(String programGoal, int pageNo,
            int pageSize) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("programGoal", programGoal);
        params.put("startRowNo", (pageNo - 1) * pageSize);
        params.put("pageSize", pageSize);
        return programDao.pagingListProgoal(params);
    }

    @Override
    public List<Program> pagingListKeyword(String keyword, int pageNo,
            int pageSize) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("keyword", keyword);
        params.put("startRowNo", (pageNo - 1) * pageSize);
        params.put("pageSize", pageSize);
        return programDao.pagingListKeyword(params);
    }

    
    @Override
    public List<Program> getListPage(int pageNo, int pageSize) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("startRowNo", (pageNo - 1) * pageSize);
        params.put("pageSize", pageSize);
        return programDao.selectListPage(params);
    }

    @Override
    public List<Program> listCard(int cno, int pageNo, int pageSize) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("cno", cno);
        params.put("startRowNo", (pageNo - 1) * pageSize);
        params.put("pageSize", pageSize);
        return programDao.selectListCard(params);
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
