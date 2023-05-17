package draexlmaier.dtsm.service;

import draexlmaier.dtsm.model.Driver;
import draexlmaier.dtsm.model.Gate;
import draexlmaier.dtsm.repository.GateRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
public class GateService {
    private final GateRepository gateRepository;

    @Autowired
    public GateService(GateRepository gateRepository) {
        this.gateRepository = gateRepository;
    }

    public Gate addGate(Gate gate){
        return gateRepository.save(gate);
    }

    public Gate updateGate(Gate gate){
        return gateRepository.save(gate);
    }

    public Gate findGateById(int id){return gateRepository.findGateById(id);}

    public void deleteGate(int id){
        gateRepository.deleteById(id);
    }

    public List<Gate> findAllGates(){
        return gateRepository.findAll();
    }

    public List<Gate> findGatesOfLocation(int id){
        return gateRepository.findGatesOfLocation(id);
    }
}
