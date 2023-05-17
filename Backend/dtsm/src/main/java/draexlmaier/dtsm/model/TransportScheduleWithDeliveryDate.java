package draexlmaier.dtsm.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.io.Serializable;


@Embeddable
public class TransportScheduleWithDeliveryDate implements Serializable {

    @ManyToOne
    @JoinColumn(name="idTransport",referencedColumnName = "id")
    private Transport transport;

    @ManyToOne
    @JoinColumn(name="idTransportSchedule",referencedColumnName = "id")
    private TransportSchedule transportSchedule;



    public TransportScheduleWithDeliveryDate(TransportSchedule transportSchedule, Transport transport) {
        this.transport = transport;
        this.transportSchedule = transportSchedule;
    }

    public TransportScheduleWithDeliveryDate() {}


    public Transport getTransport() {
        return transport;
    }

    public void setTransport(Transport transport) {
        this.transport = transport;
    }

    public TransportSchedule getTransportSchedule() {
        return transportSchedule;
    }

    public void setTransportSchedule(TransportSchedule transportSchedule) {
        this.transportSchedule = transportSchedule;
    }

    @Override
    public String toString() {
        return "TransportScheduleWithGate{" +
                "transport=" + transport +
                ", transportSchedule=" + transportSchedule +
                '}';
    }
}
