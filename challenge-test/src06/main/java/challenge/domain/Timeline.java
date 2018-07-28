package challenge.domain;

public class Timeline extends Post{
    String picture;
    ProgramMember progMemb;
    int like;
//    List<Comment> comments;
    

    public int getLike() {
        return like;
    }
    public void setLike(int like) {
        this.like = like;
    }
    public String getPicture() {
        return picture;
    }
    public void setPicture(String picture) {
        this.picture = picture;
    }
    public ProgramMember getProgMemb() {
        return progMemb;
    }
    public void setProgMemb(ProgramMember progMemb) {
        this.progMemb = progMemb;
    }

    
    
}
