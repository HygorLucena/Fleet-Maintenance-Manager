package com.fleetmaintenance.equipment;

import jakarta.validation.Validation;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class EquipmentRequestTest {
    @Test void equipmentNameIsRequired() {
        var validator=Validation.buildDefaultValidatorFactory().getValidator();
        var request=new EquipmentRequest(null," ",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
        assertFalse(validator.validate(request).isEmpty());
    }
}
