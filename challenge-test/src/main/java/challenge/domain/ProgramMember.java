package challenge.domain;

import java.io.Serializable;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

/* 프로그램 참여자 */
public class ProgramMember extends Program implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date paymentDay; // 결제일
    private double grade; // 평점
    private String review; // 리뷰
    private Date reviewDate; // 리뷰일자
    private int userType; // 회원유형
    
    private User users;
    private Diary diarys;
    
    
    public int getUserType() {
        return userType;
    }
    public void setUserType(int userType) {
        this.userType = userType;
    }
    public User getUsers() {
        return users;
    }
    public void setUsers(User users) {
        this.users = users;
    }
    public Diary getDiarys() {
        return diarys;
    }
    public void setDiarys(Diary diarys) {
        this.diarys = diarys;
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
}
