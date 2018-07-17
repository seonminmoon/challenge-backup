package challenge.domain;

import java.io.Serializable;
import java.util.List;

public class Community extends Post implements Serializable {
    private static final long serialVersionUID = 1L;

    private String title;
    private int cnt; // 조회수
    private String type; // 말머리
    private int like; // 좋아요
    private User user;
    private List<CommuMedia> commuMedias;

    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
    }


    public String getTitle() {
        return title;
    }


    public List<CommuMedia> getCommuMedias() {
        return commuMedias;
    }
    public void setCommuMedias(List<CommuMedia> commuMedias) {
        this.commuMedias = commuMedias;
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
