package challenge.dao;

import java.util.List;

import challenge.domain.Diary;

public interface DiaryDao {
    int delete(int no);
    List<Diary> selectList();
    int insert(Diary diary);
    int update(Diary diary);
    Diary selectOne(int no);

}
