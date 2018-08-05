package challenge.dao;

import java.util.List;

import challenge.domain.Diary;

public interface DiaryDao {
    List<Diary> selectList(int pno, int uno); // 운동계획서 리스트
    int insert(Diary diary); // 운동계획서 등록
    List<Object> selectOne(int dno); // 해당 회차 일지 선택해서 보기
    int update(Diary diary); // 운동계획서 수정

}
