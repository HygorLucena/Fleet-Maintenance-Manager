package com.fleetmaintenance.equipment;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name="equipment")
public class EquipmentEntity {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(name="internal_code",nullable=false,unique=true,length=40) private String internalCode;
    @Column(nullable=false,length=160) private String name;
    @Column(name="equipment_type",length=100) private String equipmentType;
    @Column(length=100) private String brand;
    @Column(length=100) private String model;
    @Column(name="serial_number",length=120) private String serialNumber;
    @Column(name="manufacture_year") private Integer manufactureYear;
    @Column(name="acquisition_date") private LocalDate acquisitionDate;
    @Column(name="fleet_entry_date") private LocalDate fleetEntryDate;
    @Column(name="meter_type",length=20) private String meterType;
    @Column(name="current_meter",precision=14,scale=2) private BigDecimal currentMeter;
    @Column(name="unit_name",length=100) private String unitName;
    @Column(length=160) private String location;
    @Column(name="cost_center",length=100) private String costCenter;
    @Column(name="acquisition_value",precision=15,scale=2) private BigDecimal acquisitionValue;
    @Column(name="supplier_name",length=180) private String supplierName;
    @Column(nullable=false,length=40) private String status="AVAILABLE";
    @Column(columnDefinition="TEXT") private String notes;
    @Column(nullable=false) private boolean active=true;
    protected EquipmentEntity(){}
    public EquipmentEntity(String code,String name,String type,String brand,String model,String serial,Integer year,
      LocalDate acquisition,LocalDate fleetEntry,String meterType,BigDecimal meter,String unit,String location,
      String costCenter,BigDecimal value,String supplier,String notes) {
      this.internalCode=code;this.name=name;this.equipmentType=type;this.brand=brand;this.model=model;this.serialNumber=serial;
      this.manufactureYear=year;this.acquisitionDate=acquisition;this.fleetEntryDate=fleetEntry;this.meterType=meterType;
      this.currentMeter=meter;this.unitName=unit;this.location=location;this.costCenter=costCenter;
      this.acquisitionValue=value;this.supplierName=supplier;this.notes=notes;
    }
    public Long getId(){return id;} public String getInternalCode(){return internalCode;} public String getName(){return name;}
    public String getEquipmentType(){return equipmentType;} public String getBrand(){return brand;} public String getModel(){return model;}
    public String getSerialNumber(){return serialNumber;} public Integer getManufactureYear(){return manufactureYear;}
    public LocalDate getAcquisitionDate(){return acquisitionDate;} public LocalDate getFleetEntryDate(){return fleetEntryDate;}
    public String getMeterType(){return meterType;} public BigDecimal getCurrentMeter(){return currentMeter;}
    public String getUnitName(){return unitName;} public String getLocation(){return location;} public String getCostCenter(){return costCenter;}
    public BigDecimal getAcquisitionValue(){return acquisitionValue;} public String getSupplierName(){return supplierName;}
    public String getStatus(){return status;} public String getNotes(){return notes;} public boolean isActive(){return active;}
}
