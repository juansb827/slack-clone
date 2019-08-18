
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Channel {
    id: number;
    name: string;
    public: boolean;
    messages: Message[];
    users: User[];
}

export class Message {
    id: number;
    username: string;
    email: string;
    user: User;
    channel: Channel;
}

export abstract class IQuery {
    abstract messages(): Message[] | Promise<Message[]>;

    abstract users(): User[] | Promise<User[]>;
}

export class Team {
    id: number;
    owner: User;
    members: User[];
    channels: Channel[];
}

export class User {
    id: number;
    username: string;
    email: string;
    teams: Team[];
}
