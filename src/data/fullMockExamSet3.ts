import type { ExamItem } from '../lib/types'

// ============================================================
// FULL MOCK EXAM — SET 3
// LISTENING SECTION — 100 questions (Part 1: 6, Part 2: 25, Part 3: 39, Part 4: 30)
// ============================================================

const part1: ExamItem[] = [
  {
    id: 'S3-L1-1',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: ตัวแทนบริษัทสองรายจับมือกันหลังการประชุมเซ็นสัญญาความร่วมมือ',
    imageId: 'handshake',
    questions: [
      {
        id: 'S3-L1-1-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A woman is signing a document alone.',
          'Two business partners are shaking hands after a meeting.',
          'A man is packing his briefcase.',
          'Two colleagues are arguing over a contract.',
        ],
        answerIndex: 1,
      },
    ],
    transcript: 'Two business partners are shaking hands after a meeting.',
  },
  {
    id: 'S3-L1-2',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: พนักงานบัญชีกำลังพิมพ์งานบนแล็ปท็อป โดยมีใบแจ้งหนี้วางอยู่รอบตัวบนโต๊ะ',
    imageId: 'typing',
    questions: [
      {
        id: 'S3-L1-2-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'An accountant is typing on a laptop surrounded by invoices.',
          'A woman is shredding paper documents.',
          'A man is sleeping at his desk.',
          'An accountant is making a phone call outside.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'An accountant is typing on a laptop surrounded by invoices.',
  },
  {
    id: 'S3-L1-3',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: พนักงานคลังสินค้ากำลังยกพาเลทกล่องสินค้าขึ้นรถบรรทุกขนส่ง',
    imageId: 'truck',
    questions: [
      {
        id: 'S3-L1-3-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A truck is parked empty in a garage.',
          'Warehouse staff are loading pallets onto a delivery truck.',
          'A truck driver is changing a tire.',
          'Boxes are being unloaded from a ship.',
        ],
        answerIndex: 1,
      },
    ],
    transcript: 'Warehouse staff are loading pallets onto a delivery truck.',
  },
  {
    id: 'S3-L1-4',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: เชฟกำลังจัดจานอาหารอย่างพิถีพิถันก่อนนำไปเสิร์ฟให้ลูกค้า',
    imageId: 'chef',
    questions: [
      {
        id: 'S3-L1-4-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A chef is plating a dish before it is served.',
          'A customer is paying at the cash register.',
          'A chef is washing vegetables in the sink.',
          'Waiters are setting tables in the dining room.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'A chef is plating a dish before it is served.',
  },
  {
    id: 'S3-L1-5',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: นักท่องเที่ยวกำลังต่อแถวขึ้นรถบัสนำเที่ยวอยู่หน้าโรงแรม',
    imageId: 'bus',
    questions: [
      {
        id: 'S3-L1-5-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A bus is being repaired in a garage.',
          'Tourists are checking into a hotel.',
          'Tourists are lining up to board a tour bus outside a hotel.',
          'A tour guide is handing out maps indoors.',
        ],
        answerIndex: 2,
      },
    ],
    transcript: 'Tourists are lining up to board a tour bus outside a hotel.',
  },
  {
    id: 'S3-L1-6',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: ช่างเทคนิคไอทีกำลังตรวจสอบเครื่องพิมพ์ที่หยุดทำงานในสำนักงาน',
    imageId: 'printer',
    questions: [
      {
        id: 'S3-L1-6-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'An IT technician is inspecting a broken printer in the office.',
          'A technician is installing new office chairs.',
          'Workers are moving a printer to another floor.',
          'An employee is photocopying documents quickly.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'An IT technician is inspecting a broken printer in the office.',
  },
]

const part2Data: { script: string; choices: string[]; answerIndex: number }[] = [
  { script: 'What time does the shuttle bus leave for the airport?', choices: ['At six thirty in the morning.', "It's a comfortable bus.", 'I already boarded.'], answerIndex: 0 },
  { script: "Could you forward me last month's sales report?", choices: ["Sure, I'll send it right away.", "It's a monthly report.", 'I forwarded my résumé.'], answerIndex: 0 },
  { script: "Who's in charge of the new product launch?", choices: ['Mr. Tanaka is leading it.', 'It launched last year.', 'The product is on sale.'], answerIndex: 0 },
  { script: "Isn't the warehouse inventory count finished yet?", choices: ['Not yet, we need another day.', "It's a large warehouse.", 'I counted twice.'], answerIndex: 0 },
  { script: 'Where did you park the delivery van?', choices: ['Right behind the building.', "It's a new van.", 'I delivered it already.'], answerIndex: 0 },
  { script: "Why don't we move the client meeting to the conference room?", choices: ['That sounds like a good idea.', 'The client called earlier.', 'The room is painted blue.'], answerIndex: 0 },
  { script: 'How much is the shipping fee for international orders?', choices: ['It depends on the weight.', 'The order arrived today.', 'I shipped it yesterday.'], answerIndex: 0 },
  { script: 'Have you signed the lease agreement yet?', choices: ['Yes, I signed it this morning.', "It's a two-year lease.", 'I agreed with him.'], answerIndex: 0 },
  { script: 'When will the construction permit be approved?', choices: ['Probably by next week.', "It's a large construction site.", 'We permitted access.'], answerIndex: 0 },
  { script: 'Do you prefer the blue or the gray fabric samples?', choices: ['I think the gray looks better.', 'I sampled both.', 'The fabric feels soft.'], answerIndex: 0 },
  { script: "Isn't Mr. Kim retiring at the end of this year?", choices: ['Yes, in December.', 'He retired his car.', "He's been here for years."], answerIndex: 0 },
  { script: "What's the return policy for damaged items?", choices: ['You can exchange them within 30 days.', 'It returned yesterday.', 'The item was damaged.'], answerIndex: 0 },
  { script: 'Could you double-check the figures in this invoice?', choices: ["Of course, I'll look at it now.", 'The invoice was paid.', 'I doubled the amount.'], answerIndex: 0 },
  { script: "Who will replace Ms. Alvarez while she's on leave?", choices: ['Her assistant will cover for her.', "She's leaving at noon.", 'I replaced the battery.'], answerIndex: 0 },
  { script: 'Should we order more office chairs for the new hires?', choices: ["Yes, let's order five more.", 'The chairs are comfortable.', 'We ordered lunch already.'], answerIndex: 0 },
  { script: 'How long is the warranty on this printer?', choices: ["It's covered for two years.", "The printer is out of ink.", 'I warned him already.'], answerIndex: 0 },
  { script: 'Where can I find the safety equipment?', choices: ["It's stored in the supply closet.", 'The equipment broke down.', 'I found it interesting.'], answerIndex: 0 },
  { script: "Didn't the factory pass its last safety inspection?", choices: ['Yes, with no issues.', 'The factory opened last year.', 'I inspected the car.'], answerIndex: 0 },
  { script: "What's the exchange rate today?", choices: ['About thirty-five baht to the dollar.', 'I exchanged seats with him.', 'The rate increased.'], answerIndex: 0 },
  { script: 'Can you recommend a reliable courier service?', choices: ["Try SpeedEx, they're very reliable.", 'I received the package.', 'The course starts Monday.'], answerIndex: 0 },
  { script: 'Who approved the budget for the trade show booth?', choices: ['The marketing director did.', 'The booth looked great.', 'We approved of the idea.'], answerIndex: 0 },
  { script: "Isn't the quarterly report due this Friday?", choices: ['Yes, we should finish it soon.', 'The report was interesting.', "It's due for renewal."], answerIndex: 0 },
  { script: 'How do I submit a maintenance request?', choices: ['Just fill out the online form.', 'The request was submitted.', 'Maintenance is on the third floor.'], answerIndex: 0 },
  { script: 'Would you like a window or an aisle seat?', choices: ['A window seat, please.', 'The seat is broken.', 'I sat by the window.'], answerIndex: 0 },
  { script: 'What time should we expect the auditors tomorrow?', choices: ['Around nine in the morning.', 'The audit went well.', 'We expect good news.'], answerIndex: 0 },
]

const part2: ExamItem[] = part2Data.map((q, i) => ({
  id: `S3-L2-${i + 1}`,
  part: 2 as const,
  section: 'listening' as const,
  audioScript: q.script,
  questions: [
    {
      id: `S3-L2-${i + 1}-q`,
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
      'Man: I found a defect in one of the circuit boards from batch 214.\n' +
      "Woman: That's concerning. Let's pull the whole batch and have engineering inspect it.\n" +
      'Man: Should I notify the client about a possible delay?\n' +
      "Woman: Yes, let's inform them now so they can adjust their schedule.",
    qs: [
      { question: 'What problem did the man find?', choices: ['A defect in a circuit board', 'A missing shipment', 'A billing error', 'A staff shortage'], answerIndex: 0 },
      { question: 'What does the woman suggest doing?', choices: ['Cancel the order', 'Pull the batch for inspection', 'Fire the engineer', 'Lower the price'], answerIndex: 1 },
      { question: 'What will the man do next?', choices: ['Ship the batch anyway', 'Call the factory manager', 'Notify the client about a delay', 'Request a refund'], answerIndex: 2 },
    ],
  },
  {
    script:
      'Woman: This office suite has 2,000 square feet and a private meeting room.\n' +
      "Man: It looks great. What's included in the monthly rent?\n" +
      'Woman: Utilities and cleaning services are included, but internet is separate.\n' +
      'Man: Understood. When could we move in if we sign this week?',
    qs: [
      { question: 'What are the speakers discussing?', choices: ['Buying a warehouse', 'Leasing an office space', 'Hiring a contractor', 'Renting a car'], answerIndex: 1 },
      { question: 'What is included in the rent?', choices: ['Internet only', 'Utilities and cleaning services', 'Furniture', 'Parking'], answerIndex: 1 },
      { question: 'What does the man ask about?', choices: ['The rent price', 'When they could move in', 'The building size', 'The lease term'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: The new autumn collection just arrived. Where should we display it?\n' +
      "Woman: Let's set it up near the front entrance to attract more attention.\n" +
      'Man: Good idea. Should we also update the window display?\n' +
      "Woman: Yes, I'll handle the window while you arrange the shelves.",
    qs: [
      { question: 'What are the speakers preparing?', choices: ['A staff meeting', 'A new merchandise display', 'An inventory count', 'A price change'], answerIndex: 1 },
      { question: 'Where will the collection be displayed?', choices: ['In the stockroom', 'Near the front entrance', 'On the second floor', 'By the checkout counter'], answerIndex: 1 },
      { question: 'What will the woman do?', choices: ['Arrange the shelves', 'Update the window display', 'Count the inventory', 'Call the supplier'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: I noticed the invoice you sent lists twenty units, but we only ordered fifteen.\n' +
      "Man: I'm sorry about that, let me check with the warehouse right away.\n" +
      'Woman: Thanks, could you also send a corrected invoice by tomorrow?\n' +
      "Man: Absolutely, I'll have it ready first thing in the morning.",
    qs: [
      { question: 'What is the problem with the invoice?', choices: ['It was sent twice', 'The quantity is incorrect', 'The price is wrong', 'It was never received'], answerIndex: 1 },
      { question: 'What will the man do first?', choices: ['Issue a refund', 'Check with the warehouse', 'Cancel the order', 'Call the client'], answerIndex: 1 },
      { question: 'What does the woman request?', choices: ['A discount', 'A corrected invoice by tomorrow', 'A phone call', 'A meeting'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Man: I wanted to ask about the company's parental leave policy.\n" +
      'Woman: Sure, employees are eligible for twelve weeks of paid leave.\n' +
      'Man: Do I need to apply a certain number of weeks in advance?\n' +
      'Woman: Yes, please submit the request form at least a month before the leave begins.',
    qs: [
      { question: 'What is the man asking about?', choices: ['Sick leave policy', 'Parental leave policy', 'Vacation days', 'Overtime pay'], answerIndex: 1 },
      { question: 'How many weeks of paid leave are offered?', choices: ['Six weeks', 'Eight weeks', 'Twelve weeks', 'Sixteen weeks'], answerIndex: 2 },
      { question: 'What must the man do in advance?', choices: ['Talk to a lawyer', 'Submit a request form a month before', 'Find a replacement', 'Pay a fee'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: Hi, I need to change the delivery address for order 4471.\n' +
      'Man: Sure, can you confirm the new address for me?\n' +
      "Woman: Yes, it's 88 Sukhumvit Road, not the old office address.\n" +
      "Man: Got it, I've updated it and the driver has been notified.",
    qs: [
      { question: 'Why is the woman calling?', choices: ['To cancel an order', 'To change a delivery address', 'To request a refund', 'To track a package'], answerIndex: 1 },
      { question: 'What does the man ask for?', choices: ['A payment method', 'The new address', 'An order number', 'A phone number'], answerIndex: 1 },
      { question: 'What does the man confirm at the end?', choices: ['The order was cancelled', 'The driver has been notified', 'A refund was issued', 'The price changed'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Man: We'd like to upgrade our software plan to support more users.\n" +
      'Woman: No problem, how many additional user licenses do you need?\n' +
      'Man: About twenty more, our team has grown quite a bit.\n' +
      "Woman: I'll send you a revised quote by the end of the day.",
    qs: [
      { question: 'What does the man want to do?', choices: ['Cancel a subscription', 'Upgrade their software plan', 'Request a refund', 'Report a bug'], answerIndex: 1 },
      { question: 'What does the woman ask?', choices: ['The company name', 'How many additional licenses are needed', 'The billing address', 'The payment date'], answerIndex: 1 },
      { question: 'What will the woman send?', choices: ['A contract', 'A revised quote', 'A user manual', 'An invoice'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Woman: I'm calling to file a claim for water damage to my office equipment.\n" +
      "Man: I'm sorry to hear that. Can you tell me when the damage occurred?\n" +
      'Woman: It happened last Tuesday during the storm.\n' +
      "Man: I'll send an adjuster to assess the damage this week.",
    qs: [
      { question: 'Why is the woman calling?', choices: ['To renew her policy', 'To file an insurance claim', 'To cancel her coverage', 'To update her address'], answerIndex: 1 },
      { question: 'When did the damage occur?', choices: ['Last Tuesday, during a storm', 'Two months ago', 'Yesterday afternoon', 'Last weekend'], answerIndex: 0 },
      { question: 'What will the man do?', choices: ['Deny the claim', 'Send an adjuster to assess the damage', 'Request more documents', 'Close the account'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: I\'m interested in trading in my current car for a new sedan.\n' +
      "Woman: Great, we can appraise your car today if you'd like.\n" +
      'Man: That works. How long does the appraisal usually take?\n' +
      "Woman: Only about twenty minutes, then I'll show you our current models.",
    qs: [
      { question: 'What does the man want to do?', choices: ['Rent a car', 'Trade in his car', 'Sell car parts', 'Repair his car'], answerIndex: 1 },
      { question: 'What does the woman offer?', choices: ['A test drive first', 'To appraise his car today', 'A discount coupon', 'Free maintenance'], answerIndex: 1 },
      { question: 'How long does the appraisal take?', choices: ['About five minutes', 'About twenty minutes', 'About one hour', 'About a day'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Woman: I'd like to open a business checking account for my new company.\n" +
      'Man: Sure, do you have your business registration documents with you?\n' +
      'Woman: Yes, I brought everything you listed on the website.\n' +
      'Man: Perfect, this should only take about fifteen minutes to set up.',
    qs: [
      { question: 'What does the woman want to do?', choices: ['Apply for a loan', 'Open a business checking account', 'Close an account', 'Transfer funds'], answerIndex: 1 },
      { question: 'What does the man ask for?', choices: ['A credit report', 'Business registration documents', 'A deposit', 'A reference letter'], answerIndex: 1 },
      { question: 'How long will it take to set up?', choices: ['About five minutes', 'About fifteen minutes', 'About an hour', 'About a week'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Man: We're planning a corporate dinner for eighty guests next month.\n" +
      'Woman: Wonderful, would you prefer a buffet or a plated menu?\n' +
      'Man: A buffet would be easier to manage for that many guests.\n' +
      "Woman: I'll prepare a sample menu and send it to you by Friday.",
    qs: [
      { question: 'What are they planning?', choices: ['A wedding', 'A corporate dinner', 'A conference', 'A product launch'], answerIndex: 1 },
      { question: 'What does the man prefer?', choices: ['A plated menu', 'A buffet', 'A cocktail reception', 'A food truck'], answerIndex: 1 },
      { question: 'What will the woman send?', choices: ['An invoice', 'A sample menu', 'A guest list', 'A floor plan'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: How is the manuscript coming along? The deadline is in two weeks.\n' +
      "Man: I'm almost done, I just need to finish the final chapter.\n" +
      'Woman: Great, will you be able to send the draft by Monday?\n' +
      "Man: Yes, I'll have it ready by Monday morning.",
    qs: [
      { question: 'What are they discussing?', choices: ['A book cover design', 'A manuscript deadline', 'A printing error', 'A marketing budget'], answerIndex: 1 },
      { question: 'What does the man still need to finish?', choices: ['The introduction', 'The final chapter', 'The index', 'The cover art'], answerIndex: 1 },
      { question: 'When will the man send the draft?', choices: ['Today', 'Monday morning', 'Next month', 'Friday afternoon'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Man: The building permit still hasn't been approved by the city office.\n" +
      "Woman: That's frustrating, do you know what's causing the delay?\n" +
      'Man: They said they need additional structural drawings from our engineer.\n' +
      "Woman: I'll contact the engineer today to get those submitted quickly.",
    qs: [
      { question: 'What are the speakers discussing?', choices: ['A budget overrun', 'A delayed building permit', 'A hiring decision', 'A safety violation'], answerIndex: 1 },
      { question: 'Why is the permit delayed?', choices: ['Missing payment', 'The city needs additional structural drawings', 'A staff strike', 'Bad weather'], answerIndex: 1 },
      { question: 'What will the woman do?', choices: ['File a complaint', 'Contact the engineer today', 'Cancel the project', 'Reapply next year'], answerIndex: 1 },
    ],
  },
]

const part3: ExamItem[] = part3Data.map((c, i) => ({
  id: `S3-L3-${i + 1}`,
  part: 3 as const,
  section: 'listening' as const,
  audioScript: c.script,
  transcript: c.script,
  questions: c.qs.map((q, qi) => ({
    id: `S3-L3-${i + 1}-q${qi + 1}`,
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
      'Attention passengers on flight 552 to Osaka. Please note that boarding will now take place at gate 14 instead of gate 9. We apologize for any inconvenience and ask that you proceed to the new gate as soon as possible. Boarding will begin in twenty minutes.',
    qs: [
      { question: 'What is being announced?', choices: ['A flight cancellation', 'A gate change', 'A baggage claim update', 'A fare change'], answerIndex: 1 },
      { question: 'Which gate will passengers now use?', choices: ['Gate 9', 'Gate 12', 'Gate 14', 'Gate 20'], answerIndex: 2 },
      { question: 'When will boarding begin?', choices: ['In ten minutes', 'In twenty minutes', 'In one hour', 'Immediately'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Attention shoppers, for the next thirty minutes only, all winter clothing is fifty percent off in our second-floor department. Hurry to take advantage of this limited-time offer before it ends at four o\'clock.',
    qs: [
      { question: 'What is on sale?', choices: ['Winter clothing', 'Electronics', 'Kitchenware', 'Footwear'], answerIndex: 0 },
      { question: 'How much is the discount?', choices: ['Twenty percent', 'Thirty percent', 'Fifty percent', 'Seventy percent'], answerIndex: 2 },
      { question: 'When does the sale end?', choices: ['At three o\'clock', 'At four o\'clock', 'At five o\'clock', 'At closing time'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Good evening everyone, and thank you for joining us tonight. We're thrilled to unveil our newest smartphone model, featuring a longer battery life and an improved camera system. The device will be available in stores starting next Friday, and pre-orders open tonight on our website.",
    qs: [
      { question: 'What is being introduced?', choices: ['A new laptop', 'A new smartphone model', 'A new tablet', 'A new smartwatch'], answerIndex: 1 },
      { question: 'What feature is mentioned?', choices: ['A foldable screen', 'Longer battery life and an improved camera', 'Waterproof design', 'Wireless charging'], answerIndex: 1 },
      { question: 'When do pre-orders open?', choices: ['Next Friday', 'Tonight', 'Next month', 'Tomorrow morning'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Welcome to the Grandview Hotel. For those attending the finance conference, registration desks are located in the main lobby, and the opening session begins at nine a.m. in the Sapphire Ballroom. Breakfast is served in the Garden Restaurant until ten.',
    qs: [
      { question: 'Who is this announcement for?', choices: ['Hotel staff', 'Conference attendees', 'Wedding guests', 'Restaurant customers'], answerIndex: 1 },
      { question: 'Where does the opening session take place?', choices: ['The main lobby', 'The Garden Restaurant', 'The Sapphire Ballroom', 'The rooftop terrace'], answerIndex: 2 },
      { question: 'Until when is breakfast served?', choices: ['Nine a.m.', 'Ten a.m.', 'Eleven a.m.', 'Noon'], answerIndex: 1 },
    ],
  },
  {
    script:
      'This is a public notice from the city public works department. Main Street between 3rd and 5th Avenue will be closed for water pipe repairs starting Monday. Drivers are advised to use Oak Street as an alternate route until repairs are completed.',
    qs: [
      { question: 'Why is Main Street closing?', choices: ['A parade', 'Water pipe repairs', 'A traffic accident', 'Road resurfacing'], answerIndex: 1 },
      { question: 'When does the closure start?', choices: ['Today', 'Monday', 'Next month', 'This weekend'], answerIndex: 1 },
      { question: 'What alternate route is suggested?', choices: ['Elm Street', 'Oak Street', 'Riverside Road', '5th Avenue'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Hi, this is Daniel from Pinewood Materials. I'm calling to let you know that the shipment of lumber you ordered will be delayed by about four days due to a shortage at our distribution center. I apologize for the inconvenience and will call again once the new shipment date is confirmed.",
    qs: [
      { question: 'Who is calling?', choices: ['A customer', 'A supplier', 'A delivery driver', 'A bank representative'], answerIndex: 1 },
      { question: 'Why is the shipment delayed?', choices: ['Bad weather', 'A shortage at the distribution center', 'A payment issue', 'A labor strike'], answerIndex: 1 },
      { question: 'What will Daniel do next?', choices: ['Cancel the order', 'Call again once the new date is confirmed', 'Issue a refund', 'Visit in person'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Before you begin working on the warehouse floor, everyone must complete forklift safety training. Always wear your safety vest and check the forklift's brakes before operating it. Report any equipment issues to your shift supervisor immediately.",
    qs: [
      { question: 'Where is this briefing taking place?', choices: ['An office', 'A warehouse', 'A retail store', 'A construction site'], answerIndex: 1 },
      { question: 'What must employees check before operating a forklift?', choices: ['The fuel level', 'The brakes', 'The tires', 'The horn'], answerIndex: 1 },
      { question: "What should employees do if there's an equipment issue?", choices: ['Fix it themselves', 'Report it to the shift supervisor', 'Ignore it', 'Stop working for the day'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Welcome to today's webinar on personal financial planning. We'll cover budgeting strategies, saving for retirement, and how to reduce debt effectively. Please submit your questions through the chat, and we'll answer as many as we can during the final fifteen minutes.",
    qs: [
      { question: 'What is the topic of the webinar?', choices: ['Digital marketing', 'Personal financial planning', 'Workplace safety', 'Software development'], answerIndex: 1 },
      { question: 'How can participants submit questions?', choices: ['By raising their hand', 'Through the chat', 'By calling in', 'By emailing afterward'], answerIndex: 1 },
      { question: 'When will questions be answered?', choices: ['At the very start', 'During the final fifteen minutes', 'Only by email', 'The next day'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Good morning, exhibitors. Today's forecast calls for strong winds this afternoon, so please make sure all outdoor equipment displays are properly secured. Indoor demonstrations will continue as scheduled. We'll provide another update at noon.",
    qs: [
      { question: 'What does the forecast predict?', choices: ['Heavy rain', 'Strong winds', 'Extreme heat', 'Snow'], answerIndex: 1 },
      { question: 'What are exhibitors asked to do?', choices: ['Cancel outdoor displays', 'Secure outdoor displays', 'Move indoors permanently', 'Close early'], answerIndex: 1 },
      { question: 'When will the next update be given?', choices: ['At noon', 'At sunset', 'Tomorrow morning', 'In one hour'], answerIndex: 0 },
    ],
  },
  {
    script:
      "Thank you all for volunteering with us today. We'll be packing meal boxes for the community food drive. Please put on gloves and an apron before starting, and remember to take a fifteen-minute break every two hours. Let's aim to pack five hundred boxes by the end of the day.",
    qs: [
      { question: 'What activity are the volunteers doing?', choices: ['Sorting clothing donations', 'Packing meal boxes for a food drive', 'Cleaning a park', 'Painting a school'], answerIndex: 1 },
      { question: 'What must volunteers wear?', choices: ['Uniforms', 'Gloves and an apron', 'Name badges', 'Safety goggles'], answerIndex: 1 },
      { question: "What is the day's target?", choices: ['One hundred boxes', 'Two hundred boxes', 'Five hundred boxes', 'One thousand boxes'], answerIndex: 2 },
    ],
  },
]

const part4: ExamItem[] = part4Data.map((t, i) => ({
  id: `S3-L4-${i + 1}`,
  part: 4 as const,
  section: 'listening' as const,
  audioScript: t.script,
  transcript: t.script,
  questions: t.qs.map((q, qi) => ({
    id: `S3-L4-${i + 1}-q${qi + 1}`,
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
  { sentence: 'The __ of the merger will be announced at next week\'s press conference.', choices: ['finalize', 'finalization', 'finalized', 'finalizing'], answerIndex: 1 },
  { sentence: 'Please review the attached file __ replying to this email.', choices: ['before', 'despite', 'unless', 'although'], answerIndex: 0 },
  { sentence: 'The technician resolved the issue __.', choices: ['efficient', 'efficiently', 'efficiency', 'effected'], answerIndex: 1 },
  { sentence: 'Neither the supervisor nor the interns __ available for the call this afternoon.', choices: ['is', 'are', 'was', 'be'], answerIndex: 1 },
  { sentence: 'Housing prices in this district have risen __ over the last five years.', choices: ['sharp', 'sharply', 'sharpness', 'sharper'], answerIndex: 1 },
  { sentence: 'This warranty remains valid __ two years from the purchase date.', choices: ['for', 'since', 'by', 'from'], answerIndex: 0 },
  { sentence: 'The shareholders __ the merger proposal unanimously.', choices: ['approve', 'approved', 'approving', 'approval'], answerIndex: 1 },
  { sentence: 'New hires are required to complete an __ orientation program.', choices: ['extend', 'extensive', 'extensively', 'extension'], answerIndex: 1 },
  { sentence: 'The factory is situated a few kilometers __ the coastal highway.', choices: ['from', 'of', 'at', 'in'], answerIndex: 0 },
  { sentence: '__ the heavy traffic, the courier delivered the package on time.', choices: ['Despite', 'Although', 'Because', 'Unless'], answerIndex: 0 },
  { sentence: 'The firm has handled this client\'s account __ it opened its doors in 2010.', choices: ['since', 'for', 'during', 'while'], answerIndex: 0 },
  { sentence: 'The updated brochure __ detailed specifications for each model.', choices: ['contain', 'contains', 'containing', 'contained'], answerIndex: 1 },
  { sentence: 'It is essential __ every safety checklist before operating the machinery.', choices: ['complete', 'to complete', 'completing', 'completed'], answerIndex: 1 },
  { sentence: 'The board requested __ the audit results be presented at the next meeting.', choices: ['that', 'for', 'of', 'on'], answerIndex: 0 },
  { sentence: 'This year\'s harvest yield is __ than last year\'s.', choices: ['large', 'larger', 'largest', 'largely'], answerIndex: 1 },
  { sentence: 'The clerk processed the return __ requiring a receipt.', choices: ['without', 'with', 'despite', 'unless'], answerIndex: 0 },
  { sentence: 'All contractors must check __ the security office upon arrival.', choices: ['at', 'in', 'on', 'to'], answerIndex: 0 },
  { sentence: 'The proposal was drafted __ by the legal team.', choices: ['careful', 'carefully', 'care', 'cared'], answerIndex: 1 },
  { sentence: '__ the renovation is expensive, the landlord believes it will attract better tenants.', choices: ['Although', 'Because', 'Despite', 'Unless'], answerIndex: 0 },
  { sentence: 'The keynote speaker\'s presentation was both __ and thought-provoking.', choices: ['engage', 'engaging', 'engaged', 'engagement'], answerIndex: 1 },
  { sentence: 'We are looking for a candidate __ can manage overseas logistics.', choices: ['who', 'whom', 'which', 'whose'], answerIndex: 0 },
  { sentence: 'The annual budget __ approved by the finance committee before release.', choices: ['must', 'must be', 'must to be', 'must being'], answerIndex: 1 },
  { sentence: 'Customers may choose __ an installment plan or a single payment.', choices: ['either', 'neither', 'both', 'or'], answerIndex: 0 },
  { sentence: 'The retailer intends to expand its franchise __ neighboring provinces.', choices: ['into', 'on', 'at', 'for'], answerIndex: 0 },
  { sentence: 'The renovation project finished __ ahead of schedule.', choices: ['considerable', 'considerably', 'consideration', 'considering'], answerIndex: 1 },
  { sentence: 'If the inspection reveals defects, the manufacturer __ replace the unit at no cost.', choices: ['will', 'would', 'had', 'are'], answerIndex: 0 },
  { sentence: 'The candidate\'s portfolio __ strong design experience.', choices: ['demonstrate', 'demonstrates', 'demonstrating', 'demonstrated'], answerIndex: 1 },
  { sentence: 'Keep the prototype confidential __ the patent is filed.', choices: ['until', 'since', 'during', 'for'], answerIndex: 0 },
  { sentence: 'The two firms decided to __ their distribution networks.', choices: ['merge', 'merger', 'merging', 'merged'], answerIndex: 0 },
  { sentence: 'Of the three vendors, the local one is __ affordable.', choices: ['more', 'most', 'much', 'very'], answerIndex: 1 },
]

const part5: ExamItem[] = part5Data.map((q, i) => ({
  id: `S3-R5-${i + 1}`,
  part: 5 as const,
  section: 'reading' as const,
  sentence: q.sentence,
  questions: [
    {
      id: `S3-R5-${i + 1}-q`,
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
Starting next month, staff will be __(1)__ to work from home up to two days per week. Employees who wish to participate must __(2)__ their preferred days with their team leader in advance. This policy __(3)__ to improve work-life balance while maintaining team collaboration. Please __(4)__ any questions to the HR department by the end of this week.`,
    blanks: [
      { choices: ['permit', 'permitted', 'permitting', 'permits'], answerIndex: 1 },
      { choices: ['confirm', 'confirmed', 'confirming', 'confirmation'], answerIndex: 0 },
      { choices: ['aim', 'aims', 'aimed', 'aiming'], answerIndex: 1 },
      { choices: ['direct', 'directing', 'directed', 'directs'], answerIndex: 0 },
    ],
  },
  {
    text: `Introducing ShopWave Rewards! Sign up today and start __(1)__ points on every purchase. Members __(2)__ redeem points for discounts, free shipping, and exclusive products. The program is completely free __(3)__ join, and points never expire. Visit our website __(4)__ create your account in minutes.`,
    blanks: [
      { choices: ['earn', 'earning', 'earns', 'earned'], answerIndex: 1 },
      { choices: ['can', 'could', 'will', 'would'], answerIndex: 0 },
      { choices: ['to', 'for', 'of', 'at'], answerIndex: 0 },
      { choices: ['to', 'and', 'so', 'but'], answerIndex: 0 },
    ],
  },
  {
    text: `Attention Staff,
An annual fire drill __(1)__ take place this Thursday at 10:00 a.m. When the alarm sounds, please __(2)__ your desk immediately and proceed to the nearest exit. Do not use the elevators __(3)__ the drill. Building wardens will be __(4)__ throughout the building to guide employees to the assembly point.`,
    blanks: [
      { choices: ['will', 'would', 'is', 'was'], answerIndex: 0 },
      { choices: ['leave', 'leaving', 'left', 'leaves'], answerIndex: 0 },
      { choices: ['during', 'while', 'for', 'since'], answerIndex: 0 },
      { choices: ['station', 'stationed', 'stationing', 'stations'], answerIndex: 1 },
    ],
  },
  {
    text: `Dear Mr. Boonmee,
This letter is to remind you that invoice #7734, __(1)__ on August 15, remains unpaid. We kindly ask that you settle the outstanding balance __(2)__ possible. If payment has already been sent, please __(3)__ this notice. Should you have any questions regarding this invoice, __(4)__ do not hesitate to contact our accounts department.`,
    blanks: [
      { choices: ['due', 'dues', 'duly', 'duty'], answerIndex: 0 },
      { choices: ['as soon as', 'so that', 'such that', 'even though'], answerIndex: 0 },
      { choices: ['ignore', 'ignoring', 'ignored', 'ignores'], answerIndex: 0 },
      { choices: ['please', 'pleased', 'pleasing', 'pleasant'], answerIndex: 0 },
    ],
  },
]

const part6: ExamItem[] = part6Data.map((p, i) => ({
  id: `S3-R6-${i + 1}`,
  part: 6 as const,
  section: 'reading' as const,
  passageTexts: [p.text],
  questions: p.blanks.map((b, bi) => ({
    id: `S3-R6-${i + 1}-q${bi + 1}`,
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
Nora (2:10 PM): Hi, I need to reschedule my sofa delivery from Friday to Saturday.
Driver (2:15 PM): Sure, let me check Saturday's route... I have an opening at 11 AM.
Nora (2:17 PM): That works great, thank you!
Driver (2:18 PM): No problem, I'll update the schedule and send a confirmation text.`,
    ],
    qs: [
      { question: 'What does Nora want to do?', choices: ['Cancel her order', 'Reschedule her delivery', 'Request a refund', 'Change the delivery address'], answerIndex: 1 },
      { question: 'What will the driver do next?', choices: ['Deliver the sofa immediately', 'Update the schedule and send a confirmation', 'Call his supervisor', 'Cancel the appointment'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `POSITION AVAILABLE: Warehouse Supervisor
Golden Gate Logistics is seeking an experienced Warehouse Supervisor to oversee daily operations at our regional distribution center. Duties include managing a team of 15 staff, coordinating inbound and outbound shipments, and maintaining inventory accuracy. Candidates should have at least three years of warehouse management experience and a valid forklift certification. This is a full-time position with weekend shifts required twice a month. Interested applicants should send a résumé to jobs@goldengatelogistics.com by July 20.`,
    ],
    qs: [
      { question: 'What is a main duty of this position?', choices: ['Designing marketing materials', 'Coordinating inbound and outbound shipments', 'Hiring new drivers', 'Managing the company budget'], answerIndex: 1 },
      { question: 'What certification is required?', choices: ['A driving license', 'Forklift certification', 'A safety inspector license', 'A first-aid certificate'], answerIndex: 1 },
      { question: 'How often are weekend shifts required?', choices: ['Every weekend', 'Twice a month', 'Once a year', 'Never'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `NOTICE: Elevator Maintenance
The elevator in the east wing will be out of service for scheduled maintenance from 9:00 a.m. to 1:00 p.m. this Wednesday. Employees are asked to use the west wing elevator or the stairs during this time. We apologize for any inconvenience.`,
    ],
    qs: [
      { question: 'Why is the elevator out of service?', choices: ['It broke down', 'Scheduled maintenance', 'A power outage', 'A fire inspection'], answerIndex: 1 },
      { question: 'What are employees advised to do?', choices: ['Work from home', 'Use the west wing elevator or the stairs', 'Leave the building', 'Wait until Thursday'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Dear Ms. Reyes,
This email confirms your booking of the Orchid Conference Room at Palm Grove Hotel for October 9, from 9:00 a.m. to 5:00 p.m. The room includes seating for up to 40 guests, a projector, and a sound system. Coffee and light refreshments will be provided at 10:30 a.m. and 3:00 p.m. Please contact our events team if you need to adjust the guest count.
Best regards,
Palm Grove Hotel Events Team`,
    ],
    qs: [
      { question: 'What is being confirmed?', choices: ['A hotel room reservation', 'A conference room booking', 'A restaurant reservation', 'A parking reservation'], answerIndex: 1 },
      { question: 'What equipment is included in the room?', choices: ['A whiteboard only', 'A projector and sound system', 'Video conferencing cameras', 'A printer'], answerIndex: 1 },
      { question: 'When will refreshments be provided?', choices: ['9:00 a.m. and 5:00 p.m.', '10:30 a.m. and 3:00 p.m.', 'Noon only', 'Throughout the day continuously'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `★★★☆☆ Review by P. Somchai
I bought the ErgoFlex office chair three weeks ago. The lumbar support is excellent and has really helped my back pain during long work hours. However, assembly took much longer than expected because the instructions were unclear. The armrests also feel a bit wobbly. Overall, it's a decent chair for the price, but I'd suggest the company improve the assembly guide.`,
    ],
    qs: [
      { question: 'What does the reviewer like about the chair?', choices: ['The price', 'The lumbar support', 'The armrests', 'The color'], answerIndex: 1 },
      { question: 'What problem did the reviewer have?', choices: ['The chair arrived damaged', 'Assembly instructions were unclear', 'The chair was too expensive', 'It was delivered late'], answerIndex: 1 },
      { question: 'What does the reviewer suggest?', choices: ['Lowering the price', 'Improving the assembly guide', 'Offering more colors', 'Adding a warranty'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Family-Owned Hardware Store Marks 20 Years, Launches Online Shop
Delta Hardware, a family-owned store serving the Riverside neighborhood, celebrated its 20th anniversary this week by launching its first online store. Owner Somsak Intarakamhaeng said the new website will allow customers outside the neighborhood to order tools and building supplies for home delivery. Intarakamhaeng credited the store's loyal customer base for its two decades of success and said the online shop will also feature same-day pickup for local orders. The store plans to hire two additional staff members to manage online orders.`,
    ],
    qs: [
      { question: 'What milestone is Delta Hardware celebrating?', choices: ['Its 10th anniversary', 'Its 20th anniversary', 'A new store opening', 'A merger'], answerIndex: 1 },
      { question: 'What new service did the store launch?', choices: ['Same-day repairs', 'An online store', 'A rental program', 'A loyalty card'], answerIndex: 1 },
      { question: 'What does the online shop also offer?', choices: ['International shipping', 'Same-day pickup for local orders', 'Free tool rentals', 'Extended warranties'], answerIndex: 1 },
      { question: 'What is the store planning to do?', choices: ['Close the physical location', 'Hire two additional staff members', 'Lower its prices', 'Move to a new location'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `NOTICE: All Visitors
Hard hats, safety vests, and closed-toe shoes are required beyond this point at all times. Visitors without proper safety gear will not be permitted onto the construction site. Safety equipment is available for loan at the site office.`,
    ],
    qs: [
      { question: 'What is required to enter the site?', choices: ['A visitor badge only', 'Hard hats, safety vests, and closed-toe shoes', 'A signed waiver only', 'An appointment'], answerIndex: 1 },
      { question: 'Where can visitors get safety equipment?', choices: ['At the main gate', 'At the site office', 'Online in advance', 'From any worker'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Workshop: Confident Public Speaking
Join communication coach Nattaya Suksawat for a half-day workshop designed to help professionals speak with confidence in meetings and presentations. The workshop takes place on September 5 from 1:00 p.m. to 5:00 p.m. and includes hands-on practice sessions. Registration fee is 1,200 baht, and space is limited to 25 participants. Register at www.speakwell.co.th.`,
    ],
    qs: [
      { question: 'Who is leading the workshop?', choices: ['Nattaya Suksawat', 'A hired actor', 'A university professor', 'The event organizer'], answerIndex: 0 },
      { question: 'How long is the workshop?', choices: ['Two hours', 'Four hours', 'A full day', 'A weekend'], answerIndex: 1 },
      { question: 'How many participants can attend?', choices: ['10', '15', '25', '50'], answerIndex: 2 },
    ],
  },
  {
    texts: [
      `Business Trip Itinerary — Ms. Chaiyaporn
Monday, Nov 11: Depart Chiang Mai 7:00 a.m., arrive Bangkok 8:15 a.m. Check in at Riverside Business Hotel.
Tuesday, Nov 12: Sales presentation at Delta Retail Group, 10:00 a.m. – 1:00 p.m. Factory tour in the afternoon.
Wednesday, Nov 13: Contract negotiation meeting with procurement team, 9:00 a.m.
Thursday, Nov 14: Depart Bangkok 6:00 p.m., arrive Chiang Mai 7:15 p.m.`,
    ],
    qs: [
      { question: 'Where does Ms. Chaiyaporn stay in Bangkok?', choices: ['Riverside Business Hotel', 'Grandview Hotel', 'Delta Retail Group offices', 'A serviced apartment'], answerIndex: 0 },
      { question: 'What is scheduled for Tuesday morning?', choices: ['A flight', 'A sales presentation at Delta Retail Group', 'A contract negotiation', 'A factory tour'], answerIndex: 1 },
      { question: 'What happens on Wednesday?', choices: ['A factory tour', 'A flight home', 'A contract negotiation meeting', 'A hotel checkout'], answerIndex: 2 },
      { question: 'When does Ms. Chaiyaporn return to Chiang Mai?', choices: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], answerIndex: 3 },
    ],
  },
  {
    texts: [
      `Dear Hiring Committee,
I am pleased to recommend Mr. Wichit Saelee for the Senior Accountant position at your firm. During his four years on my team, he consistently produced accurate financial reports and identified cost-saving measures that reduced departmental expenses by 12 percent. He also trained two junior accountants who now handle client accounts independently. I have no doubt he would be a strong asset to your organization.
Sincerely,
Piyaporn Wattana, Finance Manager`,
    ],
    qs: [
      { question: 'What position is being recommended for?', choices: ['Marketing Manager', 'Senior Accountant', 'Operations Director', 'Sales Executive'], answerIndex: 1 },
      { question: 'What achievement is mentioned?', choices: ['Winning an industry award', 'Reducing departmental expenses by 12 percent', 'Publishing a finance textbook', 'Doubling the company\'s revenue'], answerIndex: 1 },
      { question: 'What else did Mr. Saelee do?', choices: ['Hired new managers', 'Trained two junior accountants', 'Relocated the office', 'Negotiated a merger'], answerIndex: 1 },
    ],
  },
]

const part7Double: PassageData[] = [
  {
    texts: [
      `Order Confirmation #91027
Thank you for your purchase, Mr. Alvarez! You ordered 1 ClearView Pro Projector for 8,900 baht, including a 2-year manufacturer's warranty. Your order will be shipped within 2-3 business days.`,
      `Subject: Projector Not Turning On
Dear Customer Service,
I received my ClearView Pro Projector (order #91027) five days ago, but it will not turn on at all, even after trying different power outlets. Since this is covered under the 2-year warranty, I would like to request a replacement unit rather than a repair, since I need it for a client presentation next week.
Regards,
Mr. Alvarez`,
    ],
    qs: [
      { question: 'What did Mr. Alvarez purchase?', choices: ['A laptop', 'A projector', 'A printer', 'A monitor'], answerIndex: 1 },
      { question: 'How long is the warranty?', choices: ['1 year', '2 years', '3 years', '6 months'], answerIndex: 1 },
      { question: 'What problem is Mr. Alvarez experiencing?', choices: ['The screen is cracked', "The projector won't turn on", 'It arrived late', 'It was the wrong model'], answerIndex: 1 },
      { question: 'What does Mr. Alvarez request?', choices: ['A refund', 'A replacement unit', 'A repair', 'A discount'], answerIndex: 1 },
      { question: 'Why does he need it quickly?', choices: ['He is traveling abroad', 'For a client presentation next week', 'He is returning it', 'For a training session'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Ad: WorkHive Co-Working Space
Flexible workspace in the heart of downtown. Choose from hot desks, dedicated desks, or private offices. Day passes available for 350 baht, including high-speed Wi-Fi and unlimited coffee. Meeting rooms can be booked separately by members. Visit workhive.co.th for more details.`,
      `Subject: Question about Day Passes
Hello,
I'm interested in purchasing a day pass for next Tuesday. Does the day pass include access to meeting rooms, or do I need to book one separately? Also, is there a discount for purchasing five day passes at once?
Thanks,
Kritsada`,
    ],
    qs: [
      { question: 'What is included in the day pass?', choices: ['A private office', 'Wi-Fi and unlimited coffee', 'Printing services', 'Parking'], answerIndex: 1 },
      { question: 'How much does a day pass cost?', choices: ['150 baht', '250 baht', '350 baht', '450 baht'], answerIndex: 2 },
      { question: 'What does Kritsada want to know about meeting rooms?', choices: ['Their size', 'Whether they are included or need separate booking', 'Their location', 'Their opening hours'], answerIndex: 1 },
      { question: 'What else does Kritsada ask about?', choices: ['A refund policy', 'A discount for buying five passes', 'A membership upgrade', 'Free trial access'], answerIndex: 1 },
      { question: 'When does Kritsada want to use the pass?', choices: ['This Friday', 'Next Tuesday', 'Next Monday', 'Next weekend'], answerIndex: 1 },
    ],
  },
]

const part7Triple: PassageData[] = [
  {
    texts: [
      `Introducing the WorkSmart Adjustable Desk
Sit or stand with ease. This height-adjustable desk features a spacious 120cm surface and smooth electric controls. Now available for 6,500 baht (regularly 8,000 baht) for a limited time. Free assembly included with every purchase.`,
      `Order Confirmation #33204
Thank you for your order, Ms. Field! You purchased 1 WorkSmart Adjustable Desk for 6,500 baht, with free assembly scheduled for delivery day. Your order will arrive within 5-7 business days.`,
      `Subject: Wrong Desk Color Delivered
Dear Customer Service,
I received order #33204 today, but the desk delivered is black instead of the white one I ordered. The assembly technician said he could not proceed until this is resolved. Could you please arrange for the correct desk to be sent as soon as possible?
Regards,
Ms. Field`,
    ],
    qs: [
      { question: 'What is the regular price of the desk?', choices: ['6,000 baht', '6,500 baht', '7,500 baht', '8,000 baht'], answerIndex: 3 },
      { question: 'What is included with every purchase?', choices: ['A free chair', 'Free assembly', 'Free delivery insurance', 'A lifetime warranty'], answerIndex: 1 },
      { question: 'What problem does Ms. Field report?', choices: ['The desk arrived damaged', 'Wrong color delivered', 'The desk was too small', 'It never arrived'], answerIndex: 1 },
      { question: 'What does the assembly technician say?', choices: ['He will fix the color himself', 'He cannot proceed until it\'s resolved', 'He needs more tools', 'He will return tomorrow'], answerIndex: 1 },
      { question: 'What is the order number?', choices: ['32304', '33204', '34203', '33402'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `POSITION: Sales Executive
Vantage Distributors is hiring a Sales Executive with at least 2 years of B2B sales experience. Strong negotiation skills and a valid driver's license are required. Send your résumé and a brief cover letter to careers@vantagedist.com.`,
      `Subject: Application for Sales Executive Position
Dear Hiring Manager,
I am writing to apply for the Sales Executive position. I have 3 years of B2B sales experience and hold a valid driver's license. I have consistently exceeded my sales targets in my current role. My résumé is attached.
Best regards,
Somjai Pattanakul`,
      `Subject: Interview Invitation — Sales Executive
Dear Mr. Pattanakul,
Thank you for your application. We would like to invite you for an interview on Tuesday, May 14, at 2:00 p.m. at our head office. Please bring a copy of your most recent sales performance report.
Best regards,
Vantage Distributors HR Team`,
    ],
    qs: [
      { question: 'What experience is required?', choices: ['At least 1 year', 'At least 2 years of B2B sales experience', 'At least 5 years', 'No experience required'], answerIndex: 1 },
      { question: 'How many years of experience does Somjai have?', choices: ['1 year', '2 years', '3 years', '4 years'], answerIndex: 2 },
      { question: 'What has Somjai consistently done?', choices: ['Trained new hires', 'Exceeded sales targets', 'Won industry awards', 'Managed a large team'], answerIndex: 1 },
      { question: 'When is the interview scheduled?', choices: ['Monday, May 13, at 9:00 a.m.', 'Tuesday, May 14, at 2:00 p.m.', 'Wednesday, May 15, at 10:00 a.m.', 'Friday, May 17, at 3:00 p.m.'], answerIndex: 1 },
      { question: 'What should Somjai bring to the interview?', choices: ['A portfolio', 'A recent sales performance report', 'Letters of reference', 'A signed contract'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Regional Manufacturing Expo
Date: September 22-23
Venue: Eastgate Exhibition Hall
Day 1: Equipment demonstrations and supplier showcase
Day 2: Industry panel discussions and networking dinner
Early registration deadline: August 30 (discounted rate: 2,800 baht)`,
      `Subject: Expo Registration Confirmed
Dear Mr. Anurak,
Thank you for registering for the Regional Manufacturing Expo at the early-bird rate of 2,800 baht. Your registration includes access to both days, including the networking dinner on Day 2. Your badge will be available for pickup at the registration desk.
Best regards,
Expo Registration Team`,
      `Subject: Reminder: Expo Begins in 5 Days
Dear Attendee,
This is a reminder that the Regional Manufacturing Expo begins in 5 days. Please bring a valid photo ID to collect your badge at the registration desk. Free parking is available at Eastgate Exhibition Hall for registered attendees.
See you there!`,
    ],
    qs: [
      { question: 'Where is the expo held?', choices: ['Riverside Convention Center', 'Eastgate Exhibition Hall', 'Downtown Plaza', 'Marina Hotel'], answerIndex: 1 },
      { question: 'What happens on Day 2?', choices: ['Equipment demonstrations only', 'Panel discussions and a networking dinner', 'Registration check-in only', 'A supplier showcase'], answerIndex: 1 },
      { question: 'How much did Mr. Anurak pay?', choices: ['2,500 baht', '2,800 baht', '3,000 baht', '3,500 baht'], answerIndex: 1 },
      { question: "Where will Mr. Anurak's badge be available?", choices: ['Mailed to his home', 'At the registration desk', 'At the hotel front desk', 'Emailed as a digital pass'], answerIndex: 1 },
      { question: 'What is available for registered attendees?', choices: ['Free meals', 'Free parking', 'Free hotel stay', 'Free transportation'], answerIndex: 1 },
    ],
  },
]

const part7: ExamItem[] = [
  ...part7Single.map((p, i) => ({
    id: `S3-R7-S${i + 1}`,
    part: 7 as const,
    section: 'reading' as const,
    passageTexts: p.texts,
    questions: p.qs.map((q, qi) => ({
      id: `S3-R7-S${i + 1}-q${qi + 1}`,
      question: q.question,
      choices: q.choices,
      answerIndex: q.answerIndex,
    })),
  })),
  ...part7Double.map((p, i) => ({
    id: `S3-R7-D${i + 1}`,
    part: 7 as const,
    section: 'reading' as const,
    passageTexts: p.texts,
    questions: p.qs.map((q, qi) => ({
      id: `S3-R7-D${i + 1}-q${qi + 1}`,
      question: q.question,
      choices: q.choices,
      answerIndex: q.answerIndex,
    })),
  })),
  ...part7Triple.map((p, i) => ({
    id: `S3-R7-T${i + 1}`,
    part: 7 as const,
    section: 'reading' as const,
    passageTexts: p.texts,
    questions: p.qs.map((q, qi) => ({
      id: `S3-R7-T${i + 1}-q${qi + 1}`,
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
