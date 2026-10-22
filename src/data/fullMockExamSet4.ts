import type { ExamItem } from '../lib/types'

// ============================================================
// FULL MOCK EXAM — SET 4
// LISTENING SECTION — 100 questions (Part 1: 6, Part 2: 25, Part 3: 39, Part 4: 30)
// ============================================================

const part1: ExamItem[] = [
  {
    id: 'S4-L1-1',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: ชายใส่สูทและหญิงสาวยืนจับมือกันกลางแจ้ง',
    imageId: 'handshake-outdoors',
    questions: [
      {
        id: 'S4-L1-1-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          "They're exchanging business cards.",
          "They're sitting across a table.",
          "They're shaking hands.",
          "They're opening a door.",
        ],
        answerIndex: 2,
      },
    ],
    transcript: "They're shaking hands.",
  },
  {
    id: 'S4-L1-2',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: ผู้หญิงนั่งใช้แล็ปท็อปที่โต๊ะไม้',
    imageId: 'laptop-wooden-table',
    questions: [
      {
        id: 'S4-L1-2-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A woman is using a laptop computer.',
          'A woman is hanging a picture on the wall.',
          'A woman is putting a laptop into a bag.',
          'Some chairs are stacked in a corner.',
        ],
        answerIndex: 0,
      },
    ],
    transcript: 'A woman is using a laptop computer.',
  },
  {
    id: 'S4-L1-3',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: คนงานยกกล่องขึ้นเหนือศีรษะ โดยมีรถบรรทุกส่งของจอดอยู่ข้างๆ',
    imageId: 'box-delivery-truck',
    questions: [
      {
        id: 'S4-L1-3-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A truck is being driven down a highway.',
          "A worker is climbing into the driver's seat.",
          "Some boxes are piled on the truck's roof.",
          'A worker is lifting a box near a parked truck.',
        ],
        answerIndex: 3,
      },
    ],
    transcript: 'A worker is lifting a box near a parked truck.',
  },
  {
    id: 'S4-L1-4',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: หม้อใบใหญ่สองใบวางอยู่บนเตาเก่าในร้านอาหาร ไม่มีคนอยู่ในภาพ',
    imageId: 'pots-stove',
    questions: [
      {
        id: 'S4-L1-4-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A cook is washing dishes in a sink.',
          'Some large pots have been placed on a stove.',
          'Food is being served to some diners.',
          'Some pots are hanging on the wall.',
        ],
        answerIndex: 1,
      },
    ],
    transcript: 'Some large pots have been placed on a stove.',
  },
  {
    id: 'S4-L1-5',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: ชายคนหนึ่งยืนพิงอยู่ข้างรถบัสที่จอดอยู่',
    imageId: 'driver-beside-bus',
    questions: [
      {
        id: 'S4-L1-5-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A man is driving a bus.',
          'Passengers are getting off a train.',
          'A man is standing beside a parked bus.',
          'A bus is being washed.',
        ],
        answerIndex: 2,
      },
    ],
    transcript: 'A man is standing beside a parked bus.',
  },
  {
    id: 'S4-L1-6',
    part: 1,
    section: 'listening',
    imageDescription: '🖼️ ภาพ: เครื่องถ่ายเอกสารตั้งอยู่ข้างโต๊ะ มีกล่องวางอยู่ใกล้ๆ ไม่มีคนอยู่ในภาพ',
    imageId: 'copier-table',
    questions: [
      {
        id: 'S4-L1-6-q',
        question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
        choices: [
          'A man is carrying a printer up the stairs.',
          'A man is sitting at a reception desk.',
          'Paper is being loaded into a delivery van.',
          'A copy machine is next to a table.',
        ],
        answerIndex: 3,
      },
    ],
    transcript: 'A copy machine is next to a table.',
  },
]

const part2Data: { script: string; choices: string[]; answerIndex: number }[] = [
  { script: 'When is the new receptionist starting?', choices: ['At the front desk.', 'Next Monday, I believe.', 'She received it already.'], answerIndex: 1 },
  { script: 'Where should I put these catering trays?', choices: ['On the table by the window.', 'Yes, they were delicious.', 'About forty guests.'], answerIndex: 0 },
  { script: "Who's presenting the budget proposal this afternoon?", choices: ['It was proposed in March.', 'In conference room B.', 'Ms. Okafor from finance.'], answerIndex: 2 },
  { script: 'Why was the product demonstration postponed?', choices: ["The projector wasn't working.", "It's a new product.", 'Yes, to the demonstration hall.'], answerIndex: 0 },
  { script: 'Would you like me to print the agenda for you?', choices: ["It's on the second page.", 'Thanks, that would be helpful.', 'The printer is new.'], answerIndex: 1 },
  { script: 'How often do you update the client database?', choices: ['A data analyst.', 'Not very far.', 'Every Friday afternoon.'], answerIndex: 2 },
  { script: "The supplier hasn't sent the price list yet, has it?", choices: ["No, I'll call them again.", 'The prices are reasonable.', 'Send it by courier.'], answerIndex: 0 },
  { script: 'Is the training session in the morning or the afternoon?', choices: ['Yes, the session went well.', "It starts at two o'clock.", 'About twenty trainees.'], answerIndex: 1 },
  { script: 'Which hotel did you book for the sales conference?', choices: ['Two nights.', 'The conference was useful.', 'The one next to the convention center.'], answerIndex: 2 },
  { script: "Let's ask the IT department to set up the new laptops.", choices: ["Good idea, I'll e-mail them now.", 'They set the table.', "It's a light laptop."], answerIndex: 0 },
  { script: 'What did the clients think of the new logo?', choices: ['At the design agency.', 'They liked the color scheme.', 'Yes, I think so.'], answerIndex: 1 },
  { script: "Haven't the parking permits been renewed?", choices: ['The car is parked outside.', "He's permitted to enter.", 'I submitted the forms yesterday.'], answerIndex: 2 },
  { script: 'Could you cover my shift on Saturday?', choices: ['Sorry, I have plans that day.', 'The shift key is broken.', 'On the cover page.'], answerIndex: 0 },
  { script: 'How many brochures should we bring to the career fair?', choices: ['It was fair.', 'Around two hundred should be enough.', "They're bringing it tomorrow."], answerIndex: 1 },
  { script: 'Where is the nearest pharmacy?', choices: ['The pharmacist is very kind.', "I didn't take any.", "There's one across from the bank."], answerIndex: 2 },
  { script: "Why don't you take the express train instead?", choices: ["I didn't know there was one.", 'He trained the new staff.', 'Platform four, I think.'], answerIndex: 0 },
  { script: 'When will the renovation of the lobby be finished?', choices: ['A new reception desk.', 'Not until the end of the month.', 'It was renovated by Kim Builders.'], answerIndex: 1 },
  { script: 'Do you know who left this umbrella in the meeting room?', choices: ['It rained all morning.', 'The meeting ended early.', 'It might belong to Mr. Lee.'], answerIndex: 2 },
  { script: 'Should we hire a photographer for the anniversary event?', choices: ["The budget doesn't allow it.", 'A nice photograph.', 'He took the picture.'], answerIndex: 0 },
  { script: "What's the deadline for submitting expense reports?", choices: ['I expect so.', 'The fifteenth of each month.', 'It was very expensive.'], answerIndex: 1 },
  { script: 'Can I pay for the workshop by credit card?', choices: ["It's held every week.", 'Twelve participants.', 'Yes, we accept all major cards.'], answerIndex: 2 },
  { script: 'The quarterly sales figures look encouraging.', choices: ['Yes, the new campaign really helped.', 'At a quarter past.', 'I figured it out.'], answerIndex: 0 },
  { script: 'Who should I contact about a broken air conditioner?', choices: ["It's too cold in here.", 'Call building maintenance at extension 210.', 'It was installed last year.'], answerIndex: 1 },
  { script: 'Are you going to the product launch, or are you staying at the office?', choices: ['It launched successfully.', "Yes, I'm going.", 'I have to finish a report here.'], answerIndex: 2 },
  { script: 'How was the flight from Singapore?', choices: ['Smooth, and we landed early.', 'Gate fifteen.', 'Twice a week.'], answerIndex: 0 },
]

const part2: ExamItem[] = part2Data.map((q, i) => ({
  id: `S4-L2-${i + 1}`,
  part: 2 as const,
  section: 'listening' as const,
  audioScript: q.script,
  questions: [
    {
      id: `S4-L2-${i + 1}-q`,
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
      "Woman: Hi, this is Mai from Corvia Logistics. I'd like to order lunch for a training workshop on Thursday, for about thirty people.\n" +
      'Man: Certainly. Would you like our standard buffet or individual boxed lunches?\n' +
      'Woman: Boxed lunches would be easier, since participants will eat at their desks. And at least eight of them should be vegetarian.\n' +
      "Man: No problem. I'll e-mail you a menu this afternoon so you can choose the dishes.",
    qs: [
      { question: 'Why is the woman calling?', choices: ['To cancel a reservation', 'To complain about a delivery', 'To order food for an event', 'To book a training room'], answerIndex: 2 },
      { question: 'Why does the woman prefer boxed lunches?', choices: ['They are less expensive', 'Participants will eat at their desks', 'The buffet is fully booked', 'They can be delivered earlier'], answerIndex: 1 },
      { question: 'What will the man send this afternoon?', choices: ['A menu', 'An invoice', 'A delivery schedule', 'A discount coupon'], answerIndex: 0 },
    ],
  },
  {
    script:
      'Man: Ms. Duarte, three of our company vans are due for their annual servicing next week.\n' +
      'Woman: Next week is a problem. We have deliveries scheduled every day for the new store openings.\n' +
      'Man: Then how about sending one van at a time? The garage said each service only takes half a day.\n' +
      'Woman: That should work. Please book the first one for Monday morning.',
    qs: [
      { question: 'What are the speakers mainly discussing?', choices: ['Hiring new drivers', 'Scheduling vehicle maintenance', 'Opening a new store', 'Buying additional vans'], answerIndex: 1 },
      { question: 'Why is next week a problem for the woman?', choices: ['The garage will be closed', 'Some drivers are on vacation', 'Many deliveries are planned', 'The vans are being sold'], answerIndex: 2 },
      { question: 'What does the woman ask the man to do?', choices: ['Contact a different garage', 'Rent a replacement van', 'Postpone the store openings', 'Book an appointment for Monday'], answerIndex: 3 },
    ],
  },
  {
    script:
      'Woman: Good morning, Brightsmile Dental Clinic. How can I help you?\n' +
      "Man: Hi, I have a checkup on Wednesday at four, but I've just been asked to attend a client meeting at that time. Is there anything available later in the week?\n" +
      'Woman: Let me see... Dr. Patel has an opening on Friday at eight-thirty in the morning.\n' +
      "Man: That's perfect. I can come in before work.",
    qs: [
      { question: 'Where does the woman work?', choices: ['At a dental clinic', 'At a pharmacy', 'At a law firm', 'At a fitness center'], answerIndex: 0 },
      { question: 'Why does the man need to change his appointment?', choices: ['He will be out of town', 'He has a work commitment', 'His car is being repaired', 'He is feeling better'], answerIndex: 1 },
      { question: 'When will the man most likely visit the clinic?', choices: ['Wednesday afternoon', 'Thursday morning', 'Friday afternoon', 'Friday morning'], answerIndex: 3 },
    ],
  },
  {
    script:
      'Man: Have you heard back from the translation agency about the user manual for the Japanese market?\n' +
      'Woman: Yes. They said the full manual would take three weeks, which is a week later than we hoped.\n' +
      'Man: Hmm. The product ships to Japan on the twentieth. Could they translate the safety section first?\n' +
      "Woman: I'll ask. If they can, we can include that section in the box and post the rest online later.",
    qs: [
      { question: 'What is being translated?', choices: ['A sales contract', 'A product user manual', 'A company Web site', 'A press release'], answerIndex: 1 },
      { question: 'What problem does the woman mention?', choices: ['The cost is higher than expected', 'The agency lacks Japanese translators', 'The work will take longer than hoped', 'The manual contains errors'], answerIndex: 2 },
      { question: 'What does the man suggest?', choices: ['Translating one section first', 'Hiring a different agency', 'Delaying the shipment', 'Shortening the manual'], answerIndex: 0 },
    ],
  },
  {
    script:
      "Woman: Hello, I'm the HR manager at Talon Engineering. We're interested in a corporate membership at your fitness center for our staff.\n" +
      'Man: Wonderful. For companies with more than fifty employees, we offer a twenty percent discount on monthly fees.\n' +
      'Woman: We have about seventy people, so that would apply. Do the memberships include group classes?\n' +
      "Man: Yes, all classes are included. I can bring a brochure to your office tomorrow if you'd like.",
    qs: [
      { question: 'Who most likely is the woman?', choices: ['A fitness instructor', 'An engineer', 'A receptionist', 'A human resources manager'], answerIndex: 3 },
      { question: 'What does the man say about companies with over fifty employees?', choices: ['They receive a discount', 'They get free personal training', 'They must sign a two-year contract', 'They can use a private room'], answerIndex: 0 },
      { question: 'What does the man offer to do?', choices: ['Give a tour of the facility', 'Waive the registration fee', 'Deliver a brochure', 'E-mail a contract'], answerIndex: 2 },
    ],
  },
  {
    script:
      "Man: Excuse me, I'm with the Larkin Pharmaceuticals group in the Orchid Room. The microphone at the podium isn't working.\n" +
      "Woman: I'm sorry about that. Our technician is on his lunch break, but I can bring you a wireless microphone right away.\n" +
      'Man: Thanks. Our keynote speaker starts in ten minutes, so we need it quickly.\n' +
      "Woman: I'll be there in two minutes, and I'll ask the technician to check the podium as soon as he's back.",
    qs: [
      { question: 'Where does the conversation most likely take place?', choices: ['At a hotel', 'At a hospital', 'At a radio station', 'At an electronics store'], answerIndex: 0 },
      { question: 'What problem does the man report?', choices: ['A room is too small', 'A speaker has not arrived', 'The lights are too dim', 'A microphone is not working'], answerIndex: 3 },
      { question: 'Why is the man in a hurry?', choices: ['He has to catch a flight', 'The room must be vacated soon', 'A presentation is about to begin', 'The technician is leaving'], answerIndex: 2 },
    ],
  },
  {
    script:
      'Woman: Did you see the results of the staff survey about the cafeteria?\n' +
      'Man: I did. Most people were happy with the food, but many complained about the long lines at noon.\n' +
      'Woman: Maybe we could stagger lunch breaks by department, with some teams eating at eleven-thirty and others at twelve-thirty.\n' +
      "Man: That's a good idea. Let's bring it up at Monday's management meeting.",
    qs: [
      { question: 'What are the speakers discussing?', choices: ['A menu change', 'Survey results', 'A new cafeteria supplier', 'Building renovations'], answerIndex: 1 },
      { question: 'What did many employees complain about?', choices: ['The food prices', 'The quality of the food', 'Long lines at lunchtime', 'Limited seating'], answerIndex: 2 },
      { question: 'What will the speakers most likely do on Monday?', choices: ['Interview cafeteria staff', 'Conduct another survey', 'Extend lunch breaks', 'Present a proposal at a meeting'], answerIndex: 3 },
    ],
  },
  {
    script:
      "Man: I just got a notice from Delta Packaging. They're raising the price of cardboard boxes by fifteen percent next month.\n" +
      "Woman: That's a big increase. Have you compared prices with other suppliers?\n" +
      "Man: I got a quote from Ridgeway Paper. They're slightly cheaper, but their minimum order is much larger.\n" +
      "Woman: We do have extra space in the warehouse now. Send me their quote, and I'll review it today.",
    qs: [
      { question: "What is the man's news?", choices: ['A supplier will raise its prices', 'A shipment was damaged', 'The warehouse is full', 'An order was canceled'], answerIndex: 0 },
      { question: 'What is the disadvantage of Ridgeway Paper?', choices: ['Its products are low quality', 'Its delivery times are slow', 'It requires a larger minimum order', 'It is located overseas'], answerIndex: 2 },
      { question: 'What does the woman imply when she says, "We do have extra space in the warehouse now"?', choices: ['She wants to rent out the space', 'A larger order could be stored', 'The warehouse needs cleaning', 'Some staff should be relocated'], answerIndex: 1 },
    ],
  },
  {
    script:
      'Woman: Hi, I\'m looking for the third edition of "Principles of Supply Chain Management." The shelf seems to be empty.\n' +
      "Man: Let me check our system... I'm afraid we're out of stock, but we can order it for you. It usually takes about five days.\n" +
      "Woman: My class starts on Monday, so that's too late. Do you have an electronic version?\n" +
      'Man: We do. You can buy the e-book on our Web site and download it immediately.',
    qs: [
      { question: 'What is the woman looking for?', choices: ['A notebook', 'A magazine', 'A dictionary', 'A textbook'], answerIndex: 3 },
      { question: "Why does the woman reject the man's first offer?", choices: ['The price is too high', 'She needs the book sooner', 'She prefers a newer edition', 'She will be traveling'], answerIndex: 1 },
      { question: 'What does the man suggest?', choices: ['Visiting another branch', 'Borrowing the book from a library', 'Purchasing an electronic version', 'Asking her instructor'], answerIndex: 2 },
    ],
  },
  {
    script:
      "Woman: Raj, Kenji, thanks for joining. We have six summer interns starting in June, and I'd like each of them to have a mentor.\n" +
      "Man 1: I'm happy to mentor one. Should the mentors be from the same department as the interns?\n" +
      "Woman: Ideally, yes. Kenji, you have two interns joining the design team, don't you?\n" +
      "Man 2: That's right. I can take one, and I'll ask Lucia to mentor the other.",
    qs: [
      { question: 'What is the purpose of the conversation?', choices: ['To interview internship candidates', 'To arrange mentors for interns', 'To plan a summer party', 'To review a design project'], answerIndex: 1 },
      { question: 'When will the interns start?', choices: ['In April', 'In May', 'In July', 'In June'], answerIndex: 3 },
      { question: 'What will Kenji do?', choices: ['Ask a colleague to help', 'Lead a training session', 'Change departments', 'Write a job posting'], answerIndex: 0 },
    ],
  },
  {
    script:
      'Man: The engineer from SunPeak Energy finished inspecting our factory roof this morning.\n' +
      'Woman: Great. Can the roof support the solar panels we want to install?\n' +
      'Man: Most of it can, but the section above the loading dock needs to be reinforced first. That will add about two weeks to the project.\n' +
      "Woman: That's fine, as long as the system is running before the hot season. Please ask SunPeak for an updated timeline.",
    qs: [
      { question: 'Who inspected the roof?', choices: ['A building owner', 'A city official', 'A factory worker', 'An engineer from an energy company'], answerIndex: 3 },
      { question: 'What does the man say about the area above the loading dock?', choices: ['It must be reinforced', 'It is too shaded', 'It will be used for storage', 'It has already been repaired'], answerIndex: 0 },
      { question: 'What does the woman ask the man to request?', choices: ['A price reduction', 'A revised schedule', 'A second inspection', 'A product catalog'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Woman: Hi, I'd like to book your studio for a product photo shoot. We need images of our new handbag line for our autumn catalog.\n" +
      'Man: Sure. Our large studio is available on the eighth and the eleventh of next month. How many products are there?\n' +
      'Woman: About forty bags. Do you provide a photographer, or do we need to bring our own?\n' +
      'Man: Either is fine. If you use ours, the fee includes basic photo editing.',
    qs: [
      { question: 'What does the woman want to do?', choices: ['Buy a camera', 'Hire a model', 'Reserve a studio', 'Print a catalog'], answerIndex: 2 },
      { question: 'What kind of products will be photographed?', choices: ['Shoes', 'Handbags', 'Jewelry', 'Furniture'], answerIndex: 1 },
      { question: "According to the man, what is included if the studio's photographer is used?", choices: ['Basic photo editing', 'Free printing', 'Lighting equipment rental', 'A second shooting day'], answerIndex: 0 },
    ],
  },
  {
    script:
      'Man: Sales always double in December. I think we should hire some temporary staff for the holiday season.\n' +
      'Woman: I agree. Last year we had only two extra people, and the checkout lines were too long.\n' +
      'Man: How about four this year? Two for the registers and two for gift-wrapping.\n' +
      "Woman: Sounds good. I'll post the job ad on our Web site and at the community center this afternoon.",
    qs: [
      { question: 'Where do the speakers most likely work?', choices: ['At a restaurant', 'At a bank', 'At a post office', 'At a retail store'], answerIndex: 3 },
      { question: 'What problem happened last year?', choices: ['Some products sold out', 'Checkout lines were too long', 'Staff worked overtime', 'Gift-wrapping paper ran out'], answerIndex: 1 },
      { question: 'What will the woman do this afternoon?', choices: ['Interview applicants', 'Order more stock', 'Post a job advertisement', 'Decorate the store'], answerIndex: 2 },
    ],
  },
]

const part3: ExamItem[] = part3Data.map((c, i) => ({
  id: `S4-L3-${i + 1}`,
  part: 3 as const,
  section: 'listening' as const,
  audioScript: c.script,
  transcript: c.script,
  questions: c.qs.map((q, qi) => ({
    id: `S4-L3-${i + 1}-q${qi + 1}`,
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
      'Attention, passengers. Due to scheduled signal maintenance, the 10:45 express train to Hua Hin will depart from platform 6 instead of platform 2 this morning. The train is expected to leave about fifteen minutes late. Passengers with reserved seats do not need to change their tickets. For further assistance, please visit the information counter next to the main entrance.',
    qs: [
      { question: 'Why has the platform been changed?', choices: ['Bad weather', 'A crowded station', 'A train breakdown', 'Signal maintenance'], answerIndex: 3 },
      { question: 'How late is the train expected to be?', choices: ['Five minutes', 'Ten minutes', 'Fifteen minutes', 'Forty-five minutes'], answerIndex: 2 },
      { question: 'Where can passengers get more help?', choices: ['At the information counter', 'On platform 2', 'At the ticket machine', 'On the train'], answerIndex: 0 },
    ],
  },
  {
    script:
      'Good afternoon, FreshWay shoppers! Chef Anong Sirikul is in our produce section right now, demonstrating how to prepare a quick and healthy stir-fry using seasonal vegetables. Stop by to taste a free sample and pick up a recipe card. And today only, all ingredients used in the demonstration are fifteen percent off when you show your FreshWay member card at the register.',
    qs: [
      { question: 'Where is the demonstration taking place?', choices: ['In the bakery', 'In the produce section', 'Near the entrance', 'At the seafood counter'], answerIndex: 1 },
      { question: 'What can shoppers receive at the demonstration?', choices: ['A cookbook', 'A shopping bag', 'A recipe card', 'A gift certificate'], answerIndex: 2 },
      { question: 'How can shoppers get a discount?', choices: ['By spending over 1,000 baht', 'By using a newspaper coupon', 'By shopping before noon', 'By showing a member card'], answerIndex: 3 },
    ],
  },
  {
    script:
      "Hello, Mr. Hendricks. This is Paolo from Westside Auto Care calling about your car. We've finished the oil change and brake inspection you requested. However, our mechanic noticed that your front tires are quite worn and should be replaced soon. We have the right size in stock and could replace them today for an additional 6,200 baht. Please call me back before three o'clock if you'd like us to go ahead; otherwise, your car will be ready for pickup at five.",
    qs: [
      { question: 'Why is the speaker calling?', choices: ['To confirm an appointment time', 'To report on a car service', 'To advertise a new service', 'To request a payment'], answerIndex: 1 },
      { question: 'What problem did the mechanic notice?', choices: ['The brakes are damaged', 'The oil is leaking', 'The front tires are worn', 'The battery is weak'], answerIndex: 2 },
      { question: "What should Mr. Hendricks do before three o'clock if he wants the extra work?", choices: ['Pick up his car', 'Make a payment online', 'Bring in his spare tire', 'Call the speaker back'], answerIndex: 3 },
    ],
  },
  {
    script:
      'In business news, regional carrier Skylark Air announced yesterday that it will launch direct flights from Chiang Mai to Hanoi and Kuala Lumpur starting in March. The airline says the new routes respond to growing demand from both tourists and business travelers. To celebrate, Skylark is offering introductory one-way fares from just 1,990 baht for tickets booked before the end of January.',
    qs: [
      { question: 'What is the news report mainly about?', choices: ['An airline merger', 'New flight routes', 'An airport expansion', 'A pilot shortage'], answerIndex: 1 },
      { question: 'According to the speaker, why is the airline making the change?', choices: ['To reduce fuel costs', 'To replace older aircraft', 'To respond to increased demand', 'To compete with train services'], answerIndex: 2 },
      { question: 'What is offered for tickets booked before the end of January?', choices: ['Lower introductory fares', 'Free checked baggage', 'Double reward points', 'Free seat upgrades'], answerIndex: 0 },
    ],
  },
  {
    script:
      "Welcome to Cacao Valley Chocolate Works. I'm Tina, and I'll be showing you around today. We'll start in the roasting room, where the cacao beans are prepared, then move on to the molding area, and finish at our tasting room, where you can sample six different chocolates. Please note that photography is not permitted in the production areas for food safety reasons. Our gift shop near the exit offers a ten percent discount to tour participants.",
    qs: [
      { question: 'Where will the tour begin?', choices: ['In the tasting room', 'In the molding area', 'In the gift shop', 'In the roasting room'], answerIndex: 3 },
      { question: 'What are listeners asked not to do?', choices: ['Touch the equipment', 'Take photographs', 'Eat in the production area', 'Leave the group'], answerIndex: 1 },
      { question: 'What is offered to tour participants?', choices: ['A free chocolate bar', 'A recipe book', 'A discount at the gift shop', 'Free parking'], answerIndex: 2 },
    ],
  },
  {
    script:
      "Before we finish, I have one more announcement. Starting on the first of next month, all travel and expense claims must be submitted through ClaimEase, our new online system, instead of on paper forms. You'll be able to take a photo of each receipt with your phone and upload it directly. The finance team will hold short training sessions next Tuesday and Wednesday, so please sign up for one using the link I'll e-mail you after this meeting.",
    qs: [
      { question: 'What is the main topic of the announcement?', choices: ['A new travel policy', 'A change in office hours', 'A budget reduction', 'A new expense claim system'], answerIndex: 3 },
      { question: 'What will employees be able to do with their phones?', choices: ['Book business trips', 'Contact the finance team', 'Upload photos of receipts', 'Approve expense claims'], answerIndex: 2 },
      { question: 'What will the speaker send after the meeting?', choices: ['A sign-up link', 'A user manual', 'A list of receipts', 'A training certificate'], answerIndex: 0 },
    ],
  },
  {
    script:
      "Planning to do business in Japan? At Kotoba Language Academy, our business Japanese courses are designed for busy professionals. Classes meet two evenings a week, and all instructors are native speakers with corporate experience. Can't make it to our downtown campus? Join a live online class from anywhere. Enroll by May 31 and receive your textbooks free of charge. Visit kotoba-academy.com to take a free placement test.",
    qs: [
      { question: 'Who is the advertisement intended for?', choices: ['University students', 'Tourists visiting Japan', 'Business professionals', 'Language teachers'], answerIndex: 2 },
      { question: 'What is mentioned about the instructors?', choices: ['They are native speakers', 'They have published textbooks', 'They teach only online', 'They are available on weekends'], answerIndex: 0 },
      { question: 'What will people who enroll by May 31 receive?', choices: ['A tuition discount', 'Free textbooks', 'A free trip', 'A certificate'], answerIndex: 1 },
    ],
  },
  {
    script:
      "Good evening, everyone. It's my pleasure to present this year's Employee of the Year award to Ms. Wanida Chaisri from our customer support department. Last year, Wanida designed a new training program for support staff that cut average customer waiting times nearly in half. She also volunteered to lead our team at the regional customer service conference. Wanida, please come up to the stage to accept your award and say a few words.",
    qs: [
      { question: 'What is the purpose of the speech?', choices: ['To introduce a new manager', 'To announce a retirement', 'To open a conference', 'To present an award'], answerIndex: 3 },
      { question: 'What did Ms. Chaisri accomplish?', choices: ['She increased sales revenue', 'She reduced customer waiting times', 'She opened a new office', 'She hired new support staff'], answerIndex: 1 },
      { question: 'What is Ms. Chaisri asked to do next?', choices: ['Give a short speech', 'Lead a training session', 'Answer customer calls', 'Take a photograph'], answerIndex: 0 },
    ],
  },
  {
    script:
      'Thank you for calling Metro Water Services. Please listen carefully, as our menu options have recently changed. To report a water leak or other emergency, press 1. To check your account balance or pay your bill, press 2. To set up a new service connection, press 3. For all other inquiries, please stay on the line, and the next available representative will assist you. You can also manage your account anytime through our mobile app.',
    qs: [
      { question: 'What type of business is Metro Water Services?', choices: ['A plumbing store', 'A utility company', 'A bottled-water supplier', 'A construction firm'], answerIndex: 1 },
      { question: 'What should a caller do to report a leak?', choices: ['Press 1', 'Press 2', 'Press 3', 'Stay on the line'], answerIndex: 0 },
      { question: 'According to the message, what can customers do using a mobile app?', choices: ['Request a plumber', 'Order water filters', 'Report emergencies', 'Manage their accounts'], answerIndex: 3 },
    ],
  },
  {
    script:
      "Hello, and welcome to the second session of Wellness Week. I'm Dr. Martin Osei, and today I'll be talking about how to reduce back pain caused by long hours at a desk. First, I'll show you a few simple stretches you can do without leaving your chair. After that, our ergonomics specialist will explain how to adjust your monitor and chair height correctly. Please keep the handout on your seat. It lists all the exercises we'll cover.",
    qs: [
      { question: 'What is the topic of the talk?', choices: ['Healthy eating habits', 'Managing stress at work', 'Reducing back pain from desk work', 'Improving sleep quality'], answerIndex: 2 },
      { question: 'What will the ergonomics specialist explain?', choices: ['How to choose a new desk', 'How to adjust office equipment', 'How to lift heavy boxes', 'How to schedule breaks'], answerIndex: 1 },
      { question: 'What does the handout list?', choices: ["The speakers' names", "The week's schedule", 'The exercises in the session', 'Nearby medical clinics'], answerIndex: 2 },
    ],
  },
]

const part4: ExamItem[] = part4Data.map((t, i) => ({
  id: `S4-L4-${i + 1}`,
  part: 4 as const,
  section: 'listening' as const,
  audioScript: t.script,
  transcript: t.script,
  questions: t.qs.map((q, qi) => ({
    id: `S4-L4-${i + 1}-q${qi + 1}`,
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
  { sentence: 'Ms. Tanaka has been __ to regional sales director after ten years with the company.', choices: ['promoted', 'promotion', 'promoting', 'promotes'], answerIndex: 0 },
  { sentence: 'Applicants should submit their portfolios __ the end of the month.', choices: ['until', 'by', 'within', 'along'], answerIndex: 1 },
  { sentence: 'The new accounting software is __ easier to use than the previous version.', choices: ['very', 'much', 'most', 'so'], answerIndex: 1 },
  { sentence: 'The marketing team worked __ to meet the campaign deadline.', choices: ['tireless', 'tiredness', 'tirelessly', 'tire'], answerIndex: 2 },
  { sentence: 'Mr. Sato asked __ assistant to reserve a table for the client dinner.', choices: ['he', 'him', 'his', 'himself'], answerIndex: 2 },
  { sentence: 'The shipment was delayed __ a shortage of trucks at the port.', choices: ['because of', 'because', 'although', 'in spite'], answerIndex: 0 },
  { sentence: 'Employees __ wish to attend the seminar should register by Friday.', choices: ['which', 'who', 'whom', 'whose'], answerIndex: 1 },
  { sentence: 'The finance department will __ the reimbursement once the receipts have been verified.', choices: ['process', 'procession', 'processor', 'procedural'], answerIndex: 0 },
  { sentence: 'Our customer service representatives are available __ Monday through Saturday.', choices: ['at', 'in', 'from', 'on'], answerIndex: 2 },
  { sentence: "The museum's new wing, __ opened last spring, has attracted over 50,000 visitors.", choices: ['what', 'where', 'who', 'which'], answerIndex: 3 },
  { sentence: 'Ms. Lopez __ for the company for twelve years by the time she retires next month.', choices: ['works', 'will have worked', 'has worked', 'is working'], answerIndex: 1 },
  { sentence: 'The hotel offers a complimentary shuttle service for guests __ at the airport.', choices: ['arrive', 'arrived', 'arriving', 'arrives'], answerIndex: 2 },
  { sentence: 'Please keep all receipts, __ they may be needed for tax purposes.', choices: ['so', 'as', 'unless', 'whereas'], answerIndex: 1 },
  { sentence: 'Due to rising costs, the restaurant has decided to __ its prices by five percent.', choices: ['raise', 'rise', 'arise', 'rose'], answerIndex: 0 },
  { sentence: 'The contract must be signed by __ parties before it takes effect.', choices: ['either', 'each', 'both', 'every'], answerIndex: 2 },
  { sentence: 'The survey results were __ different from what the analysts had predicted.', choices: ['significance', 'significant', 'signify', 'significantly'], answerIndex: 3 },
  { sentence: 'Had the manager known about the problem earlier, she __ it immediately.', choices: ['will address', 'would have addressed', 'addresses', 'had addressed'], answerIndex: 1 },
  { sentence: "The CEO's speech was __ by more than two thousand employees via live stream.", choices: ['watch', 'watching', 'watched', 'watches'], answerIndex: 2 },
  { sentence: 'Each of the conference rooms __ equipped with a projector and a whiteboard.', choices: ['are', 'be', 'were', 'is'], answerIndex: 3 },
  { sentence: 'Customers who are not __ satisfied with their purchase may return it within 30 days.', choices: ['complete', 'completion', 'completes', 'completely'], answerIndex: 3 },
  { sentence: 'The new manager is known for her __ to detail.', choices: ['attentive', 'attention', 'attend', 'attentively'], answerIndex: 1 },
  { sentence: 'Please remember to turn off all lights __ leaving the office.', choices: ['before', 'until', 'during', 'since'], answerIndex: 0 },
  { sentence: 'The proposal was rejected __ it did not include a detailed budget.', choices: ['because', 'despite', 'due to', 'even'], answerIndex: 0 },
  { sentence: "Ms. Kim is responsible for __ the company's social media accounts.", choices: ['manage', 'managed', 'manages', 'managing'], answerIndex: 3 },
  { sentence: 'The quarterly report will be distributed to shareholders __ the end of the week.', choices: ['by', 'since', 'among', 'along'], answerIndex: 0 },
  { sentence: 'The office will remain closed __ the renovation work is completed.', choices: ['during', 'by', 'until', 'despite'], answerIndex: 2 },
  { sentence: "Mr. Chen's flight was canceled, so he had to __ his meeting with the investors.", choices: ['rescheduled', 'reschedules', 'rescheduling', 'reschedule'], answerIndex: 3 },
  { sentence: 'Free parking is available to guests __ stay at the hotel for more than two nights.', choices: ['whose', 'which', 'who', 'whom'], answerIndex: 2 },
  { sentence: 'The factory has reduced its energy use by installing more __ machinery.', choices: ['efficiency', 'efficiently', 'efficiencies', 'efficient'], answerIndex: 3 },
  { sentence: 'Neither the director __ her assistant was able to attend the opening ceremony.', choices: ['or', 'and', 'nor', 'but'], answerIndex: 2 },
]

const part5: ExamItem[] = part5Data.map((q, i) => ({
  id: `S4-R5-${i + 1}`,
  part: 5 as const,
  section: 'reading' as const,
  sentence: q.sentence,
  questions: [
    {
      id: `S4-R5-${i + 1}-q`,
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
    text: `To: All Staff
From: Facilities Management
Subject: Network Upgrade This Weekend

Please be aware that our office network will be upgraded this Saturday from 8:00 a.m. to 6:00 p.m. During this time, Internet and e-mail services will be __(1)__ unavailable. Staff who need to work on Saturday are encouraged to make other __(2)__. __(3)__ Once the upgrade is complete, connection speeds are expected to be nearly twice as fast as they are now. We appreciate your __(4)__ while this important work is carried out.`,
    blanks: [
      { choices: ['temporary', 'temporarily', 'temporariness', 'temporaries'], answerIndex: 1 },
      { choices: ['arrangements', 'arranges', 'arranged', 'arranger'], answerIndex: 0 },
      {
        choices: [
          'Our new office will open next spring.',
          "Thank you for attending last week's meeting.",
          'For example, you may wish to download any files you need on Friday.',
          'The upgrade was completed ahead of schedule.',
        ],
        answerIndex: 2,
      },
      { choices: ['patient', 'patiently', 'patience', 'patients'], answerIndex: 2 },
    ],
  },
  {
    text: `Brighten your workplace with Greenleaf Office Plants! Studies show that indoor plants can __(1)__ stress and improve concentration. Our service includes delivery, installation, and weekly __(2)__ by trained specialists, so you never have to worry about watering or trimming. __(3)__ Contracts can be canceled at any time __(4)__ a penalty. Call 02-555-0193 today for a free consultation.`,
    blanks: [
      { choices: ['reduction', 'reduced', 'reduce', 'reducing'], answerIndex: 2 },
      { choices: ['maintain', 'maintenance', 'maintained', 'maintains'], answerIndex: 1 },
      {
        choices: [
          'If a plant becomes unhealthy, we will replace it at no extra cost.',
          'Our office is closed on public holidays.',
          'Gardening tools are sold separately at our store.',
          'Please water the plants twice a day.',
        ],
        answerIndex: 0,
      },
      { choices: ['within', 'without', 'except', 'besides'], answerIndex: 1 },
    ],
  },
  {
    text: `Dear Ms. Nakamura,
Thank you for choosing the Lotus Bay Resort. We are writing to confirm that your reservation has been __(1)__ from June 12–15 to June 19–22, as you requested. Your room type and rate __(2)__ the same. __(3)__ As a returning guest, you will also receive a complimentary dinner for two at our beachfront restaurant. If you have any special requests, please let us know at least 48 hours __(4)__ your arrival.
Warm regards,
Reservations Team`,
    blanks: [
      { choices: ['change', 'changing', 'changed', 'changes'], answerIndex: 2 },
      { choices: ['remains', 'remaining', 'to remain', 'remain'], answerIndex: 3 },
      {
        choices: [
          'Unfortunately, the resort is fully booked in June.',
          'A revised confirmation slip is enclosed with this letter.',
          'Our beachfront restaurant is closed for renovations.',
          'Please return your room key to the front desk.',
        ],
        answerIndex: 1,
      },
      { choices: ['before', 'prior', 'ahead', 'until'], answerIndex: 0 },
    ],
  },
  {
    text: `KHON KAEN — Siam EcoPack, a manufacturer of paper-based packaging, opened its first recycling plant on Monday. The facility can __(1)__ up to 40 tons of used cardboard per day. Company president Arthit Wongsa said the plant will create about 120 new jobs for local __(2)__. __(3)__ The company plans to open a second facility in Udon Thani __(4)__ the next three years.`,
    blanks: [
      { choices: ['processes', 'processed', 'processing', 'process'], answerIndex: 3 },
      { choices: ['reside', 'residential', 'residents', 'residing'], answerIndex: 2 },
      {
        choices: [
          'The company was forced to close the plant last year.',
          'Cardboard is rarely used in packaging today.',
          'Visitors must bring their own lunch.',
          'He also noted that the plant runs partly on solar power.',
        ],
        answerIndex: 3,
      },
      { choices: ['within', 'since', 'among', 'until'], answerIndex: 0 },
    ],
  },
]

const part6: ExamItem[] = part6Data.map((p, i) => ({
  id: `S4-R6-${i + 1}`,
  part: 6 as const,
  section: 'reading' as const,
  passageTexts: [p.text],
  questions: p.blanks.map((b, bi) => ({
    id: `S4-R6-${i + 1}-q${bi + 1}`,
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
Ploy Arunrat (8:52 A.M.): My train is stuck outside Phaya Thai station because of a power failure. I may be 20 minutes late.
Kevin Marsh (8:54 A.M.): The clients from Hartwell Foods arrive at 9:15. Should I start without you?
Ploy Arunrat (8:55 A.M.): Please do. The slides are in the shared folder under "Hartwell Proposal."
Kevin Marsh (8:56 A.M.): Got it. I'll begin with the market overview and leave the pricing section for you.`,
    ],
    qs: [
      { question: 'Why will Ms. Arunrat be late?', choices: ['She missed her train', 'She had to visit a client first', 'She is stuck in traffic', 'Her train has been delayed by a power failure'], answerIndex: 3 },
      { question: 'What will Mr. Marsh most likely do first in the meeting?', choices: ['Present pricing information', 'Introduce Ms. Arunrat', 'Give a market overview', 'Show a product sample'], answerIndex: 2 },
    ],
  },
  {
    texts: [
      `POSITION AVAILABLE: Customer Success Specialist (Thai–English)
Brightline Software, a provider of cloud-based scheduling tools for clinics, is seeking a Customer Success Specialist to join its Bangkok office. The successful candidate will help new clients set up their accounts, conduct online training sessions, and respond to support requests by e-mail and phone.
Requirements:
- Fluency in Thai and English
- At least one year of experience in customer support or account management
- Familiarity with healthcare operations is an advantage
Benefits include a hybrid work schedule (three days in the office), annual health checkups, and a yearly training allowance. To apply, complete the form at brightline.co.th/careers by October 31.`,
    ],
    qs: [
      { question: 'What does Brightline Software provide?', choices: ['Medical equipment', 'Translation services', 'Healthcare staffing', 'Scheduling software for clinics'], answerIndex: 3 },
      { question: 'What is NOT listed as a responsibility of the position?', choices: ['Setting up client accounts', 'Selling software to new clients', 'Conducting online training', 'Answering support requests'], answerIndex: 1 },
      { question: 'What is mentioned as preferred but not required?', choices: ['Knowledge of healthcare operations', 'A university degree', "A driver's license", 'Experience in sales'], answerIndex: 0 },
    ],
  },
  {
    texts: [
      `NOTICE TO ALL TENANTS
Sukhumvit Tower Management
The water supply to floors 10 through 25 will be shut off on Sunday, March 9, from 7:00 A.M. to 1:00 P.M. so that the water tanks on the roof can be cleaned and inspected. Restrooms on floors 1 through 9 will remain in service during this time. Tenants who plan to be in the building on Sunday are advised to store drinking water in advance. We apologize for the inconvenience. Questions may be directed to the management office at extension 100.`,
    ],
    qs: [
      { question: 'Why will the water be shut off?', choices: ['To replace old pipes', 'To repair a leak on the 10th floor', 'To clean and inspect water tanks', 'To install new restrooms'], answerIndex: 2 },
      { question: 'What are tenants advised to do?', choices: ['Store drinking water in advance', 'Work from home on Sunday', 'Contact a plumber', 'Use the restrooms on the roof'], answerIndex: 0 },
    ],
  },
  {
    texts: [
      `Dear Mr. Phongsak,
Thank you for being a subscriber to Asia Business Review for the past three years. Your current subscription will expire with the November issue. To continue receiving the magazine without interruption, simply renew by October 15.
As a loyal reader, you are eligible for our special renewal rate of 1,800 baht for two years, a savings of 40 percent off the cover price. In addition, all subscribers who renew before the deadline will gain free access to our digital archive, which contains every article published since 2010.
You can renew online at abreview.com/renew or by calling our customer service team at 02-555-0148.
Sincerely,
Linda Cho
Subscription Manager`,
    ],
    qs: [
      { question: 'What is the purpose of the letter?', choices: ['To announce a price increase', 'To encourage a subscription renewal', 'To apologize for a late delivery', 'To request an article'], answerIndex: 1 },
      { question: 'How long has Mr. Phongsak subscribed to the magazine?', choices: ['One year', 'Two years', 'Three years', 'Ten years'], answerIndex: 2 },
      { question: 'What will subscribers who renew by the deadline receive?', choices: ['A free gift', 'A printed annual report', 'An invitation to an event', 'Access to a digital archive'], answerIndex: 3 },
    ],
  },
  {
    texts: [
      `★★★★☆ Review by T. Watanabe
We hired SparkClean Pro to clean our design studio after a two-week renovation. The crew of four arrived on time and removed every bit of dust from the floors, windows, and shelves in under six hours. They were also careful around our expensive printing equipment. The only drawback was the price: the final bill was about 15 percent higher than the online estimate because of a "post-construction" surcharge, which I wish had been explained in advance. Still, I would use them again and recommend them to other small businesses.`,
    ],
    qs: [
      { question: 'Why did the reviewer hire SparkClean Pro?', choices: ['To clean up after a renovation', 'To prepare for a client visit', 'To move to a new office', 'To repair printing equipment'], answerIndex: 0 },
      { question: 'What did the reviewer like about the crew?', choices: ['They brought their own supplies', 'They were careful with valuable equipment', 'They offered a discount', 'They worked on the weekend'], answerIndex: 1 },
      { question: 'What was the reviewer unhappy about?', choices: ['The crew arrived late', 'Some windows were not cleaned', 'An extra charge was not explained in advance', 'The job took two days'], answerIndex: 2 },
    ],
  },
  {
    texts: [
      `Green Line Extension Brings New Customers to Bang Na Shops
By Supitcha Rattanakorn
BANGKOK — Since the opening of four new stations on the Green Line extension in January, small businesses near the stations have reported a sharp rise in customers. According to a survey by the Bang Na Merchants' Association, 68 percent of shop owners within 500 meters of a station saw sales increase by at least 20 percent in the first quarter.
"Before, most of my customers were local residents," said Prasert Kongkaew, who owns a noodle shop near Udom Suk station. "Now office workers stop by on their way home." Mr. Prasert has since hired two additional staff members and extended his opening hours until 9:00 P.M.
However, not everyone has benefited. Some business owners farther from the stations say rents have increased faster than their income. The association plans to meet with district officials next month to discuss support measures for these businesses.`,
    ],
    qs: [
      { question: 'What is the article mainly about?', choices: ['The construction cost of a rail line', 'The effect of new train stations on local businesses', 'A change in train ticket prices', 'The opening of a shopping mall'], answerIndex: 1 },
      { question: 'According to the survey, what percentage of shop owners near stations saw sales rise by at least 20 percent?', choices: ['20 percent', '50 percent', '68 percent', '90 percent'], answerIndex: 2 },
      { question: 'What has Mr. Prasert done recently?', choices: ['Moved his shop closer to a station', 'Lowered his prices', 'Opened a second restaurant', 'Hired more staff'], answerIndex: 3 },
      { question: "What will the Bang Na Merchants' Association do next month?", choices: ['Meet with district officials', 'Conduct another survey', 'Lower membership fees', 'Open a new office'], answerIndex: 0 },
    ],
  },
  {
    texts: [
      `MEMO
To: All Head Office Staff
From: Anan Thepsiri, Office Manager
Date: May 2
Re: Desk Booking System
As you know, many of our employees now work from home two or three days a week. To use our office space more efficiently, we will introduce a desk booking system on May 20. Instead of having assigned desks, staff will reserve a desk through the DeskSpot app before coming to the office. Personal items should be stored in the new lockers on the 4th floor at the end of each day. A short guide to the app will be sent to you next week.`,
    ],
    qs: [
      { question: 'Why is the desk booking system being introduced?', choices: ['Many employees are new', 'The office is being renovated', 'Office space can be used more efficiently', 'Lockers have been removed'], answerIndex: 2 },
      { question: 'What are employees asked to do at the end of each day?', choices: ['Clean their desks', 'Log out of the app', 'Return their keys', 'Store personal items in lockers'], answerIndex: 3 },
    ],
  },
  {
    texts: [
      `AquaPure Office Water — Frequently Asked Questions
Q: How often are water bottles delivered?
A: Standard plans include delivery every two weeks. Businesses that need more frequent deliveries can upgrade to our weekly plan for an additional 300 baht per month.
Q: What happens if the dispenser stops working?
A: Simply call our service line. A technician will visit within two business days, and repairs are always free for rental customers.
Q: Can I cancel my plan?
A: Yes. Plans can be canceled with 30 days' written notice. Please note that dispensers must be returned in good condition, or a replacement fee will apply.`,
    ],
    qs: [
      { question: 'How often are bottles delivered on a standard plan?', choices: ['Every week', 'Every two weeks', 'Every month', 'Every two months'], answerIndex: 1 },
      { question: 'What is indicated about repairs?', choices: ['They are free for rental customers', 'They take one week', 'They must be requested in writing', 'They cost 300 baht'], answerIndex: 0 },
      { question: 'What must customers do to cancel a plan?', choices: ['Pay a cancellation fee', 'Call a technician', "Give 30 days' written notice", 'Buy the dispenser'], answerIndex: 2 },
    ],
  },
  {
    texts: [
      `To: Sales Team
From: Jirapat Somboon
Subject: Team Retreat — Final Details
Hi everyone,
Here are the final details for our team retreat at Riverside Lodge in Kanchanaburi on July 18–19.
A chartered bus will leave from the main entrance of our office at 7:30 A.M. on July 18. Please arrive by 7:15 so we can depart on time. The trip takes about three hours.
After lunch on the first day, we'll hold planning sessions for the second half of the year. On the morning of July 19, there will be an optional rafting trip on the river; those who prefer to stay behind can use the lodge's spa and pool. We'll return to Bangkok by 6:00 P.M.
Rooms are shared by two people. If you have a preference for a roommate, let me know by Friday. Otherwise, I'll assign rooms randomly.
Thanks,
Jirapat`,
    ],
    qs: [
      { question: 'What is the main purpose of the e-mail?', choices: ['To invite staff to a client event', 'To provide details about a team retreat', 'To announce sales results', 'To ask for hotel recommendations'], answerIndex: 1 },
      { question: 'What time should employees arrive at the office on July 18?', choices: ['6:00 A.M.', '7:30 A.M.', '10:30 A.M.', '7:15 A.M.'], answerIndex: 3 },
      { question: 'What is indicated about the rafting trip?', choices: ['It is optional', 'It takes place on the first day', 'It requires an extra fee', 'It was canceled'], answerIndex: 0 },
      { question: 'What should employees do by Friday if they have a roommate preference?', choices: ['Book their own room', 'Pay a deposit', 'Inform Jirapat', 'Fill out an online form'], answerIndex: 2 },
    ],
  },
  {
    texts: [
      `Dear Dr. Lim,
On behalf of the Thai Food Exporters Association, I would like to invite you to deliver the keynote address at our annual conference on November 6 at the Royal Riverside Convention Center in Bangkok. This year's theme is "Meeting Global Food Safety Standards," and your research on cold-chain logistics would be of great interest to our 400 members.
The keynote address would be 45 minutes long, followed by a 15-minute question-and-answer session. The association will cover your round-trip airfare from Singapore and two nights' accommodation at the convention center's hotel.
We would be grateful if you could reply by August 30 so that we can finalize the program.
Yours sincerely,
Kanokwan Ritthidet
Conference Chair`,
    ],
    qs: [
      { question: 'Why was the letter written?', choices: ['To invite someone to speak at a conference', 'To request research funding', 'To announce new food safety laws', 'To confirm a hotel booking'], answerIndex: 0 },
      { question: 'What is suggested about Dr. Lim?', choices: ['Dr. Lim lives in Bangkok', 'Dr. Lim is a member of the association', 'Dr. Lim is an expert in cold-chain logistics', "Dr. Lim organized last year's conference"], answerIndex: 2 },
      { question: 'How long will the keynote session last in total?', choices: ['45 minutes', 'One hour', '15 minutes', 'Two hours'], answerIndex: 1 },
    ],
  },
]

const part7Double: PassageData[] = [
  {
    texts: [
      `Quotation — Riverview Banquet Hall
Prepared for: Ms. Sasithorn Kaewmanee, Novatek Electronics
Event: Dealer appreciation dinner, Friday, December 5
Grand Ballroom rental (6:00–10:00 P.M.): 45,000 baht
Set dinner menu (120 guests × 850 baht): 102,000 baht
Audio-visual package: 8,000 baht
Total: 155,000 baht
A deposit of 30 percent is required to confirm the booking. This quotation is valid until October 31.`,
      `To: events@riverviewbanquet.com
From: Sasithorn Kaewmanee
Subject: Quotation for December 5 dinner
Thank you for the quotation. We have decided to go ahead with the booking. However, we now expect about 100 guests rather than 120, so please revise the dinner cost accordingly. We will be bringing our own projector and screen, so the audio-visual package will not be necessary. Could you also tell me whether the ballroom can be accessed from 4:00 P.M. so that our team can set up the dealer displays?
Best regards,
Sasithorn Kaewmanee`,
    ],
    qs: [
      { question: 'What type of event is being planned?', choices: ['A product launch for the press', 'A dinner for product dealers', 'A wedding reception', 'A staff training day'], answerIndex: 1 },
      { question: 'What is required to confirm the booking?', choices: ['A signed contract', 'A guest list', 'A 30 percent deposit', 'Full payment'], answerIndex: 2 },
      { question: 'What will the revised cost of the set dinner most likely be?', choices: ['85,000 baht', '100,000 baht', '102,000 baht', '120,000 baht'], answerIndex: 0 },
      { question: 'Which item does Ms. Kaewmanee want to remove from the quotation?', choices: ['The ballroom rental', 'The set dinner menu', 'The decorations', 'The audio-visual package'], answerIndex: 3 },
      { question: 'What does Ms. Kaewmanee ask about?', choices: ['Parking for guests', 'Early access to the ballroom', 'A vegetarian menu', 'Payment by credit card'], answerIndex: 1 },
    ],
  },
  {
    texts: [
      `Harbor Point Logistics — Employee Referral Program
Do you know someone who would be a great addition to our team? Refer a friend for any open position, and if your candidate is hired and stays with the company for three months, you will receive a bonus:
- Warehouse and driver positions: 5,000 baht
- Office and administrative positions: 8,000 baht
- Management positions: 15,000 baht
Submit referrals through the HR portal. Managers in the HR department are not eligible to make referrals.`,
      `To: hr@harborpointlog.com
From: Chalerm Boonyarit, Warehouse Team Leader
Subject: Referral — Operations Manager position
Hello,
I would like to refer my former colleague, Ms. Duangjai Prasit, for the Operations Manager position posted last week. She managed a distribution center with 80 employees for six years and recently completed a master's degree in supply chain management. I was unable to upload her résumé to the HR portal because of a technical error, so I have attached it to this e-mail instead.
Regards,
Chalerm Boonyarit`,
    ],
    qs: [
      { question: 'What is the purpose of the notice?', choices: ['To explain an employee referral program', 'To announce new job openings', 'To introduce a new HR manager', 'To describe a training course'], answerIndex: 0 },
      { question: 'When will an employee receive a referral bonus?', choices: ['As soon as the referral is submitted', 'After the candidate is interviewed', 'After the hired candidate has worked for three months', 'At the end of the year'], answerIndex: 2 },
      { question: 'How much will Mr. Boonyarit most likely receive if Ms. Prasit is hired and stays for three months?', choices: ['5,000 baht', '8,000 baht', '10,000 baht', '15,000 baht'], answerIndex: 3 },
      { question: 'What is indicated about Ms. Prasit?', choices: ['She currently works at Harbor Point Logistics', 'She has experience managing a distribution center', 'She is applying for an HR position', "She was Mr. Boonyarit's supervisor"], answerIndex: 1 },
      { question: 'Why did Mr. Boonyarit send an e-mail?', choices: ['He wanted to ask about the bonus amount', 'He did not know the position title', 'He could not upload a document to the portal', 'The HR department requested it'], answerIndex: 2 },
    ],
  },
]

const part7Triple: PassageData[] = [
  {
    texts: [
      `Golden Grain Bakery Supplies — Wholesale Price List
Bread flour (Type 550), 25 kg: 780 baht
Unsalted butter, 5 kg: 1,650 baht
Dark chocolate chips, 2 kg: 920 baht
Vanilla extract, 1 liter: 1,100 baht
Orders over 5,000 baht receive free delivery within Bangkok. Orders placed before noon are delivered the next business day.`,
      `ORDER FORM
Customer: Sweet Corner Café (Bangkok)
Order date: Tuesday, April 8, 10:20 A.M.
Bread flour (25 kg) × 4 = 3,120 baht
Unsalted butter (5 kg) × 1 = 1,650 baht
Dark chocolate chips (2 kg) × 1 = 920 baht
Total: 5,690 baht`,
      `To: orders@sweetcornercafe.com
From: Customer Service, Golden Grain Bakery Supplies
Subject: Your order of April 8
Dear Customer,
Thank you for your order. Unfortunately, the dark chocolate chips are temporarily out of stock and will not be available until April 21. We can substitute milk chocolate chips at the same price, or we can deliver the rest of your order now and send the dark chocolate chips when they arrive. Please let us know which option you prefer by replying to this e-mail.
Sincerely,
Customer Service`,
    ],
    qs: [
      { question: 'What is indicated about orders over 5,000 baht?', choices: ['They receive a 10 percent discount', 'They are delivered free within Bangkok', 'They must be paid in advance', 'They are delivered on weekends'], answerIndex: 1 },
      { question: "When would Sweet Corner Café's order normally have been delivered?", choices: ['On April 9', 'On April 8', 'On April 10', 'On April 21'], answerIndex: 0 },
      { question: 'Why does Sweet Corner Café qualify for free delivery?', choices: ['It is a new customer', 'It ordered before noon', 'It used a coupon', 'Its order total exceeds 5,000 baht'], answerIndex: 3 },
      { question: 'Which item is currently unavailable?', choices: ['Bread flour', 'Unsalted butter', 'Dark chocolate chips', 'Vanilla extract'], answerIndex: 2 },
      { question: 'What is the customer asked to do?', choices: ['Choose between two options', 'Pay an additional fee', 'Cancel the order', 'Pick up the items in person'], answerIndex: 0 },
    ],
  },
  {
    texts: [
      `Andaman Explorer Tours — 3-Day Island Hopping Package
Departing every Friday from Krabi Town
- Standard package: 7,900 baht per person (shared boat, guesthouse accommodation)
- Premium package: 12,500 baht per person (private speedboat, beachfront resort)
All packages include breakfast, snorkeling equipment, and national park entrance fees. Children under 12 receive a 30 percent discount.`,
      `BOOKING CONFIRMATION
Booking reference: AE-5521
Name: Mr. Daniel Weber
Package: Premium
Travel date: Friday, February 14
Travelers: 2 adults, 1 child (age 9)
Total paid: 33,750 baht`,
      `To: bookings@andamanexplorer.com
From: Daniel Weber
Subject: Booking AE-5521
Hello,
I have just learned that our flight to Krabi has been rescheduled and will now land on the evening of February 14, after your tour departs. Would it be possible to move our booking to the following Friday? If the premium package is fully booked that day, we would be willing to switch to the standard package, provided that the price difference is refunded.
Best regards,
Daniel Weber`,
    ],
    qs: [
      { question: 'What is included in all packages?', choices: ['Lunch and dinner', 'Airport transfers', 'A private speedboat', 'Snorkeling equipment'], answerIndex: 3 },
      { question: 'Why did Mr. Weber receive a discount?', choices: ['He booked early', 'He chose the premium package', 'One of the travelers is a child', 'He is a returning customer'], answerIndex: 2 },
      { question: "Where will Mr. Weber's group stay if the booking is not changed?", choices: ['At a guesthouse', 'At a beachfront resort', 'On a boat', 'At a hotel near the airport'], answerIndex: 1 },
      { question: 'Why does Mr. Weber want to change his booking?', choices: ['His flight schedule has changed', 'His child is ill', 'The weather forecast is bad', 'He wants a cheaper package'], answerIndex: 0 },
      { question: 'On what date does Mr. Weber most likely want to start the tour?', choices: ['February 7', 'February 14', 'February 21', 'February 28'], answerIndex: 2 },
    ],
  },
  {
    texts: [
      `Annual Employee Health Checkup — Kestrel Insurance
This year's free health checkups will be provided by MedCare Mobile Clinic in the 3rd-floor training room. Each checkup takes about 40 minutes and includes a blood test, so employees should not eat or drink anything except water for eight hours beforehand. Employees must register for a time slot by May 9 through the HR portal. Results will be sent to each employee's personal e-mail address within ten days.`,
      `Checkup Schedule by Department
Monday, May 19 — Claims and Underwriting
Tuesday, May 20 — Sales and Marketing
Wednesday, May 21 — Finance and Human Resources
Thursday, May 22 — IT and Customer Service
Friday, May 23 — Make-up day (for employees unable to attend on their assigned day)`,
      `To: hr@kestrelins.com
From: Thanakorn Siriwat, Sales Department
Subject: Health checkup
Hello,
I registered for a morning slot on my department's assigned day, but I will be visiting clients in Chonburi all day then. Could I attend on the make-up day instead? Also, my results from last year were sent to my old e-mail address, which I no longer use. Could you please update my contact information?
Thank you,
Thanakorn Siriwat`,
    ],
    qs: [
      { question: 'What are employees instructed to do before the checkup?', choices: ['Avoid eating for eight hours', 'Bring their medical records', 'Complete a health questionnaire', 'Arrive 40 minutes early'], answerIndex: 0 },
      { question: 'Where will the checkups take place?', choices: ['At a nearby hospital', 'In the parking lot', 'In a training room', 'In the HR office'], answerIndex: 2 },
      { question: 'On what day was Mr. Siriwat originally scheduled for his checkup?', choices: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], answerIndex: 1 },
      { question: 'When does Mr. Siriwat want to have his checkup?', choices: ['May 19', 'May 20', 'May 22', 'May 23'], answerIndex: 3 },
      { question: 'What does Mr. Siriwat ask the HR department to do?', choices: ['Send his results by mail', 'Update his e-mail address', 'Cancel his registration', 'Extend the registration deadline'], answerIndex: 1 },
    ],
  },
]

const part7: ExamItem[] = [
  ...part7Single.map((p, i) => ({
    id: `S4-R7-S${i + 1}`,
    part: 7 as const,
    section: 'reading' as const,
    passageTexts: p.texts,
    questions: p.qs.map((q, qi) => ({
      id: `S4-R7-S${i + 1}-q${qi + 1}`,
      question: q.question,
      choices: q.choices,
      answerIndex: q.answerIndex,
    })),
  })),
  ...part7Double.map((p, i) => ({
    id: `S4-R7-D${i + 1}`,
    part: 7 as const,
    section: 'reading' as const,
    passageTexts: p.texts,
    questions: p.qs.map((q, qi) => ({
      id: `S4-R7-D${i + 1}-q${qi + 1}`,
      question: q.question,
      choices: q.choices,
      answerIndex: q.answerIndex,
    })),
  })),
  ...part7Triple.map((p, i) => ({
    id: `S4-R7-T${i + 1}`,
    part: 7 as const,
    section: 'reading' as const,
    passageTexts: p.texts,
    questions: p.qs.map((q, qi) => ({
      id: `S4-R7-T${i + 1}-q${qi + 1}`,
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
