package challenge.domain;

import java.io.Serializable;

public class Member extends User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Override
    public String toString() {
        return "Member [toString()=" + super.toString() + ", getPrograms()=" + getPrograms() + ", getUserNo()="
                + getUserNo() + ", getName()=" + getName() + ", getSex()=" + getSex() + ", getEmail()=" + getEmail()
                + ", getPassword()=" + getPassword() + ", getUserPath()=" + getUserPath() + ", getUserPhone()="
                + getUserPhone() + ", getUserType()=" + getUserType() + ", getClass()=" + getClass() + ", hashCode()="
                + hashCode() + "]";
    }

}

