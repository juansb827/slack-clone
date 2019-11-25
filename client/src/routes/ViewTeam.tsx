import React from 'react';

import { Channels } from '../components/Channels';
import { Teams } from '../components/Teams';
import { Header } from '../components/Header';
import { Messages } from '../components/Messages';
import { SendMessage } from '../components/SendMessage';
import { AppLayout } from '../components/AppLayout';

export const ViewTeam = () => (
    <AppLayout>
        <Teams teams={[{ id: 1, initial: 'T' }, { id: 1, initial: 'B' }]} />
        <Channels 
            teamName="Team Name"
            userName="User name"
            channels={[{ id: 0, name: 'general' }, { id: 2, name: 'random'}]}
            users={[{ id: 0, name: 'slackbot' }, { id: 2, name: 'pepe'}]} />
        <Header channelName="general" />
        <Messages>
            <ul className="messages-list">
                <li></li>
            </ul>
        </Messages>
        <SendMessage channelName="random" />
    </AppLayout>
);