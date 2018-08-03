package challenge.domain;

import java.io.Serializable;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

/* 프로그램 참여자 */ 
public class ProgramMember implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private int programNo;
    private int userNo;
    
    @JsonFormat(pattern="yyyy-MM-dd", timezone = "Asia/Seoul")
    private Date paymentDay; // 결제일
    private double grade; // 평점
    private String review; // 리뷰
    @JsonFormat(pattern="yyyy-MM-dd", timezone = "Asia/Seoul")
    private Date reviewDate; // 리뷰일자
    private int userType; // 회원유형
    
    private User user;
    private Program program;
    private Diary diarys;
    
  
    public int getProgramNo() {
        return programNo;
    }
    public void setProgramNo(int programNo) {
        this.programNo = programNo;
    }
    public int getUserNo() {
        return userNo;
    }
    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }
    public Date getPaymentDay() {
        return paymentDay;
    }
    public void setPaymentDay(Date paymentDay) {
        this.paymentDay = paymentDay;
    }
    public double getGrade() {
        return grade;
    }
    public void setGrade(double grade) {
        this.grade = grade;
    }
    public String getReview() {
        return review;
    }
    public void setReview(String review) {
        this.review = review;
    }
    public Date getReviewDate() {
        return reviewDate;
    }
    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }
    public int getUserType() {
        return userType;
    }
    public void setUserType(int userType) {
        this.userType = userType;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Program getProgram() {
        return program;
    }
    public void setProgram(Program program) {
        this.program = program;
    }
    public Diary getDiarys() {
        return diarys;
    }
    public void setDiarys(Diary diarys) {
        this.diarys = diarys;
    }
    
    
}