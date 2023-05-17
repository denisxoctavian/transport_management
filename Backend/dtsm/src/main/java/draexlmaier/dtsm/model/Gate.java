package draexlmaier.dtsm.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;

@Entity
public class Gate implements Serializable {
    @Id
    int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    @JoinColumn(name="idLocation",referencedColumnName = "id")
    private Location idLocation;

    public Gate(){}
    public Gate(int id, Location idLocation) {
        this.id = id;
        this.idLocation = idLocation;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Location getIdLocation() {
        return idLocation;
    }

    public void setIdLocation(Location idLocation) {
        this.idLocation = idLocation;
    }

    @Override
    public String toString() {
        return "Gate{" +
                "id=" + id +
                ", idLocation=" + idLocation +
                '}';
    }
}
