package draexlmaier.dtsm.model;

import jakarta.persistence.*;


import java.io.Serializable;
import java.util.Date;

@Entity
public class Transport implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @ManyToOne
    @JoinColumn(name = "idDriver",referencedColumnName = "id")
    private Driver  idDriver;
    @ManyToOne
    @JoinColumn(name="idLocation",referencedColumnName = "id")
    private Location idLocation;
    String status;
    Date shippingDate;
    @Column(nullable = true)
    Date deliveryDate;

    public Transport(){}
    public Transport(int id, Driver idDriver, Location idLocation, String status, Date shippingDate, Date deliveryDate) {
        this.id = id;
        this.idDriver = idDriver;
        this.idLocation = idLocation;
        this.status = status;
        this.shippingDate = shippingDate;
        this.deliveryDate = deliveryDate;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Driver getIdDriver() {
        return idDriver;
    }

    public void setIdDriver(Driver idDriver) {
        this.idDriver = idDriver;
    }

    public Location getIdLocation() {
        return idLocation;
    }

    public void setIdLocation(Location idLocation) {
        this.idLocation = idLocation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getShippingDate() {
        return shippingDate;
    }

    public void setShippingDate(Date shippingDate) {
        this.shippingDate = shippingDate;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    @Override
    public String toString() {
        return "Transport{" +
                "id=" + id +
                ", idDriver=" + idDriver +
                ", idLocation=" + idLocation +
                ", status='" + status + '\'' +
                ", shippingDate=" + shippingDate +
                ", deliveryDate=" + deliveryDate +
                '}';
    }
}
