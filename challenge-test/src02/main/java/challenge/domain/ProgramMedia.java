package challenge.domain;

import java.io.Serializable;

public class ProgramMedia implements Serializable {
    private static final long serialVersionUID = 1L;

    private int no;
    private String path;
    private int state;
    private int program;

    public int getProgram() {
        return program;
    }
    public void setProgram(int program) {
        this.program = program;
    }
    public int getNo() {
        return no;
    }
    public void setNo(int no) {
        this.no = no;
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
