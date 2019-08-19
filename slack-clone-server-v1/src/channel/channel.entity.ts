import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import { Message } from 'src/message/message.entity';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Channel{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    isPublic: boolean;

    @OneToMany(type => Message, message => message.channel)
    messages: Message[];

    @ManyToOne(type => Team, team => team.channels)
    team: Team;

    @ManyToMany(type => User)
    @JoinTable()
    members: User[]
}