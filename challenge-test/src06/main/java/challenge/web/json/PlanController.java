package challenge.web.json;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.Plan;
import challenge.service.PlanService;

@RestController
@RequestMapping("/plan")
public class PlanController {

    PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }
        
    @RequestMapping("list")
    public Object list (){
        return planService.list();
    }
    
    @RequestMapping("list/{pno}")
    public Object planList (@PathVariable int pno){
        return planService.getPlanList(pno);
    }
    
    @RequestMapping("add")
    public String add(Plan plan) throws Exception {
        planService.add(plan);
        return "등록성공!";

    }
//    @RequestMapping("{no}")
//    public Object view(@PathVariable int no) throws Exception {
//        return planService.get(no);
//    }
//    
//    
//    @RequestMapping("update")
//    public String update(Plan plan) throws Exception {
//        planService.update(plan);
//        return "redirect:list";
//    }
    
}

//ver 55 - JSON 데이터를 출력하는 페이지 컨트롤러 생성






