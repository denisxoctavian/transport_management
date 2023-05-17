package draexlmaier.dtsm.repository;

import draexlmaier.dtsm.model.Gate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GateRepository extends JpaRepository<Gate,Integer> {

    Gate findGateById(int id);

    void deleteGateById(int id);

    @Query(
            value = "SELECT * FROM `gate`",
            nativeQuery = true
    )
    List<Gate> findAllGates();

    @Query(
            value = "SELECT a.* FROM `gate` a INNER JOIN `location` b ON a.id_location = b.id where b.id=?1",
            nativeQuery = true
    )
    List<Gate> findGatesOfLocation(int id);





}

