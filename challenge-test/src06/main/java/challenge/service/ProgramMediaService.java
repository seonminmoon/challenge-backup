// 서비스 컴포넌트 - 게시물 관련 업무를 처리할 객체
package challenge.service;

import java.util.List;

import challenge.domain.ProgramMedia;

public interface ProgramMediaService {
    // 서비스 컴포넌트에서 메서드명을 지을 때는 
    // 업무 용어를 사용하라!
    List<ProgramMedia> list();
    ProgramMedia get(int no);
    int add(ProgramMedia programMedia);
    int update(ProgramMedia programMedia);
    int delete(int no);
}