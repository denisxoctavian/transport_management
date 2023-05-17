package draexlmaier.dtsm.service;

import draexlmaier.dtsm.model.Location;
import draexlmaier.dtsm.model.TransportSchedule;
import draexlmaier.dtsm.model.TransportScheduleWithDeliveryDate;
import draexlmaier.dtsm.repository.TransportScheduleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TransportScheduleService {


    private final TransportScheduleRepository transportScheduleRepository;

    @Autowired
    public TransportScheduleService(TransportScheduleRepository transportScheduleRepository) {
        this.transportScheduleRepository = transportScheduleRepository;
    }

    public TransportSchedule addTransportSchedule(TransportSchedule schedule){
        return transportScheduleRepository.save(schedule);
    }

    public TransportSchedule updateTransportSchedule(TransportSchedule schedule){
        return transportScheduleRepository.save(schedule);
    }

    public TransportSchedule findTransportScheduleById(int id){return transportScheduleRepository.findTransportScheduleById(id);}

    public void deleteTransportSchedule(int id){
        transportScheduleRepository.deleteById(id);
    }

    public List<TransportSchedule> findAllTransportSchedules(){
        return transportScheduleRepository.findAll();
    }

    public int findTransportScheduleGate(){
        return transportScheduleRepository.findTransportScheduleGate();
    }

    public List<TransportScheduleWithDeliveryDate>getAppointmentsFromLocation(Location id){
        return  transportScheduleRepository.getAppointmentsFromLocation(id);}
}
