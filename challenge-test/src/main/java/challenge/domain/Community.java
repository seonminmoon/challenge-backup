package challenge.domain;

import java.io.Serializable;

public class Community extends Post implements Serializable {
    private static final long serialVersionUID = 1L;

    private String title;
    private int cnt; // 조회수
    private String type; // 말머리
    private int like; // 좋아요
    private int user;
    private User person;
    private CommuMedia commuMedia;
    
    public int getUser() {
        return user;
    }
    public User getPerson() {
        return person;
    }
    public void setPerson(User person) {
        this.person = person;
    }
    public void setUser(int user) {
        this.user = user;
    }
    public String getTitle() {
        return title;
    }
    public CommuMedia getCommuMedia() {
        return commuMedia;
    }
    public void setCommuMedia(CommuMedia commuMedia) {
        this.commuMedia = commuMedia;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public int getCnt() {
        return cnt;
    }
    public void setCnt(int cnt) {
        this.cnt = cnt;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public int getLike() {
        return like;
    }
    public void setLike(int like) {
        this.like = like;
    }
}
