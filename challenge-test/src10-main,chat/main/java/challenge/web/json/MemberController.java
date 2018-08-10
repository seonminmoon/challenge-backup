package challenge.web.json;

import java.io.File;
import java.util.HashMap;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import challenge.domain.Member;
import challenge.service.MemberService;
import net.coobird.thumbnailator.Thumbnails;

@RestController
@RequestMapping("/member")
public class MemberController {
    @Autowired ServletContext sc;
    
    MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
    
   @RequestMapping("add")
   @ResponseStatus(HttpStatus.CREATED)
    public void add(
            Member member,
            MultipartFile files) throws Exception {
    
            HashMap<String, Object> jsonData = new HashMap<>();

            String filesDir = sc.getRealPath("/files");  // 진짜 Real Path (사진이 저장되는 폴더명)

            // file에 대해 original File명과 새 파일을 구분하기 위해서
            String filename = UUID.randomUUID().toString();
            
            jsonData.put("filename", filename);
            jsonData.put("filesize", files.getSize());
            jsonData.put("originname", files.getOriginalFilename());
            
            try {
                File path = new File(filesDir + "/" + filename);
                files.transferTo(path); //파일 저장하기
                
                // 썸네일 이미지 생성
                Thumbnails.of(path)
                            .size(125, 125)
                            .outputFormat("jpg")
                            .toFile(path.getCanonicalFile() + "_125x125");
                
                Thumbnails.of(path)
                .size(45, 45)
                .outputFormat("jpg")
                .toFile(path.getCanonicalFile() + "_45x45");
                
                Thumbnails.of(path)
                .size(40, 40)
                .outputFormat("jpg")
                .toFile(path.getCanonicalFile() + "_40x40");
                
                Thumbnails.of(path)
                .size(60, 60)
                .outputFormat("jpg")
                .toFile(path.getCanonicalFile() + "_60x60");
                
                Thumbnails.of(path)
                .size(50, 50)
                .outputFormat("jpg")
                .toFile(path.getCanonicalFile() + "_50x50");

                Thumbnails.of(path)
                .size(80, 80)
                .outputFormat("jpg")
                .toFile(path.getCanonicalFile() + "_80x80");
                
                Thumbnails.of(path)
                .size(120, 120)
                .outputFormat("jpg")
                .toFile(path.getCanonicalFile() + "_120x120");
                
                
            } catch (Exception e) {
                e.printStackTrace();
            }
            
            member.setUserPath(filename);
            memberService.add(member);
            System.out.println(jsonData);
    }
   
   @RequestMapping("add02")
   @ResponseStatus(HttpStatus.CREATED)
   public void add02(Member member) throws Exception {
           memberService.add(member);
   }
    
    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("userNo") int userNo) throws Exception {
       memberService.delete(userNo);
    }
    
    @RequestMapping("list")
    public Object list(
            ) {
        return memberService.list();
    }
    
    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(Member member) throws Exception {
        memberService.update(member);
    }
    
    @RequestMapping("{userNo}")
    public Member view(@PathVariable int userNo) throws Exception {
        return memberService.get(userNo);
    }
    
}
