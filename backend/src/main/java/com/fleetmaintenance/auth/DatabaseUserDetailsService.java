package com.fleetmaintenance.auth;

import com.fleetmaintenance.users.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class DatabaseUserDetailsService implements UserDetailsService {
    private final UserRepository users;
    public DatabaseUserDetailsService(UserRepository users){this.users=users;}
    @Override public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var entity=users.findByEmailIgnoreCaseAndActiveTrue(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
        return User.withUsername(entity.getEmail()).password(entity.getPasswordHash())
                .authorities(entity.getRoles().stream().map(role->"ROLE_"+role.getName()).toArray(String[]::new)).build();
    }
}
