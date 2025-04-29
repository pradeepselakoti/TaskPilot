const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized - No user found' });
            }

            if (!Array.isArray(allowedRoles)) {
                allowedRoles = [allowedRoles];
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ 
                    message: 'Forbidden - You do not have the required role'
                });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
};

export default checkRole;