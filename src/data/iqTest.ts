import type { VocabWord } from '../lib/types'

/** Vocabulary that appears (with Thai glosses) in the uploaded IQ test document. */
export const iqTestVocab: VocabWord[] = [
  { id: 'iq-1', term: 'children', pronunciationTh: 'ชิล-เดริน', mnemonicTh: `child + ren (พหูพจน์ไม่ปกติ) = เด็กหลายคน`, pos: 'n.', meaningTh: 'เด็ก', exampleEn: 'Keep this medicine away from children.', exampleTh: 'เก็บยานี้ให้พ้นมือเด็ก' },
  { id: 'iq-2', term: 'business', pronunciationTh: 'บิส-นิส', mnemonicTh: `มาจาก busy (ไม่ว่าง) + ness → งาน/ธุรกิจที่ต้องทำ`, pos: 'n.', meaningTh: 'ธุรกิจ', exampleEn: 'She is on a business trip to Bangkok this week.', exampleTh: 'เธอไปทำธุรกิจที่กรุงเทพฯ สัปดาห์นี้' },
  { id: 'iq-3', term: 'headquarters', pronunciationTh: 'เฮด-ควอร์-เทอร์ส', mnemonicTh: `head (หัว) + quarters (ที่พัก) = ที่พักของศูนย์กลางองค์กร`, pos: 'n.', meaningTh: 'สำนักงานใหญ่', exampleEn: "The company's headquarters is located downtown.", exampleTh: 'สำนักงานใหญ่ของบริษัทตั้งอยู่ใจกลางเมือง' },
  { id: 'iq-4', term: 'introduce', pronunciationTh: 'อิน-ทระ-ดิวส์', mnemonicTh: `intro (เข้าไปข้างใน) + duce (นำ, จาก ducere) = นำเข้ามาแนะนำให้รู้จัก`, pos: 'v.', meaningTh: 'แนะนำ(ให้รู้จัก)', exampleEn: 'Let me introduce you to my new boss.', exampleTh: 'ขอแนะนำให้คุณรู้จักกับหัวหน้าคนใหม่ของฉัน' },
  { id: 'iq-5', term: 'aunt', pronunciationTh: 'อานท์', mnemonicTh: `จำทับศัพท์สั้นๆ คำนี้ใช้เรียกป้า/น้าในภาษาอังกฤษ`, pos: 'n.', meaningTh: 'ป้า/น้า', exampleEn: 'My aunt is coming to visit us this weekend.', exampleTh: 'ป้าของฉันจะมาเยี่ยมเราสุดสัปดาห์นี้' },
  { id: 'iq-6', term: 'fond', pronunciationTh: 'ฟอนด์', mnemonicTh: `be fond of แปลว่าชอบ/รักสิ่งนั้นเป็นพิเศษ`, pos: 'adj.', meaningTh: 'ชอบ/รักเป็นพิเศษ', exampleEn: 'I am very fond of my aunt.', exampleTh: 'ฉันรักป้าของฉันมาก' },
  { id: 'iq-7', term: 'wish', pronunciationTh: 'วิช', mnemonicTh: `จำทับศัพท์ "วิช" ที่แปลว่าปรารถนา/อวยพร`, pos: 'v.', meaningTh: 'ปรารถนา/อวยพร', exampleEn: 'I wish you a very happy birthday.', exampleTh: 'ฉันขออวยพรวันเกิดให้คุณ' },
  { id: 'iq-8', term: 'occasion', pronunciationTh: 'อะ-เค-ชั่น', mnemonicTh: `oc + cas (ตก, จาก cadere) + ion = เหตุการณ์ที่เกิดขึ้นพอดี (โอกาสพิเศษ)`, pos: 'n.', meaningTh: 'โอกาส(พิเศษ)', exampleEn: 'Please accept my best wishes on this special occasion.', exampleTh: 'ขอรับคำอวยพรของฉันในโอกาสพิเศษนี้ด้วย' },
  { id: 'iq-9', term: 'greeting', pronunciationTh: 'กรี-ทิ่ง', mnemonicTh: `greet (ทักทาย) + ing = การทักทาย`, pos: 'n.', meaningTh: 'การทักทาย/คำอวยพร', exampleEn: 'He sent a greeting card for her birthday.', exampleTh: 'เขาส่งการ์ดอวยพรให้เธอในวันเกิด' },
  { id: 'iq-10', term: 'host', pronunciationTh: 'โฮสท์', mnemonicTh: `จำทับศัพท์ "โฮสต์" ที่คนไทยใช้เรียกเจ้าภาพ/ผู้จัดงาน`, pos: 'n.', meaningTh: 'เจ้าภาพ', exampleEn: 'The host offered us something to drink.', exampleTh: 'เจ้าภาพเสนอเครื่องดื่มให้เรา' },
  { id: 'iq-11', term: 'important', pronunciationTh: 'อิม-พอร์-เทินท์', mnemonicTh: `im + port (นำพา, จาก portare) + ant = สิ่งที่นำพาผลกระทบมามาก จึงสำคัญ`, pos: 'adj.', meaningTh: 'สำคัญ', exampleEn: 'He is an important client of our company.', exampleTh: 'เขาเป็นลูกค้าคนสำคัญของบริษัทเรา' },
  { id: 'iq-12', term: 'client', pronunciationTh: 'ไคล-เอินท์', mnemonicTh: `จาก cliens ภาษาละติน (ผู้พึ่งพา) → ลูกค้าที่พึ่งพาบริการเรา`, pos: 'n.', meaningTh: 'ลูกค้า', exampleEn: 'We met this client recently.', exampleTh: 'เราเพิ่งพบลูกค้าคนนี้เมื่อเร็วๆ นี้' },
  { id: 'iq-13', term: 'recently', pronunciationTh: 'รี-เซินท์-ลี', mnemonicTh: `recent (เมื่อเร็วๆ นี้) + ly = ในลักษณะที่เพิ่งเกิดขึ้นไม่นาน`, pos: 'adv.', meaningTh: 'เมื่อเร็วๆ นี้', exampleEn: 'I recently started a new job.', exampleTh: 'ฉันเพิ่งเริ่มงานใหม่เมื่อเร็วๆ นี้' },
  { id: 'iq-14', term: 'offer', pronunciationTh: 'ออฟ-เฟอร์', mnemonicTh: `of + fer (นำมา, จาก ferre) = นำเสนอให้`, pos: 'v.', meaningTh: 'เสนอให้', exampleEn: 'He offered me another glass of wine.', exampleTh: 'เขาเสนอไวน์ให้ฉันอีกแก้ว' },
  { id: 'iq-15', term: 'glass', pronunciationTh: 'กลาส', mnemonicTh: `จำทับศัพท์ "แก้ว" ที่ใช้เรียกทั้งวัสดุแก้วและแก้วน้ำดื่ม`, pos: 'n.', meaningTh: 'แก้ว(น้ำ)', exampleEn: 'Could I have another glass of water?', exampleTh: 'ขอน้ำอีกแก้วได้ไหม' },
  { id: 'iq-16', term: 'sherry', pronunciationTh: 'เชอร์-รี่', mnemonicTh: `จำทับศัพท์ "เชอร์รี่" แต่คำนี้คือชื่อเหล้าองุ่นชนิดหนึ่ง ไม่ใช่ผลเชอร์รี่`, pos: 'n.', meaningTh: 'เหล้าเชอร์รี่ (ไวน์องุ่นชนิดหนึ่ง)', exampleEn: 'The host offered his guests a glass of sherry before dinner.', exampleTh: 'เจ้าภาพเสนอเหล้าเชอร์รี่ให้แขกก่อนอาหารเย็น' },
]

export interface IQTestQuestion {
  id: string
  context?: string
  contextLabel?: string
  situation?: string
  question: string
  choices: string[]
  answerIndex: number
}

/** 10-question reading/situational set transcribed from the uploaded document (หน้า 8-9/13). */
export const iqTestQuestions: IQTestQuestion[] = [
  {
    id: 'iq-q1',
    contextLabel: '📋 ป้ายประกาศ',
    context: 'Plastic bags can be dangerous\nto avoid danger of suffocation\nKeep this bag away from babies and children',
    question: 'What is the purpose of this notice?',
    choices: ['to warn', 'to inform', 'to proclaim', 'to make'],
    answerIndex: 0,
  },
  {
    id: 'iq-q2',
    contextLabel: '📋 ป้ายประกาศ',
    context: 'Plastic bags can be dangerous\nto avoid danger of suffocation\nKeep this bag away from babies and children',
    question: 'Where would you expect to see this notice?',
    choices: ['on a carton', 'on a tube of paste', 'on a plastic bag', 'on a tin container'],
    answerIndex: 2,
  },
  {
    id: 'iq-q3',
    contextLabel: '📰 โฆษณา',
    context: "Madame Susanne's\nSpecialty of the week\nLe Lapin a la provencale\nFor reservation call 234-5678",
    question: 'Who would be likely to place the advertisement above?',
    choices: ['A beauty salon owner', 'A restaurant owner', 'A perfume representative', 'A fashion show organizer'],
    answerIndex: 1,
  },
  {
    id: 'iq-q4',
    contextLabel: '⚠️ ป้ายคำเตือน (CAUTION)',
    context: 'CAUTION\n\nIf this material contacts your skin, wash immediately with soap and water. In case of eye contact, wash thoroughly with water and get immediate medical attention.\n\nKEEP OUT OF REACH OF CHILDREN',
    question: '"get immediate medical attention" means',
    choices: ['use medicine urgently', 'wash with water and soap', 'see a doctor quickly', 'take care of your eyes'],
    answerIndex: 2,
  },
  {
    id: 'iq-q5',
    contextLabel: '⚠️ ป้ายคำเตือน (CAUTION)',
    context: 'CAUTION\n\nIf this material contacts your skin, wash immediately with soap and water. In case of eye contact, wash thoroughly with water and get immediate medical attention.\n\nKEEP OUT OF REACH OF CHILDREN',
    question: 'The substance must be ____.',
    choices: ['power', 'gas', 'liquid', 'solid'],
    answerIndex: 2,
  },
  {
    id: 'iq-q6',
    contextLabel: '⚠️ ป้ายคำเตือน (CAUTION)',
    context: 'CAUTION\n\nIf this material contacts your skin, wash immediately with soap and water. In case of eye contact, wash thoroughly with water and get immediate medical attention.\n\nKEEP OUT OF REACH OF CHILDREN',
    question: 'This label says ____.',
    choices: [
      'Children can use this easily.',
      'Children should be kept away from you.',
      'You should put this where children cannot reach it.',
      'You should stay away from your children while using this.',
    ],
    answerIndex: 2,
  },
  {
    id: 'iq-q7',
    situation: 'You are on a business trip with your boss to Bangkok, where your company has its headquarters. Your boss has just introduced you to his new Thai boss.\nYour boss: "Linda, this is Mr. Somsak."',
    question: 'What do you say?',
    choices: ['Hi, Mr. Somsak.', 'Hello, Mr. Somsak.', 'Good to see you, Mr. Somsak.', 'Delighted to make your acquaintance, Mr. Somsak.'],
    answerIndex: 1,
  },
  {
    id: 'iq-q8',
    situation: "It's your aunt's birthday. You are very fond of her.",
    question: 'What do you say to her?',
    choices: [
      'May I wish you a happy birthday?',
      'Please accept my best wishes on the occasion of your birthday.',
      "The season's greetings.",
      'Many happy returns of the day!',
    ],
    answerIndex: 1,
  },
  {
    id: 'iq-q9',
    situation: 'Before a dinner party, your host — an important business client you have recently met — offers you sherry. After your second glass, he offers you some more.',
    question: 'What do you say?',
    choices: ['No, thanks.', "I won't, thanks.", "That's very kind, but I won't, thank you.", 'Not for me, thank you.'],
    answerIndex: 0,
  },
  {
    id: 'iq-q10',
    situation: 'In a coffee shop.\n"How do you take your coffee?"\n"________"',
    question: 'Choose the best response.',
    choices: ['I like it very much.', 'I have coffee every morning.', 'I like it without cream.', 'I like coffee cake.'],
    answerIndex: 2,
  },
]
