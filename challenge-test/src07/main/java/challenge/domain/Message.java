package challenge.domain;

import java.io.Serializable;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Message implements Serializable {
    private static final long serialVersionUID = 1L;

    private int no; // 메시지번호
    private String title; // 제목
    private String content; // 내용
    private Trainer trainer; // 트레이너번호
    private Member member; // 회원번호
    private int direct; // 메시지 방향
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date msgDate; // 메시지 날짜
    
    
    
    
    @Override
    public String toString() {
        return "Message [no=" + no + ", title=" + title + ", content=" + content + ", trainer=" + trainer + ", member="
                + member + ", direct=" + direct + ", msgDate=" + msgDate + "]";
    }
    public int getNo() {
        return no;
    }
    public void setNo(int no) {
        this.no = no;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Trainer getTrainer() {
        return trainer;
    }
    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }
    public Member getMember() {
        return member;
    }
    public void setMember(Member member) {
        this.member = member;
    }
    public int getDirect() {
        return direct;
    }
    public void setDirect(int direct) {
        this.direct = direct;
    }
    public Date getMsgDate() {
        return msgDate;
    }
    public void setMsgDate(Date msgDate) {
        this.msgDate = msgDate;
    }
    
         
}