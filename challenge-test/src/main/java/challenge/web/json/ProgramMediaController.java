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

import challenge.domain.ProgramMedia;
import challenge.service.ProgramMediaService;
import net.coobird.thumbnailator.Thumbnails;

@RestController
@RequestMapping("/programMedia")
public class ProgramMediaController {

    @Autowired ServletContext sc;
    ProgramMediaService programMediaService;

    public ProgramMediaController(ProgramMediaService programMediaService) {
        this.programMediaService = programMediaService;
    }
    
   @RequestMapping("add")
   @ResponseStatus(HttpStatus.CREATED)
    public void add(ProgramMedia programMedia, MultipartFile[] files) throws Exception {
       String filesDir = sc.getRealPath("/files");
       
       ArrayList<String> medias = new ArrayList<>();
       for (int i = 0; i  < files.length; i++) {
           String filename = UUID.randomUUID().toString();
           try {
               File path = new File(filesDir + "/" + filename);
               files[i].transferTo(path);
               medias.add(filename);
               
               Thumbnails.of(path)
               .size(50, 50)
               .outputFormat("jpg")
               .toFile(path.getCanonicalPath() + "_50x50");
               
               Thumbnails.of(path)
               .size(200, 200)
               .outputFormat("jpg")
               .toFile(path.getCanonicalPath() + "_200x200");
               
               Thumbnails.of(path)
               .size(200, 200)
               .outputFormat("jpg")
               .toFile(path.getCanonicalPath() + "_600x600");
           } catch (Exception e) {
               e.printStackTrace();
           }
       }
       
       programMediaService.add(programMedia, medias);
    }
    
    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("no") int no) throws Exception {
       programMediaService.delete(no);
    }
    
    @RequestMapping("list")
    public Object list(@RequestParam int no) throws Exception {
        return programMediaService.list(no);
    }
    
    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(ProgramMedia programMedia) throws Exception {
        programMediaService.update(programMedia);
    }
    
    @RequestMapping("{no}")
    public ProgramMedia view(@PathVariable int no) throws Exception {
        return programMediaService.get(no);
    }
    
}
