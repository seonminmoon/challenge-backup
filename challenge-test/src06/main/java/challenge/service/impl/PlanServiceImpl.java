package challenge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.PlanDao;
import challenge.domain.Plan;
import challenge.service.PlanService;

@Service
public class PlanServiceImpl implements PlanService {
    
    PlanDao planDao;
    
    public PlanServiceImpl(PlanDao planDao) {
        this.planDao = planDao;
    }
    
    @Override
    public List<Plan> list() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return planDao.selectList();
    }

    @Override
    public int add(Plan plan) {
        return planDao.insert(plan);
    }
    @Override
    public List<Object> getPlanList(int pno) {
        return planDao.selectPlanList(pno);
    }
//    @Override
//    public List<Object> get(int no) {
//        return planDao.selectOne(no);
//    }
//    
//    
//    @Override
//    public int update(Plan plan) {
//        return planDao.update(plan);
//    }
}
