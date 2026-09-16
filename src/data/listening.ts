import type { ListeningItem } from '../lib/types'

export const listeningItems: ListeningItem[] = [
  // Part 1 — Photographs: script holds a spoken description of the correct scene (not shown as text).
  // choices are 4 spoken statements; the learner listens to each before answering.
  {
    id: 'l1-1',
    part: 1,
    script: '',
    imageDescription: '🖼️ ภาพ: พนักงานหลายคนกำลังนั่งประชุมรอบโต๊ะในห้องประชุม บางคนกำลังจดบันทึก',
    question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
    choices: [
      'The workers are cleaning the office.',
      'The employees are seated around a table in a meeting.',
      'The manager is standing alone in the hallway.',
      'The chairs are stacked against the wall.',
    ],
    answerIndex: 1,
    transcript: 'The employees are seated around a table in a meeting, and some of them are taking notes.',
  },
  {
    id: 'l1-2',
    part: 1,
    script: '',
    imageDescription: '🖼️ ภาพ: ชายคนหนึ่งกำลังยกกล่องขึ้นรถบรรทุกที่ท่าขนถ่ายสินค้า',
    question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
    choices: [
      'A man is loading boxes onto a truck.',
      'A woman is signing a document.',
      'Boxes are being delivered by mail.',
      'A truck is parked in an empty lot.',
    ],
    answerIndex: 0,
    transcript: 'A man is loading boxes onto a truck at the loading dock.',
  },
  {
    id: 'l1-3',
    part: 1,
    script: '',
    imageDescription: '🖼️ ภาพ: พนักงานต้อนรับกำลังยื่นกุญแจให้แขกที่เคาน์เตอร์โรงแรม',
    question: 'เลือกประโยคที่บรรยายภาพนี้ได้ถูกต้องที่สุด',
    choices: [
      'The guest is checking luggage at the airport.',
      'The receptionist is handing a key to a guest.',
      'The hotel lobby is completely empty.',
      'The guest is repairing the front desk.',
    ],
    answerIndex: 1,
    transcript: 'The receptionist is handing a room key to a guest at the front desk.',
  },

  // Part 2 — Question-Response: script is the spoken question; choices are 3 spoken responses.
  {
    id: 'l2-1',
    part: 2,
    script: 'When does the quarterly report need to be submitted?',
    question: 'เลือกคำตอบที่เหมาะสมที่สุดกับคำถามที่ได้ยิน',
    choices: ['By the end of this week.', 'In the top drawer.', 'Yes, I received it.'],
    answerIndex: 0,
    transcript: 'Q: When does the quarterly report need to be submitted? A: By the end of this week.',
  },
  {
    id: 'l2-2',
    part: 2,
    script: 'Who is going to lead the client presentation tomorrow?',
    question: 'เลือกคำตอบที่เหมาะสมที่สุดกับคำถามที่ได้ยิน',
    choices: ['It starts at nine.', 'I believe Sarah will.', 'It was very informative.'],
    answerIndex: 1,
    transcript: 'Q: Who is going to lead the client presentation tomorrow? A: I believe Sarah will.',
  },
  {
    id: 'l2-3',
    part: 2,
    script: 'Could you send me the updated invoice?',
    question: 'เลือกคำตอบที่เหมาะสมที่สุดกับคำถามที่ได้ยิน',
    choices: ['Sure, I will do that right away.', 'It is on the second floor.', 'No, I have not been there.'],
    answerIndex: 0,
    transcript: 'Q: Could you send me the updated invoice? A: Sure, I will do that right away.',
  },
  {
    id: 'l2-4',
    part: 2,
    script: 'Isn\'t the conference room reserved for the marketing team this afternoon?',
    question: 'เลือกคำตอบที่เหมาะสมที่สุดกับคำถามที่ได้ยิน',
    choices: ['Actually, they moved it to tomorrow.', 'The printer is out of paper.', 'It is quite far from here.'],
    answerIndex: 0,
    transcript: 'Q: Isn\'t the conference room reserved for the marketing team this afternoon? A: Actually, they moved it to tomorrow.',
  },

  // Part 3 — Conversations: script is the full dialogue spoken aloud; question/choices are printed as in the real exam.
  {
    id: 'l3-1',
    part: 3,
    script:
      'Man: Hi, I am calling about the order I placed last week. It still has not arrived. ' +
      'Woman: I am sorry to hear that. Let me check the tracking number for you. ' +
      'Man: Thanks, the order number is 4471. ' +
      'Woman: I see it here. It looks like it was delayed at the shipping center, but it should arrive by Friday.',
    question: 'ทำไมชายคนนี้จึงโทรมา?',
    choices: [
      'To cancel his order',
      'To ask about a delayed order',
      'To apply for a job',
      'To request a refund',
    ],
    answerIndex: 1,
    transcript:
      'Man: Hi, I am calling about the order I placed last week. It still has not arrived.\nWoman: I am sorry to hear that. Let me check the tracking number for you.\nMan: Thanks, the order number is 4471.\nWoman: I see it here. It looks like it was delayed at the shipping center, but it should arrive by Friday.',
  },
  {
    id: 'l3-2',
    part: 3,
    script:
      'Woman: Did you finish reviewing the budget proposal I sent you? ' +
      'Man: Yes, I looked it over this morning. Overall it looks good, but I think the marketing costs are a bit too high. ' +
      'Woman: I agree. Let\'s reduce that section by ten percent before we submit it to the director.',
    question: 'ทั้งสองคนตกลงจะทำอะไร?',
    choices: [
      'Hire a new marketing manager',
      'Cancel the marketing campaign',
      'Reduce the marketing budget by ten percent',
      'Submit the proposal without changes',
    ],
    answerIndex: 2,
    transcript:
      'Woman: Did you finish reviewing the budget proposal I sent you?\nMan: Yes, I looked it over this morning. Overall it looks good, but I think the marketing costs are a bit too high.\nWoman: I agree. Let\'s reduce that section by ten percent before we submit it to the director.',
  },

  // Part 4 — Short Talks
  {
    id: 'l4-1',
    part: 4,
    script:
      'Attention all passengers. Flight 205 to Chicago has been delayed due to weather conditions. ' +
      'The new departure time is 3:45 p.m. We apologize for the inconvenience and will provide updates as they become available.',
    question: 'สาเหตุของการล่าช้าคืออะไร?',
    choices: ['Mechanical problems', 'Weather conditions', 'Staff shortage', 'A security issue'],
    answerIndex: 1,
    transcript:
      'Attention all passengers. Flight 205 to Chicago has been delayed due to weather conditions. The new departure time is 3:45 p.m. We apologize for the inconvenience and will provide updates as they become available.',
  },
  {
    id: 'l4-2',
    part: 4,
    script:
      'Welcome to this month\'s staff training session. Today we will focus on the new customer service software. ' +
      'Please make sure your laptops are charged, and feel free to ask questions at any time during the presentation.',
    question: 'หัวข้อหลักของการอบรมครั้งนี้คืออะไร?',
    choices: [
      'Annual performance review',
      'A new customer service software',
      'Company holiday schedule',
      'Office relocation plans',
    ],
    answerIndex: 1,
    transcript:
      'Welcome to this month\'s staff training session. Today we will focus on the new customer service software. Please make sure your laptops are charged, and feel free to ask questions at any time during the presentation.',
  },
]

export function listeningByPart(part: 1 | 2 | 3 | 4) {
  return listeningItems.filter((item) => item.part === part)
}
