import React from 'react';
import styled from 'styled-components';
import { Header as SemanticHeader } from 'semantic-ui-react';
export const HeaderWrapper =  styled.div`
    grid-column: 3;
    grid-row: 1;
`;

export interface HeaderProps {
    channelName: string;
}

export const Header = ({ channelName }: HeaderProps) => (
    <HeaderWrapper>
        <SemanticHeader># {channelName}</SemanticHeader>
    </HeaderWrapper>
);