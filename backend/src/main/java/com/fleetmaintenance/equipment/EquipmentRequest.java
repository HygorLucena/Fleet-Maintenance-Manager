package com.fleetmaintenance.equipment;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public record EquipmentRequest(
 @Size(max=40) String internalCode,
 @NotBlank @Size(max=160) String name,
 @Size(max=100) String equipmentType,@Size(max=100) String brand,@Size(max=100) String model,
 @Size(max=120) String serialNumber,@Min(1900) @Max(2100) Integer manufactureYear,
 LocalDate acquisitionDate,LocalDate fleetEntryDate,@Pattern(regexp="HOURMETER|ODOMETER|OTHER|") String meterType,
 @DecimalMin("0.0") BigDecimal currentMeter,@Size(max=100) String unitName,@Size(max=160) String location,
 @Size(max=100) String costCenter,@DecimalMin("0.0") BigDecimal acquisitionValue,
 @Size(max=180) String supplierName,String notes) {}
