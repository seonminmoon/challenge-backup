package challenge.service;

import java.util.List;

import challenge.domain.Diary;

public interface DiaryService {
 // 서비스 컴포넌트에서 메서드명을 지을 때는 
    // 업무 용어를 사용하라!
    List<Diary> list();
    Diary get(int no);
    int add(Diary diary);
    int update(Diary diary);
    int delete(int no);
}

