import decode from 'jwt-decode';

export const storeSessionTokens = (token, refreshToken) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
}

export const isAuthenticated = (): boolean => {
    const token: string = localStorage.getItem('token');
    const refreshToken: string = localStorage.getItem('refreshToken');
    try {
        decode(token);
        decode(refreshToken);
    } catch (err) {
        return false;
    }
    return true;
}