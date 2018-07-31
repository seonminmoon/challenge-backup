package challenge.dao;

import java.util.List;

import challenge.domain.Program;

public interface ProgramDao {

    public int delete(int no);
    public List<Program> selectList();
    public List<Program> selectListCard();
    public List<Program> selectTrainerProgram(int no);
    public int insert(Program program);
    public int update(Program program);
    public Program selectOne(int no);
    public List<Program> mainList();
    public Program selectOneWithMedia(int no);

}
