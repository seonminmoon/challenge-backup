package challenge.domain;

import java.io.Serializable;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class BodyInfo extends User implements Serializable {
    private static final long serialVersionUID = 1L;

   
    private int bno; 
    @JsonFormat(pattern="yyyy-MM-dd", timezone = "Asia/Seoul")
    private Date bdate; // 측정일
    private Double weight; // 몸무게
    private Double muscle; // 근력량
    private Double fat;
    
    
  
    public int getBno() {
        return bno;
    }
    public void setBno(int bno) {
        this.bno = bno;
    }
    public Date getBdate() {
        return bdate;
    }
    public void setBdate(Date bdate) {
        this.bdate = bdate;
    }
    public Double getWeight() {
        return weight;
    }
    public void setWeight(Double weight) {
        this.weight = weight;
    }
    public Double getMuscle() {
        return muscle;
    }
    public void setMuscle(Double muscle) {
        this.muscle = muscle;
    }
    public Double getFat() {
        return fat;
    }
    public void setFat(Double fat) {
        this.fat = fat;
    }
    
   




   


   
}
