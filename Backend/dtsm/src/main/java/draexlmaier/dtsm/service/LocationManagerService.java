package draexlmaier.dtsm.service;

import draexlmaier.dtsm.model.Gate;
import draexlmaier.dtsm.model.LocationManager;
import draexlmaier.dtsm.repository.LocationManagerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
public class LocationManagerService {
    private final LocationManagerRepository locationManagerRepository;

    @Autowired
    public LocationManagerService(LocationManagerRepository locationManagerRepository) {
        this.locationManagerRepository = locationManagerRepository;
    }

    public LocationManager addLocationManager(LocationManager manager){
        return locationManagerRepository.save(manager);
    }

    public LocationManager updateLocationManager(LocationManager manager){
        return locationManagerRepository.save(manager);
    }

    public LocationManager findLocationManagerById(int id){return locationManagerRepository.findLocationManagerById(id);}

    public LocationManager findLocationManagerByEmail(String email){return locationManagerRepository.findLocationManagerByEmail(email);}

    public void deleteLocationManager(int id){
        locationManagerRepository.deleteById(id);
    }


    public List<LocationManager> findAllLocationManager(){
        return locationManagerRepository.findAll();
    }

    public List<LocationManager>findAllLocationManagersWithLocation(){return locationManagerRepository.findLocationManagersWithLocationNames();}

    public int findLocationManagerLocation(){
        return locationManagerRepository.findLocationManagerLocation();
    }
}
