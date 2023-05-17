package draexlmaier.dtsm.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.io.Serializable;
import java.util.Date;

@Embeddable
public class TransportWithLocationAndSchedule implements Serializable {

    @ManyToOne
    @JoinColumn(name="idTransport",referencedColumnName = "id")
    private Transport transport;

    @ManyToOne
    @JoinColumn(name="idTransportSchedule",referencedColumnName = "id")
    private TransportSchedule transportSchedule;

    @ManyToOne
    @JoinColumn(name="idLocation",referencedColumnName = "id")
    private Location location;


    public TransportWithLocationAndSchedule(){}
    public TransportWithLocationAndSchedule(Transport transport, TransportSchedule transportSchedule, Location location) {
        this.transport = transport;
        this.transportSchedule = transportSchedule;
        this.location = location;
    }


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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "TransportWithLocationAndSchedule{" +
                "transport=" + transport +
                ", transportSchedule=" + transportSchedule +
                ", location=" + location +
                '}';
    }
}
