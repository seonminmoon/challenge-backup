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
    private List<CommuMedia> commuMedia;
    
    @Override
    public String toString() {
        return "Community [title=" + title + ", cnt=" + cnt + ", type=" + type + ", like=" + like + ", user=" + user
                + ", commuMedia=" + commuMedia + "]";
    }
    public String getTitle() {
        return title;
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
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public List<CommuMedia> getCommuMedia() {
        return commuMedia;
    }
    public void setCommuMedia(List<CommuMedia> commuMedia) {
        this.commuMedia = commuMedia;
    }
}


