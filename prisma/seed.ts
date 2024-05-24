import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const saltOrRounds = 10;
const HealthCareProviders: Prisma.HealthcareProviderCreateManyInput[] =
  Array.from({ length: 10 }).map(() => ({ name: faker.person.fullName() }));

const HealthFacilityOfficer: Prisma.OfficerCreateInput = {
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: 'officer1@123',
};

async function main() {
  console.log('starting seeding...');
  await prisma.healthcareProvider.createMany({
    data: HealthCareProviders,
    skipDuplicates: true,
  });

  await prisma.officer.create({
    data: {
      ...HealthFacilityOfficer,
      password: await bcrypt.hash(HealthFacilityOfficer.password, saltOrRounds),
    },
  });
  console.log('seeding completed...');
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
