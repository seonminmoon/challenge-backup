package challenge.domain;

public class User {
    protected int userNo;
    protected String name;
    protected char sex;
    protected String email;
    protected String password;
    protected String userPath;
    protected String userPhone;
    protected int userType;
    
    
    @Override
    public String toString() {
        return "User [userNo=" + userNo + ", name=" + name + ", sex=" + sex + ", email=" + email + ", password="
                + password + ", userPath=" + userPath + ", userPhone=" + userPhone + ", userType=" + userType + "]";
    }
    public int getUserNo() {
        return userNo;
    }
    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public char getSex() {
        return sex;
    }
    public void setSex(char sex) {
        this.sex = sex;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getUserPath() {
        return userPath;
    }
    public void setUserPath(String userPath) {
        this.userPath = userPath;
    }
    public String getUserPhone() {
        return userPhone;
    }
    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }
    public int getUserType() {
        return userType;
    }
    public void setUserType(int userType) {
        this.userType = userType;
    }
    
}
