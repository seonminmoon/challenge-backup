package challenge.service;

import java.util.List;

import challenge.domain.Plan;

// 운동계획서
public interface PlanService {
    List<Plan> list(int trnno); // 전체 리스트
    List<Object> getPlanList(int pno); // 운동일지 리스트보기
    int add(Plan plan); // 운동일지 등록
    List<Object> get(int plno); // 해당 회차 일지 선택해서 보기
    int update(Plan plan); // 운동일지 수정
    
}
