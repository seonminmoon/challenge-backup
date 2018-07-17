package challenge.domain;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

/* 프로그램 참여자 */
public class ProgramMember extends Program implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date paymentDay; // 결제일
    private String bank; // 환불은행명
    private String account; // 환불계좌번호
    private double grade; // 평점
    private String review; // 리뷰
    private Date reviewDate; // 리뷰일자
    private int memberType; // 회원유형
    
    private int uno; // 회원번호
    private List<Member> members;
    private Diary diary;
    
    
    public List<Member> getMembers() {
        return members;
    }
    public void setMembers(List<Member> members) {
        this.members = members;
    }
    public Diary getDiary() {
        return diary;
    }
    public void setDiary(Diary diary) {
        this.diary = diary;
    }
    public int getUno() {
        return uno;
    }
    public void setUno(int uno) {
        this.uno = uno;
    }
    public Date getPaymentDay() {
        return paymentDay;
    }
    public void setPaymentDay(Date paymentDay) {
        this.paymentDay = paymentDay;
    }
    public String getBank() {
        return bank;
    }
    public void setBank(String bank) {
        this.bank = bank;
    }
    public String getAccount() {
        return account;
    }
    public void setAccount(String account) {
        this.account = account;
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
    public int getMemberType() {
        return memberType;
    }
    public void setMemberType(int memberType) {
        this.memberType = memberType;
    }
}
