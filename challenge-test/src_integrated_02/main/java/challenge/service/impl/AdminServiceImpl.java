// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package challenge.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.AdminDao;
import challenge.domain.Admin;
import challenge.service.AdminService;


@Service
public class AdminServiceImpl implements AdminService {

    AdminDao adminDao;
    
    public AdminServiceImpl(AdminDao adminDao) {
        this.adminDao = adminDao;
    }
    
    @Override
    public List<Admin> list() {
//        HashMap<String,Object> params = new HashMap<>();
//        params.put("startRowNo", (pageNo - 1) * pageSize);
//        params.put("pageSize", pageSize);
        
        return adminDao.selectList();
    }
    
    @Override
    public int delete(int no) {
        return adminDao.delete(no);
    }

    @Override
    public Admin get(int no) {
        Admin admin = adminDao.selectOne(no);
        return admin;
    }
    
    @Override
    public int add(Admin admin) {
        return adminDao.insert(admin);
    }
    
    public int update(Admin admin) {
        return adminDao.update(admin);
    }
}