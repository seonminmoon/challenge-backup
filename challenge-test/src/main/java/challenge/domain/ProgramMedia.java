package challenge.domain;

import java.io.Serializable;

public class ProgramMedia extends Program implements Serializable {
    private static final long serialVersionUID = 1L;

    private int pmno;
    private String path;
    private int state;
    
    public int getPmno() {
        return pmno;
    }
    public void setPmno(int pmno) {
        this.pmno = pmno;
    }
    public String getPath() {
        return path;
    }
    public void setPath(String path) {
        this.path = path;
    }
    public int getState() {
        return state;
    }
    public void setState(int state) {
        this.state = state;
    }

}
