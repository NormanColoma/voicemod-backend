const authValidator = require('../../../../infraestructure/rest/middlewares/auth-validator');
const JwtTokenIssuer = require('../../../../infraestructure/security/jwt-token-issuer');
const httpMocks = require('node-mocks-http');
const Token = require('../../../../domain/token/token');

describe('auth validator', () => {
    it('should return 401 when no headers provided', (next) => {
        const res = httpMocks.createResponse();

        const { statusCode, _getData, getHeader } = authValidator({}, res, next);

        const expectedError = { error: 'authentication required ' }

        expect(statusCode).toEqual(401);
        expect(_getData()).toEqual(expectedError);
        expect(getHeader('content-type')).toContain('application/json');

        next();
    });

    it('should return 403 when authorization header is present but without bearer', (next) => {
        const res = httpMocks.createResponse();
        const req = {
            headers: {
                authorization: 'pepe'
            }
        };

        const { statusCode, _getData, getHeader } = authValidator(req, res, next);

        const expectedError = { error: 'invalid token' }

        expect(statusCode).toEqual(403);
        expect(_getData()).toEqual(expectedError);
        expect(getHeader('content-type')).toContain('application/json');

        next();
    });

    it('should return 403 when authorization header is present but without token value', (next) => {
        const res = httpMocks.createResponse();
        const req = {
            headers: {
                authorization: 'Bearer '
            }
        };

        const { statusCode, _getData, getHeader } = authValidator(req, res, next);

        const expectedError = { error: 'invalid token' }

        expect(statusCode).toEqual(403);
        expect(_getData()).toEqual(expectedError);
        expect(getHeader('content-type')).toContain('application/json');

        next();
    });

    it('should return 403 when token provided is invalid', (next) => {
        const res = httpMocks.createResponse();
        const req = {
            headers: {
                authorization: 'Bearer 12345'
            }
        };

        const { statusCode, _getData, getHeader } = authValidator(req, res, next);

        const expectedError = { error: 'invalid token' }

        expect(statusCode).toEqual(403);
        expect(_getData()).toEqual(expectedError);
        expect(getHeader('content-type')).toContain('application/json');

        next();
    });

    it('should call next', (next) => {
        const token = new Token({
            user: {
                name: 'pepe',
                email: 'mail'
            },
            expiration: Math.floor(Date.now() / 1000) + (60 * 60)
        });

        const jwtTokenIssuer = new JwtTokenIssuer();
        const encodedToken = jwtTokenIssuer.issueToken(token.payload);

        const res = httpMocks.createResponse();
        const req = {
            headers: {
                authorization: `Bearer ${encodedToken}`
            }
        };

        const result = authValidator(req, res, next);

        expect(result).toBeUndefined();

        next();
    });
});