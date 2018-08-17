// 파일 업로드
package challenge.web.json;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

@RestController 
@RequestMapping("/fileupload") 
public class Fileupload {

    @Autowired ServletContext sc;


    @RequestMapping("upload") // 이미지경로 외 다른 데이터들도 같이 저장!
    public Object upload03(
            String email,
            String pwd,
            MultipartFile[] files) {
        String filesDir = sc.getRealPath("/files");  // 진짜 Real Path (사진이 저장되는 폴더명)

        HashMap<String,Object> returnData = new HashMap<>();
        returnData.put("email", email);
        returnData.put("pwd", pwd);

        ArrayList<Map<String,Object>> jsonDataList = new ArrayList<>();
        returnData.put("files", jsonDataList);

        for (int i = 0; i < files.length; i++) {
            HashMap<String,Object> jsonData = new HashMap<>();
            String filename = UUID.randomUUID().toString();
            jsonData.put("filename", filename);
            jsonData.put("filesize", files[i].getSize());
            jsonData.put("originname", files[i].getOriginalFilename());
            try {
                File path = new File(filesDir + "/" + filename);
                System.out.println(path);
                files[i].transferTo(path);
                jsonDataList.add(jsonData);

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
        }
        return returnData;
    }

    @RequestMapping("upload02") // 이미지경로 외 다른 데이터들도 같이 저장!
    public Object upload02(
            String email,
            String pwd,
            String phone,
            MultipartFile[] files) {
        String filesDir = sc.getRealPath("/files");  // 진짜 Real Path (사진이 저장되는 폴더명)

        HashMap<String,Object> returnData = new HashMap<>();
        returnData.put("email", email);
        returnData.put("pwd", pwd);
        returnData.put("phone", phone);

        ArrayList<Map<String,Object>> jsonDataList = new ArrayList<>();
        returnData.put("files", jsonDataList);

        for (int i = 0; i < files.length; i++) {
            HashMap<String,Object> jsonData = new HashMap<>();
            String filename = UUID.randomUUID().toString();
            jsonData.put("filename", filename);
            jsonData.put("filesize", files[i].getSize());
            jsonData.put("originname", files[i].getOriginalFilename());
            try {
                File path = new File(filesDir + "/" + filename);
                System.out.println(path);
                files[i].transferTo(path);
                jsonDataList.add(jsonData);

               
                Thumbnails.of(path)
                .size(40, 40)
                .outputFormat("jpg")
                .toFile(path.getCanonicalFile() + "_40x40");
                Thumbnails.of(path)
                .size(45, 45)
                .outputFormat("jpg")
                .toFile(path.getCanonicalFile() + "_45x45");
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
                .size(120,120)
                .outputFormat("jpg")
                .toFile(path.getCanonicalFile() + "_120x120");
                
                Thumbnails.of(path)
                .size(125,125)
                .outputFormat("jpg")
                .toFile(path.getCanonicalFile() + "_125x125");
                Thumbnails.of(path)
                .size(200,200)
                .outputFormat("jpg")
                .toFile(path.getCanonicalFile() + "_200x200");

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return returnData;
    }
}



/*
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
 */