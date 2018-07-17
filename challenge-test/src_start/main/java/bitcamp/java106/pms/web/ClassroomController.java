package bitcamp.java106.pms.web;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import bitcamp.java106.pms.domain.Classroom;
import bitcamp.java106.pms.service.ClassroomService;

@Controller
@RequestMapping("/classroom")
public class ClassroomController {

    ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;

    }

    @RequestMapping("form")
    public void form() {

    }


    @RequestMapping("add")
    public String add(Classroom classroom) throws Exception {

        classroomService.add(classroom);
        return "redirect:list";
    }

    @RequestMapping("delete")
    public String delete(@RequestParam("no") int no) throws Exception {

        int count = classroomService.delete(no);
        if (count == 0) {
            throw new Exception("<p>해당 강의가 없습니다.</p>");
        }
        return "redirect:list";
    }

    @RequestMapping("list{page}")
    public void list(
            @MatrixVariable(defaultValue="1") int pageNo,
            @MatrixVariable(defaultValue="3") int pageSize,
            Map<String,Object> map) throws Exception {

        List<Classroom> list = classroomService.list(pageNo, pageSize);
        map.put("list", list);
    }



    @RequestMapping("update")
    public String update(Classroom classroom) throws Exception {

        int count = classroomService.update(classroom);
        if (count == 0) {
            throw new Exception("해당 강의가 존재하지 않습니다.");
        }
        return "redirect:list";

    }

    @RequestMapping("{no}")
    public String view(
            @PathVariable int no, 
            Map<String,Object> map) throws Exception {

        Classroom classroom = classroomService.get(no);
        if (classroom == null) {
            throw new Exception("유효하지 않은 강의입니다.");
        }
        map.put("classroom", classroom);
        return "classroom/view";
    }

}

//ver 42 - JSP 적용
//ver 40 - 필터 적용
//ver 39 - forward 적용
//ver 38 - redirect 적용
//ver 37 - 컨트롤러를 서블릿으로 변경
//ver 31 - JDBC API가 적용된 DAO 사용
//ver 28 - 네트워크 버전으로 변경
//ver 26 - ClassroomController에서 add() 메서드를 추출하여 클래스로 정의.
