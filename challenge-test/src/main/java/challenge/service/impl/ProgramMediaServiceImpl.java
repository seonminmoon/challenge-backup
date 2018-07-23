// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

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
    public List<ProgramMedia> list() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return programMediaDao.selectList();
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
    public int add(ProgramMedia programMedia) {
        programDao.insert(programMedia);
        return programMediaDao.insert(programMedia);
    }
    
    public int update(ProgramMedia programMedia) {
        return programMediaDao.update(programMedia);
    }
}