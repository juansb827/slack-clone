import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Channel } from 'src/channel/channel.entity';
@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column({ unique: true })
    name: string;

    @ManyToOne(type => User, user => user.teams)
    owner: User

    @ManyToMany(type => User)
    @JoinTable()
    members: User[];

    @OneToMany(type => Channel, channel => channel.team)
    channels: Channel[];

    
}