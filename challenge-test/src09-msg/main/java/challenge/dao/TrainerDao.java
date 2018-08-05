package challenge.dao;

import java.util.List;

import challenge.domain.Trainer;

public interface TrainerDao {
    int delete(int userNo);
    List<Trainer> selectList();
    int insert(Trainer trainer);
    int update(Trainer trainer);
    Trainer selectOne(int userNo);
}

