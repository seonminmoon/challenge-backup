// 업무로직 구현체 - 고객사 마다 다른 구현을 할 수 있다.
package bitcamp.java106.pms.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import bitcamp.java106.pms.dao.TaskDao;
import bitcamp.java106.pms.dao.TeamDao;
import bitcamp.java106.pms.dao.TeamMemberDao;
import bitcamp.java106.pms.domain.Member;
import bitcamp.java106.pms.domain.Team;
import bitcamp.java106.pms.service.TeamService;


@Service
public class TeamServiceImpl implements TeamService {

    TeamDao teamDao;
    TeamMemberDao teamMemberDao;
    TaskDao taskDao;
    
    public TeamServiceImpl(TeamDao teamDao, TeamMemberDao teamMemberDao, TaskDao taskDao) {
        this.teamDao = teamDao;
        this.teamMemberDao = teamMemberDao;
        this.taskDao = taskDao;
    }
    
    @Override
    public List<Team> list() {
        return teamDao.selectList();
    }
    
    @Override
    public int delete(String name) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("teamName", name);
        
        teamMemberDao.delete(params);
        taskDao.deleteByTeam(name);
        
        // 팀 회원과 팀 작업을 삭제한 다음에 예외가 발생한다면
        // 이전에 삭제한 작업은 취소(rollback)되어야 한다.
        // 트랜잭션을 사용하지 않는다면 auto commit이기 때문에 롤백되지 않는다.
        // 테스트를 하려면 다음을 주석 풀고 테스트해봐라
        // int result = 100 / 0;
        
        return teamDao.delete(name);
    }

    @Override
    public Team getWithMembers(String name) {
        Team team = teamDao.selectOneWithMembers(name);
        return team;
    }
    
    @Override
    public int add(Team team) {
        return teamDao.insert(team);
    }
    
    public int update(Team team) {
        return teamDao.update(team);
    }

    @Override
    public Team get(String name) {
        return teamDao.selectOne(name);
    }

    @Override
    public boolean isMember(String teamName, String memberId) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("teamName", teamName);
        params.put("memberId", memberId);
        
        return teamMemberDao.isExist(params);
    }
    
    @Override
    public int addMember(String teamName, String memberId) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("teamName", teamName);
        params.put("memberId", memberId);
        
        return teamMemberDao.insert(params);
    }
    
    @Override
    public int deleteMember(String teamName, String memberId) {
        HashMap<String,Object> params = new HashMap<>();
        params.put("teamName", teamName);
        params.put("memberId", memberId);
        
        return teamMemberDao.delete(params);
    }
    
    @Override
    public List<Member> getMembersWithEmail(String teamName) {
        return teamMemberDao.selectListWithEmail(teamName);
    }
}
