import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@main.com',
        password: bcrypt.hashSync('admin123456', 10),
        isAdmin: true
    },
    {
        name: 'Ryomen Sukuna',
        email: 'ryomensukuna31@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Gojo Satoru',
        email: 'gojosatoru31@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
]
export default users