package challenge.web.json;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.domain.Trainer;
import challenge.service.TrainerService;

@RestController
@RequestMapping("/trainer")
public class TrainerController {


    TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    @RequestMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public void add(Trainer trainer) throws Exception {
        trainerService.add(trainer);
    }

    @RequestMapping("delete")
    //@ResponseStatus(HttpStatus.OK) // 응답 상태 코드 값의 기본은 "200(OK)" 이다.
    public void delete(
            @RequestParam("userNo") int userNo) throws Exception {
        trainerService.delete(userNo);
    }

    @RequestMapping("list")
    public Object list(
            ) {
        return trainerService.list();
    }

    @RequestMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void update(Trainer trainer) throws Exception {
        trainerService.update(trainer);
    }

    @RequestMapping("{userNo}")
    public Trainer view(@PathVariable int userNo) throws Exception {
        return trainerService.get(userNo);
    }

}

