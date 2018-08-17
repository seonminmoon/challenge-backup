// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.ProgramDao;
import challenge.dao.ProgramMediaDao;
import challenge.dao.ProgramMemberDao;
import challenge.domain.ProgramMedia;
import challenge.domain.ProgramMember;
import challenge.service.ProgramMediaService;


@Service
public class ProgramMediaServiceImpl implements ProgramMediaService {
    ProgramDao programDao;
    ProgramMediaDao programMediaDao;
    ProgramMemberDao programMemberDao;
    
    public ProgramMediaServiceImpl(ProgramMediaDao programMediaDao,
            ProgramDao programDao, ProgramMemberDao programMemberDao) {
        this.programMediaDao = programMediaDao;
        this.programDao = programDao;
        this.programMemberDao = programMemberDao;
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
        
        int pno = programDao.selectRecent().getNo();
        int uno = programDao.selectRecent().getTrainerNo();

        ProgramMember programMember = new ProgramMember();
        programMember.setProgramNo(pno);
        programMember.setUserNo(uno);
        programMember.setUserType(2);
        programMemberDao.insert(programMember);
        
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