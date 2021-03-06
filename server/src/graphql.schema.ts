
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateTeamInput {
    name: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class RegisterInput {
    username: string;
    email: string;
    password: string;
}

export class Channel {
    id: number;
    name: string;
    isPublic: boolean;
    messages: Message[];
    users: User[];
}

export class CreateTeamResponse {
    ok: boolean;
    errors?: Error[];
}

export class Error {
    path: string;
    message: string;
}

export class LoginResponse {
    ok: boolean;
    token?: string;
    refreshToken?: string;
    errors?: Error[];
}

export class Message {
    id: number;
    username: string;
    email: string;
    user: User;
    channel: Channel;
}

export abstract class IMutation {
    abstract createChannel(teamId: number, name: string, isPublic?: boolean): boolean | Promise<boolean>;

    abstract createMessage(channelId: number, text: string): boolean | Promise<boolean>;

    abstract createTeam(input: CreateTeamInput): CreateTeamResponse | Promise<CreateTeamResponse>;

    abstract register(input?: RegisterInput): RegisterResponse | Promise<RegisterResponse>;

    abstract login(input?: LoginInput): LoginResponse | Promise<LoginResponse>;
}

export abstract class IQuery {
    abstract messages(): Message[] | Promise<Message[]>;

    abstract allUsers(): User[] | Promise<User[]>;

    abstract getUser(id: number): User | Promise<User>;
}

export class RegisterResponse {
    ok: boolean;
    user?: User;
    errors?: Error[];
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
