package draexlmaier.dtsm.controller;


import draexlmaier.dtsm.model.Driver;
import draexlmaier.dtsm.model.Location;
import draexlmaier.dtsm.model.TransportSchedule;
import draexlmaier.dtsm.model.TransportScheduleWithDeliveryDate;
import draexlmaier.dtsm.service.TransportScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/schedule")
public class TransportScheduleController {

    private final TransportScheduleService service;

    public TransportScheduleController(TransportScheduleService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<TransportSchedule>> getAllSchedules(){
        List<TransportSchedule> schedules = service.findAllTransportSchedules();
        return new ResponseEntity<>(schedules, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<TransportSchedule> getScheduleById(@PathVariable("id") int id)
    {
        TransportSchedule schedule = service.findTransportScheduleById(id);
        return new ResponseEntity<>(schedule, HttpStatus.OK);
    }

    @GetMapping("/location/{id}")
    public  ResponseEntity<List<TransportScheduleWithDeliveryDate>>getAppointmentsFromLocation(@PathVariable("id") Location id){

        List<TransportScheduleWithDeliveryDate>schedules=service.getAppointmentsFromLocation(id);
        return new ResponseEntity<>(schedules,HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<TransportSchedule> addSchedule(@RequestBody TransportSchedule schedule)
    {
        TransportSchedule newSchedule = service.addTransportSchedule(schedule);
        return new ResponseEntity<>(newSchedule,HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TransportSchedule> updateSchedule(@PathVariable("id") int id,@RequestBody TransportSchedule schedule)
    {
        TransportSchedule oldSchedule = service.findTransportScheduleById(id);
        oldSchedule = service.updateTransportSchedule(schedule);
        return new ResponseEntity<>(oldSchedule, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable("id") int id)
    {
        service.deleteTransportSchedule(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
