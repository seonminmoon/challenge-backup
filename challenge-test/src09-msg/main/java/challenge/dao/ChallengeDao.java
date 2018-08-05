package challenge.dao;

import java.util.List;

import challenge.domain.Challenge;

public interface ChallengeDao {
    int delete(int no);
    List<Challenge> selectList();
    int insert(Challenge challenge);
    int update(Challenge challenge);
    Challenge selectOne(int no);
    List<Challenge> mainList(); 
}
