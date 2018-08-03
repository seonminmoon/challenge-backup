package challenge.dao;

import java.util.List;

import challenge.domain.BodyInfo;

public interface BodyInfoDao {
    int delete(int no);
    List<BodyInfo> selectList();
    int insert(BodyInfo bodyInfo);
    int update(BodyInfo bodyInfo);
    BodyInfo selectOne(int no);
}
