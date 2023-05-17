package draexlmaier.dtsm.service;


import draexlmaier.dtsm.model.Driver;
import draexlmaier.dtsm.repository.DriverRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class DriverService {

    private final DriverRepository driverRepository;

    @Autowired
    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public Driver addDriver(Driver driver){
        return driverRepository.save(driver);
    }

    public Driver findDriverById(int id){return driverRepository.findDriverById(id);}

    public Driver findDriverByEmail(String email){return driverRepository.findDriverByEmail(email);}

    public Driver updateDriver(Driver drive){
        return driverRepository.save(drive);
    }

    public void deleteDriver(int id){
        driverRepository.deleteById(id);
    }

    public List<Driver> findAllDrivers(){
        return driverRepository.findAll();
    }

    public int findDriverTransport(){
        return driverRepository.findDriverTransport();
    }



}
