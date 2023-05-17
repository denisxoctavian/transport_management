package draexlmaier.dtsm.controller;

import draexlmaier.dtsm.model.Driver;
import draexlmaier.dtsm.service.DriverService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/driver")
public class DriverController {

    private final DriverService service;

    public DriverController(DriverService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Driver>> getAllDrivers(){
        List<Driver> drivers = service.findAllDrivers();
        return new ResponseEntity<>(drivers, HttpStatus.OK);
    }

    @GetMapping("/finde/{email}")
    public ResponseEntity<Driver> getDriverByEmail(@PathVariable("email") String email)
    {
        Driver driver = service.findDriverByEmail(email);
        return new ResponseEntity<>(driver, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Driver> getDriverById(@PathVariable("id") int id)
    {
        Driver driver = service.findDriverById(id);
        return new ResponseEntity<>(driver, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Driver> addDriver(@RequestBody Driver driver)
    {
        Driver newDriver = service.addDriver(driver);
        return new ResponseEntity<>(newDriver,HttpStatus.OK);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable("id") int id,@RequestBody Driver driver)
    {
        Driver oldDriver = service.findDriverById(id);
         oldDriver = service.updateDriver(driver);
        return new ResponseEntity<>(oldDriver, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") int id)
    {
        service.deleteDriver(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
