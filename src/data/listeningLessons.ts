import type { ListeningLesson } from '../lib/types'

/**
 * Strategy lessons shown before practicing each TOEIC Listening part.
 * Each tip ends with a quick check whose `audio` is read aloud by TTS.
 */
export const listeningLessons: ListeningLesson[] = [
  {
    part: 1,
    emoji: '📷',
    titleTh: 'Part 1: บรรยายภาพ',
    formatTh:
      'ข้อสอบจริงมี 6 ข้อ แต่ละข้อมีรูปภาพ 1 รูปในกระดาษ แต่ "ไม่มีตัวเลือกพิมพ์ไว้" — จะได้ยินประโยคบรรยาย 4 ประโยค (A)–(D) เพียงครั้งเดียว แล้วเลือกข้อที่ตรงกับภาพที่สุด มีเวลาตอบประมาณ 5 วินาทีต่อข้อ',
    introTh:
      'Part 1 เป็นพาร์ตที่ง่ายที่สุด และเก็บคะแนนเต็มได้ถ้ารู้ทัน "กับดัก" ของมัน ข้อสอบไม่ได้วัดว่าเราตีความภาพลึกแค่ไหน แต่วัดว่าเราฟังคำนามและคำกริยาได้แม่นไหม เคล็ดลับคือดูภาพให้ทั่วก่อนเสียงเริ่ม แล้วตัดตัวเลือกทีละข้อขณะฟัง',
    tips: [
      {
        label: 'บรรยายเฉพาะสิ่งที่เห็น',
        explanation:
          'คำตอบที่ถูกพูดถึงสิ่งที่ "มองเห็นในภาพ" เท่านั้น ถ้าประโยคเดาความรู้สึก จุดประสงค์ หรือสิ่งที่จะเกิดขึ้นต่อ (เช่น is about to, is waiting for a friend) ให้สงสัยไว้ก่อนเลย',
        pattern: 'เห็นจริง ✅ / เดาเอง ❌',
        exampleEn: 'A woman is reading a menu at a table.',
        exampleTh: 'ผู้หญิงกำลังอ่านเมนูที่โต๊ะ (บอกสิ่งที่มองเห็นได้จริง)',
        highlight: 'reading a menu',
        check: {
          audio: 'The man is about to leave for the airport.',
          question: 'ภาพ: ผู้ชายยืนถือกระเป๋าเดินทางอยู่หน้าประตูบ้าน — ประโยคที่ได้ยินเป็นคำตอบที่ดีสำหรับภาพนี้ไหม?',
          choices: [
            'ดี เพราะในภาพมีกระเป๋าเดินทาง',
            'ไม่ดี เพราะ "about to leave for the airport" เป็นการเดาว่าจะไปไหน ซึ่งภาพบอกไม่ได้',
            'ดี เพราะใช้ is ซึ่งเป็น Present tense',
          ],
          answerIndex: 1,
          explanation:
            'ภาพบอกได้แค่ว่าเขา "is holding a suitcase" แต่บอกไม่ได้ว่ากำลังจะไปสนามบิน — ประโยคที่เดาแผนหรือจุดหมายมักเป็นตัวลวงใน Part 1',
        },
      },
      {
        label: 'กับดักคำเสียงคล้าย',
        explanation:
          'ตัวลวงชอบใช้คำที่ "เสียงคล้าย" กับสิ่งในภาพ เช่น ภาพมีคนเดิน (walk) แต่ประโยคพูดว่า work หรือภาพมีเครื่องถ่ายเอกสาร (copier) แต่ประโยคพูดว่า coffee ถ้าเสียงคล้ายแต่ความหมายไม่ตรงภาพ ให้ตัดทิ้งทันที',
        pattern: 'เสียงคล้าย ≠ ความหมายเดียวกัน',
        exampleEn: 'She is walking along the shore.',
        exampleTh: 'เธอกำลังเดินเลียบชายหาด (ระวังสับสน walking/working และ shore/store)',
        highlight: 'walking along the shore',
        check: {
          audio: 'Two men are working in the park.',
          question: 'ภาพ: ผู้ชายสองคนกำลังเดินเล่นอยู่ในสวนสาธารณะ — ควรเลือกประโยคที่ได้ยินไหม?',
          choices: [
            'ควรเลือก เพราะมีผู้ชายสองคนอยู่ในสวนจริง',
            'ควรเลือก เพราะได้ยินคำว่า park ตรงกับภาพ',
            'ควรเลือก เพราะ working กับ walking มีความหมายเดียวกัน',
            'ไม่ควร เพราะได้ยิน "working" (ทำงาน) ซึ่งเสียงคล้าย walking (เดิน) แต่ภาพคือกำลังเดิน',
          ],
          answerIndex: 3,
          explanation:
            '"working" กับ "walking" เสียงใกล้กันมาก แต่ความหมายต่างกัน ประโยคนี้มีคนและสถานที่ถูก แต่กริยาผิด จึงไม่ใช่คำตอบ',
        },
      },
      {
        label: 'คนถูก แต่การกระทำผิด',
        explanation:
          'ตัวลวงที่พบบ่อยที่สุด: ประธานหรือสิ่งของในประโยคตรงกับภาพ แต่กริยาผิด เช่น ภาพผู้ชายถือแก้วกาแฟ แต่ประโยคบอกว่า "is pouring coffee" ให้ฟังกริยาหลัง is/are ให้ชัดทุกครั้ง โดยเฉพาะคู่ wearing (สวมอยู่) กับ putting on (กำลังสวม)',
        pattern: 'ประธาน ✔ + กริยา ✔ = คำตอบ',
        exampleEn: 'The man is holding a cup of coffee.',
        exampleTh: 'ผู้ชายกำลังถือแก้วกาแฟ (ถ้าได้ยิน "is pouring coffee" ทั้งที่เขาแค่ถือ = ผิด)',
        highlight: 'holding',
        check: {
          audio: 'A woman is putting on her glasses.',
          question: 'ภาพ: ผู้หญิงสวมแว่นตาอยู่แล้ว กำลังนั่งอ่านหนังสือ — ประโยคที่ได้ยินถูกหรือผิด?',
          choices: [
            'ผิด เพราะ "putting on" = กำลังหยิบมาสวม แต่ในภาพเธอสวมอยู่แล้ว (wearing)',
            'ถูก เพราะในภาพผู้หญิงมีแว่นตา',
            'ถูก เพราะ putting on กับ wearing ความหมายเหมือนกัน',
            'ผิด เพราะในภาพไม่มีผู้หญิง',
          ],
          answerIndex: 0,
          explanation:
            '"is putting on" คือการกระทำ "กำลังสวม" ส่วนภาพแสดงสภาพ "สวมอยู่แล้ว" ซึ่งต้องใช้ "is wearing" — คนและแว่นถูก แต่การกระทำผิด',
        },
      },
      {
        label: 'ภาพสิ่งของ: is being V3 กับ has been V3',
        explanation:
          'ถ้าภาพไม่มีคน แต่ประโยคใช้ "is/are being + V3" (กำลังถูกทำ) มักผิด เพราะต้องมีคนกำลังทำอยู่ในภาพ ภาพสิ่งของที่วางนิ่งๆ ให้มองหา "has/have been + V3" หรือ "is/are + V3" ซึ่งบอกสภาพที่เป็นอยู่ เช่น have been stacked, is parked',
        pattern: 'ไม่มีคน → has been V3 ✅ / is being V3 ❌',
        exampleEn: 'Some chairs have been stacked against the wall.',
        exampleTh: 'เก้าอี้ถูกวางซ้อนไว้ชิดกำแพง (บอกสภาพที่เป็นอยู่ ไม่ต้องมีคนในภาพ)',
        highlight: 'have been stacked',
        check: {
          audio: 'The tables are being cleaned.',
          question: 'ภาพ: ร้านอาหารที่ว่างเปล่า ไม่มีคนเลย โต๊ะสะอาดเรียบร้อย — ประโยคที่ได้ยินถูกต้องไหม?',
          choices: [
            'ถูก เพราะโต๊ะในภาพสะอาด',
            'ถูก เพราะเป็นภาพร้านอาหาร',
            'ผิด เพราะ "are being cleaned" = มีคนกำลังเช็ดอยู่ แต่ในภาพไม่มีคน',
            'ผิด เพราะ cleaned เป็น Past tense',
          ],
          answerIndex: 2,
          explanation:
            '"are being + V3" คือกำลังถูกทำ ณ ตอนนั้น ต้องเห็นคนกำลังเช็ดโต๊ะ ภาพที่ไม่มีคนควรใช้ประโยคแบบ "The tables have been cleaned." แทน',
        },
      },
      {
        label: 'ตัดตัวเลือกขณะฟัง',
        explanation:
          'ตัวเลือกไม่ได้พิมพ์ไว้ ต้องจำเอง ให้วางดินสอไว้ที่ A–D แล้วฟังทีละข้อ: ผิดชัด → ตัดทิ้ง, ไม่แน่ใจ → เก็บไว้ ถึงจะเจอข้อที่ดูถูกแล้วก็ต้องฟังให้ครบ เพราะอาจมีข้อที่ตรงกว่า',
        pattern: 'ฟัง → ✗ ตัด / ? เก็บ / ✓ เลือก',
        exampleEn: 'He is typing. He is drinking. He is talking on the phone.',
        exampleTh: 'ฟังทีละประโยค แล้วตัดข้อที่ไม่ตรงกับภาพออกทันที',
        highlight: 'He is talking on the phone.',
        check: {
          audio:
            'A. She is opening a window. B. She is buying some flowers. C. She is watering some plants. D. She is closing the curtains.',
          question: 'ภาพ: ผู้หญิงกำลังรดน้ำต้นไม้ที่วางอยู่ข้างหน้าต่าง — ข้อไหนถูก?',
          choices: ['A', 'B', 'C', 'D'],
          answerIndex: 2,
          explanation:
            'C "watering some plants" ตรงกับภาพ ส่วน A และ D ใช้สิ่งที่อยู่ในภาพ (window, curtains) แต่การกระทำผิด และ B ซื้อดอกไม้ไม่ปรากฏในภาพ',
        },
      },
    ],
    tipTh:
      'เกร็ดจำง่าย: ฟัง "กริยา" ให้แม่นกว่าคำนาม — ตัวลวงส่วนใหญ่มีคำนามถูกแต่กริยาผิด ภาพไม่มีคนให้ระวัง "is being + V3" และอย่าเลือกประโยคที่เดาสิ่งที่มองไม่เห็น!',
  },
  {
    part: 2,
    emoji: '💬',
    titleTh: 'Part 2: ถาม-ตอบ',
    formatTh:
      'ข้อสอบจริงมี 25 ข้อ ไม่มีอะไรพิมพ์ในกระดาษเลย จะได้ยินคำถามหรือประโยค 1 ประโยค ตามด้วยคำตอบ 3 ตัวเลือก (A)–(C) ฟังได้ครั้งเดียว แล้วเลือกคำตอบที่เหมาะสมที่สุด มีเวลาประมาณ 5 วินาทีต่อข้อ',
    introTh:
      'Part 2 เป็นพาร์ตที่ต้องใช้สมาธิสูงสุด เพราะไม่มีอะไรให้ดูเลย แต่ข่าวดีคือมันมี "สูตร" ชัดเจน ถ้าจับคำแรกของคำถามได้ และรู้ทันกับดักคำซ้ำ ก็ตัดตัวเลือกผิดได้เกือบหมด',
    tips: [
      {
        label: 'คำแรกบอกคำตอบ',
        explanation:
          'คำถาม WH (Who, When, Where, Why, How...) คำแรกคือหัวใจ — ได้ยิน Where ให้หาสถานที่ ได้ยิน When ให้หาเวลา และจำไว้ว่าคำถาม WH ตอบด้วย Yes/No ไม่ได้',
        pattern: 'Where → สถานที่ / When → เวลา / Who → คน',
        exampleEn: 'Where is the staff meeting? — In conference room B.',
        exampleTh: 'ประชุมพนักงานจัดที่ไหน — ที่ห้องประชุม B',
        highlight: 'Where',
        check: {
          audio: 'When will the new printer be delivered?',
          question: 'Choose the best response.',
          choices: ['To the second floor.', 'By Thursday afternoon.', 'Yes, it was delivered.', 'A color printer.'],
          answerIndex: 1,
          explanation:
            '"When" ถามเวลา → "By Thursday afternoon" ส่วน "To the second floor" ตอบ Where และคำถาม WH ตอบด้วย Yes ไม่ได้',
        },
      },
      {
        label: 'คำตอบอ้อมก็ถูกได้',
        explanation:
          'คำตอบที่ถูกใน TOEIC หลายข้อ "ไม่ได้ตอบตรงๆ" เช่น "Let me check." "I\'m not sure." "Ask Mr. Kim." หรือบอกว่าเรื่องนั้นเปลี่ยนไปแล้ว ถ้าเป็นการตอบสนองที่คนจริงๆ พูดกันได้ ก็ถือว่าถูก',
        pattern: 'ไม่รู้ / ถามคนอื่น / เดี๋ยวเช็ก = ตอบได้',
        exampleEn: 'Who is in charge of the budget? — I\'d have to check the org chart.',
        exampleTh: 'ใครดูแลงบประมาณ — ต้องดูผังองค์กรก่อนนะ (ไม่ได้บอกชื่อ แต่สมเหตุสมผล)',
        highlight: 'I\'d have to check',
        check: {
          audio: 'What time does the client\'s flight land?',
          question: 'Choose the best response.',
          choices: ['At gate 12.', 'He booked it online.', 'Let me look at the schedule.', 'It was a long flight.'],
          answerIndex: 2,
          explanation:
            '"Let me look at the schedule" ไม่ได้บอกเวลาตรงๆ แต่เป็นการตอบสนองที่เป็นธรรมชาติ ส่วน "At gate 12" ตอบ Where และ "a long flight" แค่ซ้ำคำว่า flight',
        },
      },
      {
        label: 'ระวังคำซ้ำ/เสียงคล้าย',
        explanation:
          'ตัวเลือกที่ "ซ้ำคำ" หรือมีเสียงคล้ายกับคำในคำถาม มักเป็นตัวลวง เช่น ถามเรื่อง copies แต่ตัวเลือกพูดถึง coffee หรือถามเรื่อง contract แล้วตัวเลือกมี contractor ยิ่งเหมือนคำถามมาก ยิ่งต้องระวัง',
        pattern: 'คำซ้ำ = สัญญาณอันตราย ⚠️',
        exampleEn: 'Did you make copies of the report? — Yes, they\'re on your desk.',
        exampleTh: 'ถ่ายเอกสารรายงานแล้วหรือยัง — ถ่ายแล้ว อยู่บนโต๊ะคุณ (ตัวลวงอาจเป็น "I\'d like some coffee.")',
        highlight: 'copies',
        check: {
          audio: 'Have you reviewed the sales figures yet?',
          question: 'Choose the best response.',
          choices: ['I\'ll go over them after lunch.', 'The sales team is on the third floor.', 'Yes, the sale ends today.'],
          answerIndex: 0,
          explanation:
            '"I\'ll go over them after lunch" (go over = review) ตอบว่ายังไม่ได้ดูแต่จะดูหลังมื้อเที่ยง ส่วนอีกสองข้อแค่ซ้ำคำ sales/sale',
        },
      },
      {
        label: 'Yes/No, Tag และคำถาม "or"',
        explanation:
          'คำถาม Yes/No และ tag question (..., isn\'t it?) ตอบด้วย Yes/No หรือข้อมูลยืนยันได้ แต่คำถามแบบ "A or B" ห้ามตอบ Yes/No — คำตอบที่ถูกคือเลือก A, เลือก B หรือ "either / neither / whichever"',
        pattern: 'A or B? → A / B / either / neither',
        exampleEn: 'Should we meet on Monday or Tuesday? — Either day works for me.',
        exampleTh: 'เราควรนัดวันจันทร์หรือวันอังคาร — วันไหนก็ได้สำหรับฉัน',
        highlight: 'Either day works',
        check: {
          audio: 'Would you like a window seat or an aisle seat?',
          question: 'Choose the best response.',
          choices: ['Yes, I would.', 'The window is open.', 'I\'ll take the nine o\'clock flight.', 'I don\'t have a preference.'],
          answerIndex: 3,
          explanation:
            'คำถาม or ตอบ "Yes" ไม่ได้ ส่วน "I don\'t have a preference" (ไม่มีความต้องการเป็นพิเศษ) = ที่ไหนก็ได้ จึงถูก "The window is open" แค่ซ้ำคำ window',
        },
      },
      {
        label: 'ข้อเสนอและคำขอร้อง',
        explanation:
          '"Why don\'t we...?" "How about...?" คือ "การชวน" ไม่ได้ถามเหตุผล ส่วน "Could you...?" "Would you mind...?" คือการขอร้อง คำตอบที่ดีคือการตอบรับหรือปฏิเสธอย่างสุภาพ เช่น "Sure." "Good idea." "Sorry, I\'m busy." — ระวังคำตอบที่ขึ้นต้นด้วย Because',
        pattern: 'Why don\'t we...? = ชวน ≠ ถามเหตุผล',
        exampleEn: 'Why don\'t we take a short break? — That sounds good.',
        exampleTh: 'พักกันสักหน่อยไหม — ฟังดูดีนะ',
        highlight: 'Why don\'t we',
        check: {
          audio: 'Why don\'t we order lunch for the team?',
          question: 'Choose the best response.',
          choices: ['Because it was delicious.', 'Good idea, I\'ll find a menu.', 'We ordered new laptops.'],
          answerIndex: 1,
          explanation:
            '"Why don\'t we..." คือการชวน จึงตอบรับว่า "Good idea" ส่วน "Because..." คือกับดักคลาสสิก และ "ordered" แค่ซ้ำคำจากคำถาม',
        },
      },
    ],
    tipTh:
      'เกร็ดจำง่าย: จับคำแรกให้ได้ → ตัดข้อที่ซ้ำคำหรือเสียงคล้ายทิ้ง → ถ้าเหลือข้อที่ "ไม่ได้ตอบตรงๆ แต่คนพูดกันจริง" นั่นแหละมักเป็นคำตอบ!',
  },
  {
    part: 3,
    emoji: '👥',
    titleTh: 'Part 3: บทสนทนา',
    formatTh:
      'ข้อสอบจริงมี 39 ข้อ (13 บทสนทนา × 3 คำถาม) เป็นบทสนทนาของคน 2–3 คน ฟังได้ครั้งเดียว คำถามและตัวเลือก 4 ข้อ "พิมพ์อยู่ในกระดาษ" (ผู้บรรยายอ่านคำถามให้ด้วย แต่ไม่อ่านตัวเลือก) บางชุดมีกราฟิก เช่น ตารางหรือแผนผังให้ดูประกอบ มีเวลาประมาณ 8 วินาทีต่อคำถาม',
    introTh:
      'Part 3 ยาวขึ้น แต่ไม่ได้ยากขึ้นถ้ามีแผน ความลับคือ "อ่านคำถามล่วงหน้า" แล้วฟังหาเฉพาะข้อมูลที่ต้องใช้ บทสนทนามักเป็นเรื่องที่ทำงาน ร้านค้า หรือการนัดหมาย ซึ่งรูปแบบซ้ำๆ จนเดาทางได้',
    tips: [
      {
        label: 'อ่านคำถามก่อนฟัง',
        explanation:
          'ใช้เวลาช่วงที่ผู้บรรยายอ่านคำสั่งหรืออ่านคำถาม กวาดตาอ่านคำถาม 3 ข้อของชุดถัดไป ขีดเส้นใต้คำสำคัญ (who, what, when, man/woman) จะได้รู้ว่าต้องฟังหาอะไรและฟังจากใคร',
        pattern: 'อ่านคำถาม 3 ข้อ → ฟังหาคำตอบ',
        exampleEn: 'What does the woman ask the man to do?',
        exampleTh: 'ผู้หญิงขอให้ผู้ชายทำอะไร (รู้ล่วงหน้าว่าต้องฟัง "คำขอ" จากฝั่งผู้หญิง)',
        highlight: 'the woman ask the man',
        check: {
          audio:
            'Woman: Tom, could you send the updated price list to the client before noon? Man: Sure, I\'ll do it right after this call.',
          question: 'What does the woman ask the man to do?',
          choices: ['Call a client', 'Update the prices', 'Send a price list', 'Have lunch'],
          answerIndex: 2,
          explanation:
            'ผู้หญิงขอว่า "could you send the updated price list to the client" — "Call a client" ผิด เพราะ call ที่ได้ยินคือสายที่ผู้ชายคุยอยู่ และ "updated" เป็นแค่คำขยายของ price list',
        },
      },
      {
        label: 'ลำดับคำถาม = ลำดับบทสนทนา',
        explanation:
          'คำถาม 3 ข้อเรียงตามเนื้อเรื่อง: ข้อแรกมักเป็นภาพรวม (หัวข้อ ที่ไหน ใคร) ตอบในช่วงต้น ข้อสองเป็นรายละเอียดตรงกลาง ข้อสามมักถาม "จะทำอะไรต่อ" ตอบในประโยคท้ายๆ ถ้าพลาดข้อไหนให้ปล่อย แล้วตั้งใจฟังข้อถัดไป',
        pattern: 'ต้น → กลาง → ท้าย',
        exampleEn: 'I\'ll call the supplier this afternoon.',
        exampleTh: 'ฉันจะโทรหาซัพพลายเออร์บ่ายนี้ (ประโยคท้ายแบบนี้มักตอบคำถาม "What will the man do next?")',
        highlight: 'I\'ll call the supplier',
        check: {
          audio:
            'Man: The projector in Room 5 isn\'t working again. Woman: That\'s the third time this month. Man: I\'ll ask maintenance to replace it today.',
          question: 'What will the man do next?',
          choices: ['Contact maintenance', 'Move to another room', 'Cancel a meeting', 'Fix the projector himself'],
          answerIndex: 0,
          explanation:
            'ประโยคสุดท้าย "I\'ll ask maintenance to replace it today" ตอบคำถาม do next — ask maintenance = contact maintenance',
        },
      },
      {
        label: 'คำตอบถูกมักถอดความ (Paraphrase)',
        explanation:
          'ตัวเลือกที่ถูกมักไม่ใช้คำเดิมจากบทสนทนา แต่ใช้คำที่ความหมายเดียวกัน ส่วนตัวเลือกที่ "ซ้ำคำเป๊ะๆ" กลับมักเป็นตัวลวง เช่น ได้ยิน "out of stock" คำตอบอาจเขียนว่า "unavailable"',
        pattern: 'คำต่าง ความหมายเดียวกัน = ✅',
        exampleEn: 'I\'m afraid we\'re out of stock on that model.',
        exampleTh: 'เสียดายที่รุ่นนั้นสินค้าหมด → คำตอบอาจเขียนว่า "The item is unavailable."',
        highlight: 'out of stock',
        check: {
          audio: 'Man: I\'m calling because the chair I ordered arrived with a broken leg.',
          question: 'What is the man\'s problem?',
          choices: ['He ordered the wrong chair.', 'A delivery is late.', 'He broke his leg.', 'An item was damaged.'],
          answerIndex: 3,
          explanation:
            '"arrived with a broken leg" = สินค้าเสียหาย ถอดความเป็น "An item was damaged" ส่วน "He broke his leg" ซ้ำคำ broken leg แต่ความหมายผิด (ขาเก้าอี้ ไม่ใช่ขาเขา)',
        },
      },
      {
        label: 'คำถามความหมายแฝงและ 3 ผู้พูด',
        explanation:
          'คำถามแบบ "What does the woman mean when she says...?" หรือ "Why does the man say...?" ต้องตีความจากบริบท ไม่ใช่แปลตรงตัว บางชุดมีผู้พูด 3 คน ให้จับให้ได้ว่าใครพูดประโยคนั้น และพูดเพื่อตอบอะไร',
        pattern: 'ความหมายแฝง = ดูบริบทก่อน-หลัง',
        exampleEn: 'Can you finish the report today? — I have three meetings this afternoon.',
        exampleTh: 'ทำรายงานเสร็จวันนี้ได้ไหม — บ่ายนี้ผมมีประชุมสามรอบ (ความหมายแฝง = คงทำไม่ทัน)',
        highlight: 'I have three meetings this afternoon',
        check: {
          audio:
            'Woman: Should we order more paper for the printer? Man: There are ten boxes in the storage room.',
          question: 'What does the man imply?',
          choices: [
            'They need to order paper today.',
            'They do not need more paper now.',
            'The storage room is locked.',
            'The printer is broken.',
          ],
          answerIndex: 1,
          explanation:
            '"There are ten boxes in the storage room" แปลว่ายังมีกระดาษเหลือเยอะ = ยังไม่ต้องสั่งเพิ่ม เป็นคำตอบแบบอ้อมที่ต้องตีความ',
        },
      },
      {
        label: 'คำถามกราฟิก',
        explanation:
          'ชุดท้ายๆ มีตาราง แผนที่ หรือรายการราคา ให้ดูกราฟิกก่อนฟัง คำตอบมักต้อง "จับคู่" ข้อมูล: ได้ยินข้อมูลหนึ่ง (เช่น ชั้น) แต่ตัวเลือกเป็นอีกข้อมูลหนึ่งในกราฟิก (เช่น ชื่อห้อง)',
        pattern: 'ได้ยิน X → ดูกราฟิก → ตอบ Y',
        exampleEn: 'Let\'s book the room that fits twenty people.',
        exampleTh: 'จองห้องที่จุได้ 20 คนกันเถอะ (ต้องดูตารางว่าห้องไหนจุ 20 คน)',
        highlight: 'fits twenty people',
        check: {
          audio: 'Man: The Garden Room is too small for us. Let\'s take the one on the third floor instead.',
          question:
            'Look at the graphic: Garden Room – 1st floor | Lake Room – 2nd floor | Sky Room – 3rd floor. Which room will they book?',
          choices: ['Garden Room', 'Lake Room', 'Sky Room'],
          answerIndex: 2,
          explanation:
            'ผู้ชายบอก "the one on the third floor" — ดูกราฟิกแล้วชั้น 3 คือ Sky Room ส่วน Garden Room ถูกปฏิเสธเพราะ "too small"',
        },
      },
    ],
    tipTh:
      'เกร็ดจำง่าย: อ่านคำถามก่อน → ฟังตามลำดับ → เลือกข้อที่ "ความหมายตรง" ไม่ใช่ข้อที่ "คำซ้ำ" แล้วรีบไปอ่านคำถามชุดถัดไปทันที!',
  },
  {
    part: 4,
    emoji: '📢',
    titleTh: 'Part 4: บทพูดคนเดียว',
    formatTh:
      'ข้อสอบจริงมี 30 ข้อ (10 บทพูด × 3 คำถาม) เป็นการพูดคนเดียว เช่น ประกาศ ข้อความเสียง (voicemail) โฆษณา ข่าว รายงานจราจร/อากาศ หรือการนำทัวร์ ฟังได้ครั้งเดียว คำถามและตัวเลือก 4 ข้อพิมพ์อยู่ในกระดาษ บางชุดมีกราฟิกประกอบ มีเวลาประมาณ 8 วินาทีต่อคำถาม',
    introTh:
      'Part 4 คล้าย Part 3 แต่มีผู้พูดคนเดียว จึงไม่ต้องคอยแยกว่าใครพูด ประโยคแรกมักบอกเลยว่าเป็นบทพูดประเภทไหน และแต่ละประเภทมีโครงสร้างตายตัว รู้โครงแล้วก็เดาได้ว่าข้อมูลไหนจะมาเมื่อไหร่',
    tips: [
      {
        label: 'ประโยคแรกบอกประเภท',
        explanation:
          'ฟังประโยคแรกให้ดี: "Attention passengers..." = ประกาศ, "Hi, this is ... calling about..." = ข้อความเสียง, "Welcome to..." = ทัวร์/อีเวนต์, "Are you looking for...?" = โฆษณา, "In business news..." = ข่าว รู้ประเภทแล้วจะเดาเนื้อหาที่ตามมาได้',
        pattern: 'ประโยคแรก → ประเภทบทพูด',
        exampleEn: 'Hi, this is Mark from Sunrise Dental, calling to confirm your appointment.',
        exampleTh: 'สวัสดีครับ ผมมาร์กจากคลินิกทันตกรรมซันไรส์ โทรมายืนยันนัดของคุณ (= ข้อความเสียง)',
        highlight: 'Hi, this is Mark from Sunrise Dental',
        check: {
          audio: 'Are you tired of slow internet? Switch to SpeedNet today and get your first month free!',
          question: 'What type of talk is this?',
          choices: ['A news report', 'An advertisement', 'A voicemail message', 'A weather forecast'],
          answerIndex: 1,
          explanation:
            'เปิดด้วยคำถามชวนคิด "Are you tired of...?" แล้วตามด้วยข้อเสนอ "get your first month free" = โฆษณา',
        },
      },
      {
        label: 'ต้นเรื่อง = ใคร/ทำไม, ท้ายเรื่อง = ทำอะไรต่อ',
        explanation:
          'คำถาม "Who is the speaker?" "What is the purpose of the message?" มักตอบใน 1–2 ประโยคแรก ส่วน "What will the listeners do next?" "What are listeners asked to do?" มักตอบในประโยคท้ายที่มี Please..., Let\'s..., Don\'t forget to...',
        pattern: 'ต้น: Who/Why · ท้าย: Next/Please',
        exampleEn: 'Now, please follow me to the conference hall.',
        exampleTh: 'เอาล่ะ เชิญตามฉันไปที่ห้องประชุมใหญ่ (ตอบคำถาม "What will the listeners do next?")',
        highlight: 'please follow me',
        check: {
          audio:
            'Thank you for visiting Green Valley Farm. Our next stop is the apple orchard, so please grab a basket from the table by the door.',
          question: 'What are the listeners asked to do?',
          choices: ['Buy some apples', 'Visit a gift shop', 'Pay at the door', 'Take a basket'],
          answerIndex: 3,
          explanation:
            'ประโยคท้าย "please grab a basket from the table" (grab = take) ส่วน apples และ door เป็นคำที่ได้ยิน แต่ไม่ใช่สิ่งที่ถูกขอให้ทำ',
        },
      },
      {
        label: 'Paraphrase ใน Part 4',
        explanation:
          'เหมือน Part 3 — ตัวเลือกที่ถูกมักใช้คำต่างจากที่ได้ยิน เช่น "postponed" → "delayed / moved to a later date", "complimentary" → "free", "renovation" → "repairs" ฝึกจับ "ความหมาย" ไม่ใช่ "คำ"',
        pattern: 'complimentary = free · postpone = delay',
        exampleEn: 'All guests will receive a complimentary breakfast.',
        exampleTh: 'แขกทุกท่านจะได้รับอาหารเช้าฟรี (complimentary = free)',
        highlight: 'complimentary',
        check: {
          audio: 'Due to the renovation, the library will be closed to the public until next Monday.',
          question: 'What does the speaker say about the library?',
          choices: [
            'It is being repaired.',
            'It has moved to a new address.',
            'It is open every Monday.',
            'It is hiring new staff.',
          ],
          answerIndex: 0,
          explanation:
            '"Due to the renovation" (การปรับปรุงซ่อมแซม) ถอดความเป็น "It is being repaired" ส่วน "open every Monday" ใช้คำว่า Monday หลอก — จริงๆ ห้องสมุดปิดถึงวันจันทร์หน้า',
        },
      },
      {
        label: 'ตัวเลข เวลา วันที่',
        explanation:
          'Part 4 ชอบใส่ตัวเลขหลายตัวในบทพูดเดียว (เวลาเดิม-เวลาใหม่, ราคาเต็ม-ราคาลด) แล้วถามแค่ตัวเดียว ให้ฟังคำรอบตัวเลข เช่น originally, now, instead of, until และระวังเสียงคล้าย fifteen/fifty, thirteen/thirty',
        pattern: 'เลขหลายตัว → ฟังคำที่ขยายมัน',
        exampleEn: 'The meeting, originally at two, will now start at three-thirty.',
        exampleTh: 'การประชุมเดิมเวลาบ่ายสอง ตอนนี้จะเริ่มบ่ายสามโมงครึ่ง (คำว่า now บอกเวลาใหม่)',
        highlight: 'will now start at three-thirty',
        check: {
          audio: 'The sale was supposed to end on the fifteenth, but it has been extended until the thirtieth.',
          question: 'When will the sale end?',
          choices: ['On the 13th', 'On the 15th', 'On the 30th', 'On the 31st'],
          answerIndex: 2,
          explanation:
            '"supposed to end on the fifteenth" คือวันเดิม แต่ "extended until the thirtieth" คือวันใหม่ — ระวังเสียง thirtieth/thirteenth ที่คล้ายกัน',
        },
      },
    ],
    tipTh:
      'เกร็ดจำง่าย: ประโยคแรกบอก "ใคร-ประเภท-จุดประสงค์" ประโยคท้ายบอก "ทำอะไรต่อ" ตรงกลางคือรายละเอียด — เจอตัวเลขให้ฟังคำว่า now / instead / until ให้ดี!',
  },
]

export function listeningLessonFor(part: 1 | 2 | 3 | 4): ListeningLesson | undefined {
  return listeningLessons.find((lesson) => lesson.part === part)
}
