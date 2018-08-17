package challenge.dao;

import java.util.List;

import challenge.domain.CommuMedia;

public interface CommuMediaDao {
    int delete(int no);
    List<CommuMedia> selectList();
    int insert(CommuMedia commuMedia);
    int update(CommuMedia commuMedia);
    CommuMedia selectOne(int no);
    List<CommuMedia> ListNo(int commuNo);
}
