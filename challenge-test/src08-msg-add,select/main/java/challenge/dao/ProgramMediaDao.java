package challenge.dao;

import java.util.List;

import challenge.domain.ProgramMedia;

public interface ProgramMediaDao {
    int delete(int no);
    List<ProgramMedia> selectList(int no);
    int insert(ProgramMedia programMedia);
    int update(ProgramMedia programMedia);
    ProgramMedia selectOne(int no);
}
