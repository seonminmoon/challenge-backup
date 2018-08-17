// 로그인 폼 출력과 사용자 인증처리 서블릿
package challenge.web.json;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import challenge.domain.User;
import challenge.service.FacebookService;
import challenge.service.KakaoService;
import challenge.service.UserService;

@RestController
@RequestMapping("/auth")
@SessionAttributes("loginUser")
public class AuthController {

    UserService userService;
    @Autowired KakaoService kakaoService;
    @Autowired FacebookService facebookService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }
  
    
    
    @RequestMapping("/form")
    public String form() {
        System.out.println("form으로 들어옴.");
        return "loginNeed";
    }
    
    
    @GetMapping("/loginUser")
    public User loginUser(HttpSession session) {
        return (User) session.getAttribute("loginUser");
    }

    @RequestMapping("/login")
    public Object login(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value="saveId",required=false) String saveId,
            HttpServletRequest request,
            HttpServletResponse response,
            HttpSession session,
            Model model) throws Exception {

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

        if (userService.isExist(email, password)) { // 로그인 성공!
            System.out.println("존재합니다!");
//            session.setAttribute("loginUser", userService.getWithId(email));
            model.addAttribute("loginUser", userService.getWithId(email));
            // If 로그인한 유저가 유저?회원?트레이너?피멤브? 어떤거냐에 따라 세션에 넣어주기. 유형
            result.put("state", "success");
        } else { // 로그인 실패!
            System.out.println("오류!");
            session.invalidate();
            result.put("state", "fail");
        }
        return result;
    }

    @RequestMapping(value="kakaoLogin")
    public Object kakaoLogin(
            String accessToken, 
            HttpSession session,
            Model model) {

        try {
            @SuppressWarnings("rawtypes")
            Map koResponse = kakaoService.me(accessToken, Map.class);
            System.out.println(koResponse);
            System.out.println((String)(((Map<?,?>)koResponse.get("kakao_account")).get("email")));
            
            if (koResponse.get("error") != null) {
                model.addAttribute("loginUser");
                HashMap<String,Object> result = new HashMap<>();
                result.put("status", "fail"); 
                
                return result;
                
                
            } // 이메일로 회원 정보를 찾는다.
            User user = userService.getEmail((String)(((Map<?,?>)koResponse.get("kakao_account")).get("email")));
            System.out.println(user);
            if (user == null) {
                // 회원 정보가 없으면 카카오톡 정보를 등록한다.
                user = new User();
                user.setName((String)((Map<?,?>)koResponse.get("properties")).get("nickname"));
                user.setSex((char)('M'));
               // user.setEmail((String)("CMsf23df@naver.com"));
                user.setEmail((String)(((Map<?,?>)koResponse.get("kakao_account")).get("email")));
                user.setPassword("1111");
                user.setUserPath((String)(((Map<?,?>)koResponse.get("properties")).get("profile_image")));
                user.setUserPhone("");
                user.setUserType(1);
                userService.add(user);
            }
           // System.out.println(user.getName());
            System.out.println(user);
            model.addAttribute("loginUser", user); 
            
            
           

            HashMap<String,Object> result = new HashMap<>();
            result.put("status", "success");
            return result;
        } catch (Exception e) {
            HashMap<String,Object> result = new HashMap<>();
            result.put("status", "fail");
            result.put("exception", e.getStackTrace());
            return result;
        }
    }

    @RequestMapping(value="facebookLogin")
    public Object facebookLogin(
            String accessToken, 
            HttpSession session,
            Model model) {

        try {
            @SuppressWarnings("rawtypes")
            Map userInfo = facebookService.me(accessToken, Map.class);
            System.out.println(userInfo);
            
            if (userInfo.get("error") != null) {
                model.addAttribute("loginUser");
                HashMap<String,Object> result = new HashMap<>();
                result.put("status", "fail"); 
                
                return result;
            }
           /* int no;
            try {
                no= userService.userNo((String)userInfo.get("id"));
            } catch(Exception e) {
                no = 0;
            }*/
//            User user = userService.get(no);
              User user = userService.getEmail((String)userInfo.get("email"));
              System.out.println((String)userInfo.get("email"));
            if (user == null) { // 등록된 회원이 아니면,
                // 페이스북에서 받은 정보로 회원을 자동 등록한다.
                user = new User();
                user.setName((String)userInfo.get("name"));
                user.setSex((char)('M'));
                //user.setSex((String)userInfo.get("gender"));
                
                user.setEmail((String)userInfo.get("email"));
                user.setPassword("1111");
                user.setUserPath((String)userInfo.get("profile_pic"));
                user.setUserPhone("010-1111-1111");
                user.setUserType(1);
                
                userService.add(user);
            }
            System.out.println(user);
            // 회원 정보를 세션에 저장하여 자동 로그인 처리를 한다.
            model.addAttribute("loginUser", user);


            HashMap<String,Object> result = new HashMap<>();
            result.put("status", "success");
            return result;

        } catch (Exception e) {
            HashMap<String,Object> result = new HashMap<>();
            result.put("status", "fail");
            result.put("exception", e.getStackTrace());
            return result;
        }
    }
    
    
    @RequestMapping(value="naverLogin")
    public Object naverLogin(
            User naccount,
            HttpSession session,
            HttpServletRequest request,
            Model model) {
//        System.out.println(naccount);
        try {
            
            System.out.println(naccount.getEmail());
            User user = userService.getEmail(naccount.getEmail());
            System.out.println(user);
            
            if (user == null) { // 등록된 회원이 아니면,
                
                user = new User();
                user.setName(naccount.getName());
                user.setEmail(naccount.getEmail());
//                user.setName((String)("name"));
                user.setSex((char)('M'));
                user.setSex(naccount.getSex());
            
//                user.setEmail((String)userInfo.get("email"));
                user.setPassword("1111");
                user.setUserPath(naccount.getUserPath());
                user.setUserPhone("");
                user.setUserType(1);
                userService.add(user);
                
            }

            // 회원 정보를 세션에 저장하여 자동 로그인 처리를 한다.
            System.out.println(user);
            model.addAttribute("loginUser", user);

            HashMap<String,Object> result = new HashMap<>();
            result.put("status", "success");
            return result;

        } catch (Exception e) {
            HashMap<String,Object> result = new HashMap<>();
            result.put("status", "fail");
            result.put("exception", e.getStackTrace());
            return result;
        }
    }
    
    @RequestMapping("/logout")
    public Object logout(HttpSession session, SessionStatus status) {

        status.setComplete();
        session.invalidate();

        HashMap<String,Object> result = new HashMap<>();
        result.put("status", "success");
        return result;
    }

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




