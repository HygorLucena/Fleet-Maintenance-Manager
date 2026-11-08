package com.fleetmaintenance.equipment;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.UUID;

@Service
public class EquipmentService {
    private final EquipmentRepository repository;
    public EquipmentService(EquipmentRepository repository){this.repository=repository;}
    @Transactional(readOnly=true)
    public Page<EquipmentEntity> list(String term,String status,int page,int size){
        return repository.search(term==null||term.isBlank()?null:term,status==null||status.isBlank()?null:status,
                PageRequest.of(page,size,Sort.by("name").ascending()));
    }
    @Transactional
    public EquipmentEntity create(EquipmentRequest request){
        String code=request.internalCode()==null||request.internalCode().isBlank()
                ?"EQ-"+UUID.randomUUID().toString().substring(0,8).toUpperCase():request.internalCode().trim();
        if(repository.existsByInternalCodeIgnoreCase(code)) throw new ResponseStatusException(HttpStatus.CONFLICT,"Internal code already exists");
        return repository.save(new EquipmentEntity(code,request.name().trim(),request.equipmentType(),request.brand(),
                request.model(),request.serialNumber(),request.manufactureYear(),request.acquisitionDate(),
                request.fleetEntryDate(),request.meterType(),request.currentMeter(),request.unitName(),
                request.location(),request.costCenter(),request.acquisitionValue(),request.supplierName(),request.notes()));
    }
    @Transactional(readOnly=true)
    public EquipmentEntity get(Long id){return repository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Equipment not found"));}
}
