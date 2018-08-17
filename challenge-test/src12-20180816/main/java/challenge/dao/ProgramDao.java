package challenge.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import challenge.domain.Program;

public interface ProgramDao {

    public int delete(int no);
    public List<Program> selectList();
    public List<Program> selectListCard(HashMap<String, Object> params);
    public List<Program> selectListChallenge(int cno);
    public List<Program> selectListWithPrice();
    public List<Program> selectListWithStartDate();
    public List<Program> selectTrainerProgram(int no);
    public List<Program> selectTrainerProgramTurn(Map<String, Object> param);
    public int insert(Program program);
    public int update(Program program);
    public Program selectOne(int no);
    public List<Program> mainList();
    public Program selectOneWithMedia(int no);
    Program selectRecent();
    public List<Program> selectPrice(Map<String,Object> params);
	public List<Program> selectListWithKeyword(String keyword);
    public List<Integer> countCardsWithProgramGoal(Map<String, Object> param);
    public List<Program> selectListWithProgramType(Map<String, Object> param);
    public List<Program> listCardWithProgoal(String progoal);
    public List<Program> pList(Map<String, Object> params);
    public List<Program> selectListPage(Map<String,Object> params);
    
    public List<Program> pagingListCard(Map<String, Object> params);
    public List<Program> pagingListProgoal(Map<String, Object> params);
    public List<Program> pagingListKeyword(Map<String, Object> params);
}
