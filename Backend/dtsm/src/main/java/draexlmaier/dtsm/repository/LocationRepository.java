package draexlmaier.dtsm.repository;

import draexlmaier.dtsm.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location,Integer> {
    Location findLocationById(int id);

    void deleteLocationManagerById(int id);

    @Query(
            value = "SELECT * FROM `location`",
            nativeQuery = true
    )
    List<Location> findAllLocations();


}
