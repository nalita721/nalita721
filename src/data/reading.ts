import type { ReadingPassage } from '../lib/types'

export const readingPassages: ReadingPassage[] = [
  {
    id: 'r6-1',
    part: 6,
    title: 'Part 6: Text Completion — Internal Memo',
    difficulty: 'easy',
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
    difficulty: 'medium',
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
    difficulty: 'medium',
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
        choices: ['October 7', 'October 14', 'October 18', 'October 1'],
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
    difficulty: 'medium',
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
  {
    id: 'r7-3',
    part: 7,
    title: 'Part 7: Single Passage — E-mail',
    difficulty: 'easy',
    text: `From: Kenji Sato, Brightway Office Supplies
To: Malee Chan
Date: May 5
Subject: Your Order #4821

Dear Ms. Chan,

Thank you for your recent order of 20 boxes of printer paper and 5 ink cartridges. Unfortunately, the ink cartridges you ordered (model BX-200) are currently out of stock. We expect a new shipment to arrive on May 12.

The printer paper was shipped this morning and should reach your office by Thursday. We will send the ink cartridges as soon as they arrive, at no extra delivery charge.

If you would prefer to cancel the ink cartridges instead, please reply to this e-mail by May 8, and we will refund the full amount to your credit card.

We apologize for the delay.

Sincerely,
Kenji Sato
Customer Service`,
    questions: [
      {
        id: 'r7-3-1',
        question: 'Why did Mr. Sato write the e-mail?',
        choices: [
          'To advertise a new printer model',
          'To request payment for an order',
          'To explain a delay in part of an order',
          'To confirm a change of delivery address',
        ],
        answerIndex: 2,
      },
      {
        id: 'r7-3-2',
        question: 'When should the printer paper arrive?',
        choices: ['By Thursday', 'On May 8', 'On May 12', 'Next month'],
        answerIndex: 0,
      },
      {
        id: 'r7-3-3',
        question: 'What should Ms. Chan do if she does not want to wait for the ink cartridges?',
        choices: [
          'Call the customer service department',
          'Visit the store in person',
          'Pay an extra delivery charge',
          'Reply to the e-mail by May 8',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    id: 'r7-4',
    part: 7,
    title: 'Part 7: Single Passage — Notice',
    difficulty: 'medium',
    text: `NOTICE TO ALL TENANTS
Harbor View Office Tower

Elevator Maintenance — Saturday, March 21, and Sunday, March 22

Our building management team will carry out scheduled maintenance on the passenger elevators this weekend. Elevators A and B will be out of service on Saturday from 8:00 a.m. to 6:00 p.m. Elevators C and D will be out of service on Sunday during the same hours.

The freight elevator will remain available on both days for tenants who need to move heavy items. Please reserve it in advance at the security desk on the ground floor. Tenants expecting weekend deliveries are asked to inform their suppliers of these arrangements. The stairwells on the east and west sides of the building will remain open at all times.

We apologize for any inconvenience. If you have any questions, please call the management office at 02-555-0187 between 9:00 a.m. and 5:00 p.m., Monday to Friday.`,
    questions: [
      {
        id: 'r7-4-1',
        question: 'What is the purpose of the notice?',
        choices: [
          'To introduce a new building manager',
          'To announce a change in office hours',
          'To request feedback from tenants',
          'To inform tenants about a temporary service interruption',
        ],
        answerIndex: 3,
      },
      {
        id: 'r7-4-2',
        question: 'What are tenants who need to move heavy items asked to do?',
        choices: [
          'Use the east stairwell',
          'Reserve the freight elevator at the security desk',
          'Postpone their deliveries until Monday',
          'Call the management office on Sunday',
        ],
        answerIndex: 1,
      },
      {
        id: 'r7-4-3',
        question: 'When will Elevator C be out of service?',
        choices: [
          'On Sunday, from 8:00 a.m. to 6:00 p.m.',
          'On Saturday, from 8:00 a.m. to 6:00 p.m.',
          'All weekend',
          'On Monday, from 9:00 a.m. to 5:00 p.m.',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    id: 'r7-5',
    part: 7,
    title: 'Part 7: Single Passage — Article',
    difficulty: 'medium',
    text: `Coworking Spaces Expand Beyond the Capital

CHIANG MAI — Shared office spaces, once found almost entirely in Bangkok, are now opening rapidly in regional cities. According to a report released last month by the Northern Business Council, the number of coworking centers in Chiang Mai has tripled over the past three years, and similar growth has been recorded in Khon Kaen and Hat Yai.

Industry observers attribute the trend to several factors. Many companies now allow employees to work remotely for part of the week, and some workers have chosen to relocate to cities with lower living costs. In addition, small businesses that cannot afford long-term leases appreciate the flexibility of renting a desk by the day or by the month.

"Our members range from freelance designers to the regional sales teams of large corporations," said Pimchanok Rattana, founder of Nimman Hub, which opened its second location in January. "What they all want is a reliable internet connection, a professional place to meet clients, and a sense of community." Nimman Hub's two sites currently serve about 400 members, and Ms. Rattana plans to open a third in Lampang next year.

However, not everyone is convinced that the boom will last. Some analysts warn that too many new centers could lead to an oversupply of space, which would force operators to lower their prices. Others point out that coworking centers outside the capital still depend heavily on short-term users, whose numbers can drop sharply during the rainy season.

For now, though, operators remain optimistic. Most say that their occupancy rates are higher than they were a year ago.`,
    questions: [
      {
        id: 'r7-5-1',
        question: 'What is the article mainly about?',
        choices: [
          'The growth of shared office spaces in regional cities',
          'The rising cost of office rent in Bangkok',
          'A new government policy on remote work',
          'The opening of a business council in Chiang Mai',
        ],
        answerIndex: 0,
      },
      {
        id: 'r7-5-2',
        question: 'What is NOT mentioned as a reason for the popularity of coworking centers?',
        choices: [
          'More companies allow remote work',
          'Some workers have moved to cities with lower living costs',
          'The government offers tax benefits to new businesses',
          'Small businesses want flexible rental terms',
        ],
        answerIndex: 2,
      },
      {
        id: 'r7-5-3',
        question: 'The word "attribute" in paragraph 2, line 1, is closest in meaning to',
        choices: ['describe', 'limit', 'announce', 'credit'],
        answerIndex: 3,
      },
      {
        id: 'r7-5-4',
        question: 'What is indicated about Nimman Hub?',
        choices: [
          'It currently has three locations.',
          'It intends to open a site in another city.',
          'It opened its first office in January.',
          'It serves only freelance designers.',
        ],
        answerIndex: 1,
      },
    ],
  },
  {
    id: 'r7-6',
    part: 7,
    title: 'Part 7: Double Passage — Advertisement & E-mail',
    difficulty: 'medium',
    text: `[Passage 1 — Advertisement]

Lotus Language Center — Business English Courses (Summer Term)

• General Business English: Mon. & Wed., 6:00–8:00 p.m. — 6,500 baht
• Presentation Skills: Tue. & Thu., 6:00–8:00 p.m. — 7,200 baht
• Business Writing: Sat., 9:00 a.m.–12:00 p.m. — 6,800 baht
• TOEIC Preparation: Sat., 1:00–4:00 p.m. — 7,500 baht

All courses run for ten weeks, beginning July 6. Classes are limited to 12 students. Register before June 20 to receive a 15% early-registration discount. Companies enrolling three or more employees in the same course receive an additional 5% off. A free placement test is available every Friday at 5:00 p.m. Call 053-210-447 to reserve a seat.

[Passage 2 — E-mail]

From: Somchai Prasert
To: Lotus Language Center
Date: June 24
Subject: Course inquiry

Dear Sir or Madam,

I work as an account manager at a logistics firm, and I will be giving several presentations to overseas clients later this year. I would like to enroll in the course that focuses on this skill. However, I have a team meeting every Tuesday evening until 7:00 p.m., so I may not be able to attend the full class on those days. Could you tell me whether the course is also offered at another time?

Also, two of my colleagues are interested in the TOEIC course. If the three of us register at the same time, would we receive the company discount?

Thank you,
Somchai Prasert`,
    questions: [
      {
        id: 'r7-6-1',
        question: 'What is indicated about all the courses in the advertisement?',
        choices: [
          'They are held on weekends.',
          'They are taught by native speakers.',
          'They require a paid placement test.',
          'They last for ten weeks.',
        ],
        answerIndex: 3,
      },
      {
        id: 'r7-6-2',
        question: 'Which course does Mr. Prasert want to take?',
        choices: ['Presentation Skills', 'Business Writing', 'TOEIC Preparation', 'General Business English'],
        answerIndex: 0,
      },
      {
        id: 'r7-6-3',
        question: 'Why is Mr. Prasert concerned?',
        choices: [
          'The course fee is higher than he expected.',
          'The class may already be full.',
          'A work commitment conflicts with the class time.',
          'He has not taken the placement test.',
        ],
        answerIndex: 2,
      },
      {
        id: 'r7-6-4',
        question: 'What is suggested about Mr. Prasert?',
        choices: [
          'He has already taken the placement test.',
          'He is too late to receive the early-registration discount.',
          'He works for a language school.',
          'He plans to teach a course.',
        ],
        answerIndex: 1,
      },
      {
        id: 'r7-6-5',
        question: 'Why would Mr. Prasert and his colleagues most likely NOT receive the company discount?',
        choices: [
          'They would register after July 6.',
          'There are fewer than three of them.',
          'Their classes are already full.',
          'They would not all be enrolled in the same course.',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    id: 'r7-7',
    part: 7,
    title: 'Part 7: Double Passage — Memo & E-mail',
    difficulty: 'hard',
    text: `[Passage 1 — Memo]

To: All Department Heads
From: Rachel Ng, Director of Operations
Date: September 3
Subject: Office relocation

As announced at last month's board meeting, our head office will move from Silom Tower to the new Pacific Center on Rama IV Road. The move will take place in three phases. The Finance and Legal departments will move on the weekend of October 10. Marketing and Sales will follow on October 24, and Human Resources and IT will complete the move on November 7. The IT department must be the last to relocate so that it can support the other teams throughout the process.

Each department head is asked to submit a list of equipment that needs to be transported, along with any special requirements, to the Facilities Office no later than September 19. Please note that the new building has a smaller storage area, so departments are encouraged to digitize paper files wherever possible. Staff who need help with scanning may request temporary assistants through Facilities.

Employees will receive new access cards on their first day at Pacific Center.

[Passage 2 — E-mail]

From: Daniel Kowalski, Marketing Manager
To: Rachel Ng
Date: September 8
Subject: RE: Office relocation

Dear Ms. Ng,

Thank you for the detailed schedule. I have one concern about our moving date. Our team is hosting the regional product launch on October 23 and 24, and most of my staff will be at the convention center on both days. Would it be possible for Marketing to move with the departments in the final phase instead? I understand that the IT team needs to move last, but we would not need technical support until the following Monday.

In addition, we have about 30 boxes of printed brochures and display materials that we use at trade shows. I would like to know whether we could keep them in an off-site warehouse rather than at the new office. I will send our equipment list to the Facilities Office by the deadline.

Best regards,
Daniel Kowalski`,
    questions: [
      {
        id: 'r7-7-1',
        question: 'What is the main purpose of the memo?',
        choices: [
          'To announce the results of a board meeting',
          'To explain the plan for moving to a new office',
          'To introduce a new Director of Operations',
          'To request volunteers for a product launch',
        ],
        answerIndex: 1,
      },
      {
        id: 'r7-7-2',
        question: 'According to the memo, why will the IT department move last?',
        choices: [
          'To help the other departments during the move',
          'To finish installing equipment in Silom Tower',
          'To avoid moving during the product launch',
          'To prepare the new access cards',
        ],
        answerIndex: 0,
      },
      {
        id: 'r7-7-3',
        question: 'On what date does Mr. Kowalski want his department to move?',
        choices: ['October 10', 'October 24', 'November 7', 'September 19'],
        answerIndex: 2,
      },
      {
        id: 'r7-7-4',
        question: 'Why does Mr. Kowalski ask to change the moving date?',
        choices: [
          'His department needs more technical support.',
          'He has not finished the equipment list.',
          'The convention center is closed in October.',
          'Most of his staff will be busy with an event on the scheduled date.',
        ],
        answerIndex: 3,
      },
      {
        id: 'r7-7-5',
        question: "Which issue mentioned in the memo is Mr. Kowalski's second request most likely related to?",
        choices: [
          'The distribution of new access cards',
          'The limited storage space in the new building',
          'The availability of scanning assistants',
          'The deadline for submitting equipment lists',
        ],
        answerIndex: 1,
      },
    ],
  },
  {
    id: 'r7-8',
    part: 7,
    title: 'Part 7: Triple Passage — Web Page, Schedule & E-mail',
    difficulty: 'hard',
    text: `[Passage 1 — Web Page]

Green Pack Asia 2027 — Registration

Join packaging professionals from across the region at Green Pack Asia, to be held November 15–17 at the Andaman Convention Center in Phuket.

• Full Pass (all three days, including workshops): US$450
• Day Pass (any single day, excluding workshops): US$180
• Exhibitor Pass: included with booth rental

Full Passes purchased before September 30 receive a 20% early-bird discount. Workshops are open to Full Pass holders only and require separate sign-up, as seating is limited to 40 participants per session. Registered participants may transfer their pass to another person free of charge until November 1; after that date, a fee of US$50 applies.

[Passage 2 — Workshop Schedule]

Nov. 15 | 2:00–4:00 p.m. | Recyclable Materials for Food Packaging | Dr. Ayesha Malik
Nov. 16 | 10:00 a.m.–12:00 p.m. | Reducing Plastic in Shipping | Tomás Rivera
Nov. 16 | 2:00–4:00 p.m. | Designing for Consumer Reuse | Hana Kim
Nov. 17 | 10:00 a.m.–12:00 p.m. | Measuring Your Carbon Footprint | Lars Eriksen

* Because of high demand, the November 16 afternoon session has been moved to the larger Room C.

[Passage 3 — E-mail]

From: Supaporn Wongsa, Procurement Manager, Siam Fresh Foods
To: Green Pack Asia Registration Team
Date: November 4
Subject: Change of attendee

Dear Registration Team,

I purchased a Full Pass in August, but unfortunately I will be unable to attend the event because of a scheduling conflict. My colleague, Mr. Nattapong Lee, will attend in my place, so please transfer my registration to him.

He is especially interested in the workshop led by Mr. Rivera, as our company is currently looking for ways to cut plastic use in our deliveries. If that workshop is already full, he would like to attend the one on carbon measurement instead.

Please let me know how to pay any required fees.

Regards,
Supaporn Wongsa`,
    questions: [
      {
        id: 'r7-8-1',
        question: 'According to the web page, what is true about the workshops?',
        choices: [
          'They are free for Day Pass holders.',
          'They are held only on the first day.',
          'They require separate sign-up.',
          'They are led by exhibitors.',
        ],
        answerIndex: 2,
      },
      {
        id: 'r7-8-2',
        question: "What is suggested about Ms. Wongsa's pass?",
        choices: [
          'It was purchased at a discounted rate.',
          'It does not include access to workshops.',
          'It is valid for one day only.',
          'It was purchased by Mr. Lee.',
        ],
        answerIndex: 0,
      },
      {
        id: 'r7-8-3',
        question: 'How much will Ms. Wongsa most likely need to pay to transfer her registration?',
        choices: ['Nothing', 'US$180', 'US$90', 'US$50'],
        answerIndex: 3,
      },
      {
        id: 'r7-8-4',
        question: 'When does Mr. Lee most want to attend a workshop?',
        choices: [
          'November 15 at 2:00 p.m.',
          'November 16 at 10:00 a.m.',
          'November 16 at 2:00 p.m.',
          'November 17 at 2:00 p.m.',
        ],
        answerIndex: 1,
      },
      {
        id: 'r7-8-5',
        question: "Who leads the workshop Mr. Lee would attend if his first choice is full?",
        choices: ['Dr. Ayesha Malik', 'Hana Kim', 'Lars Eriksen', 'Tomás Rivera'],
        answerIndex: 2,
      },
    ],
  },
]

export function readingByPart(part: 6 | 7) {
  return readingPassages.filter((p) => p.part === part)
}
