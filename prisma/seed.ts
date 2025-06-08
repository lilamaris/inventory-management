import { PrismaClient, Prisma, Category, User } from '@prisma/client'

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

const buildItemData = (category: Category, itemName: string) => {
    const quantity = Math.floor(Math.random() * 100) + 1
    const data = {
        name: itemName,
        sku: `${category.name.toUpperCase()}-${itemName.toUpperCase()}`,
        description: `This item is a ${itemName}`,
        quantity,
        categoryId: category.id,
        createdById: '',
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

    console.info('Creating categories...')
    await prisma.category.createMany({ data: categoryData })
    console.info(`Created categories`)

    console.info('Creating items...')
    const categories = await prisma.category.findMany()
    categories.forEach(async (category, index) => {
        const categoryItems = itemData[index]
        console.info(`Create ${category.name} items (target: ${categoryItems.length})`)
        for (const item of categoryItems) {
            const data = buildItemData(category, item)
            await prisma.inventoryItem.create({ data })
            console.info(`Created item: ${data.name} (${data.sku})`)
        }
        console.info(`Created ${categoryItems.length} items for category ${category.name}`)
    })
}

seed()
