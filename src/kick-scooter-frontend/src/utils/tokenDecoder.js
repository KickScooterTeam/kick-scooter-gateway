import jwt from 'jwt-decode';

export default function getIdFromToken() {
    return jwt(localStorage.jwtToken).sub;
}