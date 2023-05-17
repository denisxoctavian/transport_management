package draexlmaier.dtsm.controller;


import draexlmaier.dtsm.model.Gate;
import draexlmaier.dtsm.service.GateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/gate")
public class GateController {

    private final GateService service;

    public GateController(GateService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Gate>> getAllGates(){
        List<Gate> gates = service.findAllGates();
        return new ResponseEntity<>(gates, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Gate> getGateById(@PathVariable("id") int id)
    {
        Gate gate = service.findGateById(id);
        return new ResponseEntity<>(gate, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Gate> addGate(@RequestBody Gate gate)
    {
        Gate newGate = service.addGate(gate);
        return new ResponseEntity<>(newGate,HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Gate> updateGate(@RequestBody Gate gate)
    {
        Gate updateGate = service.updateGate(gate);
        return new ResponseEntity<>(updateGate, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteGate(@PathVariable("id") int id)
    {
        service.deleteGate(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/location/{id}")
    public ResponseEntity<List<Gate>>getGatesOfLocation(@PathVariable("id")int id){
        List<Gate> gates = service.findGatesOfLocation(id);
        return new ResponseEntity<>(gates, HttpStatus.OK);
    }
}
