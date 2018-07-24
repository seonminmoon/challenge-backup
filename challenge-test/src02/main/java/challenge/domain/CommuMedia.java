package challenge.domain;

public class CommuMedia {
    private int mediaNo;
    private String mediaPath;
    private int commuNo;
    
    public int getCommuNo() {
        return commuNo;
    }
    public void setCommuNo(int commuNo) {
        this.commuNo = commuNo;
    }
    @Override
    public String toString() {
        return "CommuMedia [mediaNo=" + mediaNo + ", mediaPath=" + mediaPath + "]";
    }
    public int getMediaNo() {
        return mediaNo;
    }
    public void setMediaNo(int mediaNo) {
        this.mediaNo = mediaNo;
    }
    public String getMediaPath() {
        return mediaPath;
    }
    public void setMediaPath(String mediaPath) {
        this.mediaPath = mediaPath;
    }
    
    
}
