package challenge.web.json;

import java.io.File;
import java.util.ArrayList;
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

import challenge.domain.Challenge;
import challenge.service.ChallengeService;

@RestController
@RequestMapping("/challenge")
public class ChallengeController {

    @Autowired ServletContext sc;

    ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    @RequestMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public Object add(Challenge challenge, MultipartFile[] files) throws Exception {
        System.out.println(files);
        System.out.println(files.length);
        String filesDir = sc.getRealPath("/files");
        
        ArrayList<String> medias = new ArrayList<>();
        for (int i = 0; i  < files.length; i++) {
            String filename = UUID.randomUUID().toString();
            try {
                File path = new File(filesDir + "/" + filename);
                files[i].transferTo(path);
                medias.add(filename);
                
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        
        challenge.setPath(medias.get(0));
        challengeService.add(challenge);
        return challenge;
    }


    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("no") int no) throws Exception {
        challengeService.delete(no);
    }

    @RequestMapping("list")
    public Object list() {
        return challengeService.list();
    }

    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(Challenge challenge) throws Exception {
        challengeService.update(challenge);
    }

    @RequestMapping("{no}")
    public Challenge view(@PathVariable int no) throws Exception {
        return challengeService.get(no);
    }

}
