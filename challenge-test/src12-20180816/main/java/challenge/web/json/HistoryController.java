// 로그인 폼 출력과 사용자 인증처리 서블릿
//히스토리 출력문
package challenge.web.json;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.Program;
import challenge.service.ProgramService;

@RestController
@RequestMapping("/story")
public class HistoryController {

    ProgramService programService;

    public HistoryController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping("/story")
    public Program story(HttpSession session) {
        System.out.println((Program) session.getAttribute("story"));
        return (Program) session.getAttribute("story");
    }

   /* @RequestMapping("/login")
    public Object login(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value="saveId",required=false) String saveId,
            HttpServletRequest request,
            HttpServletResponse response,
            HttpSession session) throws Exception {

        Cookie cookie = null;
        if (saveId != null) {
            // 입력폼에서 로그인할 때 사용한 ID를 자동으로 출력할 수 있도록 
            // 웹브라우저로 보내 저장시킨다.
            cookie = new Cookie("email", email);
            cookie.setMaxAge(60 * 60 * 24 * 7);
        } else { // "아이디 저장" 체크박스를 체크하지 않았다면 
            cookie = new Cookie("email", "");
            cookie.setMaxAge(0); // 웹브라우저에 "id"라는 이름으로 저장된 쿠키가 있다면 제거한다.
            // 즉 유효기간을 0으로 설정함으로써 "id"라는 이름의 쿠키를 무효화시키는 것이다.
        }
        response.addCookie(cookie);

        HashMap<String, Object> result = new HashMap<>();

        if (programService.isExist(email, password)) { // 로그인 성공!
            session.setAttribute("loginUser", programService.getWithId(email));
            System.out.println();
            // If 로그인한 유저가 유저?회원?트레이너?피멤브? 어떤거냐에 따라 세션에 넣어주기. 유형
            result.put("state", "success");
        } else { // 로그인 실패!
            System.out.println("오류!");
            session.invalidate();
            result.put("state", "fail");
        }
        return result;
    }*/

  /*  @RequestMapping("/logout")
    public void logout(HttpSession session) throws Exception {  
        // 세션을 꺼내 무효화시킨다.
        session.invalidate();
    }
*/
}

//               [웹브라우저]                                  [웹서버] 
// GET 요청: /java106-java-project/auth/login ===>
//                                                       <=== 응답: 로그인폼 
// POST 요청: /java106-java-project/auth/login ===>
//                                                       <=== 응답: redirect URL
// GET 요청: /java106-java-project ===> 
//                                                       <=== 응답: index.html
// 메인화면 출력!

//ver 42 - JSP 적용
//ver 41 - 클래스 추가




