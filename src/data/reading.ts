import type { ReadingPassage } from '../lib/types'

export const readingPassages: ReadingPassage[] = [
  {
    id: 'r6-1',
    part: 6,
    title: 'Part 6: Text Completion — Internal Memo',
    text: `To: All Staff
From: Office Administration
Subject: Parking Lot Renovation

Please be advised that the parking lot will be closed for renovation starting Monday. Employees are __(1)__ to use the temporary lot on Third Street during this period. The renovation is __(2)__ to take about two weeks to complete. We apologize for any __(3)__ this may cause. If you have any questions, please __(4)__ the administration office directly.`,
    questions: [
      { id: 'r6-1-1', question: 'Blank (1)', choices: ['requiring', 'required', 'requires', 'require'], answerIndex: 1, },
      { id: 'r6-1-2', question: 'Blank (2)', choices: ['expect', 'expected', 'expecting', 'expectation'], answerIndex: 1, },
      { id: 'r6-1-3', question: 'Blank (3)', choices: ['inconvenient', 'inconvenience', 'inconveniently', 'inconvenienced'], answerIndex: 1, },
      { id: 'r6-1-4', question: 'Blank (4)', choices: ['contact', 'contacting', 'contacted', 'contacts'], answerIndex: 0, },
    ],
  },
  {
    id: 'r6-2',
    part: 6,
    title: 'Part 6: Text Completion — Product Announcement',
    text: `We are excited to announce the launch of our new product line, __(1)__ will be available in stores starting next month. This collection was designed __(2)__ customer feedback collected over the past year. Early reviewers have described the products as __(3)__ and affordable. Visit our website for more details __(4)__ the release date approaches.`,
    questions: [
      { id: 'r6-2-1', question: 'Blank (1)', choices: ['who', 'which', 'whose', 'what'], answerIndex: 1, },
      { id: 'r6-2-2', question: 'Blank (2)', choices: ['base on', 'based on', 'basing on', 'basis of'], answerIndex: 1, },
      { id: 'r6-2-3', question: 'Blank (3)', choices: ['innovative', 'innovation', 'innovate', 'innovatively'], answerIndex: 0, },
      { id: 'r6-2-4', question: 'Blank (4)', choices: ['despite', 'because', 'as', 'although'], answerIndex: 2, },
    ],
  },
  {
    id: 'r7-1',
    part: 7,
    title: 'Part 7: Single Passage — Email',
    text: `From: Anna Weber, HR Manager
To: All Employees
Subject: Annual Health Checkup

Dear Team,

As part of our employee wellness program, the annual health checkup will take place from October 14 to October 18 at the company clinic on the 2nd floor. Appointments are available between 9:00 a.m. and 4:00 p.m. each day. Please book your slot through the HR portal by October 7, as space is limited.

Employees who complete the checkup will receive a wellness voucher worth 500 baht, redeemable at the company cafeteria. Please note that this checkup is optional but highly recommended.

If you have any questions, contact the HR department at ext. 245.

Best regards,
Anna Weber`,
    questions: [
      {
        id: 'r7-1-1',
        question: 'What is the purpose of the email?',
        choices: [
          'To announce a company holiday',
          'To inform employees about an annual health checkup',
          'To request budget approval',
          'To introduce a new HR manager',
        ],
        answerIndex: 1,
      },
      {
        id: 'r7-1-2',
        question: 'By when must employees book their appointment?',
        choices: ['October 7', 'October 14', 'October 18', 'October 245'],
        answerIndex: 0,
      },
      {
        id: 'r7-1-3',
        question: 'What will employees receive after completing the checkup?',
        choices: ['A day off', 'A cash bonus', 'A wellness voucher', 'A gym membership'],
        answerIndex: 2,
      },
    ],
  },
  {
    id: 'r7-2',
    part: 7,
    title: 'Part 7: Single Passage — Advertisement',
    text: `GRAND OPENING SALE — City Center Electronics

Visit our newly renovated store from June 1 to June 10 and enjoy discounts of up to 40% on all laptops, cameras, and accessories. The first 100 customers each day will receive a free wireless mouse.

Store hours: 10:00 a.m. – 9:00 p.m., Monday through Sunday.
Location: 2nd Floor, City Center Mall.

Members of our loyalty program will receive an additional 10% off. Sign up for free at the counter during the sale.`,
    questions: [
      {
        id: 'r7-2-1',
        question: 'How long will the sale last?',
        choices: ['One day', 'Ten days', 'One month', 'One week only'],
        answerIndex: 1,
      },
      {
        id: 'r7-2-2',
        question: 'What will the first 100 customers each day receive?',
        choices: ['A discount coupon', 'A free wireless mouse', 'A store membership card', 'A laptop bag'],
        answerIndex: 1,
      },
      {
        id: 'r7-2-3',
        question: 'How can customers get an additional discount?',
        choices: [
          'By paying in cash',
          'By shopping after 9 p.m.',
          'By joining the loyalty program',
          'By bringing a friend',
        ],
        answerIndex: 2,
      },
    ],
  },
]

export function readingByPart(part: 6 | 7) {
  return readingPassages.filter((p) => p.part === part)
}
