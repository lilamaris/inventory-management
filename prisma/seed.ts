import { PrismaClient, Prisma, Category, User } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

const categoryData = [
    { name: 'Electronics', description: 'Electronics category' },
    { name: 'Furniture', description: 'Furniture category' },
]
const itemData = [
    [
        'Laptop',
        'Keyboard',
        'Mouse',
        'Monitor',
        'Speaker',
        'Headphone',
        'Printer',
        'Scanner',
        'Fax Machine',
        'Smartphone',
        'Tablet',
        'Camera',
        'Audio System',
        'Video System',
        'Gaming Console',
        'Smart Watch',
        'Smart TV',
        'Smart Home',
        'Smart Light',
        'Smart Lock',
        'Smart Thermostat',
        'Smart Speaker',
        'Smart Doorbell',
        'Smart Security Camera',
        'Smart Door Lock',
    ],
    [
        'Office Chair',
        'Desk',
        'Table',
        'Sofa',
        'Dining Table',
        'Dining Chair',
        'Wardrobe',
        'Bed',
        'Nightstand',
        'Dressing Table',
        'Mirror',
        'Lamp',
    ],
]

const permissionData: Prisma.PermissionCreateInput[] = [
    {
        resource: 'user',
        action: 'CREATE' as const,
        description: 'Create users',
    },
    {
        resource: 'user',
        action: 'VIEW',
        description: 'Read users',
    },
    {
        resource: 'user',
        action: 'UPDATE',
        description: 'Update users',
    },
    {
        resource: 'user',
        action: 'DELETE',
        description: 'Delete users',
    },
    {
        resource: 'role',
        action: 'CREATE',
        description: 'Create roles',
    },
    {
        resource: 'role',
        action: 'VIEW',
        description: 'Read roles',
    },
    {
        resource: 'role',
        action: 'UPDATE',
        description: 'Update roles',
    },
    {
        resource: 'role',
        action: 'DELETE',
        description: 'Delete roles',
    },
    {
        resource: 'permission',
        action: 'CREATE',
        description: 'Create permissions',
    },
    {
        resource: 'permission',
        action: 'VIEW',
        description: 'Read permissions',
    },
    {
        resource: 'permission',
        action: 'UPDATE',
        description: 'Update permissions',
    },
    {
        resource: 'permission',
        action: 'DELETE',
        description: 'Delete permissions',
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

const buildItemData = (category: Category, createdBy: User, itemName: string) => {
    const quantity = Math.floor(Math.random() * 100) + 1
    const data = {
        name: itemName,
        sku: `${category.name.toUpperCase()}-${itemName.toUpperCase()}`,
        description: `This item is a ${itemName}`,
        quantity,
        categoryId: category.id,
        createdById: createdBy.id,
    }

    return data
}

const seed = async () => {
    console.info('Cleaning up database...')
    await prisma.rolePermission.deleteMany()
    await prisma.permission.deleteMany()
    await prisma.role.deleteMany()
    await prisma.inventoryItem.deleteMany()
    await prisma.category.deleteMany()

    console.info('Creating permissions...')
    await prisma.permission.createMany({
        data: permissionData,
    })
    console.info(`Created permissions`)

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

    console.info('Create system user')
    const systemUser = await prisma.user.create({
        data: {
            email: 'system@example.com',
            name: 'System',
            passwordHash: await hash('system', 10),
            Role: {
                connect: {
                    name: 'Admin',
                },
            },
        },
    })
    console.info(`Created system user: ${systemUser.name}`)

    console.info('Creating categories...')
    await prisma.category.createMany({ data: categoryData })
    console.info(`Created categories`)

    console.info('Creating items...')
    const categories = await prisma.category.findMany()
    categories.forEach(async (category, index) => {
        const categoryItems = itemData[index]
        console.info(`Create ${category.name} items (target: ${categoryItems.length})`)
        for (const item of categoryItems) {
            const data = buildItemData(category, systemUser, item)
            await prisma.inventoryItem.create({ data })
            console.info(`Created item: ${data.name} (${data.sku})`)
        }
        console.info(`Created ${categoryItems.length} items for category ${category.name}`)
    })
}

seed()
