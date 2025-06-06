import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const permissionData: Prisma.PermissionCreateInput[] = [
    {
        action: 'users:create',
        description: 'Create users',
    },
    {
        action: 'users:read',
        description: 'Read users',
    },
    {
        action: 'users:update',
        description: 'Update users',
    },
    {
        action: 'users:delete',
        description: 'Delete users',
    },
    {
        action: 'role.create',
        description: 'Create roles',
    },
    {
        action: 'role.read',
        description: 'Read roles',
    },
    {
        action: 'role.update',
        description: 'Update roles',
    },
    {
        action: 'role.delete',
        description: 'Delete roles',
    },
    {
        action: 'permission.create',
        description: 'Create permissions',
    },
    {
        action: 'permission.read',
        description: 'Read permissions',
    },
    {
        action: 'permission.update',
        description: 'Update permissions',
    },
    {
        action: 'permission.delete',
        description: 'Delete permissions',
    },
    {
        action: 'permission.assign',
        description: 'Assign permissions to roles',
    },
    {
        action: 'permission.withhold',
        description: 'Withhold permissions from roles',
    },
    {
        action: 'role.assign',
        description: 'Assign roles to users',
    },
    {
        action: 'role.withhold',
        description: 'Withhold roles from users',
    },
]

const roleData: Prisma.RoleCreateInput[] = [
    {
        name: 'Admin',
        description: 'Administrator role',
    },
    {
        name: 'Manager',
        description: 'Manager role',
    },
    {
        name: 'Staff',
        description: 'Staff role',
    },
]

const seed = async () => {
    console.info('Cleaning up database...')
    await prisma.permission.deleteMany()
    await prisma.role.deleteMany()
    await prisma.user.deleteMany()

    console.info('Creating permissions...')
    const count = await prisma.permission.createMany({
        data: permissionData,
    })
    console.info(`Created ${count} permissions`)

    console.info('Creating roles...')
    for (const role of roleData) {
        await prisma.role.create({
            data: role,
        })
        console.info(`Created role: ${role.name}`)
    }

    console.info('Assigning permissions to admin generic role...')
    const adminRole = await prisma.role.findUnique({
        where: { name: 'Admin' },
    })
    if (!adminRole) {
        console.error('Admin role not found')
        return
    }
    const permissions = await prisma.permission.findMany()
    const adminPermission = await prisma.rolePermission.createMany({
        data: permissions.map((permission) => ({
            roleId: adminRole.id,
            permissionId: permission.id,
        })),
    })
    console.info(`Created ${adminPermission.count} admin permissions`)
}

seed()
