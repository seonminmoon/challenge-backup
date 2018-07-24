// 서비스 컴포넌트 - 게시물 관련 업무를 처리할 객체
package challenge.service;

import java.util.List;

import challenge.domain.BodyInfo;

public interface BodyInfoService {
    // 서비스 컴포넌트에서 메서드명을 지을 때는 
    // 업무 용어를 사용하라!
    List<BodyInfo> list();
    BodyInfo get(int no);
    int add(BodyInfo bodyInfo);
    int update(BodyInfo bodyInfo);
    int delete(int no);
}