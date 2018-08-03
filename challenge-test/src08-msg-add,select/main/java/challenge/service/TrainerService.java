package challenge.service;

import java.util.List;

import challenge.domain.Trainer;

public interface TrainerService {
    // 서비스 컴포넌트에서 메서드명을 지을 때는 
    // 업무 용어를 사용하라!
    List<Trainer> list();
    Trainer get(int userNo);
    int add(Trainer trainer);
    int update(Trainer trainer);
    int delete(int userNo);
}
