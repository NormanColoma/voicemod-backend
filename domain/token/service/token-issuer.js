const tokenIssuer = ({ jwtTokenIssuer }) => {
    return {
        issueToken: (token) => jwtTokenIssuer.issueToken(token),
        decodeToken: (token) => jwtTokenIssuer.decode(token)
    };
}

module.exports = tokenIssuer;