"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res, next) {
    if (!req.jwtPayload.data.approved) {
        res.status(401).end('User not approved');
    }
    next();
});
