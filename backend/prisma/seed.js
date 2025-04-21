const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
    const employee = await prisma.employee.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        hireDate: faker.date.past({ years: 5 }),
        birthDate: faker.date.past({ years: 30 }),
        gender: faker.helpers.arrayElement(['M', 'F']),
        salaries: {
          create: {
            fromDate: faker.date.past(),
            toDate: faker.date.future(),
            title: faker.person.jobTitle(),
            salary: faker.number.int({ min: 50000, max: 200000 }),
          }
        }
      }
    });

    console.log(`Created employee: ${employee.firstName} ${employee.lastName}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
