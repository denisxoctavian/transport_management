package draexlmaier.dtsm.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "transport_schedule")
public class TransportSchedule implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="idGate",referencedColumnName = "id")
    private Gate idGate;
    @ManyToOne
    @JoinColumn(name="idTransport",referencedColumnName = "id")
     private Transport idTransport;
    private String arrivalTime;

    //0-pending 1-accepted  2-declined
    private int status;

    public TransportSchedule(){}
    public TransportSchedule(int id, Gate idGate, Transport idTransport, String arrivalTime,int status) {
        this.id = id;
        this.idGate = idGate;
        this.idTransport = idTransport;
        this.arrivalTime = arrivalTime;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Gate getIdGate() {
        return idGate;
    }

    public void setIdGate(Gate idGate) {
        this.idGate = idGate;
    }

    public Transport getIdTransport() {
        return idTransport;
    }

    public void setIdTransport(Transport idTransport) {
        this.idTransport = idTransport;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public int getStatus(){return status;}

    public void setStatus(int status){this.status=status;}

    @Override
    public String toString() {
        return "TransportSchedule{" +
                "id=" + id +
                ", idGate=" + idGate +
                ", idTransport=" + idTransport +
                ", arrivalTime=" + arrivalTime +
                ", status=" + status +
                '}';
    }
}
