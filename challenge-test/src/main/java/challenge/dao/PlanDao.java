package challenge.dao;

import java.util.List;

import challenge.domain.Plan;

// 운동계획서
public interface PlanDao {
    List<Plan> selectList(int trnno); // 전체 리스트
    List<Object> selectPlanList(int pno); // 운동일지 보기
    int insert(Plan plan); // 운동일지 등록
    List<Object> selectOne(int plno); // 해당 회차 일지 선택해서 보기
    int update(Plan plan); // 운동일지 수정selectPlanList
}



