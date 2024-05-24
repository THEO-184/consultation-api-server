import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import {
  PrismaClient,
  Prisma,
  HealthCareProviderDepartment,
} from '@prisma/client';
const prisma = new PrismaClient();

const HealthFacilitiesSampleData: Prisma.HealthFacilityCreateManyInput[] =
  Array.from({
    length: 10,
  }).map(() => ({ name: faker.company.name() }));

async function main() {
  try {
    console.log('starting seeding...');
    console.log('creating health facilities...');
    const healthFacilitiesResults =
      await prisma.healthFacility.createManyAndReturn({
        data: HealthFacilitiesSampleData,
        skipDuplicates: true,
      });
    console.log(' health facilities created...');

    const ListOfOfficers: Prisma.OfficerCreateManyInput[] = Array.from({
      length: healthFacilitiesResults.length,
    }).map((item, id) => {
      return {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        // generate password for health officer based on the health facility's name and id
        password: `HO${healthFacilitiesResults[id].id}@${healthFacilitiesResults[id].name.substring(0, 5)}!`,
        healthFacilityId: healthFacilitiesResults[id].id,
      };
    });
    console.log('health officers details', ListOfOfficers);

    const OfficersListsWithHashedPasswords = await Promise.all(
      ListOfOfficers.map(async (officer) => {
        return {
          ...officer,
          password: await bcrypt.hash(officer.password, 10),
        };
      }),
    );

    console.log('creating health officers...');
    await prisma.officer.createMany({
      data: OfficersListsWithHashedPasswords,
      skipDuplicates: true,
    });
    console.log(' health officers created...');

    console.log('creating healthcare providers....');
    const healthcareProvidersToCreate: Prisma.HealthcareProviderCreateManyInput[] =
      [];

    healthFacilitiesResults.forEach((facility) => {
      const departments = [
        HealthCareProviderDepartment.doctor,
        HealthCareProviderDepartment.pharmacist,
        HealthCareProviderDepartment.nurse,
        HealthCareProviderDepartment.optometrist,
        HealthCareProviderDepartment.dietician,
      ];

      departments.forEach((department) => {
        healthcareProvidersToCreate.push({
          name: faker.person.fullName(),
          department,
          healthFacilityId: facility.id,
        });
      });
    });

    await prisma.healthcareProvider.createMany({
      data: healthcareProvidersToCreate,
      skipDuplicates: true, // Prevent duplicate entries
    });
    console.log(' healthcare providers created....');

    console.log('seeding completed...');
  } catch (error) {
    console.log('error seeding the database', error);
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
