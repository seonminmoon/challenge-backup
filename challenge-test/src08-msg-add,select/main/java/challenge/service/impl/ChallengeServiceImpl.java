// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.ChallengeDao;
import challenge.domain.Challenge;
import challenge.service.ChallengeService;


@Service
public class ChallengeServiceImpl implements ChallengeService {

    ChallengeDao challengeDao;
    
    public ChallengeServiceImpl(ChallengeDao challengeDao) {
        this.challengeDao = challengeDao;
    }
    
    @Override
    public List<Challenge> list() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return challengeDao.selectList();
    }
    @Override
    public List<Challenge> mainList() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return challengeDao.mainList();
    }
    
    @Override
    public int delete(int no) {
        return challengeDao.delete(no);
    }

    @Override
    public Challenge get(int no) {
        Challenge challenge = challengeDao.selectOne(no);
        return challenge;
    }
    
    @Override
    public int add(Challenge challenge) {
        return challengeDao.insert(challenge);
    }
    
    public int update(Challenge challenge) {
        return challengeDao.update(challenge);
    }
}