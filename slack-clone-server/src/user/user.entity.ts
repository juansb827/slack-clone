import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Team } from '../team/team.entity';
import { Message } from '../message/message.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(type => Team, team => team.owner)
    teams: Team[];

    @OneToMany(type => Message, message => message.user)
    messages: Team[]; 
}