const tokenIssuer = ({ jwtTokenIssuer }) => {
    return {
        issueToken: (token) => jwtTokenIssuer.issueToken(token),
        decodeToken: (token) => jwtTokenIssuer.decodeToken(token)
    };
}

module.exports = tokenIssuer;