package draexlmaier.dtsm.service;

import draexlmaier.dtsm.model.Driver;
import draexlmaier.dtsm.model.Transport;
import draexlmaier.dtsm.model.TransportWithLocationAndSchedule;
import draexlmaier.dtsm.repository.TransportRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class TransportService {
    private final TransportRepository transportRepository;

    @Autowired
    public TransportService(TransportRepository transportRepository) {
        this.transportRepository = transportRepository;
    }

    public Transport addTransport(Transport transport){
        return transportRepository.save(transport);
    }

    public Transport updateTransport(Transport transport){
        return transportRepository.save(transport);
    }

    public Transport findTransportById(int id){return transportRepository.findTransportById(id);}

    public void deleteTransport(int id){
        transportRepository.deleteById(id);
    }

    public List<Transport> findAllTransports(){
        return transportRepository.findAll();
    }

    public List<Transport>getTransportsFromLocation(int id){return transportRepository.getTransportsFromLocation(id);}
    public List<String> findAvailableHours(int id, LocalDate deliveryDate){return transportRepository.availableHours(id,deliveryDate);}

    public List<TransportWithLocationAndSchedule>transportInformation(Driver id){return  transportRepository.transportInformation(id);}
    public int findTransportLocation(){
        return transportRepository.findTransportLocation();
    }
}
