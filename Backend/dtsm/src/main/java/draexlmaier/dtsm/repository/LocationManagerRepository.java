package draexlmaier.dtsm.repository;


import draexlmaier.dtsm.model.Location;
import draexlmaier.dtsm.model.LocationManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LocationManagerRepository extends JpaRepository<LocationManager,Integer> {
    LocationManager findLocationManagerById(int id);

    LocationManager findLocationManagerByEmail(String email);

    void deleteLocationManagerById(int id);

    @Query(
            value = "SELECT * FROM `location_manager`",
            nativeQuery = true
    )
    List<LocationManager> findAllLocationManagers();


    @Query(
            value = "SELECT b.id from location_manager a inner join location b on a.id_location = b.id",
            nativeQuery = true
    )
    int findLocationManagerLocation();

    @Query(
            value = "SELECT a.id, a.first_name, a.last_name, a.email, b.address AS Location FROM location_manager a JOIN location b ON a.id_location = b.id",
            nativeQuery=true
    )
    List<LocationManager> findLocationManagersWithLocationNames();

}
