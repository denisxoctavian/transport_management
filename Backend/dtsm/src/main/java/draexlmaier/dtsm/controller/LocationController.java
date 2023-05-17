package draexlmaier.dtsm.controller;


import draexlmaier.dtsm.model.Location;
import draexlmaier.dtsm.service.LocationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/location")
public class LocationController {

    private final LocationService service;

    public LocationController(LocationService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Location>> getAllLocations(){
        List<Location> locations = service.findAllLocations();
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable("id") int id)
    {
        Location location = service.findLocationById(id);
        return new ResponseEntity<>(location, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Location> addLocation(@RequestBody Location location)
    {
        Location newLocation = service.addLocation(location);
        return new ResponseEntity<>(newLocation,HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<Location> updateLocation(@RequestBody Location location)
    {
        Location updateLocation = service.updateLocation(location);
        return new ResponseEntity<>(updateLocation, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteLocation(@PathVariable("id") int id)
    {
        service.deleteLocation(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
