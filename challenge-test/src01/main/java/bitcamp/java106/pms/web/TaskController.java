package bitcamp.java106.pms.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import bitcamp.java106.pms.domain.Member;
import bitcamp.java106.pms.domain.Task;
import bitcamp.java106.pms.domain.Team;
import bitcamp.java106.pms.service.TaskService;
import bitcamp.java106.pms.service.TeamService;

@Controller
@RequestMapping("/team/{teamName}/task")
public class TaskController {

    TeamService teamService;
    TaskService taskService;

    public TaskController(TeamService teamService, TaskService taskService) {
        this.teamService = teamService;
        this.taskService = taskService;
    }

    @RequestMapping("form")
    public String form(
            @PathVariable("teamName") String teamName,
            Map<String,Object> map) throws Exception {   
        
        
        if (teamService.get(teamName) == null) {
            throw new Exception(teamName + " 팀은 존재하지 않습니다.");
        }
        
        map.put("members", teamService.getMembersWithEmail(teamName));
        map.put("teamName", teamName);
        return "task/form";
    }
    

    @RequestMapping("add")
    public String add(
            Task task,
            @PathVariable String teamName,
            @RequestParam("memberId") String memberId) throws Exception {   

        task.setTeam(new Team().setName(teamName));
        task.setWorker(new Member().setId(memberId));

        if (teamService.get(teamName) == null) {
            throw new Exception(task.getTeam().getName() + " 팀은 존재하지 않습니다.");
        }

        taskService.add(task);
        return "redirect:list";
        // 응답 헤더의 값으로 한글을 포함할 때는 
        // 서블릿 컨테이너가 자동으로 URL 인코딩 하지 않는다.
        // 위와 같이 개발자가 직접 URL 인코딩 해야 한다.

    }


    @RequestMapping("delete")
    public String delete(
            @PathVariable String teamName,
            @RequestParam("no") int no) throws Exception {    

        if (taskService.delete(no) == 0) {
            throw new Exception("해당 작업이 존재하지 않습니다.");
        }
        return "redirect:list";

    }

    @RequestMapping("list{page}")
    public String list(
            @MatrixVariable(defaultValue="1") int pageNo,
            @MatrixVariable(defaultValue="3") int pageSize,
            @PathVariable("teamName") String teamName,
            Map<String,Object> map) throws Exception {   

        if (teamService.get(teamName) == null) {
            throw new Exception(teamName + " 팀은 존재하지 않습니다.");
        }
        
        map.put("list", taskService.list(pageNo, pageSize, teamName));
        map.put("teamName", teamName);
        return "task/list";
    }

    @RequestMapping("update")
    public String update(Task task,
            @PathVariable String teamName,
            @RequestParam("memberId") String memberId) throws Exception {  

        task.setTeam(new Team().setName(teamName));
        task.setWorker(new Member().setId(memberId));

        if (taskService.update(task) == 0) {
            throw new Exception("<p>해당 작업이 없습니다.</p>");
        }
        return "redirect:list";
    }

    @RequestMapping("{no}")
    public String view(
            @PathVariable String teamName,
            @PathVariable int no,
            Map<String,Object> map) throws Exception {   

        Task task = taskService.get(no);
        if (task == null) {
            throw new Exception("해당 작업을 찾을 수 없습니다.");
        }


        map.put("task", task);
        map.put("members", teamService.getMembersWithEmail(task.getTeam().getName()));
        map.put("teamName", teamName);
        return "task/view";
    }
    
    
}

//ver 42 - JSP 적용
//ver 40 - CharacterEncodingFilter 필터 적용.
//         request.setCharacterEncoding("UTF-8") 제거
//ver 39 - forward 적용
//ver 38 - redirect 적용
//ver 37 - 컨트롤러를 서블릿으로 변경
//ver 31 - JDBC API가 적용된 DAO 사용
//ver 28 - 네트워크 버전으로 변경
//ver 26 - TaskController에서 add() 메서드를 추출하여 클래스로 정의.
//ver 23 - @Component 애노테이션을 붙인다.
//ver 22 - TaskDao 변경 사항에 맞춰 이 클래스를 변경한다.
//ver 18 - ArrayList가 적용된 TaskDao를 사용한다.
//ver 17 - 클래스 생성
