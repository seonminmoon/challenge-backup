// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.ProgramDao;
import challenge.dao.ProgramMediaDao;
import challenge.domain.ProgramMedia;
import challenge.service.ProgramMediaService;


@Service
public class ProgramMediaServiceImpl implements ProgramMediaService {
    ProgramDao programDao;
    ProgramMediaDao programMediaDao;
    
    public ProgramMediaServiceImpl(ProgramMediaDao programMediaDao,
            ProgramDao programDao) {
        this.programMediaDao = programMediaDao;
        this.programDao = programDao;
    }
    
    @Override
    public List<ProgramMedia> list(int no) {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return programMediaDao.selectList(no);
    }
    
    @Override
    public int delete(int no) {
        return programMediaDao.delete(no);
    }

    @Override
    public ProgramMedia get(int no) {
        ProgramMedia programMedia = programMediaDao.selectOne(no);
        return programMedia;
    }
    
    @Override
    public int add(ProgramMedia programMedia, ArrayList<String> medias) {
        programDao.insert(programMedia);
        
        for (int i = 0; i < medias.size(); i++) {
            programMedia.setPath(medias.get(i));
            programMedia.setState(1);
            programMediaDao.insert(programMedia);
        }
        return medias.size();
    }
    
    
    public int update(ProgramMedia programMedia) {
        return programMediaDao.update(programMedia);
    }
}