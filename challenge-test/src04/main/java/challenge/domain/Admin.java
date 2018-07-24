package challenge.domain;

import java.io.Serializable;

public class Admin implements Serializable {
    private static final long serialVersionUID = 1L;

    private int no;
    private String title;
    private String cotent;
    private String path;
    
    
    public String getPath() {
        return path;
    }
    public void setPath(String path) {
        this.path = path;
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
    public String getCotent() {
        return cotent;
    }
    public void setCotent(String content) {
        this.cotent = content;
    }
}
    
   
  