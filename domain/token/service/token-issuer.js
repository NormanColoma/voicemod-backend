const tokenIssuer = ({ jwtTokenIssuer }) => {
    return {
        issueToken: (token) => jwtTokenIssuer.issueToken(token)
    };
}

module.exports = tokenIssuer;