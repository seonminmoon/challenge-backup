package challenge.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import challenge.dao.ProgramDao;
import challenge.dao.ProgramMemberDao;
import challenge.domain.Member;
import challenge.domain.Program;
import challenge.domain.ProgramMember;
import challenge.service.ProgramMemberService;

@Service
public class ProgramMemberServiceImpl implements ProgramMemberService {

    ProgramMemberDao programMemberDao;
    ProgramDao programDao;

    public ProgramMemberServiceImpl(ProgramMemberDao programMemberDao, ProgramDao programDao) {
        this.programMemberDao = programMemberDao;
        this.programDao = programDao;
    }

    @Override
    public List<ProgramMember> listWithPname(int trnNo) {
        return programMemberDao.pNameList(trnNo);
    }

    @Override
    public List<ProgramMember> listWithLect(int uno) {
        return programMemberDao.lectList(uno);
    }

    @Override
    public List<ProgramMember> list(int trnNo) {
        //        HashMap<String,Object> params = new HashMap<>();
        //        params.put("startRowNo", (pageNo - 1) * pageSize);
        //        params.put("pageSize", pageSize);

        return programMemberDao.selectList(trnNo);
    }

    @Override
    public List<ProgramMember> list(int pno, int trnNo) {
        return programMemberDao.selectListWithProgram(pno, trnNo);
    }

    @Override
    public List<ProgramMember> get(int pno, int userNo) {
        return programMemberDao.selectOne(pno, userNo);
    }

    @Override
    public Member getWithUserNo(int userNo) {
        return programMemberDao.selectListWithUno(userNo);
    }

    @Override
    public int add(ProgramMember programMember) {
        return programMemberDao.insert(programMember);
    }

    @Override
    public int updateReview(ProgramMember programMember) {
        return programMemberDao.updateReview(programMember);
    }

    @Override
    public int deleteReview(ProgramMember programMember) {
        System.out.println("작동중?");
        return programMemberDao.deleteReview(programMember);
    }

    @Override
    public List<ProgramMember> reviewList(int pno) {
        return programMemberDao.reviewList(pno);
    }

    @Override
    public int reviewCount(int pno) {
        return programMemberDao.reviewCount(pno);
    }

    @Override
    public int reviewScore(int pno) {
        return programMemberDao.reviewScore(pno);

    }
    
    @Override
    public int pmemberCount(int pno) {
        return programMemberDao.pmemberCount(pno);
    }
    
    @Override
    public int trainerReviewCount(int uno) {
        List<Program> program = programDao.selectTrainerProgram(uno);
        int count = 0;
        for (int i = 0; i < program.size(); i++) {
            int programNo = program.get(i).getNo();
            count += programMemberDao.reviewCount(programNo);
        }
        return count;
    }
    
    @Override
    public int trainerReviewScore(int uno) {
        List<Program> program = programDao.selectTrainerProgram(uno);
        int count = 0;
        for (int i = 0; i < program.size(); i++) {
            int programNo = program.get(i).getNo();
            count += programMemberDao.reviewScore(programNo);
        }
        return count;
    }
    
    @Override
    public List<ProgramMember> trainerReviewList(int uno) {
        List<Program> program = programDao.selectTrainerProgram(uno);
        ArrayList<ProgramMember> reviewList = new ArrayList<>();
        for (int i = 0; i < program.size(); i++) {
            int programNo = program.get(i).getNo();
            programMemberDao.reviewList(programNo);
            for (int x = 0; x < programMemberDao.reviewList(programNo).size(); x++) {
                ProgramMember prograMember = programMemberDao.reviewList(programNo).get(x);
                reviewList.add(prograMember);
            }
        }
        return reviewList;
    }
}
