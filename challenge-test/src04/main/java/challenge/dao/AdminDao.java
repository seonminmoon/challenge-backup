package challenge.dao;

import java.util.List;

import challenge.domain.Admin;

public interface AdminDao {
    int delete(int no);
    List<Admin> selectList();
    int insert(Admin admin);
    int update(Admin admin);
    Admin selectOne(int no);
}
