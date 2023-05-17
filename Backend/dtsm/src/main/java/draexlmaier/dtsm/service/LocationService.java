package draexlmaier.dtsm.service;

import draexlmaier.dtsm.model.Gate;
import draexlmaier.dtsm.model.Location;
import draexlmaier.dtsm.repository.LocationRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class LocationService {
    private final LocationRepository locationRepository;
    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location addLocation(Location location){
        return locationRepository.save(location);
    }

    public Location updateLocation(Location location){
        return locationRepository.save(location);
    }

    public Location findLocationById(int id){return locationRepository.findLocationById(id);}

    public void deleteLocation(int id){
        locationRepository.deleteById(id);
    }

    public List<Location> findAllLocations(){
        return locationRepository.findAll();
    }


}
