import type { ExamItem } from '../lib/types'

// ============================================================
// LISTENING SECTION — 100 questions (Part 1: 6, Part 2: 25, Part 3: 39, Part 4: 30)
// ============================================================

const part1: ExamItem[] = [
  {
    id: 'L1-1',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: เพื่อนร่วมงานสองคนกำลังจับมือกันในล็อบบี้ของสำนักงาน',
    questions: [
      {
        id: 'L1-1-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'Two coworkers are shaking hands in the lobby.',
          'A receptionist is answering the phone.',
          'The employees are leaving the building.',
          'A man is reading a newspaper alone.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'Two coworkers are shaking hands in the lobby.',
  },
  {
    id: 'L1-2',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: ผู้หญิงกำลังพิมพ์งานบนแล็ปท็อปที่โต๊ะทำงานใกล้หน้าต่าง',
    questions: [
      {
        id: 'L1-2-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A woman is typing on a laptop near a window.',
          'A woman is watering a plant on her desk.',
          'A woman is talking on the phone outside.',
          'A woman is filing paper documents in a cabinet.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'A woman is typing on a laptop at a desk near a window.',
  },
  {
    id: 'L1-3',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: พนักงานกำลังขนกล่องลงจากรถบรรทุกขนส่งสินค้า',
    questions: [
      {
        id: 'L1-3-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'Workers are unloading boxes from a delivery truck.',
          'A truck is being washed in a parking lot.',
          'Boxes are stacked inside an empty office.',
          'A driver is sleeping inside the truck.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'Workers are unloading boxes from a delivery truck.',
  },
  {
    id: 'L1-4',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: เชฟกำลังเตรียมอาหารอยู่ในครัวของร้านอาหาร',
    questions: [
      {
        id: 'L1-4-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A chef is preparing food in a restaurant kitchen.',
          'Customers are ordering food at a counter.',
          'A waiter is cleaning a table.',
          'A chef is washing dishes in a sink.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'A chef is preparing food in a restaurant kitchen.',
  },
  {
    id: 'L1-5',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: ผู้โดยสารกำลังขึ้นรถบัสที่สถานีขนส่ง',
    questions: [
      {
        id: 'L1-5-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'Passengers are boarding a bus at a station.',
          'A bus is parked in a repair garage.',
          'A driver is fueling the bus.',
          'Passengers are sitting on a bench reading.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'Passengers are boarding a bus at the station.',
  },
  {
    id: 'L1-6',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: ช่างเทคนิคกำลังซ่อมเครื่องพิมพ์ในสำนักงาน',
    questions: [
      {
        id: 'L1-6-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A technician is repairing a printer in an office.',
          'A technician is installing new office furniture.',
          'Employees are unplugging their computers.',
          'A technician is delivering a new printer.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'A technician is repairing a printer in the office.',
  },
]

const part2Data: { script: string; choices: string[]; answerIndex: number }[] = [
  { script: 'Where is the nearest post office?', choices: ['Just around the corner.', 'At 3 o\'clock.', 'I sent it yesterday.'], answerIndex: 0 },
  { script: 'How long will the training session take?', choices: ['About two hours.', 'In the main hall.', 'Yes, I attended it.'], answerIndex: 0 },
  { script: 'Who\'s presenting at the conference tomorrow?', choices: ['Mr. Lee is.', 'It was rescheduled.', 'Around noon.'], answerIndex: 0 },
  { script: 'Would you like some coffee or tea?', choices: ['Tea would be great, thanks.', 'I already left.', 'Yes, that\'s mine.'], answerIndex: 0 },
  { script: 'When is the shipment expected to arrive?', choices: ['Sometime next Tuesday.', 'It\'s in the warehouse.', 'By truck.'], answerIndex: 0 },
  { script: 'Didn\'t you already send the invoice?', choices: ['Yes, this morning.', 'It\'s on my desk.', 'I have not received it.'], answerIndex: 0 },
  { script: 'Could you help me set up the projector?', choices: ['Sure, give me a minute.', 'It\'s turned off.', 'I bought it last year.'], answerIndex: 0 },
  { script: 'What time does the store close today?', choices: ['At nine p.m.', 'It\'s on Main Street.', 'Every day.'], answerIndex: 0 },
  { script: 'Why was the meeting postponed?', choices: ['The director is traveling.', 'In conference room B.', 'For about an hour.'], answerIndex: 0 },
  { script: 'How much does the annual membership cost?', choices: ['It\'s 2,000 baht.', 'Since last year.', 'At the front desk.'], answerIndex: 0 },
  { script: 'Isn\'t Sarah supposed to lead this project?', choices: ['Actually, she was reassigned.', 'It starts next week.', 'I haven\'t met her.'], answerIndex: 0 },
  { script: 'Do you know where I can print these documents?', choices: ['There\'s a printer on the second floor.', 'I printed it yesterday.', 'Yes, they are ready.'], answerIndex: 0 },
  { script: 'Which supplier offered the better price?', choices: ['The one from Chiang Mai.', 'They called this morning.', 'It arrived on time.'], answerIndex: 0 },
  { script: 'Have you finished reviewing the contract?', choices: ['Not yet, I\'ll finish today.', 'It\'s a two-year contract.', 'We signed it last week.'], answerIndex: 0 },
  { script: 'Should we reschedule the client call?', choices: ['Yes, let\'s move it to Friday.', 'It lasted an hour.', 'The client is from Japan.'], answerIndex: 0 },
  { script: 'What\'s the Wi-Fi password for the guest network?', choices: ['It\'s posted at the front desk.', 'It\'s very fast.', 'I connected already.'], answerIndex: 0 },
  { script: 'The elevator is out of service today, isn\'t it?', choices: ['Yes, please use the stairs.', 'It\'s on the fifth floor.', 'I took it this morning.'], answerIndex: 0 },
  { script: 'How often does the newsletter go out?', choices: ['Once a month.', 'By email.', 'It was very informative.'], answerIndex: 0 },
  { script: 'Where should I drop off the rental car?', choices: ['At the airport counter.', 'For three days.', 'It\'s a compact car.'], answerIndex: 0 },
  { script: 'Can you recommend a good restaurant nearby?', choices: ['There\'s a great Italian place around the corner.', 'I had lunch already.', 'The menu changes weekly.'], answerIndex: 0 },
  { script: 'Who approved the new marketing budget?', choices: ['The finance director did.', 'It increased by ten percent.', 'Last quarter.'], answerIndex: 0 },
  { script: 'Isn\'t the deadline for the proposal this Friday?', choices: ['Yes, so we should hurry.', 'It\'s a long proposal.', 'We proposed a new idea.'], answerIndex: 0 },
  { script: 'What should I bring to the client meeting?', choices: ['Just your laptop and the report.', 'It starts at ten.', 'I already left.'], answerIndex: 0 },
  { script: 'How do I access the shared drive?', choices: ['IT can set up your access.', 'It\'s a large drive.', 'We shared it last week.'], answerIndex: 0 },
  { script: 'Would you mind checking my calculations?', choices: ['Not at all, send them over.', 'I calculated it twice.', 'The numbers looked wrong.'], answerIndex: 0 },
]

const part2: ExamItem[] = part2Data.map((q, i) => ({
  id: `L2-${i + 1}`,
  part: 2 as const,
  section: 'listening' as const,
  audioScript: q.script,
  questions: [
    {
      id: `L2-${i + 1}-q`,
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
      'Man: Hi, I wanted to check on the office supply order I placed last week.\n' +
      'Woman: Let me look that up... it seems the printer paper is backordered, but everything else shipped yesterday.\n' +
      'Man: That\'s fine, when can I expect the paper?\n' +
      'Woman: Probably within the next ten days. I\'ll email you the tracking details.',
    qs: [
      { question: 'What is the man calling about?', choices: ['An office supply order', 'A job application', 'A billing error', 'A delivery complaint'], answerIndex: 0 },
      { question: 'What does the woman say about the printer paper?', choices: ['It was canceled', 'It is backordered', 'It already arrived', 'It was damaged'], answerIndex: 1 },
      { question: 'What will the woman do next?', choices: ['Call the supplier', 'Visit the warehouse', 'Send tracking details by email', 'Process a refund'], answerIndex: 2 },
    ],
  },
  {
    script:
      'Woman: Hi, I\'d like to make a reservation for six people this Saturday evening.\n' +
      'Man: We have a table available at 7 p.m. Would that work?\n' +
      'Woman: That\'s perfect. Could we also get a table near the window?\n' +
      'Man: I\'ll note that request, but I can\'t guarantee it since it depends on availability that night.',
    qs: [
      { question: 'What is the woman doing?', choices: ['Ordering takeout', 'Making a restaurant reservation', 'Applying for a job', 'Booking a hotel room'], answerIndex: 1 },
      { question: 'What time is available on Saturday?', choices: ['6 p.m.', '7 p.m.', '8 p.m.', '9 p.m.'], answerIndex: 1 },
      { question: 'What does the woman request?', choices: ['A private room', 'A table near the window', 'A discount', 'A birthday cake'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: My computer keeps freezing whenever I open the accounting software.\n' +
      'Woman: That software was just updated. Let me remote into your machine and take a look.\n' +
      'Man: Thanks, I have a report due this afternoon.\n' +
      'Woman: I\'ll prioritize this then. Give me about fifteen minutes.',
    qs: [
      { question: 'What problem does the man have?', choices: ['His password expired', 'His computer freezes when using certain software', 'His monitor is broken', 'His files were deleted'], answerIndex: 1 },
      { question: 'What will the woman do?', choices: ['Order a new computer', 'Remotely access his computer', 'Reinstall the operating system', 'Call the software company'], answerIndex: 1 },
      { question: 'Why is the man in a hurry?', choices: ['He has a flight to catch', 'He has a report due that afternoon', 'He is leaving the company', 'He has a client visiting'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: We\'d like to invite you back for a second interview with our department head.\n' +
      'Man: That sounds great. What days work best for your team?\n' +
      'Woman: Would Wednesday or Thursday afternoon suit you?\n' +
      'Man: Thursday at 2 p.m. works perfectly for me.',
    qs: [
      { question: 'What is being arranged?', choices: ['A performance review', 'A second job interview', 'A farewell party', 'A training session'], answerIndex: 1 },
      { question: 'Who will the man meet with?', choices: ['A client', 'The department head', 'A recruiter', 'The receptionist'], answerIndex: 1 },
      { question: 'What time did they agree on?', choices: ['Wednesday at 2 p.m.', 'Thursday at 2 p.m.', 'Thursday at 9 a.m.', 'Friday at 2 p.m.'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: I noticed an extra charge on my hotel bill for room service I didn\'t order.\n' +
      'Woman: I apologize for the inconvenience. Let me check our records and remove that charge.\n' +
      'Man: Thank you, I appreciate it. I\'m also checking out a day early.\n' +
      'Woman: No problem, I\'ll adjust your bill and process your refund for tonight\'s stay.',
    qs: [
      { question: 'Why is the man concerned?', choices: ['His room was not cleaned', 'There is an incorrect charge on his bill', 'His reservation was canceled', 'He lost his room key'], answerIndex: 1 },
      { question: 'What does the woman offer to do?', choices: ['Upgrade his room', 'Remove the incorrect charge', 'Extend his stay for free', 'Call the manager'], answerIndex: 1 },
      { question: 'What else does the man mention?', choices: ['He wants a late checkout', 'He is checking out a day early', 'He wants to change rooms', 'He lost his luggage'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: How did the social media campaign perform last month?\n' +
      'Man: Engagement was up 30 percent, but our conversion rate stayed flat.\n' +
      'Woman: Maybe we should test a new call-to-action on the ads.\n' +
      'Man: Good idea, I\'ll draft a few options for us to review tomorrow.',
    qs: [
      { question: 'What are the speakers discussing?', choices: ['A budget cut', 'The results of a marketing campaign', 'A new hire', 'An office move'], answerIndex: 1 },
      { question: 'What increased by 30 percent?', choices: ['Sales', 'Engagement', 'Staff', 'Expenses'], answerIndex: 1 },
      { question: 'What will the man do next?', choices: ['Cancel the campaign', 'Draft new call-to-action options', 'Hire an agency', 'Present to the board'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: Excuse me, is flight 220 to Seoul still on time?\n' +
      'Man: I\'m sorry, that flight has been delayed by about ninety minutes due to a technical issue.\n' +
      'Woman: Will I still make my connecting flight in Seoul?\n' +
      'Man: It should be close, but I recommend speaking with the gate agent once you land.',
    qs: [
      { question: 'What is the woman asking about?', choices: ['A refund', 'Whether her flight is on time', 'A seat upgrade', 'Baggage rules'], answerIndex: 1 },
      { question: 'Why is the flight delayed?', choices: ['Bad weather', 'A technical issue', 'A staff shortage', 'A security check'], answerIndex: 1 },
      { question: 'What does the man recommend?', choices: ['Booking a hotel', 'Speaking with the gate agent after landing', 'Canceling the trip', 'Taking an earlier flight'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: I\'m interested in the two-bedroom unit on the fifth floor. Is it still available?\n' +
      'Woman: Yes, it is. The lease would start on the first of next month.\n' +
      'Man: Is parking included in the rent?\n' +
      'Woman: It\'s an additional fee, but current tenants get a 20 percent discount on it.',
    qs: [
      { question: 'What is the man inquiring about?', choices: ['Buying a car', 'Renting an apartment', 'Joining a gym', 'Opening a bank account'], answerIndex: 1 },
      { question: 'When would the lease start?', choices: ['Immediately', 'The first of next month', 'In three months', 'Next year'], answerIndex: 1 },
      { question: 'What does the woman say about parking?', choices: ['It is free', 'It costs extra but tenants get a discount', 'It is not available', 'It requires a separate application'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: I\'m calling to register for the annual industry conference next month.\n' +
      'Man: Sure, are you interested in the early-bird rate? It ends this Friday.\n' +
      'Woman: Yes, please. Can I also add a workshop session?\n' +
      'Man: Of course, I\'ll email you the list of available workshops to choose from.',
    qs: [
      { question: 'Why is the woman calling?', choices: ['To cancel a booking', 'To register for a conference', 'To request a refund', 'To file a complaint'], answerIndex: 1 },
      { question: 'What ends this Friday?', choices: ['The conference itself', 'The early-bird registration rate', 'The workshop schedule', 'The venue booking'], answerIndex: 1 },
      { question: 'What will the man send her?', choices: ['A parking pass', 'A list of available workshops', 'A hotel discount code', 'A speaker list'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: I\'d like to return this blender. It stopped working after just two days.\n' +
      'Woman: I\'m sorry to hear that. Do you have your receipt with you?\n' +
      'Man: Yes, right here. I bought it last Tuesday.\n' +
      'Woman: Great, I can process a full refund or exchange it for a new one.',
    qs: [
      { question: 'Why is the man returning the item?', choices: ['He changed his mind', 'It stopped working', 'It was the wrong color', 'It was too expensive'], answerIndex: 1 },
      { question: 'What does the woman ask for?', choices: ['His ID', 'His receipt', 'His phone number', 'His membership card'], answerIndex: 1 },
      { question: 'What options does the woman offer?', choices: ['Store credit only', 'A refund or an exchange', 'A repair service', 'A discount on his next purchase'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: Have we finished counting the inventory in Section C?\n' +
      'Man: Almost, we should be done by the end of the day.\n' +
      'Woman: Good, the audit team arrives tomorrow morning.\n' +
      'Man: I\'ll make sure everything is documented and ready for them.',
    qs: [
      { question: 'What are the speakers doing?', choices: ['Hiring new staff', 'Counting warehouse inventory', 'Planning a company trip', 'Reviewing sales figures'], answerIndex: 1 },
      { question: 'When will they finish?', choices: ['Right now', 'By the end of the day', 'Next week', 'Tomorrow afternoon'], answerIndex: 1 },
      { question: 'Who is arriving tomorrow?', choices: ['New employees', 'The audit team', 'The CEO', 'A group of clients'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Man: Have you heard we\'re moving to the new office downtown next quarter?\n' +
      'Woman: Yes, I heard the new space has a much bigger break room.\n' +
      'Man: That\'s great, though I heard the commute will be longer for a lot of us.\n' +
      'Woman: True, but the company said they\'ll offer a shuttle service.',
    qs: [
      { question: 'What are the speakers discussing?', choices: ['A company merger', 'An office relocation', 'A new hiring policy', 'A software upgrade'], answerIndex: 1 },
      { question: 'What will the new office have?', choices: ['A rooftop garden', 'A bigger break room', 'Free parking', 'A gym'], answerIndex: 1 },
      { question: 'What will the company provide?', choices: ['Free lunch', 'A shuttle service', 'Extra vacation days', 'Remote work options'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: Our design software subscription is expiring at the end of the month.\n' +
      'Man: Should we renew the same plan, or look at the new premium tier?\n' +
      'Woman: Let\'s compare the features first before deciding.\n' +
      'Man: I\'ll pull together a comparison chart for our meeting on Thursday.',
    qs: [
      { question: 'What is expiring soon?', choices: ['An office lease', 'A software subscription', 'A product warranty', 'An employee contract'], answerIndex: 1 },
      { question: 'What does the woman suggest?', choices: ['Canceling the subscription', 'Comparing features before deciding', 'Switching providers immediately', 'Asking the IT department'], answerIndex: 1 },
      { question: 'What will the man prepare?', choices: ['A budget report', 'A comparison chart', 'A training manual', 'A client presentation'], answerIndex: 1 },
    ],
  },
]

const part3: ExamItem[] = part3Data.map((c, i) => ({
  id: `L3-${i + 1}`,
  part: 3 as const,
  section: 'listening' as const,
  audioScript: c.script,
  transcript: c.script,
  questions: c.qs.map((q, qi) => ({
    id: `L3-${i + 1}-q${qi + 1}`,
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
      'Attention passengers waiting for flight 118 to Tokyo. We regret to inform you that boarding has been delayed by 40 minutes due to a late-arriving aircraft. We expect to begin boarding at 3:30 p.m. We appreciate your patience and will provide further updates as they become available.',
    qs: [
      { question: 'What is the announcement about?', choices: ['A cancelled flight', 'A delayed flight', 'A gate change', 'A lost bag'], answerIndex: 1 },
      { question: 'Why is the flight delayed?', choices: ['Bad weather', 'The aircraft arrived late', 'A staff shortage', 'A mechanical failure'], answerIndex: 1 },
      { question: 'When will boarding begin?', choices: ['2:30 p.m.', '3:00 p.m.', '3:30 p.m.', '4:00 p.m.'], answerIndex: 2 },
    ],
  },
  {
    script:
      'Attention shoppers, City Mart will be closing in fifteen minutes. Please bring your final purchases to the checkout counters at the front of the store. We thank you for shopping with us today and look forward to seeing you again tomorrow at nine a.m.',
    qs: [
      { question: 'Where is this announcement being made?', choices: ['In a bank', 'In a store', 'In a library', 'In a restaurant'], answerIndex: 1 },
      { question: 'What should shoppers do?', choices: ['Leave immediately', 'Bring purchases to the checkout', 'Wait for a staff member', 'Return items'], answerIndex: 1 },
      { question: 'What time does the store reopen?', choices: ['8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Good morning everyone, thank you for joining this quarter\'s all-hands meeting. Today we\'ll review our sales performance, discuss the upcoming product launch, and open the floor for questions. Please hold your questions until the end of each section so we can stay on schedule.',
    qs: [
      { question: 'What is the purpose of this talk?', choices: ['To open a company meeting', 'To announce layoffs', 'To welcome a new client', 'To close the fiscal year'], answerIndex: 0 },
      { question: 'What topic is NOT mentioned as part of the meeting?', choices: ['Sales performance', 'A product launch', 'New office locations', 'A question and answer session'], answerIndex: 2 },
      { question: 'When should employees ask questions?', choices: ['At the very start', 'At the end of each section', 'Only by email', 'During lunch'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Welcome to the City History Museum. My name is Tom, and I\'ll be your guide for today\'s tour. We\'ll begin in the main hall, then move to the second floor to view the ancient artifacts exhibit. Please remember that photography is allowed, but flash photography is not permitted.',
    qs: [
      { question: 'Who is speaking?', choices: ['A security guard', 'A museum tour guide', 'A ticket seller', 'A museum director'], answerIndex: 1 },
      { question: 'Where will the tour begin?', choices: ['In the main hall', 'On the second floor', 'In the gift shop', 'Outside the building'], answerIndex: 0 },
      { question: 'What is not allowed?', choices: ['Photography', 'Flash photography', 'Talking', 'Eating'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Good morning, here\'s your traffic update. Highway 7 southbound is experiencing heavy delays due to construction near exit 12. Drivers are advised to take the Riverside Road detour. Traffic on all other major routes is moving smoothly this morning.',
    qs: [
      { question: 'What is this report about?', choices: ['Weather conditions', 'Traffic conditions', 'A public event', 'A road closure schedule'], answerIndex: 1 },
      { question: 'Why is Highway 7 delayed?', choices: ['An accident', 'Construction', 'Flooding', 'A parade'], answerIndex: 1 },
      { question: 'What are drivers advised to do?', choices: ['Avoid driving today', 'Take a detour via Riverside Road', 'Use public transportation', 'Wait until the afternoon'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Hi, this is Karen from Bright Solutions. I\'m calling about the proposal we sent you last week. I wanted to see if you had any questions before our call on Friday. Feel free to call me back at your convenience, or we can go over everything during the call itself.',
    qs: [
      { question: 'Why is Karen calling?', choices: ['To confirm a delivery', 'To follow up on a proposal', 'To request payment', 'To reschedule an interview'], answerIndex: 1 },
      { question: 'What is scheduled for Friday?', choices: ['A meeting', 'A call', 'A site visit', 'A product demo'], answerIndex: 1 },
      { question: 'What does Karen invite the listener to do?', choices: ['Visit her office', 'Call her back with questions', 'Send a written response', 'Cancel the call'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Before we begin the tour of the production floor, please put on the safety helmets and vests provided. Remember to stay within the marked walkways at all times, and do not approach any machinery without a supervisor present. Let\'s begin near the assembly line.',
    qs: [
      { question: 'Where is this briefing taking place?', choices: ['In an office', 'In a factory', 'In a hospital', 'In a warehouse store'], answerIndex: 1 },
      { question: 'What must visitors wear?', choices: ['Uniforms', 'Safety helmets and vests', 'Name tags', 'Gloves only'], answerIndex: 1 },
      { question: 'What are visitors told not to do?', choices: ['Take photographs', 'Approach machinery without a supervisor', 'Ask questions', 'Bring bags'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Thank you all for joining today\'s webinar on digital marketing trends. Before we start, please make sure your microphones are muted. We\'ll have a Q&A session at the end, so feel free to type your questions into the chat box throughout the presentation.',
    qs: [
      { question: 'What is the topic of the webinar?', choices: ['Financial planning', 'Digital marketing trends', 'Workplace safety', 'Software development'], answerIndex: 1 },
      { question: 'What should participants do with their microphones?', choices: ['Turn them off completely', 'Keep them muted', 'Test them first', 'Use headsets only'], answerIndex: 1 },
      { question: 'How can participants ask questions?', choices: ['By raising their hand', 'By typing in the chat box', 'By emailing the host', 'By calling in'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Here\'s your weekend weather forecast. Saturday will be mostly sunny with a high of 30 degrees, perfect for outdoor activities. However, we\'re expecting rain to move in Sunday afternoon, so if you\'re planning anything outdoors, it\'s best to schedule it for Saturday.',
    qs: [
      { question: 'What will the weather be like Saturday?', choices: ['Rainy', 'Mostly sunny', 'Very cold', 'Windy'], answerIndex: 1 },
      { question: 'What is expected Sunday afternoon?', choices: ['Snow', 'Rain', 'Strong wind', 'Extreme heat'], answerIndex: 1 },
      { question: 'What is recommended for outdoor plans?', choices: ['Cancel them', 'Schedule them for Saturday', 'Move them indoors', 'Wait until next week'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Welcome to your first day at Greenfield Corporation. This morning, we\'ll cover company policies and introduce you to your team. This afternoon, IT will help you set up your computer and email accounts. If you have any questions at any point, your HR contact is available at extension 300.',
    qs: [
      { question: 'What is happening today?', choices: ['A performance review', 'New employee orientation', 'A company party', 'A client visit'], answerIndex: 1 },
      { question: 'What will happen this afternoon?', choices: ['A team lunch', 'IT will set up computers and email', 'A safety drill', 'A department tour'], answerIndex: 1 },
      { question: 'How can employees get help?', choices: ['Visit the front desk', 'Contact HR at extension 300', 'Email the CEO', 'Ask any coworker'], answerIndex: 1 },
    ],
  },
]

const part4: ExamItem[] = part4Data.map((t, i) => ({
  id: `L4-${i + 1}`,
  part: 4 as const,
  section: 'listening' as const,
  audioScript: t.script,
  transcript: t.script,
  questions: t.qs.map((q, qi) => ({
    id: `L4-${i + 1}-q${qi + 1}`,
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
  { sentence: 'The __ of the new policy will take effect next Monday.', choices: ['implement', 'implementation', 'implementing', 'implemented'], answerIndex: 1 },
  { sentence: 'Please ensure that all documents are signed __ submitting them.', choices: ['before', 'despite', 'unless', 'although'], answerIndex: 0 },
  { sentence: 'The customer service team responded __ to every complaint.', choices: ['prompt', 'promptly', 'promptness', 'prompted'], answerIndex: 1 },
  { sentence: 'Neither the manager nor the employees __ aware of the schedule change.', choices: ['was', 'were', 'is', 'be'], answerIndex: 1 },
  { sentence: 'The company\'s profits have grown __ over the past three years.', choices: ['steady', 'steadily', 'steadiness', 'steadier'], answerIndex: 1 },
  { sentence: 'This contract is valid __ December 31st.', choices: ['until', 'since', 'for', 'by'], answerIndex: 0 },
  { sentence: 'The board members __ the proposal after a lengthy discussion.', choices: ['approve', 'approved', 'approving', 'approval'], answerIndex: 1 },
  { sentence: 'Employees are encouraged to submit __ feedback about the new system.', choices: ['honest', 'honestly', 'honesty', 'honester'], answerIndex: 0 },
  { sentence: 'The warehouse is located a short distance __ the main office.', choices: ['from', 'of', 'at', 'in'], answerIndex: 0 },
  { sentence: '__ the rain, the delivery arrived on schedule.', choices: ['Despite', 'Although', 'Because', 'Unless'], answerIndex: 0 },
  { sentence: 'She has worked at this company __ she graduated from university.', choices: ['since', 'for', 'during', 'while'], answerIndex: 0 },
  { sentence: 'The new employee handbook __ several important policy changes.', choices: ['include', 'includes', 'including', 'included'], answerIndex: 1 },
  { sentence: 'It is important __ all safety procedures during the tour.', choices: ['follow', 'to follow', 'following', 'followed'], answerIndex: 1 },
  { sentence: 'The manager asked __ the report be submitted by Friday.', choices: ['that', 'for', 'of', 'on'], answerIndex: 0 },
  { sentence: 'Our sales figures are __ than they were last quarter.', choices: ['high', 'higher', 'highest', 'highly'], answerIndex: 1 },
  { sentence: 'The technician repaired the machine __ any assistance.', choices: ['without', 'with', 'despite', 'unless'], answerIndex: 0 },
  { sentence: 'All visitors must register __ the front desk before entering.', choices: ['at', 'in', 'on', 'to'], answerIndex: 0 },
  { sentence: 'The report was written __ by the finance department.', choices: ['careful', 'carefully', 'care', 'cared'], answerIndex: 1 },
  { sentence: '__ the deadline is tomorrow, the team is confident they will finish on time.', choices: ['Although', 'Because', 'Despite', 'Unless'], answerIndex: 0 },
  { sentence: 'The CEO\'s speech was both __ and informative.', choices: ['inspire', 'inspiring', 'inspired', 'inspiration'], answerIndex: 1 },
  { sentence: 'We need someone __ can manage the new project.', choices: ['who', 'whom', 'which', 'whose'], answerIndex: 0 },
  { sentence: 'The budget report __ reviewed before it is submitted.', choices: ['must', 'must be', 'must to be', 'must being'], answerIndex: 1 },
  { sentence: 'Customers can pay __ credit card or cash.', choices: ['either', 'neither', 'both', 'or'], answerIndex: 0 },
  { sentence: 'The company plans to expand its operations __ Southeast Asia.', choices: ['into', 'on', 'at', 'for'], answerIndex: 0 },
  { sentence: 'The presentation was __ shorter than we expected.', choices: ['significant', 'significantly', 'significance', 'signify'], answerIndex: 1 },
  { sentence: 'If the shipment arrives late, we __ notify the customer immediately.', choices: ['will', 'would', 'had', 'are'], answerIndex: 0 },
  { sentence: 'The applicant\'s résumé __ impressive work experience.', choices: ['demonstrate', 'demonstrates', 'demonstrating', 'demonstrated'], answerIndex: 1 },
  { sentence: 'Please keep this information confidential __ further notice.', choices: ['until', 'since', 'during', 'for'], answerIndex: 0 },
  { sentence: 'The two companies agreed to __ their resources for the joint project.', choices: ['combine', 'combination', 'combining', 'combined'], answerIndex: 0 },
  { sentence: 'Of the two proposals submitted, the second one is __ cost-effective.', choices: ['more', 'most', 'much', 'very'], answerIndex: 0 },
]

const part5: ExamItem[] = part5Data.map((q, i) => ({
  id: `R5-${i + 1}`,
  part: 5 as const,
  section: 'reading' as const,
  sentence: q.sentence,
  questions: [
    {
      id: `R5-${i + 1}-q`,
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
    text: `To All Staff,
We are pleased to announce that the new expense-reporting software will be __(1)__ starting next Monday. All employees are __(2)__ to complete the online training module before that date. The training __(3)__ approximately 30 minutes to complete. If you experience any technical issues, please __(4)__ the IT helpdesk at extension 210.`,
    blanks: [
      { choices: ['launch', 'launched', 'launching', 'launches'], answerIndex: 1 },
      { choices: ['require', 'required', 'requiring', 'requirement'], answerIndex: 1 },
      { choices: ['take', 'takes', 'taking', 'taken'], answerIndex: 1 },
      { choices: ['contact', 'contacting', 'contacted', 'contacts'], answerIndex: 0 },
    ],
  },
  {
    text: `Join FitZone Gym today and __(1)__ from a free one-month trial membership. Our newly renovated facility offers state-of-the-art equipment, __(2)__ by certified personal trainers. Members __(3)__ also enjoy free group classes every weekend. Sign up before the end of the month __(4)__ receive an additional 10% discount on annual memberships.`,
    blanks: [
      { choices: ['benefit', 'benefits', 'benefiting', 'benefited'], answerIndex: 0 },
      { choices: ['support', 'supported', 'supporting', 'supports'], answerIndex: 1 },
      { choices: ['can', 'could', 'will', 'would'], answerIndex: 0 },
      { choices: ['so', 'and', 'to', 'but'], answerIndex: 2 },
    ],
  },
  {
    text: `Dear Team,
Due to a __(1)__ conflict, tomorrow's marketing meeting has been moved from 10 a.m. to 2 p.m. Please update your calendars __(2)__. If you are unable to attend at the new time, kindly notify your supervisor as soon __(3)__ possible. We apologize for any __(4)__ this change may cause.`,
    blanks: [
      { choices: ['schedule', 'scheduled', 'scheduling', 'schedules'], answerIndex: 2 },
      { choices: ['according', 'accordingly', 'accord', 'accordance'], answerIndex: 1 },
      { choices: ['as', 'than', 'that', 'so'], answerIndex: 0 },
      { choices: ['inconvenient', 'inconvenience', 'inconveniently', 'inconvenienced'], answerIndex: 1 },
    ],
  },
  {
    text: `Attention Customers,
We have identified a defect in a __(1)__ batch of our electric kettles manufactured between March and May. If you __(2)__ a kettle purchased during this period, please stop using it __(3)__. Contact our customer service team to arrange a free replacement. We sincerely apologize for any __(4)__ this may cause.`,
    blanks: [
      { choices: ['limit', 'limits', 'limited', 'limiting'], answerIndex: 2 },
      { choices: ['own', 'owns', 'owning', 'owned'], answerIndex: 0 },
      { choices: ['immediate', 'immediately', 'immediacy', 'immediateness'], answerIndex: 1 },
      { choices: ['concern', 'concerns', 'concerned', 'concerning'], answerIndex: 0 },
    ],
  },
]

const part6: ExamItem[] = part6Data.map((p, i) => ({
  id: `R6-${i + 1}`,
  part: 6 as const,
  section: 'reading' as const,
  passageTexts: [p.text],
  questions: p.blanks.map((b, bi) => ({
    id: `R6-${i + 1}-q${bi + 1}`,
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
Amy (9:02 AM): Hi Tom, has the shipment from our supplier in Vietnam arrived yet?
Tom (9:05 AM): Not yet. I just checked the tracking, and it's still at customs.
Amy (9:06 AM): That's the third delay this month. Can you contact them directly?
Tom (9:10 AM): I'll call them right now and update you by lunchtime.`,
    ],
    qs: [
      { question: 'What is Amy asking about?', choices: ['A job opening', 'The status of a shipment', 'A meeting time', 'A billing error'], answerIndex: 1 },
      { question: 'What will Tom do next?', choices: ['Cancel the order', 'Call the supplier and provide an update', 'Visit the customs office', 'Request a refund'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `POSITION AVAILABLE: Marketing Coordinator
Bright Path Media is seeking a Marketing Coordinator to join our growing team. Responsibilities include managing social media accounts, coordinating promotional events, and analyzing campaign performance. Candidates should have at least two years of marketing experience and strong writing skills. This is a full-time position based in our downtown office, with the option to work remotely two days per week. Interested applicants should submit a résumé and cover letter to careers@brightpathmedia.com by June 15.`,
    ],
    qs: [
      { question: 'What is the main responsibility listed for this position?', choices: ['Managing the budget', 'Managing social media accounts', 'Hiring new staff', 'Leading sales calls'], answerIndex: 1 },
      { question: 'What qualification is required?', choices: ['A graduate degree', 'At least two years of marketing experience', 'Fluency in three languages', 'Five years of management experience'], answerIndex: 1 },
      { question: 'How can candidates apply?', choices: ['By calling the office', 'By emailing a résumé and cover letter', 'By visiting in person', 'By mailing a printed application'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `NOTICE: Parking Lot Closure
The east parking lot will be closed for resurfacing from July 8 to July 10. During this time, employees are asked to use the visitor lot on Elm Street or public transportation. We apologize for the inconvenience and appreciate your patience as we improve our facilities.`,
    ],
    qs: [
      { question: 'Why is the parking lot closing?', choices: ['For a company event', 'For resurfacing', 'Due to flooding', 'For a security inspection'], answerIndex: 1 },
      { question: 'What are employees advised to do?', choices: ['Work from home', 'Use the visitor lot or public transportation', 'Carpool with a supervisor', 'Park on a different street'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Dear Ms. Carter,
Thank you for booking with Lakeside Hotel. This email confirms your reservation for a Deluxe Room from September 12 to September 15, under booking reference LH-4521. Check-in begins at 3:00 p.m., and check-out is by 11:00 a.m. Please note that your reservation includes complimentary breakfast each morning. If you need to modify your booking, please contact us at least 48 hours in advance.
Best regards,
Lakeside Hotel Reservations`,
    ],
    qs: [
      { question: 'What is the purpose of this email?', choices: ['To offer a discount', 'To confirm a hotel reservation', 'To request payment', 'To cancel a booking'], answerIndex: 1 },
      { question: 'What is included with the reservation?', choices: ['Airport pickup', 'Complimentary breakfast', 'A late checkout', 'A free spa visit'], answerIndex: 1 },
      { question: 'What should Ms. Carter do to change her booking?', choices: ['Visit the hotel in person', 'Contact the hotel at least 48 hours in advance', 'Call on the day of check-in', 'Email a different department'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `★★★★☆ Review by J. Kim
I purchased the SoundMax wireless headphones last month, and overall I'm quite satisfied. The sound quality is excellent, and the battery lasts about 20 hours per charge, just as advertised. My only complaint is that the carrying case feels a bit flimsy for the price. Still, I'd recommend this product to anyone looking for reliable headphones for daily use.`,
    ],
    qs: [
      { question: 'What does the reviewer like about the product?', choices: ['The price', 'The sound quality and battery life', 'The carrying case', 'The warranty'], answerIndex: 1 },
      { question: 'What is the reviewer\'s complaint?', choices: ['The sound quality is poor', 'The battery drains quickly', 'The carrying case feels flimsy', 'It was delivered late'], answerIndex: 2 },
      { question: 'Would the reviewer recommend the product?', choices: ['Yes', 'No', 'Only for professional use', 'Only if the price drops'], answerIndex: 0 },
    ],
  },
  {
    texts: [
      `Local Bakery Expands to Second Location
Sweet Hearth Bakery, a favorite among residents for its artisan bread, announced this week that it will open a second location downtown next spring. Owner Maria Lopez said the expansion comes after three years of steady growth and repeated requests from customers outside the original neighborhood. The new location will feature a larger seating area and will also offer baking classes on weekends. Lopez expects the new shop to create about 15 new jobs in the community.`,
    ],
    qs: [
      { question: 'What is Sweet Hearth Bakery known for?', choices: ['Its coffee', 'Its artisan bread', 'Its catering service', 'Its cake decorating classes'], answerIndex: 1 },
      { question: 'Why did the owner decide to expand?', choices: ['A investor offer', 'Steady growth and customer requests', 'A government grant', 'A competitor closing'], answerIndex: 1 },
      { question: 'What new feature will the second location offer?', choices: ['A drive-through', 'Baking classes on weekends', 'Delivery service', 'A children\'s play area'], answerIndex: 1 },
      { question: 'How many jobs is the expansion expected to create?', choices: ['About 5', 'About 15', 'About 30', 'About 50'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `To All Staff,
Starting next month, our company will adopt a business casual dress code Monday through Thursday, with casual Fridays continuing as usual. Business casual includes collared shirts, blouses, and slacks. Jeans and sneakers are only permitted on Fridays. Please direct any questions to the HR department.`,
    ],
    qs: [
      { question: 'What is changing next month?', choices: ['The office location', 'The company\'s dress code', 'The work schedule', 'The vacation policy'], answerIndex: 1 },
      { question: 'When are jeans permitted?', choices: ['Every day', 'On Fridays', 'Never', 'Only for remote work'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Free Webinar: Mastering Time Management
Join productivity expert Daniel Wu for a free 60-minute webinar on practical time-management strategies for busy professionals. The session takes place on August 20 at 1:00 p.m. and will include a live Q&A at the end. Registration is required, and seats are limited to the first 200 participants. Sign up today at www.timemasterseries.com.`,
    ],
    qs: [
      { question: 'Who is hosting the webinar?', choices: ['Daniel Wu', 'A software company', 'A university', 'A government agency'], answerIndex: 0 },
      { question: 'How long will the webinar last?', choices: ['30 minutes', '60 minutes', '90 minutes', '2 hours'], answerIndex: 1 },
      { question: 'What is required to attend?', choices: ['Payment', 'Registration', 'A referral', 'Prior experience'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Business Trip Itinerary — Mr. Suarez
Monday, Oct 3: Depart Bangkok 8:00 a.m., arrive Singapore 11:30 a.m. Check in at Marina Hotel.
Tuesday, Oct 4: Client meeting at Global Tech Ltd., 9:00 a.m. – 12:00 p.m. Lunch with regional manager.
Wednesday, Oct 5: Attend industry conference at Suntec Convention Center, all day.
Thursday, Oct 6: Depart Singapore 4:00 p.m., arrive Bangkok 5:30 p.m.`,
    ],
    qs: [
      { question: 'Where does Mr. Suarez stay while in Singapore?', choices: ['Marina Hotel', 'Suntec Hotel', 'City Center Inn', 'Riverside Suites'], answerIndex: 0 },
      { question: 'What is scheduled for Tuesday morning?', choices: ['A flight', 'A client meeting at Global Tech Ltd.', 'A conference', 'A hotel checkout'], answerIndex: 1 },
      { question: 'Where does the conference take place?', choices: ['Marina Hotel', 'Global Tech Ltd. office', 'Suntec Convention Center', 'The airport'], answerIndex: 2 },
      { question: 'When does Mr. Suarez return to Bangkok?', choices: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], answerIndex: 3 },
    ],
  },
  {
    texts: [
      `Dear Hiring Committee,
I am writing to recommend Ms. Patel for the position of Project Manager at your organization. During her three years working under my supervision, she consistently demonstrated excellent organizational skills and the ability to manage multiple projects simultaneously. She played a key role in delivering our largest client project two months ahead of schedule. I am confident she would be a valuable addition to your team.
Sincerely,
David Chen, Operations Director`,
    ],
    qs: [
      { question: 'What is the purpose of this letter?', choices: ['To request a raise', 'To recommend Ms. Patel for a job', 'To resign from a position', 'To complain about a project'], answerIndex: 1 },
      { question: 'What skill is highlighted?', choices: ['Public speaking', 'Organizational skills and managing multiple projects', 'Foreign language ability', 'Technical coding skills'], answerIndex: 1 },
      { question: 'What achievement is mentioned?', choices: ['Winning an award', 'Delivering a project two months early', 'Hiring new staff', 'Publishing a report'], answerIndex: 1 },
    ],
  },
]

const part7Double: PassageData[] = [
  {
    texts: [
      `Subject: Registration Issue
Dear Organizer,
I registered for the Global Business Summit last week, but I have not yet received a confirmation email or my badge information. My registration ID is GBS-3391. Could you please check on this? The event is only two weeks away, and I want to make sure everything is in order.
Best regards,
Ellen Park`,
      `Subject: RE: Registration Issue
Dear Ms. Park,
Thank you for reaching out. I checked our system and found that your registration was successful, but the confirmation email was sent to an incorrect address due to a typo. I have corrected this and resent the confirmation along with your badge details. Please let us know if you still don't see it within 24 hours.
Best regards,
Conference Support Team`,
    ],
    qs: [
      { question: 'Why is Ellen Park writing?', choices: ['To cancel her registration', 'She did not receive her registration confirmation', 'To request a refund', 'To change her ticket type'], answerIndex: 1 },
      { question: 'What is Ellen\'s registration ID?', choices: ['GBS-3391', 'GBS-3319', 'GBS-1393', 'GBS-9331'], answerIndex: 0 },
      { question: 'What caused the problem?', choices: ['A system outage', 'A typo in her email address', 'A late payment', 'A cancelled event'], answerIndex: 1 },
      { question: 'What did the support team do?', choices: ['Issued a refund', 'Resent the confirmation and badge details', 'Cancelled her registration', 'Upgraded her ticket'], answerIndex: 1 },
      { question: 'What should Ellen do if she still doesn\'t see the email?', choices: ['Register again', 'Contact them within 24 hours', 'Wait one week', 'Call the venue'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `CityBike Rentals — Explore the City on Two Wheels!
Rent a bicycle by the hour, day, or week. Locations available at Central Park, Riverside Station, and Downtown Plaza. Helmets provided free of charge. Members of our loyalty program receive 15% off all rentals. Visit citybikerentals.com to reserve online.`,
      `Subject: Question About Weekly Rentals
Hello,
I'm planning to rent a bicycle for a full week starting July 10. Could you tell me if the weekly rate includes a lock, and whether I can pick up the bike at one location and return it at another? Also, are loyalty program discounts applied automatically at checkout?
Thanks,
Robert Given`,
    ],
    qs: [
      { question: 'What does CityBike Rentals offer for free?', choices: ['A lock', 'Helmets', 'A water bottle', 'A phone holder'], answerIndex: 1 },
      { question: 'How can customers get a discount?', choices: ['By renting for a full month', 'By joining the loyalty program', 'By paying in cash', 'By renting two bikes'], answerIndex: 1 },
      { question: 'What does Robert want to know about the lock?', choices: ['Its price', 'Whether it\'s included in the weekly rate', 'Where to buy one', 'How to use it'], answerIndex: 1 },
      { question: 'What else is Robert asking about?', choices: ['A group discount', 'Whether he can return the bike at a different location', 'Insurance coverage', 'A helmet size'], answerIndex: 1 },
      { question: 'When does Robert plan to start his rental?', choices: ['July 1', 'July 10', 'July 15', 'August 10'], answerIndex: 1 },
    ],
  },
]

const part7Triple: PassageData[] = [
  {
    texts: [
      `Introducing the ProBlend 3000 Blender
Powerful enough to crush ice, blend smoothies, and puree soups in seconds. Now available for 1,990 baht (regularly 2,500 baht) for a limited time. Free shipping on orders over 1,500 baht.`,
      `Order Confirmation #58213
Thank you for your order, Mr. Nakamura! You purchased 1 ProBlend 3000 Blender for 1,990 baht. Your order will be shipped within 3-5 business days to your registered address. Free shipping has been applied to your order.`,
      `Subject: Blender Arrived Damaged
Dear Customer Service,
I received order #58213 today, but the blender's lid was cracked upon arrival. I would like to request a replacement rather than a refund, as I still want to use the product. Please let me know the next steps.
Regards,
Mr. Nakamura`,
    ],
    qs: [
      { question: 'What is the regular price of the ProBlend 3000?', choices: ['1,500 baht', '1,990 baht', '2,000 baht', '2,500 baht'], answerIndex: 3 },
      { question: 'How did Mr. Nakamura qualify for free shipping?', choices: ['He is a loyalty member', 'His order was over 1,500 baht', 'He picked up in-store', 'He paid by bank transfer'], answerIndex: 1 },
      { question: 'What is the problem with Mr. Nakamura\'s order?', choices: ['It never arrived', 'The lid was cracked', 'It was the wrong color', 'It was missing parts'], answerIndex: 1 },
      { question: 'What does Mr. Nakamura want instead of a refund?', choices: ['Store credit', 'A replacement', 'A discount coupon', 'A repair'], answerIndex: 1 },
      { question: 'What was the order number?', choices: ['53812', '58213', '58231', '85213'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `POSITION: Graphic Designer
Studio Nine is hiring a Graphic Designer with at least 3 years of experience in branding and digital design. Proficiency in Adobe Creative Suite is required. Send your portfolio and résumé to hr@studionine.com.`,
      `Subject: Application for Graphic Designer Position
Dear Hiring Manager,
I am writing to apply for the Graphic Designer position posted on your website. I have 4 years of experience in branding design and am proficient in the full Adobe Creative Suite. My portfolio is attached for your review.
Best regards,
Hannah Wells`,
      `Subject: Interview Invitation — Graphic Designer
Dear Ms. Wells,
Thank you for your application. We were impressed with your portfolio and would like to invite you for an interview on Thursday, April 18, at 10:00 a.m. at our downtown office. Please confirm your availability by replying to this email.
Best regards,
Studio Nine HR Team`,
    ],
    qs: [
      { question: 'What experience is required for the position?', choices: ['At least 1 year', 'At least 3 years in branding and digital design', 'At least 5 years', 'No experience required'], answerIndex: 1 },
      { question: 'How many years of experience does Hannah have?', choices: ['2 years', '3 years', '4 years', '5 years'], answerIndex: 2 },
      { question: 'What did Hannah attach to her email?', choices: ['A reference letter', 'Her portfolio', 'A salary request', 'A certificate'], answerIndex: 1 },
      { question: 'When is Hannah\'s interview scheduled?', choices: ['Wednesday, April 17', 'Thursday, April 18, at 10:00 a.m.', 'Friday, April 19, at 2:00 p.m.', 'Monday, April 21'], answerIndex: 1 },
      { question: 'What does Studio Nine ask Hannah to do?', choices: ['Send more work samples', 'Confirm her availability by replying', 'Call the office', 'Bring a printed résumé'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Annual Tech Innovators Conference
Date: November 14-15
Venue: Riverside Convention Center
Day 1: Keynote speeches and networking lunch
Day 2: Workshops and startup pitch competition
Early registration deadline: October 20 (discounted rate: 3,500 baht)`,
      `Subject: Conference Registration Confirmed
Dear Mr. Ahmed,
Thank you for registering for the Annual Tech Innovators Conference at the early-bird rate of 3,500 baht. Your registration includes access to both days of the event, including the networking lunch and workshops. A confirmation badge will be mailed to you within one week.
Best regards,
Conference Registration Team`,
      `Subject: Reminder: Conference Starts in 3 Days
Dear Attendee,
This is a reminder that the Annual Tech Innovators Conference begins in 3 days. Please remember to bring your confirmation badge and a valid photo ID for check-in. Parking is available at the Riverside Convention Center for 100 baht per day.
See you soon!`,
    ],
    qs: [
      { question: 'Where is the conference being held?', choices: ['Downtown Plaza', 'Riverside Convention Center', 'City Hall', 'Marina Hotel'], answerIndex: 1 },
      { question: 'What happens on Day 2 of the conference?', choices: ['Keynote speeches', 'Workshops and a startup pitch competition', 'A networking lunch only', 'Registration check-in'], answerIndex: 1 },
      { question: 'How much did Mr. Ahmed pay for registration?', choices: ['3,000 baht', '3,500 baht', '4,000 baht', '4,500 baht'], answerIndex: 1 },
      { question: 'What is included in Mr. Ahmed\'s registration?', choices: ['Hotel accommodation', 'Access to both days, including lunch and workshops', 'Airport transfer', 'A gift bag only'], answerIndex: 1 },
      { question: 'What must attendees bring for check-in?', choices: ['Only their badge', 'Their confirmation badge and a valid photo ID', 'A printed ticket', 'Cash payment'], answerIndex: 1 },
    ],
  },
]

const part7: ExamItem[] = [
  ...part7Single.map((p, i) => ({
    id: `R7-S${i + 1}`,
    part: 7 as const,
    section: 'reading' as const,
    passageTexts: p.texts,
    questions: p.qs.map((q, qi) => ({
      id: `R7-S${i + 1}-q${qi + 1}`,
      question: q.question,
      choices: q.choices,
      answerIndex: q.answerIndex,
    })),
  })),
  ...part7Double.map((p, i) => ({
    id: `R7-D${i + 1}`,
    part: 7 as const,
    section: 'reading' as const,
    passageTexts: p.texts,
    questions: p.qs.map((q, qi) => ({
      id: `R7-D${i + 1}-q${qi + 1}`,
      question: q.question,
      choices: q.choices,
      answerIndex: q.answerIndex,
    })),
  })),
  ...part7Triple.map((p, i) => ({
    id: `R7-T${i + 1}`,
    part: 7 as const,
    section: 'reading' as const,
    passageTexts: p.texts,
    questions: p.qs.map((q, qi) => ({
      id: `R7-T${i + 1}-q${qi + 1}`,
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
