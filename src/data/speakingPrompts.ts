export interface SpeakingPrompt {
  id: string
  questionTh: string
  questionEn: string
  sampleAnswer: string
  sampleAnswerTh: string
}

export const SPEAKING_PROMPTS: SpeakingPrompt[] = [
  {
    id: 'sp-1',
    questionTh: 'คุณทำอะไรที่ทำงานเมื่อวานนี้?',
    questionEn: 'What did you do at work yesterday?',
    sampleAnswer: 'Yesterday, I attended a team meeting in the morning and prepared a report for my manager in the afternoon.',
    sampleAnswerTh: 'เมื่อวานนี้ ฉันเข้าประชุมทีมตอนเช้า และเตรียมรายงานให้หัวหน้าตอนบ่าย',
  },
  {
    id: 'sp-2',
    questionTh: 'อธิบายวันทำงานทั่วไปของคุณ',
    questionEn: 'Describe your typical workday.',
    sampleAnswer: 'I usually start work at nine, check my emails, and join a short meeting with my team before lunch.',
    sampleAnswerTh: 'ฉันมักจะเริ่มงานเก้าโมง เช็กอีเมล แล้วเข้าประชุมสั้นๆ กับทีมก่อนพักเที่ยง',
  },
  {
    id: 'sp-3',
    questionTh: 'คุณชอบทำงานคนเดียวหรือทำงานเป็นทีมมากกว่ากัน เพราะอะไร?',
    questionEn: 'Do you prefer working alone or in a team? Why?',
    sampleAnswer: 'I prefer working in a team because we can share ideas and solve problems faster together.',
    sampleAnswerTh: 'ฉันชอบทำงานเป็นทีมมากกว่า เพราะเราสามารถแชร์ไอเดียและแก้ปัญหาได้เร็วกว่า',
  },
  {
    id: 'sp-4',
    questionTh: 'ลองแนะนำบริษัทของคุณสั้นๆ',
    questionEn: 'Briefly introduce your company.',
    sampleAnswer: 'Our company provides marketing services to small businesses and has been operating for over ten years.',
    sampleAnswerTh: 'บริษัทของเราให้บริการด้านการตลาดแก่ธุรกิจขนาดเล็ก และดำเนินกิจการมากว่าสิบปีแล้ว',
  },
  {
    id: 'sp-5',
    questionTh: 'คุณจัดการกับกำหนดส่งงานที่กระชั้นชิดอย่างไร?',
    questionEn: 'How do you handle a tight deadline?',
    sampleAnswer: 'I prioritize the most important tasks first and ask my colleagues for help if needed.',
    sampleAnswerTh: 'ฉันจะจัดลำดับความสำคัญของงานก่อน และขอความช่วยเหลือจากเพื่อนร่วมงานถ้าจำเป็น',
  },
  {
    id: 'sp-6',
    questionTh: 'บอกเหตุผลว่าทำไมการสื่อสารที่ดีถึงสำคัญในที่ทำงาน',
    questionEn: 'Explain why good communication is important at work.',
    sampleAnswer: 'Good communication helps avoid misunderstandings and makes teamwork much more efficient.',
    sampleAnswerTh: 'การสื่อสารที่ดีช่วยลดความเข้าใจผิด และทำให้การทำงานเป็นทีมมีประสิทธิภาพมากขึ้น',
  },
  {
    id: 'sp-7',
    questionTh: 'อธิบายเส้นทางที่คุณเดินทางมาทำงานหรือมาเรียน',
    questionEn: 'Describe your commute to work or school.',
    sampleAnswer: 'I usually take the BTS to work, and the trip takes about thirty minutes.',
    sampleAnswerTh: 'ฉันมักจะนั่งรถไฟฟ้าไปทำงาน ใช้เวลาเดินทางประมาณสามสิบนาที',
  },
  {
    id: 'sp-8',
    questionTh: 'คุณคิดว่าทักษะภาษาอังกฤษสำคัญกับงานของคุณอย่างไร?',
    questionEn: 'How important is English for your job?',
    sampleAnswer: 'English is very important because I often communicate with international clients by email and phone.',
    sampleAnswerTh: 'ภาษาอังกฤษสำคัญมาก เพราะฉันมักจะติดต่อกับลูกค้าต่างชาติทางอีเมลและโทรศัพท์',
  },
]
