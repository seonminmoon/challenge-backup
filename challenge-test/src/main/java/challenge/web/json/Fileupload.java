// 파일 업로드
package challenge.web.json;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

@RestController 
@RequestMapping("/fileupload") 
public class Fileupload {

    @Autowired ServletContext sc;


    @PostMapping("upload")
    public Object upload( // 썸네일
            MultipartFile files) {
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
            .size(50, 50)
            .outputFormat("jpg")
            .toFile(path.getCanonicalFile() + "_50x50");
            Thumbnails.of(path)
            .size(200,200)
            .outputFormat("jpg")
            .toFile(path.getCanonicalFile() + "_200x200");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonData;
    }
}






