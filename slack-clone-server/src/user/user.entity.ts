import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { IsAlphanumeric, IsEmail, Length } from "class-validator";

import { Team } from '../team/team.entity';
import { Message } from '../message/message.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsAlphanumeric({
        message: 'The $property can only contain numbers and letters'
    })    
    @Length(3, 30, {
        message: 'The $property has to be between $constraint1 and $constraint2 characters long'
    })
    username: string;

    @Column({ nullable: false })
    @Length(5, 50, {
        message: 'The $property has to be between $constraint1 and $constraint2 characters long'
    })
    password: string;

    @Column({ unique: true })
    @Length(3, 30, {
        message: 'The $property username has to be between $constraint1 and $constraint2 characters long'
    })
    @IsEmail(null, {
      message: 'Invalid email'  
    })
    email: string;

    @OneToMany(type => Team, team => team.owner)
    teams: Team[];

    @OneToMany(type => Message, message => message.user)
    messages: Team[]; 
}