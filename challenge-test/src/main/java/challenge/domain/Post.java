package challenge.domain;

import java.io.Serializable;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Post implements Serializable {
    private static final long serialVersionUID = 1L;

    private int no;
    private String content;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date createdDate;
    
    // 개발하는 동안 객체의 내용을 확인하기 위해서 toString()을 오버라이딩 한다.
    @Override
    public String toString() {
        return "Post [no=" + no +  ", content=" + content + ", createdDate=" + createdDate + "]";
    }
    
    public int getNo() {
        return no;
    }
    public void setNo(int no) {
        this.no = no;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Date getCreatedDate() {
        return createdDate;
    }
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
    
    
}