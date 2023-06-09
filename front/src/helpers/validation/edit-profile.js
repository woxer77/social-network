import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
  'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia',
  'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh',
  'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
  'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana',
  'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'C?te d\'Ivoire', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada',
  'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
  'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica', 'Croatia',
  'Cuba', 'Cyprus', 'Czechia (Czech Republic)', 'Democratic Republic of the Congo',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea',
  'Estonia', 'Eswatini (fmr. "Swaziland")', 'Ethiopia', 'Fiji',
  'Finland', 'France', 'Gabon', 'Gambia', 'Georgia',
  'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala',
  'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See',
  'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia',
  'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
  'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
  'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
  'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
  'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania',
  'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco',
  'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
  'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia (formerly Macedonia)',
  'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine State',
  'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
  'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
  'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
  'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
  'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia',
  'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
  'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
  'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania',
  'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago',
  'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay',
  'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen',
  'Zambia', 'Zimbabwe'
];

const schema = Yup.object().shape({
  email: Yup
    .string()
    .email('Email address must be valid'),
  firstName: Yup
    .string()
    .min(2, 'First name must contain at least 2 characters')
    .max(16, 'First name must be up to 16 characters long')
    .matches(/^[a-zA-Z]+([-'][a-zA-Z]+)?$/gm, 'The first name must contain only letters of the Latin alphabet, as well as - and \''),
  secondName: Yup
    .string()
    .min(2, 'Second name must contain at least 2 characters')
    .max(16, 'Second name must be up to 16 characters long')
    .matches(/^[a-zA-Z]+([-'][a-zA-Z]+)?$/gm, 'The second name must contain only letters of the Latin alphabet, as well as - and \''),
  password: Yup
    .string()
    .min(8, 'Password must contain at least 8 characters long')
    .max(64, 'Password must be up to 64 characters long')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[^\w]/, 'Password must contain a symbol'),
  dateOfBirth: Yup
    .date()
    .typeError('Date of birth must be in the format DD/MM/YYYY')
    .max(new Date(Date.now() - 567993600000), 'You must be at least 18 years'),
  gender: Yup
    .string(),
  country: Yup
    .string()
    .oneOf(countries, 'Incorrect country')
    .nullable(),
  phone: Yup
    .string()
    .matches(phoneRegExp, 'Phone number must be valid')
    .min(7, 'At least 7 characters')
    .max(15, 'Up to 15 characters')
    .nullable()
});

export default schema;
