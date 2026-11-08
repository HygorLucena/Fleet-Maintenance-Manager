package com.fleetmaintenance.users;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="users")
public class UserEntity {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(name="full_name",nullable=false,length=140) private String fullName;
    @Column(nullable=false,unique=true,length=180) private String email;
    @Column(name="password_hash",nullable=false) private String passwordHash;
    @Column(nullable=false) private boolean active=true;
    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name="user_roles",joinColumns=@JoinColumn(name="user_id"),inverseJoinColumns=@JoinColumn(name="role_id"))
    private Set<RoleEntity> roles=new HashSet<>();
    protected UserEntity(){}
    public UserEntity(String fullName,String email,String passwordHash,Set<RoleEntity> roles) {
        this.fullName=fullName;this.email=email;this.passwordHash=passwordHash;this.roles=roles;
    }
    public Long getId(){return id;} public String getFullName(){return fullName;}
    public String getEmail(){return email;} public String getPasswordHash(){return passwordHash;}
    public boolean isActive(){return active;} public Set<RoleEntity> getRoles(){return roles;}
}
