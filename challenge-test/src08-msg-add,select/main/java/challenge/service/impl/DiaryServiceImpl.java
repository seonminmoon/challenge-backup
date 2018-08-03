package challenge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.DiaryDao;
import challenge.domain.Diary;
import challenge.service.DiaryService;

@Service
public class DiaryServiceImpl implements DiaryService {
    
    DiaryDao diaryDao;
    
    public DiaryServiceImpl(DiaryDao diaryDao) {
        this.diaryDao = diaryDao;
    }
    
    @Override
    public List<Diary> list(int pno, int uno) {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return diaryDao.selectList(pno, uno);
    }

    @Override
    public int add(Diary diary) {
        return diaryDao.insert(diary);
    }
    
    @Override
    public List<Object> get(int dno) {
        return diaryDao.selectOne(dno);
    }
    
    @Override
    public int update(Diary diary) {
        return diaryDao.update(diary);
    }
}
