package draexlmaier.dtsm.repository;


import draexlmaier.dtsm.model.Location;
import draexlmaier.dtsm.model.TransportSchedule;
import draexlmaier.dtsm.model.TransportScheduleWithDeliveryDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransportScheduleRepository extends JpaRepository<TransportSchedule,Integer> {
    TransportSchedule findTransportScheduleById(int id);

    void deleteTransportScheduleById(int id);

    @Query(
            value = "SELECT * FROM `transport_schedule`",
            nativeQuery = true
    )
    List<TransportSchedule> findAllTransportSchedules();

    @Query(
            value = "SELECT b.id from transport_schedule a inner join transport b on a.id_transport = b.id",
            nativeQuery = true
    )
    TransportSchedule findTransportSchedule();

    @Query(
            value = "SELECT b.id from transport_schedule a inner join gate b on a.id_gate = b.id",
            nativeQuery = true
    )
    int findTransportScheduleGate();

    @Query(
            value = "SELECT  new draexlmaier.dtsm.model.TransportScheduleWithDeliveryDate(a, b) FROM TransportSchedule  a JOIN Transport  b ON a.idTransport = b.id WHERE b.idLocation = ?1 and a.status='0' order by b.deliveryDate" ,
            nativeQuery = false
    )
    List<TransportScheduleWithDeliveryDate> getAppointmentsFromLocation(Location id);

}

