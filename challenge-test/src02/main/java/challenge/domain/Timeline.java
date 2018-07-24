package challenge.domain;

public class Timeline extends Post{
    String picture;
    Program program;
    User user;
    @Override
    public String toString() {
        return "Timeline [picture=" + picture + ", program=" + program
                + ", user=" + user + "]";
    }
    public String getPicture() {
        return picture;
    }
    public void setPicture(String picture) {
        this.picture = picture;
    }
    public Program getProgram() {
        return program;
    }
    public void setProgram(Program program) {
        this.program = program;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    
    
    
}
