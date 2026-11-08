package com.fleetmaintenance.config;

import com.fleetmaintenance.users.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.Set;

@Component
public class AdminBootstrap implements CommandLineRunner {
    private final UserRepository users;
    private final RoleRepository roles;
    private final PasswordEncoder encoder;
    @Value("${FLEET_ADMIN_NAME:}") private String adminName;
    @Value("${FLEET_ADMIN_EMAIL:}") private String adminEmail;
    @Value("${FLEET_ADMIN_PASSWORD:}") private String adminPassword;

    public AdminBootstrap(UserRepository users,RoleRepository roles,PasswordEncoder encoder) {
        this.users=users;this.roles=roles;this.encoder=encoder;
    }
    @Override public void run(String... args) {
        if(adminEmail.isBlank()||adminPassword.isBlank()) return;
        if(adminPassword.length()<12) throw new IllegalStateException("FLEET_ADMIN_PASSWORD must have at least 12 characters.");
        if(users.findByEmailIgnoreCaseAndActiveTrue(adminEmail).isPresent()) return;
        var adminRole=roles.findByName("ADMIN").orElseThrow();
        var user=new UserEntity(adminName.isBlank()?"System Administrator":adminName,
                adminEmail.trim().toLowerCase(),encoder.encode(adminPassword),Set.of(adminRole));
        users.save(user);
    }
}
