package challenge.domain;

import java.io.Serializable;

public class Challenge implements Serializable {
    private static final long serialVersionUID = 1L;

    private int no; // 챌린지번호
    private String title; // 챌린지제목
    private String content; // 챌린지내용
    private String path; // 챌린지사진
    
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
    public String getPath() {
        return path;
    }
    public void setPath(String path) {
        this.path = path;
    }
}