package challenge.domain;

public class Comment extends Post{
    int timelineNo;
    ProgramMember progMemb;
    
    @Override
    public String toString() {
        return "Comment [timelineNo=" + timelineNo + "]";
    }

    public int getTimelineNo() {
        return timelineNo;
    }

    public void setTimelineNo(int timelineNo) {
        this.timelineNo = timelineNo;
    }

    public ProgramMember getProgMemb() {
        return progMemb;
    }

    public void setProgMemb(ProgramMember progMemb) {
        this.progMemb = progMemb;
    }
    
    
}