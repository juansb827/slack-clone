import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { User } from '../user/user.entity';
import { Channel } from '../channel/channel.entity';

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(type => User, user => user.messages, {
        nullable: false
    })
    user: User;

    @ManyToOne(type => Channel, channel => channel.messages)
    channel: Channel;
}