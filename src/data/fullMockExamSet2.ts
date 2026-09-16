import type { ExamItem } from '../lib/types'

// ============================================================
// SET 2 — brand-new full TOEIC-structure mock exam, standalone from fullMockExam.ts (Set 1)
// LISTENING SECTION — 100 questions (Part 1: 6, Part 2: 25, Part 3: 39, Part 4: 30)
// ============================================================

const part1: ExamItem[] = [
  {
    id: 'S2-L1-1',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: ตัวแทนบริษัทสองรายกำลังจับมือกันหน้าบูธงานแสดงสินค้า',
    imageId: 'handshake',
    questions: [
      {
        id: 'S2-L1-1-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'Two representatives are shaking hands at a trade show booth.',
          'A woman is signing a contract alone.',
          'Visitors are walking past an empty booth.',
          'A man is packing up display materials.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'Two representatives are shaking hands at a trade show booth.',
  },
  {
    id: 'S2-L1-2',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: ชายคนหนึ่งกำลังพิมพ์รายงานอยู่ที่โต๊ะทำงานในเวลากลางคืน',
    imageId: 'typing',
    questions: [
      {
        id: 'S2-L1-2-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A man is typing a report at his desk at night.',
          'A man is turning off his computer.',
          'A man is talking on the phone while standing.',
          'A man is organizing files in a cabinet.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'A man is typing a report at his desk late at night.',
  },
  {
    id: 'S2-L1-3',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: คนงานกำลังยกกล่องสินค้าขึ้นรถบรรทุกที่ท่าขนส่ง',
    imageId: 'truck',
    questions: [
      {
        id: 'S2-L1-3-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'Workers are loading boxes onto a truck at a loading dock.',
          'A truck is parked empty near the entrance.',
          'A worker is signing a delivery form indoors.',
          'Boxes are being stacked inside a warehouse shelf.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'Workers are loading boxes onto a truck at the loading dock.',
  },
  {
    id: 'S2-L1-4',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: เชฟกำลังจัดจานอาหารอย่างพิถีพิถันในครัว',
    imageId: 'chef',
    questions: [
      {
        id: 'S2-L1-4-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A chef is carefully plating a dish in the kitchen.',
          'A chef is taking an order from a customer.',
          'A chef is washing vegetables in a sink.',
          'A chef is sweeping the kitchen floor.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'A chef is carefully plating a dish in the kitchen.',
  },
  {
    id: 'S2-L1-5',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: ผู้โดยสารกำลังจ่ายค่าโดยสารขณะขึ้นรถบัส',
    imageId: 'bus',
    questions: [
      {
        id: 'S2-L1-5-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A passenger is paying the fare while boarding a bus.',
          'A bus driver is checking the engine outside.',
          'Passengers are exiting the bus at a stop.',
          'A passenger is reading a map on a bench.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'A passenger is paying the fare while boarding a bus.',
  },
  {
    id: 'S2-L1-6',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: พนักงานหญิงกำลังหยิบเอกสารที่พิมพ์เสร็จออกจากเครื่องพิมพ์',
    imageId: 'printer',
    questions: [
      {
        id: 'S2-L1-6-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'An employee is collecting printed documents from a printer.',
          'An employee is replacing the ink cartridge.',
          'An employee is unplugging the printer.',
          'An employee is carrying a printer to another room.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'An employee is collecting printed documents from a printer.',
  },
]

const part2Data: { script: string; choices: string[]; answerIndex: number }[] = [
  { script: 'What time does the shuttle leave for the airport?', choices: ['It leaves at six thirty.', 'It\'s a comfortable ride.', 'I flew last week.'], answerIndex: 0 },
  { script: 'Who\'s handling the client presentation this afternoon?', choices: ['Mr. Alvarez is.', 'It was very informative.', 'Around three o\'clock.'], answerIndex: 0 },
  { script: 'Have you booked the conference room for Thursday?', choices: ['Yes, it\'s reserved already.', 'It seats twenty people.', 'I attended on Tuesday.'], answerIndex: 0 },
  { script: 'Where did you put the signed contracts?', choices: ['They\'re in the top drawer.', 'I signed them yesterday.', 'It\'s a two-year contract.'], answerIndex: 0 },
  { script: 'Why is the delivery running late?', choices: ['The truck broke down.', 'It usually arrives at noon.', 'We ordered two boxes.'], answerIndex: 0 },
  { script: 'Could you forward me the meeting notes?', choices: ['Sure, I\'ll send them now.', 'The meeting ran long.', 'I took a lot of notes.'], answerIndex: 0 },
  { script: 'Isn\'t the new intern starting today?', choices: ['Yes, she arrives at nine.', 'She interned last summer.', 'The office is downtown.'], answerIndex: 0 },
  { script: 'How many people signed up for the workshop?', choices: ['About forty so far.', 'It starts next Monday.', 'In the training room.'], answerIndex: 0 },
  { script: 'When will the renovation be finished?', choices: ['By the end of the month.', 'It looks great already.', 'We hired a new contractor.'], answerIndex: 0 },
  { script: 'Do you know if the invoice has been paid?', choices: ['I\'ll check with accounting.', 'It was a large invoice.', 'We received it last week.'], answerIndex: 0 },
  { script: 'Which vendor supplies our office furniture?', choices: ['Westbrook Supply does.', 'They deliver on Fridays.', 'It\'s fairly priced.'], answerIndex: 0 },
  { script: 'Shouldn\'t we confirm the venue before sending invitations?', choices: ['Good point, I\'ll call them now.', 'The venue was lovely.', 'We invited fifty guests.'], answerIndex: 0 },
  { script: 'What\'s the fastest way to the convention center?', choices: ['Take the north exit and turn left.', 'It\'s a large building.', 'The conference is tomorrow.'], answerIndex: 0 },
  { script: 'Have the survey results been compiled yet?', choices: ['Not yet, I\'m working on it.', 'We surveyed our customers.', 'The results were mixed.'], answerIndex: 0 },
  { script: 'Who approved the extra budget for marketing?', choices: ['The finance committee did.', 'The budget doubled.', 'Last fiscal year.'], answerIndex: 0 },
  { script: 'Would you prefer the window seat or the aisle?', choices: ['The aisle, please.', 'I already boarded.', 'The flight was smooth.'], answerIndex: 0 },
  { script: 'The printer on the third floor is jammed again, isn\'t it?', choices: ['Yes, I already called IT.', 'It\'s out of paper.', 'I printed it this morning.'], answerIndex: 0 },
  { script: 'How do I reset my email password?', choices: ['Just click the "forgot password" link.', 'It\'s a strong password.', 'I reset mine last week.'], answerIndex: 0 },
  { script: 'Where should the new hires park on their first day?', choices: ['In the visitor lot near the entrance.', 'They start on Monday.', 'Parking is expensive downtown.'], answerIndex: 0 },
  { script: 'Can you recommend a reliable courier service?', choices: ['Try Falcon Express, they\'re quick.', 'I mailed it yesterday.', 'The package was heavy.'], answerIndex: 0 },
  { script: 'Who\'s covering the front desk during lunch?', choices: ['Priya is covering it.', 'Lunch starts at noon.', 'The desk needs cleaning.'], answerIndex: 0 },
  { script: 'Isn\'t the quarterly report due this Friday?', choices: ['Yes, we should finish it soon.', 'It\'s a lengthy report.', 'We reported the numbers.'], answerIndex: 0 },
  { script: 'What should I include in the expense report?', choices: ['Just the receipts and travel dates.', 'It\'s due next week.', 'I expensed my flight.'], answerIndex: 0 },
  { script: 'How do I request time off next month?', choices: ['Submit a form through the HR portal.', 'I took time off last month.', 'It\'s a busy month.'], answerIndex: 0 },
  { script: 'Would you mind proofreading this email before I send it?', choices: ['Not at all, send it over.', 'I already sent mine.', 'The email bounced back.'], answerIndex: 0 },
]

const part2: ExamItem[] = part2Data.map((q, i) => ({
  id: `S2-L2-${i + 1}`,
  part: 2 as const,
  section: 'listening' as const,
  audioScript: q.script,
  questions: [
    {
      id: `S2-L2-${i + 1}-q`,
      question: 'เลือกคำตอบที่เหมาะสมที่สุดกับคำถามที่ได้ยิน',
      choices: q.choices,
      answerIndex: q.answerIndex,
    },
  ],
  transcript: `Q: ${q.script} A: ${q.choices[q.answerIndex]}`,
}))

interface ConvoData {
  script: string
  qs: { question: string; choices: string[]; answerIndex: number }[]
}

const part3Data: ConvoData[] = [
  {
    script:
      'Woman: We need to book a venue for this year\'s holiday party. Have you found any options?\n' +
      'Man: I found a place called Cedar Hall, it can hold up to 150 guests.\n' +
      'Woman: That sounds perfect. Can you check if December 18th is available?\n' +
      'Man: I\'ll call them right now and confirm the date.',
    qs: [
      { question: 'What are the speakers planning?', choices: ['A product launch', 'A company holiday party', 'A retirement dinner', 'A training session'], answerIndex: 1 },
      { question: 'How many guests can Cedar Hall hold?', choices: ['Up to 50', 'Up to 100', 'Up to 150', 'Up to 200'], answerIndex: 2 },
      { question: 'What will the man do next?', choices: ['Cancel the booking', 'Call to confirm the date', 'Send invitations', 'Visit the venue in person'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: My monitor went completely black this morning, and nothing I do fixes it.\n' +
      'Woman: Let me send someone from IT to take a look at your desk.\n' +
      'Man: Thanks, I have a video call in twenty minutes though.\n' +
      'Woman: Don\'t worry, you can use the spare laptop in the supply room until it\'s fixed.',
    qs: [
      { question: 'What problem does the man report?', choices: ['His computer is too slow', 'His monitor stopped working', 'His keyboard is missing', 'His software crashed'], answerIndex: 1 },
      { question: 'What does the woman offer?', choices: ['To fix it herself', 'To send someone from IT', 'To buy a new monitor', 'To cancel his call'], answerIndex: 1 },
      { question: 'What can the man use in the meantime?', choices: ['A tablet', 'The spare laptop in the supply room', 'His phone', 'A different office'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: Hi, I\'m calling to schedule a demo of your inventory management software.\n' +
      'Man: Sure, we have openings this Wednesday or next Monday.\n' +
      'Woman: Wednesday works well. Can the demo include the reporting features?\n' +
      'Man: Absolutely, I\'ll make sure our specialist covers that in detail.',
    qs: [
      { question: 'Why is the woman calling?', choices: ['To cancel a subscription', 'To schedule a product demo', 'To file a complaint', 'To request a refund'], answerIndex: 1 },
      { question: 'Which day does the woman choose?', choices: ['Tuesday', 'Wednesday', 'Thursday', 'Monday'], answerIndex: 1 },
      { question: 'What does the woman want included?', choices: ['Pricing details', 'The reporting features', 'A free trial', 'Technical support'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: Excuse me, I ordered the grilled salmon, but this looks like chicken.\n' +
      'Woman: I\'m so sorry, let me check with the kitchen right away.\n' +
      'Man: No rush, but my colleagues have already started eating.\n' +
      'Woman: I\'ll have the correct dish out in five minutes, and dessert will be on us.',
    qs: [
      { question: 'What is the man\'s complaint?', choices: ['His food arrived cold', 'He received the wrong dish', 'His order took too long', 'The bill was incorrect'], answerIndex: 1 },
      { question: 'What does the woman offer?', choices: ['A full refund', 'A free dessert', 'A discount coupon', 'A different table'], answerIndex: 1 },
      { question: 'How long will the correct dish take?', choices: ['Two minutes', 'Five minutes', 'Ten minutes', 'Fifteen minutes'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: I wanted to let you know the panel decided to promote you to senior analyst.\n' +
      'Man: That\'s wonderful news, thank you so much!\n' +
      'Woman: Your new responsibilities will include mentoring two junior analysts.\n' +
      'Man: I\'m looking forward to it. When does the new role start?',
    qs: [
      { question: 'What is the woman announcing?', choices: ['A pay cut', 'A promotion', 'A resignation', 'A department transfer'], answerIndex: 1 },
      { question: 'What will the man\'s new role include?', choices: ['Managing the budget', 'Mentoring two junior analysts', 'Traveling abroad', 'Leading the sales team'], answerIndex: 1 },
      { question: 'What does the man ask?', choices: ['About his salary', 'When the new role starts', 'Who his manager will be', 'Where his new office is'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: Excuse me, my suitcase didn\'t come out on the baggage carousel.\n' +
      'Man: I\'m sorry about that. Could I see your baggage claim ticket?\n' +
      'Woman: Here it is. I really need it back before my meeting tomorrow.\n' +
      'Man: I\'ll file a report now and have it delivered to your hotel as soon as it\'s found.',
    qs: [
      { question: 'What is the woman\'s problem?', choices: ['Her flight was cancelled', 'Her suitcase is missing', 'She lost her passport', 'Her ticket was invalid'], answerIndex: 1 },
      { question: 'What does the man ask for?', choices: ['Her passport', 'Her baggage claim ticket', 'Her boarding pass', 'Her hotel address'], answerIndex: 1 },
      { question: 'What will the man do?', choices: ['Refund her ticket', 'File a report and deliver the bag later', 'Book her a new flight', 'Give her a replacement suitcase'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: We\'re interested in leasing the office suite on the eighth floor.\n' +
      'Woman: It\'s currently available, and the lease term is a minimum of two years.\n' +
      'Man: Does the rent include utilities and maintenance?\n' +
      'Woman: Maintenance is included, but utilities are billed separately each month.',
    qs: [
      { question: 'What are they discussing?', choices: ['Buying a building', 'Leasing office space', 'Selling furniture', 'Hiring a contractor'], answerIndex: 1 },
      { question: 'What is the minimum lease term?', choices: ['One year', 'Two years', 'Three years', 'Five years'], answerIndex: 1 },
      { question: 'What is NOT included in the rent?', choices: ['Maintenance', 'Utilities', 'Parking', 'Security'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: I\'d like to register two tickets for the charity gala next month.\n' +
      'Man: Great, would you like the standard or VIP table?\n' +
      'Woman: The VIP table, please. Does that include a reserved parking spot?\n' +
      'Man: It does, and I\'ll email your confirmation and payment link shortly.',
    qs: [
      { question: 'What is the woman registering for?', choices: ['A conference', 'A charity gala', 'A wedding', 'A trade show'], answerIndex: 1 },
      { question: 'What table does she choose?', choices: ['Standard', 'VIP', 'Group', 'Balcony'], answerIndex: 1 },
      { question: 'What will the man send her?', choices: ['A parking pass only', 'A confirmation and payment link', 'A printed ticket', 'A seating chart'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: I bought these shoes last week, but they\'re a size too small.\n' +
      'Woman: No problem, let me check if we have a larger size in stock.\n' +
      'Man: I\'d appreciate that. I have the receipt right here.\n' +
      'Woman: We do have your size. I can exchange them right now.',
    qs: [
      { question: 'Why does the man want an exchange?', choices: ['The shoes are damaged', 'The shoes are the wrong size', 'He changed his mind', 'The color faded'], answerIndex: 1 },
      { question: 'What does the man provide?', choices: ['His ID', 'His receipt', 'His membership card', 'His phone number'], answerIndex: 1 },
      { question: 'What does the woman do?', choices: ['Offers a refund instead', 'Exchanges the shoes immediately', 'Orders a size from another store', 'Asks him to come back later'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: The safety inspector is coming tomorrow to review the warehouse.\n' +
      'Man: I\'ll make sure the fire extinguishers are all checked today.\n' +
      'Woman: Good, and please make sure the aisles are clear of boxes.\n' +
      'Man: I\'ll get the team to clear everything by this evening.',
    qs: [
      { question: 'What is happening tomorrow?', choices: ['A staff meeting', 'A safety inspection', 'A product delivery', 'A company tour'], answerIndex: 1 },
      { question: 'What will the man check?', choices: ['The lighting', 'The fire extinguishers', 'The security cameras', 'The loading dock'], answerIndex: 1 },
      { question: 'What does the woman ask about the aisles?', choices: ['To paint them', 'To keep them clear of boxes', 'To widen them', 'To add new shelves'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: The new branch office in Chiang Mai opens in three weeks.\n' +
      'Woman: Has the furniture been delivered yet?\n' +
      'Man: Most of it has, but the desks are still being shipped.\n' +
      'Woman: Let\'s follow up with the supplier to make sure they arrive on time.',
    qs: [
      { question: 'What are they discussing?', choices: ['Closing an office', 'Opening a new branch office', 'Renovating headquarters', 'Hiring new managers'], answerIndex: 1 },
      { question: 'What is still being shipped?', choices: ['Chairs', 'Desks', 'Computers', 'Cabinets'], answerIndex: 1 },
      { question: 'What does the woman suggest?', choices: ['Cancelling the order', 'Following up with the supplier', 'Buying furniture locally', 'Delaying the opening'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: Our team is running out of storage on the current cloud plan.\n' +
      'Man: We could upgrade to the business tier, it doubles our storage.\n' +
      'Woman: How much more would that cost per month?\n' +
      'Man: About twenty dollars more, but it also includes better security features.',
    qs: [
      { question: 'What problem are they discussing?', choices: ['A software bug', 'Running out of storage space', 'A billing dispute', 'A slow internet connection'], answerIndex: 1 },
      { question: 'What does the man suggest?', choices: ['Deleting old files', 'Upgrading to the business tier', 'Switching providers', 'Buying a new server'], answerIndex: 1 },
      { question: 'What else does the upgraded plan include?', choices: ['Free training', 'Better security features', 'A dedicated manager', 'Unlimited users'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: The booth materials arrived, but the banner is missing.\n' +
      'Woman: Let me call the printing company to check on it.\n' +
      'Man: We open to the public in two hours, so time is tight.\n' +
      'Woman: I\'ll ask them to rush a replacement or send a digital file we can print locally.',
    qs: [
      { question: 'What is missing?', choices: ['The banner', 'The brochures', 'The chairs', 'The laptop'], answerIndex: 0 },
      { question: 'What will the woman do?', choices: ['Cancel the booth', 'Call the printing company', 'Redesign the banner', 'Ask for a refund'], answerIndex: 1 },
      { question: 'Why is time tight?', choices: ['The venue is closing', 'The show opens in two hours', 'The flight leaves soon', 'The team is leaving'], answerIndex: 1 },
    ],
  },
]

const part3: ExamItem[] = part3Data.map((c, i) => ({
  id: `S2-L3-${i + 1}`,
  part: 3 as const,
  section: 'listening' as const,
  audioScript: c.script,
  transcript: c.script,
  questions: c.qs.map((q, qi) => ({
    id: `S2-L3-${i + 1}-q${qi + 1}`,
    question: q.question,
    choices: q.choices,
    answerIndex: q.answerIndex,
  })),
}))

interface TalkData {
  script: string
  qs: { question: string; choices: string[]; answerIndex: number }[]
}

const part4Data: TalkData[] = [
  {
    script:
      'Attention passengers on flight 452 to Chicago, please note that boarding will now take place at gate 22 instead of gate 14. We apologize for any confusion this may cause and ask that you proceed to the new gate as soon as possible. Boarding will begin in twenty minutes.',
    qs: [
      { question: 'What is the announcement about?', choices: ['A cancelled flight', 'A gate change', 'A flight delay', 'A lost boarding pass'], answerIndex: 1 },
      { question: 'What is the new gate number?', choices: ['Gate 14', 'Gate 20', 'Gate 22', 'Gate 24'], answerIndex: 2 },
      { question: 'When will boarding begin?', choices: ['In ten minutes', 'In twenty minutes', 'In thirty minutes', 'In one hour'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Good morning, shoppers! Riverstone Department Store\'s annual weekend sale begins right now, with discounts of up to 50 percent on selected home goods and electronics. Be sure to visit the second floor for our biggest markdowns, and don\'t forget that our loyalty members receive an extra 10 percent off today only.',
    qs: [
      { question: 'What is being announced?', choices: ['A store closing', 'A weekend sale', 'A new store opening', 'A product recall'], answerIndex: 1 },
      { question: 'Where are the biggest markdowns?', choices: ['The first floor', 'The second floor', 'The basement', 'The rooftop'], answerIndex: 1 },
      { question: 'What do loyalty members get today?', choices: ['Free shipping', 'An extra 10 percent off', 'A free gift', 'Double reward points'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Good afternoon, everyone. I\'m pleased to introduce our new Chief Financial Officer, Ms. Reyes, who joins us after eight years at a leading investment firm. Before I hand it over to her, I\'ll quickly share that our quarterly revenue grew by 12 percent, exceeding our target. Ms. Reyes will now walk us through next year\'s financial outlook.',
    qs: [
      { question: 'What is the purpose of this talk?', choices: ['To announce layoffs', 'To introduce the new CFO and share results', 'To close the fiscal year', 'To welcome new interns'], answerIndex: 1 },
      { question: 'By how much did quarterly revenue grow?', choices: ['5 percent', '8 percent', '12 percent', '20 percent'], answerIndex: 2 },
      { question: 'What will Ms. Reyes discuss next?', choices: ['Employee benefits', 'Next year\'s financial outlook', 'A merger plan', 'Office relocation'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Welcome to the Northgate Art Gallery. I\'ll be guiding you through our new contemporary collection today. We\'ll start with the sculpture garden outside, then move indoors to view the painting exhibits on the first floor. Please note that touching the artwork is strictly prohibited, though photography without flash is welcome.',
    qs: [
      { question: 'Who is speaking?', choices: ['A security guard', 'A gallery tour guide', 'A ticket seller', 'An art collector'], answerIndex: 1 },
      { question: 'Where will the tour start?', choices: ['The painting exhibits', 'The sculpture garden', 'The gift shop', 'The lecture hall'], answerIndex: 1 },
      { question: 'What is prohibited?', choices: ['Photography', 'Touching the artwork', 'Talking quietly', 'Bringing bags'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Here\'s the weather update for this weekend\'s outdoor company picnic. Saturday looks clear with a high of 28 degrees, ideal conditions for the event. Sunday, however, may bring scattered thunderstorms in the afternoon, so organizers should keep Saturday as the primary date and treat Sunday as a backup only if needed.',
    qs: [
      { question: 'What event does this forecast concern?', choices: ['A wedding', 'An outdoor company picnic', 'A sports match', 'A construction project'], answerIndex: 1 },
      { question: 'What is the weather like Saturday?', choices: ['Rainy', 'Clear with a high of 28 degrees', 'Very cold', 'Foggy'], answerIndex: 1 },
      { question: 'What is recommended?', choices: ['Cancel the event', 'Keep Saturday as the primary date', 'Move indoors', 'Postpone to next month'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Hi, this is Daniel from Crestwood Insurance calling about invoice number 7742, which is now thirty days overdue. Could you give us a call back at your earliest convenience to arrange payment? If there\'s an issue with the invoice itself, please let us know so we can resolve it quickly.',
    qs: [
      { question: 'Why is Daniel calling?', choices: ['To offer a discount', 'To follow up on an overdue invoice', 'To cancel a policy', 'To confirm an appointment'], answerIndex: 1 },
      { question: 'How overdue is the invoice?', choices: ['Ten days', 'Fifteen days', 'Thirty days', 'Sixty days'], answerIndex: 2 },
      { question: 'What does Daniel ask the listener to do if there\'s a problem?', choices: ['Ignore the invoice', 'Let them know so it can be resolved', 'Pay only half', 'Wait until next month'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Before entering the construction site, everyone must wear a hard hat, safety goggles, and steel-toed boots. Stay behind the yellow barriers at all times, and do not operate any equipment unless you\'ve been certified. If you notice any hazard, report it immediately to the site supervisor.',
    qs: [
      { question: 'Where is this briefing taking place?', choices: ['In an office', 'At a construction site', 'In a warehouse', 'At a hospital'], answerIndex: 1 },
      { question: 'What must visitors wear?', choices: ['Name tags only', 'Hard hats, goggles, and steel-toed boots', 'Uniforms', 'Gloves only'], answerIndex: 1 },
      { question: 'What should be reported to the supervisor?', choices: ['Lunch breaks', 'Any hazard', 'Late arrivals', 'Equipment requests'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Thank you for joining today\'s webinar on cybersecurity best practices. We\'ll cover how to spot phishing emails, create strong passwords, and secure your home network. Please keep your microphones muted during the presentation, and we\'ll open the floor for questions during the final fifteen minutes.',
    qs: [
      { question: 'What is the topic of the webinar?', choices: ['Financial planning', 'Cybersecurity best practices', 'Project management', 'Customer service'], answerIndex: 1 },
      { question: 'What should participants do with their microphones?', choices: ['Keep them muted', 'Test them beforehand', 'Turn on video', 'Use headsets'], answerIndex: 0 },
      { question: 'When will questions be taken?', choices: ['At the beginning', 'Throughout the session', 'During the final fifteen minutes', 'After a break'], answerIndex: 2 },
    ],
  },
  {
    script:
      'Are you prepared for retirement? At Meridian Financial Planning, our advisors create personalized savings strategies tailored to your goals. Schedule a free consultation this month and receive a complimentary financial health check. Call us today or visit our website to book your appointment.',
    qs: [
      { question: 'What service does Meridian Financial Planning offer?', choices: ['Tax filing', 'Personalized retirement savings strategies', 'Real estate investment', 'Insurance claims'], answerIndex: 1 },
      { question: 'What is offered this month?', choices: ['A discount on fees', 'A free consultation and health check', 'A cash bonus', 'A free seminar ticket'], answerIndex: 1 },
      { question: 'How can listeners book an appointment?', choices: ['By visiting in person only', 'By calling or visiting the website', 'By mail', 'Through a mobile app'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Good evening, and welcome to the Fairview Public Library. Tonight we\'re delighted to host author Lena Brooks, who will discuss her latest novel and take questions from the audience afterward. Copies of her book will be available for purchase and signing in the lobby following the event.',
    qs: [
      { question: 'What event is taking place?', choices: ['A book club meeting', 'An author talk', 'A poetry competition', 'A film screening'], answerIndex: 1 },
      { question: 'What will happen after the discussion?', choices: ['A raffle drawing', 'A question and answer session', 'A dinner reception', 'A film screening'], answerIndex: 1 },
      { question: 'Where can attendees buy the book?', choices: ['Online only', 'In the lobby', 'At the front desk', 'Not available that night'], answerIndex: 1 },
    ],
  },
]

const part4: ExamItem[] = part4Data.map((t, i) => ({
  id: `S2-L4-${i + 1}`,
  part: 4 as const,
  section: 'listening' as const,
  audioScript: t.script,
  transcript: t.script,
  questions: t.qs.map((q, qi) => ({
    id: `S2-L4-${i + 1}-q${qi + 1}`,
    question: q.question,
    choices: q.choices,
    answerIndex: q.answerIndex,
  })),
}))

export const listeningExamItems: ExamItem[] = [...part1, ...part2, ...part3, ...part4]

// ============================================================
// READING SECTION — 100 questions (Part 5: 30, Part 6: 16, Part 7: 54)
// ============================================================

const part5Data: { sentence: string; choices: string[]; answerIndex: number }[] = [
  { sentence: 'The __ of the merger will be finalized by the end of the year.', choices: ['finalize', 'finalization', 'finalizing', 'finalized'], answerIndex: 1 },
  { sentence: 'Please review the attached file __ replying to this email.', choices: ['before', 'despite', 'unless', 'although'], answerIndex: 0 },
  { sentence: 'The technician responded __ to the emergency call.', choices: ['quick', 'quickly', 'quickness', 'quickened'], answerIndex: 1 },
  { sentence: 'Neither the supervisor nor the interns __ informed about the change.', choices: ['was', 'were', 'is', 'be'], answerIndex: 1 },
  { sentence: 'Sales figures have risen __ since the new campaign launched.', choices: ['sharp', 'sharply', 'sharpness', 'sharper'], answerIndex: 1 },
  { sentence: 'The warranty remains valid __ two years from the purchase date.', choices: ['for', 'since', 'by', 'from'], answerIndex: 0 },
  { sentence: 'The committee __ the budget proposal after careful review.', choices: ['approve', 'approved', 'approving', 'approval'], answerIndex: 1 },
  { sentence: 'Staff are encouraged to provide __ input during the review.', choices: ['constructive', 'constructively', 'construction', 'constructiveness'], answerIndex: 0 },
  { sentence: 'The factory is situated a short drive __ the city center.', choices: ['from', 'of', 'at', 'in'], answerIndex: 0 },
  { sentence: '__ the heavy traffic, the courier delivered the package on time.', choices: ['Despite', 'Although', 'Because', 'Unless'], answerIndex: 0 },
  { sentence: 'She has managed this branch __ she was transferred here.', choices: ['since', 'for', 'during', 'while'], answerIndex: 0 },
  { sentence: 'The updated manual __ several new safety guidelines.', choices: ['include', 'includes', 'including', 'included'], answerIndex: 1 },
  { sentence: 'It is essential __ the correct procedure during an inspection.', choices: ['follow', 'to follow', 'following', 'followed'], answerIndex: 1 },
  { sentence: 'The director requested __ the budget be revised immediately.', choices: ['that', 'for', 'of', 'on'], answerIndex: 0 },
  { sentence: 'This year\'s turnout was __ than last year\'s.', choices: ['large', 'larger', 'largest', 'largely'], answerIndex: 1 },
  { sentence: 'The engineer fixed the equipment __ any outside help.', choices: ['without', 'with', 'despite', 'unless'], answerIndex: 0 },
  { sentence: 'All applicants must check in __ the reception desk.', choices: ['at', 'in', 'on', 'to'], answerIndex: 0 },
  { sentence: 'The proposal was reviewed __ by the legal team.', choices: ['thorough', 'thoroughly', 'thoroughness', 'thoroughed'], answerIndex: 1 },
  { sentence: '__ the flight was delayed, passengers remained calm.', choices: ['Although', 'Because', 'Despite', 'Unless'], answerIndex: 0 },
  { sentence: 'The keynote speech was both __ and thought-provoking.', choices: ['inspire', 'inspiring', 'inspired', 'inspiration'], answerIndex: 1 },
  { sentence: 'We are looking for a candidate __ can lead the design team.', choices: ['who', 'whom', 'which', 'whose'], answerIndex: 0 },
  { sentence: 'The final draft __ approved before it is published.', choices: ['must', 'must be', 'must to be', 'must being'], answerIndex: 1 },
  { sentence: 'Guests may pay __ cash or credit card.', choices: ['either', 'neither', 'both', 'or'], answerIndex: 0 },
  { sentence: 'The firm intends to expand its network __ Latin America.', choices: ['into', 'on', 'at', 'for'], answerIndex: 0 },
  { sentence: 'The revised estimate was __ lower than the original.', choices: ['considerable', 'considerably', 'consideration', 'considering'], answerIndex: 1 },
  { sentence: 'If the parts fail to arrive, we __ delay the launch.', choices: ['will', 'would', 'had', 'are'], answerIndex: 0 },
  { sentence: 'The candidate\'s cover letter __ strong communication skills.', choices: ['demonstrate', 'demonstrates', 'demonstrating', 'demonstrated'], answerIndex: 1 },
  { sentence: 'Please retain this document __ the end of the audit.', choices: ['until', 'since', 'during', 'for'], answerIndex: 0 },
  { sentence: 'The two departments decided to __ their efforts on the new initiative.', choices: ['combine', 'combination', 'combining', 'combined'], answerIndex: 0 },
  { sentence: 'Of the three vendors, the last one is __ reliable.', choices: ['more', 'most', 'much', 'very'], answerIndex: 1 },
]

const part5: ExamItem[] = part5Data.map((q, i) => ({
  id: `S2-R5-${i + 1}`,
  part: 5 as const,
  section: 'reading' as const,
  sentence: q.sentence,
  questions: [
    {
      id: `S2-R5-${i + 1}-q`,
      question: 'เลือกคำตอบที่เหมาะสมที่สุดเพื่อเติมประโยคให้สมบูรณ์',
      choices: q.choices,
      answerIndex: q.answerIndex,
    },
  ],
}))

interface TextCompletionData {
  text: string
  blanks: { choices: string[]; answerIndex: number }[]
}

const part6Data: TextCompletionData[] = [
  {
    text: `To All Employees,
Starting next Tuesday, the building will __(1)__ a new digital badge system for entry. All staff are __(2)__ to pick up their new badge from the security desk by Monday. The new system __(3)__ approximately five seconds to scan at each entrance. If your badge does not work properly, please __(4)__ building security at extension 118.`,
    blanks: [
      { choices: ['implement', 'implemented', 'implementing', 'implements'], answerIndex: 0 },
      { choices: ['require', 'required', 'requiring', 'requirement'], answerIndex: 1 },
      { choices: ['take', 'takes', 'taking', 'taken'], answerIndex: 1 },
      { choices: ['contact', 'contacting', 'contacted', 'contacts'], answerIndex: 0 },
    ],
  },
  {
    text: `Enroll in Bright Minds Academy's new data analysis course and __(1)__ from expert-led instruction. Our curriculum, __(2)__ by industry professionals, covers everything from spreadsheets to data visualization. Students __(3)__ also access a private online forum for peer support. Register before October 1 __(4)__ save 20% on tuition.`,
    blanks: [
      { choices: ['benefit', 'benefits', 'benefiting', 'benefited'], answerIndex: 0 },
      { choices: ['design', 'designed', 'designing', 'designs'], answerIndex: 1 },
      { choices: ['can', 'could', 'will', 'would'], answerIndex: 0 },
      { choices: ['so', 'and', 'to', 'but'], answerIndex: 2 },
    ],
  },
  {
    text: `Dear Team,
Due to a __(1)__ overlap, Thursday's budget review has been moved from 9 a.m. to 1 p.m. Please adjust your calendars __(2)__. If you cannot attend the new time, notify your manager as soon __(3)__ possible. We regret any __(4)__ this may cause.`,
    blanks: [
      { choices: ['schedule', 'scheduled', 'scheduling', 'schedules'], answerIndex: 2 },
      { choices: ['according', 'accordingly', 'accord', 'accordance'], answerIndex: 1 },
      { choices: ['as', 'than', 'that', 'so'], answerIndex: 0 },
      { choices: ['inconvenient', 'inconvenience', 'inconveniently', 'inconvenienced'], answerIndex: 1 },
    ],
  },
  {
    text: `Attention Customers,
We have discovered a defect in a __(1)__ batch of our portable heaters sold between January and March. If you __(2)__ one of these units, please discontinue use __(3)__. Contact our support line to arrange a free repair or replacement. We sincerely apologize for any __(4)__ this may cause.`,
    blanks: [
      { choices: ['limit', 'limits', 'limited', 'limiting'], answerIndex: 2 },
      { choices: ['own', 'owns', 'owning', 'owned'], answerIndex: 0 },
      { choices: ['immediate', 'immediately', 'immediacy', 'immediateness'], answerIndex: 1 },
      { choices: ['concern', 'concerns', 'concerned', 'concerning'], answerIndex: 0 },
    ],
  },
]

const part6: ExamItem[] = part6Data.map((p, i) => ({
  id: `S2-R6-${i + 1}`,
  part: 6 as const,
  section: 'reading' as const,
  passageTexts: [p.text],
  questions: p.blanks.map((b, bi) => ({
    id: `S2-R6-${i + 1}-q${bi + 1}`,
    question: `Blank (${bi + 1})`,
    choices: b.choices,
    answerIndex: b.answerIndex,
  })),
}))

interface PassageData {
  texts: string[]
  qs: { question: string; choices: string[]; answerIndex: number }[]
}

const part7Single: PassageData[] = [
  {
    texts: [
      `[Text Message Chain]
Noa (8:15 AM): Hi Marcus, has the fabric shipment from our supplier in Vietnam left the warehouse yet?
Marcus (8:20 AM): Not yet, they said there's a delay with the customs paperwork.
Noa (8:22 AM): This is the second delay this quarter. Can you follow up directly with them?
Marcus (8:25 AM): I'll call their office now and get back to you within the hour.`,
    ],
    qs: [
      { question: 'What is Noa asking about?', choices: ['A job opening', 'The status of a shipment', 'A pricing dispute', 'A staff meeting'], answerIndex: 1 },
      { question: 'What is causing the delay?', choices: ['A shipping strike', 'Customs paperwork', 'Bad weather', 'A factory closure'], answerIndex: 1 },
      { question: 'What will Marcus do next?', choices: ['Cancel the order', 'Call the supplier directly', 'Visit the warehouse', 'File a complaint'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `POSITION AVAILABLE: Logistics Coordinator
Aurora Freight is seeking a Logistics Coordinator to oversee shipment scheduling and coordinate with international carriers. Responsibilities include tracking deliveries, resolving customs issues, and maintaining vendor relationships. Candidates should have at least three years of logistics experience and proficiency in supply-chain software. This position is based at our port-side office, with occasional travel required. Interested applicants should send a résumé to jobs@aurorafreight.com by July 20.`,
    ],
    qs: [
      { question: 'What is a main responsibility of this position?', choices: ['Managing payroll', 'Coordinating with international carriers', 'Hiring warehouse staff', 'Designing packaging'], answerIndex: 1 },
      { question: 'What experience is required?', choices: ['One year', 'At least three years of logistics experience', 'Five years in sales', 'No experience necessary'], answerIndex: 1 },
      { question: 'How should candidates apply?', choices: ['By calling the office', 'By sending a résumé by email', 'By visiting in person', 'By mailing an application'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `NOTICE: Elevator Maintenance
The east elevator will be out of service for scheduled maintenance from March 4 to March 6. During this period, employees are asked to use the west elevator or the stairwell near the lobby. We apologize for any inconvenience and thank you for your patience.`,
    ],
    qs: [
      { question: 'Why is the elevator out of service?', choices: ['It broke down', 'Scheduled maintenance', 'A power outage', 'A safety inspection failed'], answerIndex: 1 },
      { question: 'What are employees advised to use instead?', choices: ['A shuttle', 'The west elevator or stairwell', 'A freight elevator', 'The parking garage'], answerIndex: 1 },
      { question: 'How long will the maintenance last?', choices: ['One day', 'Two days', 'Three days', 'A week'], answerIndex: 2 },
    ],
  },
  {
    texts: [
      `Dear Mr. Fontaine,
Thank you for booking with Driftwood Car Rentals. This email confirms your reservation for a compact sedan from May 3 to May 7, under booking reference DW-2290. Pickup begins at 9:00 a.m., and the vehicle must be returned with a full tank of fuel. Please note that a valid driver's license and credit card are required at pickup.
Best regards,
Driftwood Car Rentals`,
    ],
    qs: [
      { question: 'What is the purpose of this email?', choices: ['To offer a discount', 'To confirm a car rental reservation', 'To request payment', 'To cancel a booking'], answerIndex: 1 },
      { question: 'What is required when returning the vehicle?', choices: ['A car wash', 'A full tank of fuel', 'An inspection report', 'A cleaning fee'], answerIndex: 1 },
      { question: 'What must Mr. Fontaine bring at pickup?', choices: ['A passport only', 'A valid driver\'s license and credit card', 'Proof of insurance', 'A printed map'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `★★★★★ Review by R. Alston
I bought the ErgoFlex office chair three months ago, and it has completely solved my back pain during long work days. The lumbar support is excellent, and assembly took less than twenty minutes. The only downside is that the armrests are not adjustable. Still, I'd highly recommend it to anyone who sits at a desk all day.`,
    ],
    qs: [
      { question: 'What does the reviewer like about the product?', choices: ['The price', 'The lumbar support and easy assembly', 'The armrests', 'The color options'], answerIndex: 1 },
      { question: 'What is the reviewer\'s complaint?', choices: ['It\'s uncomfortable', 'The armrests are not adjustable', 'It broke quickly', 'It was expensive'], answerIndex: 1 },
      { question: 'Would the reviewer recommend the product?', choices: ['Yes', 'No', 'Only for tall people', 'Only if the price drops'], answerIndex: 0 },
    ],
  },
  {
    texts: [
      `Local Firm Wins National Design Award
Pinecrest Design Studio, known for its sustainable furniture, was awarded the National Green Design Prize this week. Founder Elena Ruiz said the recognition validates years of work sourcing reclaimed wood and eco-friendly materials. The studio plans to use the prize funding to open a workshop space for local apprentices, aiming to train ten new craftspeople next year.`,
    ],
    qs: [
      { question: 'What is Pinecrest Design Studio known for?', choices: ['Its metal sculptures', 'Its sustainable furniture', 'Its catering service', 'Its clothing line'], answerIndex: 1 },
      { question: 'What will the studio do with the prize funding?', choices: ['Expand overseas', 'Open a workshop for apprentices', 'Buy new machinery', 'Launch an ad campaign'], answerIndex: 1 },
      { question: 'How many apprentices does the studio aim to train?', choices: ['Five', 'Ten', 'Fifteen', 'Twenty'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `To All Staff,
Starting next month, our office will launch a mandatory recycling program. Separate bins for paper, plastic, and glass will be placed on every floor. Please rinse containers before disposing of them, and flatten cardboard boxes before placing them in the designated bins. Questions can be directed to the facilities team.`,
    ],
    qs: [
      { question: 'What is being introduced next month?', choices: ['A new dress code', 'A recycling program', 'A parking policy', 'A remote work policy'], answerIndex: 1 },
      { question: 'What should be done before placing cardboard in the bins?', choices: ['Label it', 'Flatten it', 'Seal it', 'Weigh it'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Free Workshop: Grant Writing for Nonprofits
Join fundraising consultant Omar Reyes for a free 90-minute workshop on writing successful grant proposals. The session takes place on September 9 at 10:00 a.m. and includes a downloadable proposal template. Registration is required, and space is limited to the first 150 participants. Sign up at www.grantworkshop.org.`,
    ],
    qs: [
      { question: 'Who is leading the workshop?', choices: ['Omar Reyes', 'A university professor', 'A government official', 'A software company'], answerIndex: 0 },
      { question: 'How long is the workshop?', choices: ['30 minutes', '60 minutes', '90 minutes', '2 hours'], answerIndex: 2 },
      { question: 'What is included with registration?', choices: ['A certificate', 'A downloadable proposal template', 'A one-on-one consultation', 'Lunch'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Business Trip Itinerary — Ms. Fontana
Monday, Feb 5: Depart Bangkok 7:15 a.m., arrive Hong Kong 11:00 a.m. Check in at Harbor Crest Hotel.
Tuesday, Feb 6: Supplier meeting at Jade Manufacturing, 10:00 a.m. – 1:00 p.m. Factory tour in the afternoon.
Wednesday, Feb 7: Attend trade expo at Kowloon Exhibition Hall, all day.
Thursday, Feb 8: Depart Hong Kong 6:00 p.m., arrive Bangkok 7:45 p.m.`,
    ],
    qs: [
      { question: 'Where does Ms. Fontana stay in Hong Kong?', choices: ['Harbor Crest Hotel', 'Kowloon Hotel', 'Jade Inn', 'Central Suites'], answerIndex: 0 },
      { question: 'What is scheduled for Tuesday morning?', choices: ['A flight', 'A supplier meeting at Jade Manufacturing', 'A trade expo', 'A factory tour only'], answerIndex: 1 },
      { question: 'When does Ms. Fontana return to Bangkok?', choices: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], answerIndex: 3 },
    ],
  },
  {
    texts: [
      `Dear Hiring Committee,
I am writing to recommend Mr. Okafor for the Financial Analyst position at your firm. During his two years on my team, he consistently produced accurate forecasts and identified cost-saving opportunities worth over $200,000 annually. He also trained three new analysts during a period of rapid team growth. I am confident he would excel in a fast-paced environment.
Sincerely,
Priya Shah, Finance Director`,
    ],
    qs: [
      { question: 'What is the purpose of this letter?', choices: ['To request a transfer', 'To recommend Mr. Okafor for a job', 'To resign from a position', 'To complain about performance'], answerIndex: 1 },
      { question: 'What accomplishment is mentioned?', choices: ['Winning an industry award', 'Identifying over $200,000 in cost savings', 'Publishing a report', 'Leading a merger'], answerIndex: 1 },
      { question: 'What else did Mr. Okafor do?', choices: ['Managed the budget alone', 'Trained three new analysts', 'Relocated the office', 'Negotiated a contract'], answerIndex: 1 },
    ],
  },
]

const part7Double: PassageData[] = [
  {
    texts: [
      `Subject: Missing Confirmation
Dear Organizer,
I registered for the Leadership Summit last week, but I have not received a confirmation email or my access code. My registration ID is LS-2207. The event is only ten days away, and I want to make sure my spot is secured.
Best regards,
Victor Lindqvist`,
      `Subject: RE: Missing Confirmation
Dear Mr. Lindqvist,
Thank you for contacting us. I checked our records and found that your registration is confirmed, but the confirmation email bounced back due to a full inbox on your end. I have resent it to an alternate address you provided. Please let us know if you still don't receive it within 24 hours.
Best regards,
Summit Support Team`,
    ],
    qs: [
      { question: 'Why is Victor writing?', choices: ['To cancel his registration', 'He did not receive his confirmation email', 'To request a refund', 'To change his session'], answerIndex: 1 },
      { question: 'What is Victor\'s registration ID?', choices: ['LS-2207', 'LS-2270', 'LS-7220', 'LS-2027'], answerIndex: 0 },
      { question: 'What caused the problem?', choices: ['A system outage', 'His inbox was full', 'A late payment', 'A cancelled event'], answerIndex: 1 },
      { question: 'What did the support team do?', choices: ['Issued a refund', 'Resent the email to an alternate address', 'Cancelled his registration', 'Upgraded his ticket'], answerIndex: 1 },
      { question: 'What should Victor do if he still doesn\'t receive it?', choices: ['Register again', 'Contact them within 24 hours', 'Wait one week', 'Call the venue'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Nexus Coworking Space — Flexible Workspaces for Every Team
Rent a private office, dedicated desk, or hot desk by the day, month, or year. Locations in Midtown, Riverside, and the Arts District. High-speed Wi-Fi and unlimited coffee included. Members receive 24-hour building access and discounted meeting room rates. Visit nexuscoworking.com to book a tour.`,
      `Subject: Question About Monthly Memberships
Hello,
I'm interested in a dedicated desk membership starting next month at your Riverside location. Could you tell me if the monthly rate includes access to meeting rooms, and whether I can switch locations if I travel between offices? Also, is there a discount for signing a 12-month contract?
Thanks,
Camille Dubois`,
    ],
    qs: [
      { question: 'What is included in a Nexus membership?', choices: ['A parking spot', 'High-speed Wi-Fi and unlimited coffee', 'Free lunch', 'Gym access'], answerIndex: 1 },
      { question: 'What do members receive?', choices: ['Free printing', '24-hour building access', 'A company car', 'Free advertising'], answerIndex: 1 },
      { question: 'What does Camille want to know about meeting rooms?', choices: ['Their price', 'Whether they\'re included in the monthly rate', 'Their capacity', 'Their location'], answerIndex: 1 },
      { question: 'What else is Camille asking about?', choices: ['A group discount', 'Whether she can switch locations', 'Insurance coverage', 'A desk size'], answerIndex: 1 },
      { question: 'Which location does Camille want to join?', choices: ['Midtown', 'Riverside', 'Arts District', 'All three'], answerIndex: 1 },
    ],
  },
]

const part7Triple: PassageData[] = [
  {
    texts: [
      `Introducing the BrewCraft Pro Coffee Maker
Brew a perfect cup in under four minutes with programmable settings and a built-in grinder. Now available for 2,290 baht (regularly 2,890 baht) for a limited time. Free shipping on orders over 2,000 baht.`,
      `Order Confirmation #61045
Thank you for your order, Ms. Delgado! You purchased 1 BrewCraft Pro Coffee Maker for 2,290 baht. Your order will be shipped within 2-4 business days to your registered address. Free shipping has been applied to your order.`,
      `Subject: Coffee Maker Leaking
Dear Customer Service,
I received order #61045 yesterday, but the coffee maker leaks water from the base during brewing. I would like to request a replacement rather than a refund, since I still want to use the product. Please advise on the next steps.
Regards,
Ms. Delgado`,
    ],
    qs: [
      { question: 'What is the regular price of the BrewCraft Pro?', choices: ['2,000 baht', '2,290 baht', '2,500 baht', '2,890 baht'], answerIndex: 3 },
      { question: 'How did Ms. Delgado qualify for free shipping?', choices: ['She is a loyalty member', 'Her order was over 2,000 baht', 'She picked up in-store', 'She paid by bank transfer'], answerIndex: 1 },
      { question: 'What is the problem with Ms. Delgado\'s order?', choices: ['It never arrived', 'It leaks water from the base', 'It was the wrong color', 'It was missing parts'], answerIndex: 1 },
      { question: 'What does Ms. Delgado want instead of a refund?', choices: ['Store credit', 'A replacement', 'A discount coupon', 'A repair'], answerIndex: 1 },
      { question: 'What was the order number?', choices: ['61045', '61054', '61450', '64105'], answerIndex: 0 },
    ],
  },
  {
    texts: [
      `POSITION: Copywriter
Northfield Publishing is hiring a Copywriter with at least 2 years of experience writing marketing content. Strong editing skills and familiarity with SEO are required. Send your writing samples and résumé to hr@northfieldpub.com.`,
      `Subject: Application for Copywriter Position
Dear Hiring Manager,
I am writing to apply for the Copywriter position posted on your website. I have 3 years of experience writing marketing and web content and am well-versed in SEO best practices. My writing samples are attached for your review.
Best regards,
Naomi Fischer`,
      `Subject: Interview Invitation — Copywriter
Dear Ms. Fischer,
Thank you for your application. We were impressed with your writing samples and would like to invite you for an interview on Tuesday, May 9, at 2:00 p.m. at our downtown office. Please confirm your availability by replying to this email.
Best regards,
Northfield Publishing HR Team`,
    ],
    qs: [
      { question: 'What experience is required for the position?', choices: ['At least 1 year', 'At least 2 years writing marketing content', 'At least 5 years', 'No experience required'], answerIndex: 1 },
      { question: 'How many years of experience does Naomi have?', choices: ['1 year', '2 years', '3 years', '4 years'], answerIndex: 2 },
      { question: 'What did Naomi attach to her email?', choices: ['A reference letter', 'Her writing samples', 'A salary request', 'A certificate'], answerIndex: 1 },
      { question: 'When is Naomi\'s interview scheduled?', choices: ['Monday, May 8', 'Tuesday, May 9, at 2:00 p.m.', 'Wednesday, May 10, at 9:00 a.m.', 'Friday, May 12'], answerIndex: 1 },
      { question: 'What does Northfield Publishing ask Naomi to do?', choices: ['Send more samples', 'Confirm her availability by replying', 'Call the office', 'Bring a printed résumé'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Annual Sustainable Business Forum
Date: November 21-22
Venue: Harborview Convention Center
Day 1: Keynote speeches and panel discussions
Day 2: Workshops and a sustainability innovation showcase
Early registration deadline: October 25 (discounted rate: 4,200 baht)`,
      `Subject: Forum Registration Confirmed
Dear Mr. Hendricks,
Thank you for registering for the Annual Sustainable Business Forum at the early-bird rate of 4,200 baht. Your registration includes access to both days of the event, including all panel discussions and workshops. A confirmation badge will be mailed to you within one week.
Best regards,
Forum Registration Team`,
      `Subject: Reminder: Forum Starts in 5 Days
Dear Attendee,
This is a reminder that the Annual Sustainable Business Forum begins in 5 days. Please remember to bring your confirmation badge and a valid photo ID for check-in. Parking is available at Harborview Convention Center for 120 baht per day.
See you soon!`,
    ],
    qs: [
      { question: 'Where is the forum being held?', choices: ['Downtown Plaza', 'Harborview Convention Center', 'City Hall', 'Marina Hotel'], answerIndex: 1 },
      { question: 'What happens on Day 2 of the forum?', choices: ['Keynote speeches', 'Workshops and an innovation showcase', 'A networking lunch only', 'Registration check-in'], answerIndex: 1 },
      { question: 'How much did Mr. Hendricks pay for registration?', choices: ['3,700 baht', '4,200 baht', '4,700 baht', '5,200 baht'], answerIndex: 1 },
      { question: 'What is included in Mr. Hendricks\'s registration?', choices: ['Hotel accommodation', 'Access to both days, including panels and workshops', 'Airport transfer', 'A gift bag only'], answerIndex: 1 },
      { question: 'What must attendees bring for check-in?', choices: ['Only their badge', 'Their confirmation badge and a valid photo ID', 'A printed ticket', 'Cash payment'], answerIndex: 1 },
    ],
  },
]

const part7: ExamItem[] = [
  ...part7Single.map((p, i) => ({
    id: `S2-R7-S${i + 1}`,
    part: 7 as const,
    section: 'reading' as const,
    passageTexts: p.texts,
    questions: p.qs.map((q, qi) => ({
      id: `S2-R7-S${i + 1}-q${qi + 1}`,
      question: q.question,
      choices: q.choices,
      answerIndex: q.answerIndex,
    })),
  })),
  ...part7Double.map((p, i) => ({
    id: `S2-R7-D${i + 1}`,
    part: 7 as const,
    section: 'reading' as const,
    passageTexts: p.texts,
    questions: p.qs.map((q, qi) => ({
      id: `S2-R7-D${i + 1}-q${qi + 1}`,
      question: q.question,
      choices: q.choices,
      answerIndex: q.answerIndex,
    })),
  })),
  ...part7Triple.map((p, i) => ({
    id: `S2-R7-T${i + 1}`,
    part: 7 as const,
    section: 'reading' as const,
    passageTexts: p.texts,
    questions: p.qs.map((q, qi) => ({
      id: `S2-R7-T${i + 1}-q${qi + 1}`,
      question: q.question,
      choices: q.choices,
      answerIndex: q.answerIndex,
    })),
  })),
]

export const readingExamItems: ExamItem[] = [...part5, ...part6, ...part7]

export const fullExamItems: ExamItem[] = [...listeningExamItems, ...readingExamItems]

export const FULL_EXAM_LISTENING_COUNT = listeningExamItems.reduce((sum, item) => sum + item.questions.length, 0)
export const FULL_EXAM_READING_COUNT = readingExamItems.reduce((sum, item) => sum + item.questions.length, 0)
export const FULL_EXAM_TOTAL_COUNT = FULL_EXAM_LISTENING_COUNT + FULL_EXAM_READING_COUNT

export const FULL_EXAM_DURATION_SEC = 120 * 60
