package draexlmaier.dtsm.controller;


import draexlmaier.dtsm.model.LocationManager;
import draexlmaier.dtsm.service.LocationManagerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/manager")
public class LocationManagerController {
    private final LocationManagerService service;

    public LocationManagerController(LocationManagerService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<LocationManager>> getAllManagers(){
        List<LocationManager> managers = service.findAllLocationManager();
        return new ResponseEntity<>(managers, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<LocationManager> getManagerById(@PathVariable("id") int id)
    {
        LocationManager manager = service.findLocationManagerById(id);
        return new ResponseEntity<>(manager, HttpStatus.OK);
    }

    @GetMapping("/finde/{email}")
    public ResponseEntity<LocationManager> getManagerByEmail(@PathVariable("email") String email)
    {
        LocationManager manager = service.findLocationManagerByEmail(email);
        return new ResponseEntity<>(manager, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<LocationManager> addManager(@RequestBody LocationManager manager)
    {
        LocationManager newManager = service.addLocationManager(manager);
        return new ResponseEntity<>(newManager,HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<LocationManager> updateManager(@RequestBody LocationManager manager)
    {
        LocationManager updateManager = service.updateLocationManager(manager);
        return new ResponseEntity<>(updateManager, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteManager(@PathVariable("id") int id)
    {
        service.deleteLocationManager(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
