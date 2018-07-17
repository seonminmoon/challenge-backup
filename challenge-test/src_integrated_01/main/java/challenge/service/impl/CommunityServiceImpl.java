// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.CommunityDao;
import challenge.domain.Community;
import challenge.service.CommunityService;


@Service
public class CommunityServiceImpl implements CommunityService {

    CommunityDao communityDao;
    
    public CommunityServiceImpl(CommunityDao communityDao) {
        this.communityDao = communityDao;
    }
    
    @Override
    public List<Community> list() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return communityDao.selectList();
    }
    
    @Override
    public int delete(int no) {
        return communityDao.delete(no);
    }

    @Override
    public Community get(int no) {
        Community community = communityDao.selectOne(no);
        return community;
    }
    
    @Override
    public int add(Community community) {
        return communityDao.insert(community);
    }
    
    public int update(Community community) {
        return communityDao.update(community);
    }
}