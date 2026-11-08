package com.fleetmaintenance.users;

import jakarta.persistence.*;

@Entity
@Table(name="roles")
public class RoleEntity {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false,unique=true,length=40) private String name;
    public Long getId(){return id;} public String getName(){return name;}
}
