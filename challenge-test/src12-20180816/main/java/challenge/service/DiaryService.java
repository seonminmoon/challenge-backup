package challenge.service;

import java.util.List;

import challenge.domain.Diary;

public interface DiaryService {
    List<Diary> list(int pno, int uno); // 운동계획서 리스트
    int add(Diary diary); // 운동계획서 등록
    List<Object> get(int dno); // 해당 회차 일지 선택해서 보기
    int update(Diary diary); // 운동계획서 수정
    List<Diary> listWithDcheck(int uno, int pno); // 출석률
}

