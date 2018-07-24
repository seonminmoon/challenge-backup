package challenge.domain;

import java.io.Serializable;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

// 운동계획서
public class Plan implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private int no; // 운동계획서번호
    private int planTurn; // 운동 차수
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date planDate; // 운동 날짜
    private String planTitl; // 운동 제목
    private String planContent; //oo,- 운동 내용
    
    private Program program; // 프로그램 객체
    
    public Program getProgram() {
        return program;
    }
    public void setProgram(Program program) {
        this.program = program;
    }
    public int getNo() {
        return no;
    }
    public void setNo(int no) {
        this.no = no;
    }
    public int getPlanTurn() {
        return planTurn;
    }
    public void setPlanTurn(int planTurn) {
        this.planTurn = planTurn;
    }
    public Date getPlanDate() {
        return planDate;
    }
    public void setPlanDate(Date planDate) {
        this.planDate = planDate;
    }
    public String getPlanTitl() {
        return planTitl;
    }
    public void setPlanTitl(String planTitl) {
        this.planTitl = planTitl;
    }
    public String getPlanContent() {
        return planContent;
    }
    public void setPlanContent(String planContent) {
        this.planContent = planContent;
    }
    
    
}
