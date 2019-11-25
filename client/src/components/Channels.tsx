import React from 'react';
import styled from 'styled-components';

const ChannelWrapper = styled.div`
    grid-column: 2;
    grid-row: 1 / 4;
    background-color: #4e3a4c;
    color: #958993;
    padding-left: 10px;
    padding-top: 10px;
`;

const TeamNameHeader = styled.h1`
    color: #fff;
    font-size: 20px;
    margin-bottom: 0;
`;

const SideBarList = styled.ul`
    width: 100%;
    list-style: none;
    padding-left: 0px;
`;
const SideBarListHeader = styled.li`
    font-weight: bold;
`;
const SideBarListItem = styled.li`
    &:hover {
        background: #3e313c;
    }
`;

const Green = styled.span`
    color: #38978d;
`;
const Bubble = ({ on = true }) => (on ? <Green>●</Green> : <>○</>);

export interface ChannelProps {
    userName: string;
    teamName: string;
    channels: any[];
    users: any[];
}

const channel = ({ id, name }) => <SideBarListItem key={`channel-${id}`}># {name}</SideBarListItem>;
const user = ({ id, name }) => (
    <SideBarListItem key={`channel-${id}`}>
        <Bubble /> {name}
    </SideBarListItem>
);

export const Channels = ({ teamName, userName, channels, users }: ChannelProps) => (
    <ChannelWrapper>
        <div>
            <TeamNameHeader>{teamName}</TeamNameHeader>
            <Bubble /> {userName}
        </div>
        <div>
            <SideBarList>
                <SideBarListHeader>Channels</SideBarListHeader>
                {channels.map(channel)}
            </SideBarList>
        </div>
        <div>
            <SideBarList>
                <SideBarListHeader>Direct Messages</SideBarListHeader>
                {users.map(user)}
            </SideBarList>
        </div>
    </ChannelWrapper>
);
