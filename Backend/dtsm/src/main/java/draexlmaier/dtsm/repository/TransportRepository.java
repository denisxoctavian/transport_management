package draexlmaier.dtsm.repository;

import draexlmaier.dtsm.model.Driver;
import draexlmaier.dtsm.model.Transport;
import draexlmaier.dtsm.model.TransportWithLocationAndSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TransportRepository extends JpaRepository<Transport,Integer> {
    Transport findTransportById(int id);

    void deleteTransportById(int id);

    @Query(
            value = "SELECT * FROM `transport`",
            nativeQuery = true
    )
    List<Transport> findAllTransports();

    @Query(
            value = "SELECT b.id from transport a inner join location b on a.id_location = b.id",
            nativeQuery = true
    )
    int  findTransportLocation();

    @Query(
            value = "select b.arrival_time from `transport` a inner join `transport_schedule` b on a.id = b.id_transport where a.id_location =?1 and a.delivery_date=?2",
            nativeQuery = true
    )
    List<String> availableHours(int id, LocalDate deliveryDate);

    @Query(
            value="select * from `transport` where id_location=?1 and status=1",
            nativeQuery=true
    )
    List<Transport>getTransportsFromLocation(int id);

    @Query(
            value="SELECT new draexlmaier.dtsm.model.TransportWithLocationAndSchedule(a, c, b) FROM Transport a JOIN Location b ON a.idLocation = b.id JOIN TransportSchedule c ON a.id = c.idTransport WHERE a.idDriver = ?1",
            nativeQuery = false
    )
    List<TransportWithLocationAndSchedule> transportInformation(Driver id);
}
