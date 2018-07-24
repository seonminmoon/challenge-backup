package challenge.domain;

public class Comment extends Post{
    int timelineNo;

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
    
    
}