import { v4 as uuidv4 } from 'uuid';

export const generateRandomName = () => {
  const firstName = [
    'John',
    'Jane',
    'Michael',
    'Emily',
    'David',
    'Sarah',
    'Robert',
    'Emma',
    'William',
    'Olivia',
    'James',
    'Ava',
    'Benjamin',
    'Sophia',
    'Alexander',
    'Isabella',
    'Daniel',
    'Mia',
    'Matthew',
    'Charlotte',
  ];

  const lastName = [
    'Smith',
    'Johnson',
    'Williams',
    'Jones',
    'Brown',
    'Davis',
    'Miller',
    'Wilson',
    'Moore',
    'Taylor',
    'Anderson',
    'Thomas',
    'Jackson',
    'White',
    'Harris',
    'Martin',
    'Thompson',
    'Garcia',
    'Martinez',
    'Robinson',
  ];

  const randomFirstName =
    firstName[Math.floor(Math.random() * firstName.length)];
  const randomLastName = lastName[Math.floor(Math.random() * lastName.length)];

  return `${randomFirstName} ${randomLastName}`;
};

export const generateRandomUuid = () => uuidv4();
export const generateRandomEmail = (name: string) =>
  `${name.replaceAll(' ', '_').toLowerCase()}${generateRandomUuid()}@gmail.com`;

export const generateRandomPhoneNumber = (countryCode: string) => {
  const areaCode = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  const firstPart = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  const secondPart = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return `${countryCode}-${areaCode}-${firstPart}-${secondPart}`;
};
