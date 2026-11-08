package com.fleetmaintenance.equipment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EquipmentRepository extends JpaRepository<EquipmentEntity,Long> {
    boolean existsByInternalCodeIgnoreCase(String code);
    @Query("select e from EquipmentEntity e where e.active=true and (:term is null or lower(e.name) like lower(concat('%',:term,'%')) or lower(e.internalCode) like lower(concat('%',:term,'%')) or lower(coalesce(e.brand,'')) like lower(concat('%',:term,'%'))) and (:status is null or e.status=:status)")
    Page<EquipmentEntity> search(@Param("term") String term,@Param("status") String status,Pageable pageable);
}
