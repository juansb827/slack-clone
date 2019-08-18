
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

export abstract class IMutation {
    abstract createTeam(name: string): boolean | Promise<boolean>;

    abstract createUser(username: string, email: string, password: string): User | Promise<User>;
}

export abstract class IQuery {
    abstract messages(): Message[] | Promise<Message[]>;

    abstract allUsers(): User[] | Promise<User[]>;

    abstract getUser(id: number): User | Promise<User>;
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
