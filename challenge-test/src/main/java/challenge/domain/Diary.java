package challenge.domain;

import java.io.Serializable;

/* 운동일지 */
public class Diary extends Plan implements Serializable{
    private static final long serialVersionUID = 1L;
    
    private int dno; //운동일지 번호
    private String content; // 운동일지 내용
    private char dcheck; // 출석여부
    
    private int pno; // 프로그램 번호(외래키)
    private int uno; // 사용자 번호(외래키)
    
    
    public int getPno() {
        return pno;
    }
    public void setPno(int pno) {
        this.pno = pno;
    }
    public int getUno() {
        return uno;
    }
    public void setUno(int uno) {
        this.uno = uno;
    }
    public int getDno() {
        return dno;
    }
    public void setDno(int dno) {
        this.dno = dno;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public char getDcheck() {
        return dcheck;
    }
    public void setDcheck(char dcheck) {
        this.dcheck = dcheck;
    }

    
    
}
