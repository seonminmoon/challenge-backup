package challenge.domain;

import java.io.Serializable;

public class Member extends User implements Serializable {
    private static final long serialVersionUID = 1L;

    private int userNo;

    public int getUserNo() {
        return userNo;
    }
    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }
}

