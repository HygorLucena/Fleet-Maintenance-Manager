package com.fleetmaintenance.equipment;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/equipment")
public class EquipmentController {
    private final EquipmentService service;
    public EquipmentController(EquipmentService service){this.service=service;}
    @GetMapping public Page<EquipmentEntity> list(@RequestParam(required=false) String search,
        @RequestParam(required=false) String status,@RequestParam(defaultValue="0") int page,
        @RequestParam(defaultValue="20") int size){
        if(page<0||size<1||size>100) throw new IllegalArgumentException("Invalid pagination parameters");
        return service.list(search,status,page,size);
    }
    @GetMapping("/{id}") public EquipmentEntity get(@PathVariable Long id){return service.get(id);}
    @PostMapping @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public EquipmentEntity create(@Valid @RequestBody EquipmentRequest request){return service.create(request);}
}
