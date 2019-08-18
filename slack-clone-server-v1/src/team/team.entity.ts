import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/user/user.entity';
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
    members: Team[];
}