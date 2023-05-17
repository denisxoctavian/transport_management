package draexlmaier.dtsm.controller;



import draexlmaier.dtsm.model.Driver;
import draexlmaier.dtsm.model.Transport;
import draexlmaier.dtsm.model.TransportWithLocationAndSchedule;
import draexlmaier.dtsm.service.TransportService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/transport")
public class TransportController {

    private final TransportService service;

    public TransportController(TransportService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Transport>> getAllTransports(){
        List<Transport> transports = service.findAllTransports();
        return new ResponseEntity<>(transports, HttpStatus.OK);
    }

    @GetMapping("/information")
    public ResponseEntity<List<TransportWithLocationAndSchedule>> getAllTransportsOfUser(@RequestParam("id") Driver id){
        List<TransportWithLocationAndSchedule> transports = service.transportInformation(id);
        return new ResponseEntity<>(transports, HttpStatus.OK);
    }

    @GetMapping("/available/{id}")
    public ResponseEntity< List<String>> getAvailableHours(@PathVariable("id") int id, @RequestParam("deliveryDate")@DateTimeFormat(pattern="yyyy-MM-dd") LocalDate deliveryDate )
    {
        List<String> hours = service.findAvailableHours(id,deliveryDate);
        return new ResponseEntity<>(hours, HttpStatus.OK);
    }

    @GetMapping("/location/{id}")
    public ResponseEntity< List<Transport>> getTransportFromLocation(@PathVariable("id") int id)
    {
        List<Transport> transports = service.getTransportsFromLocation(id);
        return new ResponseEntity<>(transports, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Transport> getTransportById(@PathVariable("id") int id)
    {
        Transport transport = service.findTransportById(id);
        return new ResponseEntity<>(transport, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Transport> addTransport(@RequestBody Transport transport)
    {
        Transport newTransport = service.addTransport(transport);
        return new ResponseEntity<>(newTransport,HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Transport> updateTransport(@PathVariable("id") int id, @RequestBody Transport transport)
    {
        Transport oldTransport = service.findTransportById(id);
        oldTransport = service.updateTransport(transport);
        return new ResponseEntity<>(oldTransport, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTransport(@PathVariable("id") int id)
    {
        service.deleteTransport(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
