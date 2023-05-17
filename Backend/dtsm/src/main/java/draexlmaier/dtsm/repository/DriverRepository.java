package draexlmaier.dtsm.repository;

import draexlmaier.dtsm.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DriverRepository extends JpaRepository<Driver,Integer> {

    Driver findDriverById(int id);

    Driver findDriverByEmail(String email);

    void deleteDriverById(int id);

    @Query(
            value = "SELECT * FROM `driver`",
            nativeQuery = true
    )
    List<Driver> findAllDrivers();

    @Query(
            value = "SELECT b.id from driver a inner join transport b on a.id = b.id_driver",
            nativeQuery = true
    )
    int findDriverTransport();
}
