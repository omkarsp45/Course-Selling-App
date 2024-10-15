const zod = require('zod');

const schema = zod.object({
    email: zod.string().email().min(5),
    password: zod.string().min(8).max(20),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3)
});

module.exports = schema