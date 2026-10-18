import type { LangCode, LangExamFormatRow, LangLevelContent } from '../../lib/langTypes'

export interface LangLevelMeta {
  lang: LangCode
  /** URL segment, e.g. "hsk1" or "n5" */
  slug: string
  code: string
  nameTh: string
  /** Cumulative vocabulary required by the exam */
  examWords: number
  summaryTh: string
  format: LangExamFormatRow[]
  passTh: string
  /** Undefined while the level's content is still being written */
  load?: () => Promise<LangLevelContent>
}

export interface LangTrack {
  lang: LangCode
  path: '/chinese' | '/japanese'
  flag: string
  nameTh: string
  examName: string
  ttsLang: string
  readingLabel: string
  introTh: string
  levels: LangLevelMeta[]
}

export const CHINESE_TRACK: LangTrack = {
  lang: 'zh',
  path: '/chinese',
  flag: '🇨🇳',
  nameTh: 'ภาษาจีน',
  examName: 'HSK',
  ttsLang: 'zh-CN',
  readingLabel: 'พินอิน',
  introTh:
    'เตรียมสอบ HSK (汉语水平考试) ตามหลักสูตร HSK 2.0 ที่ศูนย์สอบในไทยใช้ เรียนทีละระดับ: คำศัพท์ตามรายการคำของข้อสอบ ไวยากรณ์ทีละจุด และข้อสอบจำลองตามรูปแบบจริง',
  levels: [
    {
      lang: 'zh',
      slug: 'hsk1',
      code: 'HSK 1',
      nameTh: 'เริ่มต้น',
      examWords: 150,
      summaryTh: 'เข้าใจและใช้วลีง่ายๆ ในชีวิตประจำวัน',
      format: [
        { sectionTh: 'การฟัง (听力)', detailTh: '4 ส่วน: ภาพ–ประโยค ถูก/ผิด, เลือกภาพ, จับคู่บทสนทนากับภาพ, ฟังแล้วตอบ', minutes: 15, questions: 20 },
        { sectionTh: 'การอ่าน (阅读)', detailTh: '4 ส่วน: ภาพ–คำ ถูก/ผิด, จับคู่ประโยคกับภาพ, จับคู่คำถาม–คำตอบ, เติมคำ', minutes: 17, questions: 20 },
      ],
      passTh: 'เต็ม 200 คะแนน (ส่วนละ 100) ผ่านที่ 120 คะแนน',
      load: () => import('./zh-hsk1').then((m) => m.default),
    },
    {
      lang: 'zh',
      slug: 'hsk2',
      code: 'HSK 2',
      nameTh: 'พื้นฐาน',
      examWords: 300,
      summaryTh: 'สื่อสารเรื่องคุ้นเคยในชีวิตประจำวันได้อย่างง่ายและตรงไปตรงมา',
      format: [
        { sectionTh: 'การฟัง (听力)', detailTh: '4 ส่วน: ภาพ–ประโยค ถูก/ผิด, จับคู่บทสนทนากับภาพ, บทสนทนาสั้นแล้วตอบ (2 ส่วน)', minutes: 25, questions: 35 },
        { sectionTh: 'การอ่าน (阅读)', detailTh: '4 ส่วน: จับคู่ภาพ, เติมคำ, ตัดสินถูก/ผิด, จับคู่ประโยค', minutes: 22, questions: 25 },
      ],
      passTh: 'เต็ม 200 คะแนน (ส่วนละ 100) ผ่านที่ 120 คะแนน',
      load: () => import('./zh-hsk2').then((m) => m.default),
    },
    {
      lang: 'zh',
      slug: 'hsk3',
      code: 'HSK 3',
      nameTh: 'กลาง',
      examWords: 600,
      summaryTh: 'สื่อสารในชีวิตประจำวัน การเรียน และการทำงานเบื้องต้น เที่ยวจีนได้โดยรับมือสถานการณ์ส่วนใหญ่',
      format: [
        { sectionTh: 'การฟัง (听力)', detailTh: '4 ส่วน: จับคู่ภาพ, ถูก/ผิด, บทสนทนาสั้น, บทสนทนายาว', minutes: 35, questions: 40 },
        { sectionTh: 'การอ่าน (阅读)', detailTh: '3 ส่วน: จับคู่ประโยค, เติมคำ, อ่านย่อหน้าแล้วตอบ', minutes: 30, questions: 30 },
        { sectionTh: 'การเขียน (书写)', detailTh: '2 ส่วน: เรียงคำเป็นประโยค, เขียนอักษรจีนจากพินอิน', minutes: 15, questions: 10 },
      ],
      passTh: 'เต็ม 300 คะแนน (ส่วนละ 100) ผ่านที่ 180 คะแนน',
      load: () => import('./zh-hsk3').then((m) => m.default),
    },
    {
      lang: 'zh',
      slug: 'hsk4',
      code: 'HSK 4',
      nameTh: 'กลางค่อนสูง',
      examWords: 1200,
      summaryTh: 'สนทนาเรื่องหลากหลายหัวข้อกับเจ้าของภาษาได้คล่องพอสมควร',
      format: [
        { sectionTh: 'การฟัง (听力)', detailTh: '3 ส่วน: ถูก/ผิด, บทสนทนาสั้น, บทสนทนา/เรื่องเล่ายาว', minutes: 30, questions: 45 },
        { sectionTh: 'การอ่าน (阅读)', detailTh: '3 ส่วน: เติมคำ, เรียงประโยค, อ่านแล้วตอบ', minutes: 40, questions: 40 },
        { sectionTh: 'การเขียน (书写)', detailTh: '2 ส่วน: เรียงคำเป็นประโยค, แต่งประโยคจากภาพและคำที่กำหนด', minutes: 25, questions: 15 },
      ],
      passTh: 'เต็ม 300 คะแนน ผ่านที่ 180 คะแนน',
    },
    {
      lang: 'zh',
      slug: 'hsk5',
      code: 'HSK 5',
      nameTh: 'สูง',
      examWords: 2500,
      summaryTh: 'อ่านหนังสือพิมพ์ ดูหนัง และกล่าวสุนทรพจน์ภาษาจีนได้',
      format: [
        { sectionTh: 'การฟัง (听力)', detailTh: '2 ส่วน: บทสนทนาสั้น, บทสนทนาและเรื่องเล่ายาว', minutes: 30, questions: 45 },
        { sectionTh: 'การอ่าน (阅读)', detailTh: '3 ส่วน: เติมคำในบทความ, เลือกใจความ, อ่านบทความยาว', minutes: 45, questions: 45 },
        { sectionTh: 'การเขียน (书写)', detailTh: '2 ส่วน: เรียงคำเป็นประโยค, เขียนเรียงความสั้น 80 ตัวอักษร', minutes: 40, questions: 10 },
      ],
      passTh: 'เต็ม 300 คะแนน ผ่านที่ 180 คะแนน',
    },
    {
      lang: 'zh',
      slug: 'hsk6',
      code: 'HSK 6',
      nameTh: 'สูงมาก',
      examWords: 5000,
      summaryTh: 'เข้าใจข้อมูลที่ได้ยินหรืออ่านได้ง่าย และแสดงความคิดเห็นได้อย่างคล่องแคล่วทั้งพูดและเขียน',
      format: [
        { sectionTh: 'การฟัง (听力)', detailTh: '3 ส่วน: ตัดสินใจความ, สัมภาษณ์, เรื่องเล่ายาว', minutes: 35, questions: 50 },
        { sectionTh: 'การอ่าน (阅读)', detailTh: '4 ส่วน: หาประโยคผิด, เติมคำ, เติมประโยค, อ่านบทความยาว', minutes: 50, questions: 50 },
        { sectionTh: 'การเขียน (书写)', detailTh: 'ย่อความบทความ 1,000 ตัวอักษรให้เหลือราว 400 ตัวอักษร', minutes: 45, questions: 1 },
      ],
      passTh: 'เต็ม 300 คะแนน ผ่านที่ 180 คะแนน',
    },
  ],
}

export const JAPANESE_TRACK: LangTrack = {
  lang: 'ja',
  path: '/japanese',
  flag: '🇯🇵',
  nameTh: 'ภาษาญี่ปุ่น',
  examName: 'JLPT',
  ttsLang: 'ja-JP',
  readingLabel: 'คำอ่าน',
  introTh:
    'เตรียมสอบ JLPT (日本語能力試験) เริ่มจากตัวอักษรฮิรางานะ–คาตาคานะ แล้วต่อด้วยคันจิ คำศัพท์ ไวยากรณ์ และข้อสอบจำลอง 3 ส่วนตามรูปแบบจริง',
  levels: [
    {
      lang: 'ja',
      slug: 'n5',
      code: 'N5',
      nameTh: 'เริ่มต้น',
      examWords: 800,
      summaryTh: 'อ่านประโยคพื้นฐานที่เขียนด้วยฮิรางานะ คาตาคานะ และคันจิพื้นฐาน และฟังบทสนทนาสั้นๆ ช้าๆ ในชีวิตประจำวันได้',
      format: [
        { sectionTh: 'ความรู้ภาษา: ตัวอักษร–คำศัพท์ (文字・語彙)', detailTh: 'อ่านคันจิ, เขียนคำเป็นคันจิ/คาตาคานะ, เลือกคำตามบริบท, คำความหมายใกล้เคียง', minutes: 20, questions: 21 },
        { sectionTh: 'ความรู้ภาษา: ไวยากรณ์ + การอ่าน (文法・読解)', detailTh: 'เลือกรูปไวยากรณ์, เรียงประโยค (★), เติมในบทความ, อ่านเรื่องสั้น/กลาง, หาข้อมูล', minutes: 40, questions: 22 },
        { sectionTh: 'การฟัง (聴解)', detailTh: 'ฟังเพื่อทำงาน, ฟังใจความ, การพูดตามสถานการณ์, ตอบสนองทันที', minutes: 30, questions: 24 },
      ],
      passTh: 'เต็ม 180 คะแนน ผ่านที่ 80 คะแนน และต้องได้ขั้นต่ำ 38/120 ในส่วนความรู้ภาษา+การอ่าน และ 19/60 ในการฟัง',
    },
  ],
}

export const LANG_TRACKS: Record<LangCode, LangTrack> = { zh: CHINESE_TRACK, ja: JAPANESE_TRACK }

export function findLevel(track: LangTrack, slug: string | undefined): LangLevelMeta | undefined {
  return track.levels.find((l) => l.slug === slug)
}
