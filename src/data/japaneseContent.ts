export interface JapaneseVocabWord {
  id: string
  term: string
  romaji: string
  pos: string
  meaningTh: string
  mnemonicTh: string
  exampleJa: string
  exampleRomaji: string
  exampleTh: string
}

export interface JapaneseVocabChapter {
  id: string
  title: string
  titleTh: string
  description: string
  jlptLevel: 'N5'
  words: JapaneseVocabWord[]
}

export const japaneseVocabChapters: JapaneseVocabChapter[] = [
  {
    id: 'ja-basics-1',
    title: 'Everyday Basics',
    titleTh: 'บทที่ 1: คำพื้นฐานในชีวิตประจำวัน',
    description: 'คำทักทาย คำถาม และคำกริยาพื้นฐานที่สุดสำหรับการสื่อสารระดับ JLPT N5',
    jlptLevel: 'N5',
    words: [
      { id: 'ja-1', term: 'こんにちは', romaji: 'konnichiwa', pos: 'phr.', meaningTh: 'สวัสดี (กลางวัน)', mnemonicTh: 'ทักทายตอนกลางวัน ใช้ได้ทั่วไปเกือบทุกสถานการณ์', exampleJa: 'こんにちは、元気ですか。', exampleRomaji: 'Konnichiwa, genki desu ka.', exampleTh: 'สวัสดีครับ สบายดีไหม' },
      { id: 'ja-2', term: 'ありがとう', romaji: 'arigatou', pos: 'phr.', meaningTh: 'ขอบคุณ', mnemonicTh: 'เติม ございます ท้ายคำให้สุภาพขึ้นเป็น ありがとうございます', exampleJa: 'ありがとうございます。', exampleRomaji: 'Arigatou gozaimasu.', exampleTh: 'ขอบคุณมากครับ/ค่ะ' },
      { id: 'ja-3', term: 'すみません', romaji: 'sumimasen', pos: 'phr.', meaningTh: 'ขอโทษ/ขอรบกวน', mnemonicTh: 'ใช้ได้ทั้งขอโทษและเรียกความสนใจ (เช่นเรียกพนักงาน)', exampleJa: 'すみません、トイレはどこですか。', exampleRomaji: 'Sumimasen, toire wa doko desu ka.', exampleTh: 'ขอโทษนะครับ ห้องน้ำอยู่ที่ไหน' },
      { id: 'ja-4', term: 'はい', romaji: 'hai', pos: 'interj.', meaningTh: 'ใช่/ครับ/ค่ะ', mnemonicTh: 'คำตอบรับที่ใช้บ่อยที่สุด', exampleJa: 'はい、そうです。', exampleRomaji: 'Hai, sou desu.', exampleTh: 'ใช่ครับ ถูกต้อง' },
      { id: 'ja-5', term: 'いいえ', romaji: 'iie', pos: 'interj.', meaningTh: 'ไม่ใช่', mnemonicTh: 'คำปฏิเสธสุภาพ ตรงข้ามกับ はい', exampleJa: 'いいえ、違います。', exampleRomaji: 'Iie, chigaimasu.', exampleTh: 'ไม่ใช่ครับ ผิด' },
      { id: 'ja-6', term: 'わたし', romaji: 'watashi', pos: 'pron.', meaningTh: 'ฉัน/ผม/ดิฉัน', mnemonicTh: 'สรรพนามบุรุษที่ 1 ใช้ได้ทั้งชายและหญิงอย่างสุภาพ', exampleJa: 'わたしは学生です。', exampleRomaji: 'Watashi wa gakusei desu.', exampleTh: 'ฉันเป็นนักเรียน' },
      { id: 'ja-7', term: 'あなた', romaji: 'anata', pos: 'pron.', meaningTh: 'คุณ', mnemonicTh: 'สรรพนามบุรุษที่ 2 แต่คนญี่ปุ่นมักเรียกชื่อแทน', exampleJa: 'あなたの名前は何ですか。', exampleRomaji: 'Anata no namae wa nan desu ka.', exampleTh: 'คุณชื่ออะไร' },
      { id: 'ja-8', term: 'これ', romaji: 'kore', pos: 'pron.', meaningTh: 'นี่/อันนี้', mnemonicTh: 'ใช้ชี้สิ่งของที่อยู่ใกล้ผู้พูด', exampleJa: 'これはわたしの本です。', exampleRomaji: 'Kore wa watashi no hon desu.', exampleTh: 'นี่คือหนังสือของฉัน' },
      { id: 'ja-9', term: 'それ', romaji: 'sore', pos: 'pron.', meaningTh: 'นั่น/อันนั้น', mnemonicTh: 'ใช้ชี้สิ่งของที่อยู่ใกล้ผู้ฟัง', exampleJa: 'それはいくらですか。', exampleRomaji: 'Sore wa ikura desu ka.', exampleTh: 'นั่นราคาเท่าไหร่' },
      { id: 'ja-10', term: 'あれ', romaji: 'are', pos: 'pron.', meaningTh: 'โน่น/อันโน้น', mnemonicTh: 'ใช้ชี้สิ่งของที่อยู่ไกลทั้งผู้พูดและผู้ฟัง', exampleJa: 'あれはたかしさんの車です。', exampleRomaji: 'Are wa Takashi-san no kuruma desu.', exampleTh: 'โน่นคือรถของคุณทาคาชิ' },
      { id: 'ja-11', term: 'なん / なに', romaji: 'nan / nani', pos: 'pron.', meaningTh: 'อะไร', mnemonicTh: 'อ่านว่า nan หน้าคำช่วย です/の แต่อ่านว่า nani ในที่อื่น', exampleJa: 'これは何ですか。', exampleRomaji: 'Kore wa nan desu ka.', exampleTh: 'นี่คืออะไร' },
      { id: 'ja-12', term: 'だれ', romaji: 'dare', pos: 'pron.', meaningTh: 'ใคร', mnemonicTh: 'คำถามเกี่ยวกับบุคคล', exampleJa: 'あの人は誰ですか。', exampleRomaji: 'Ano hito wa dare desu ka.', exampleTh: 'คนนั้นคือใคร' },
      { id: 'ja-13', term: 'どこ', romaji: 'doko', pos: 'pron.', meaningTh: 'ที่ไหน', mnemonicTh: 'คำถามเกี่ยวกับสถานที่', exampleJa: '駅はどこですか。', exampleRomaji: 'Eki wa doko desu ka.', exampleTh: 'สถานีอยู่ที่ไหน' },
      { id: 'ja-14', term: 'きょう', romaji: 'kyou', pos: 'n.', meaningTh: 'วันนี้', mnemonicTh: 'คำบอกเวลาที่ใช้บ่อยที่สุด', exampleJa: 'きょうは晴れです。', exampleRomaji: 'Kyou wa hare desu.', exampleTh: 'วันนี้อากาศแจ่มใส' },
      { id: 'ja-15', term: 'あした', romaji: 'ashita', pos: 'n.', meaningTh: 'พรุ่งนี้', mnemonicTh: 'คำบอกเวลาในอนาคตใกล้ที่สุด', exampleJa: 'あした、学校へ行きます。', exampleRomaji: 'Ashita, gakkou e ikimasu.', exampleTh: 'พรุ่งนี้ฉันจะไปโรงเรียน' },
      { id: 'ja-16', term: 'いま', romaji: 'ima', pos: 'n.', meaningTh: 'ตอนนี้', mnemonicTh: 'คำบอกเวลาปัจจุบัน', exampleJa: 'いま、何時ですか。', exampleRomaji: 'Ima, nanji desu ka.', exampleTh: 'ตอนนี้กี่โมง' },
      { id: 'ja-17', term: 'せんせい', romaji: 'sensei', pos: 'n.', meaningTh: 'ครู/อาจารย์', mnemonicTh: '先 (ก่อน) + 生 (เกิด/ชีวิต) = ผู้ที่เกิดก่อน มีประสบการณ์มากกว่า', exampleJa: '田中先生は親切です。', exampleRomaji: 'Tanaka-sensei wa shinsetsu desu.', exampleTh: 'อาจารย์ทานากะใจดี' },
      { id: 'ja-18', term: 'がくせい', romaji: 'gakusei', pos: 'n.', meaningTh: 'นักเรียน/นักศึกษา', mnemonicTh: '学 (เรียน) + 生 (คน) = คนที่เรียนหนังสือ', exampleJa: '彼は大学生です。', exampleRomaji: 'Kare wa daigakusei desu.', exampleTh: 'เขาเป็นนักศึกษามหาวิทยาลัย' },
      { id: 'ja-19', term: 'ともだち', romaji: 'tomodachi', pos: 'n.', meaningTh: 'เพื่อน', mnemonicTh: 'คำพื้นฐานที่ใช้บ่อยในชีวิตประจำวัน', exampleJa: '彼女はわたしの友達です。', exampleRomaji: 'Kanojo wa watashi no tomodachi desu.', exampleTh: 'เธอเป็นเพื่อนของฉัน' },
      { id: 'ja-20', term: 'いえ', romaji: 'ie', pos: 'n.', meaningTh: 'บ้าน', mnemonicTh: 'คำสั้นๆ พื้นฐานที่สุดสำหรับคำว่าบ้าน', exampleJa: 'わたしの家は駅の近くです。', exampleRomaji: 'Watashi no ie wa eki no chikaku desu.', exampleTh: 'บ้านฉันอยู่ใกล้สถานี' },
      { id: 'ja-21', term: 'すき', romaji: 'suki', pos: 'adj.', meaningTh: 'ชอบ', mnemonicTh: 'คำคุณศัพท์-นะ (な形容詞) ใช้บ่อยที่สุดคำหนึ่ง', exampleJa: 'わたしは音楽が好きです。', exampleRomaji: 'Watashi wa ongaku ga suki desu.', exampleTh: 'ฉันชอบดนตรี' },
      { id: 'ja-22', term: 'いく', romaji: 'iku', pos: 'v.', meaningTh: 'ไป', mnemonicTh: 'กริยากลุ่ม 1 พื้นฐาน ตรงข้ามกับ 来る (kuru)', exampleJa: '学校へ行きます。', exampleRomaji: 'Gakkou e ikimasu.', exampleTh: 'ฉันไปโรงเรียน' },
      { id: 'ja-23', term: 'くる', romaji: 'kuru', pos: 'v.', meaningTh: 'มา', mnemonicTh: 'กริยาผิดกฎพื้นฐาน ตรงข้ามกับ 行く (iku)', exampleJa: '友達が家に来ます。', exampleRomaji: 'Tomodachi ga ie ni kimasu.', exampleTh: 'เพื่อนจะมาที่บ้าน' },
      { id: 'ja-24', term: 'たべる', romaji: 'taberu', pos: 'v.', meaningTh: 'กิน', mnemonicTh: 'กริยากลุ่ม 2 พื้นฐาน รูปสุภาพคือ たべます', exampleJa: '朝ご飯を食べます。', exampleRomaji: 'Asagohan o tabemasu.', exampleTh: 'ฉันกินข้าวเช้า' },
      { id: 'ja-25', term: 'のむ', romaji: 'nomu', pos: 'v.', meaningTh: 'ดื่ม', mnemonicTh: 'กริยากลุ่ม 1 พื้นฐาน ใช้กับน้ำ ยา และเครื่องดื่มทุกชนิด', exampleJa: 'お茶を飲みます。', exampleRomaji: 'Ocha o nomimasu.', exampleTh: 'ฉันดื่มชา' },
      { id: 'ja-26', term: 'みる', romaji: 'miru', pos: 'v.', meaningTh: 'ดู', mnemonicTh: 'กริยากลุ่ม 2 พื้นฐาน ใช้กับทีวี หนัง และการมองเห็นทั่วไป', exampleJa: 'テレビを見ます。', exampleRomaji: 'Terebi o mimasu.', exampleTh: 'ฉันดูโทรทัศน์' },
      { id: 'ja-27', term: 'きく', romaji: 'kiku', pos: 'v.', meaningTh: 'ฟัง/ถาม', mnemonicTh: 'กริยากลุ่ม 1 ที่มีสองความหมาย: ฟัง และ ถาม', exampleJa: '音楽を聞きます。', exampleRomaji: 'Ongaku o kikimasu.', exampleTh: 'ฉันฟังเพลง' },
      { id: 'ja-28', term: 'はなす', romaji: 'hanasu', pos: 'v.', meaningTh: 'พูด', mnemonicTh: 'กริยากลุ่ม 1 พื้นฐาน ใช้พูดถึงการสนทนา', exampleJa: '日本語を話します。', exampleRomaji: 'Nihongo o hanashimasu.', exampleTh: 'ฉันพูดภาษาญี่ปุ่น' },
      { id: 'ja-29', term: 'いい', romaji: 'ii', pos: 'adj.', meaningTh: 'ดี', mnemonicTh: 'คำคุณศัพท์-อิ (い形容詞) ที่ใช้บ่อยที่สุด รูปปฏิเสธคือ よくない', exampleJa: 'この店はいいです。', exampleRomaji: 'Kono mise wa ii desu.', exampleTh: 'ร้านนี้ดี' },
      { id: 'ja-30', term: 'ひとつ', romaji: 'hitotsu', pos: 'n.', meaningTh: 'หนึ่งชิ้น/อย่างหนึ่ง', mnemonicTh: 'ตัวเลขนับของแบบญี่ปุ่นดั้งเดิม (ひとつ ふたつ みっつ...)', exampleJa: 'りんごを一つください。', exampleRomaji: 'Ringo o hitotsu kudasai.', exampleTh: 'ขอแอปเปิลหนึ่งลูกค่ะ' },
    ],
  },
]

export interface JapaneseGrammarQuestion {
  id: string
  sentence: string
  choices: string[]
  answerIndex: number
  explanation: string
}

export interface JapaneseGrammarTopic {
  id: string
  title: string
  titleTh: string
  description: string
  introTh: string
  keyPoints: { label: string; explanation: string; exampleJa: string; exampleRomaji: string; exampleTh: string }[]
  questions: JapaneseGrammarQuestion[]
}

export const japaneseGrammarTopics: JapaneseGrammarTopic[] = [
  {
    id: 'ja-particles-basics',
    title: 'Basic Particles & Sentence Structure',
    titleTh: 'คำช่วยพื้นฐานและโครงสร้างประโยค',
    description: 'การใช้ は/が/を และลำดับคำแบบ ประธาน+กรรม+กริยา',
    introTh: 'ภาษาญี่ปุ่นเรียงประโยคแบบ "ประธาน + กรรม + กริยา" (กริยาอยู่ท้ายประโยคเสมอ) และใช้ "คำช่วย" (助詞) ติดท้ายคำเพื่อบอกหน้าที่ของคำนั้นในประโยค',
    keyPoints: [
      {
        label: 'โครงสร้าง S + O + V (กริยาอยู่ท้ายประโยค)',
        explanation: 'ต่างจากภาษาไทย/อังกฤษที่กริยาอยู่กลางประโยค ภาษาญี่ปุ่นกริยาต้องอยู่ท้ายประโยคเสมอ',
        exampleJa: 'わたしはすしを食べます。',
        exampleRomaji: 'Watashi wa sushi o tabemasu.',
        exampleTh: 'ฉันกินซูชิ (ฉัน=ประธาน, ซูชิ=กรรม, กิน=กริยาอยู่ท้ายสุด)',
      },
      {
        label: 'は (wa) บอกหัวข้อของประโยค',
        explanation: 'は ติดหลังคำที่เป็น "หัวข้อ" ของประโยค อ่านว่า wa ไม่ใช่ ha',
        exampleJa: 'わたしは学生です。',
        exampleRomaji: 'Watashi wa gakusei desu.',
        exampleTh: 'ฉัน(หัวข้อ)เป็นนักเรียน',
      },
      {
        label: 'を (o) บอกกรรมตรงของกริยา',
        explanation: 'を ติดหลังคำนามที่เป็นกรรมที่ถูกกระทำโดยกริยา',
        exampleJa: '本を読みます。',
        exampleRomaji: 'Hon o yomimasu.',
        exampleTh: 'อ่านหนังสือ (หนังสือ=กรรม ถูกอ่าน)',
      },
      {
        label: 'が (ga) บอกประธานที่เน้นหรือกับคำบอกความรู้สึก',
        explanation: 'が มักใช้กับประธานของประโยคที่เน้นข้อมูลใหม่ หรือคู่กับคำคุณศัพท์ เช่น 好き (ชอบ)',
        exampleJa: 'わたしは音楽が好きです。',
        exampleRomaji: 'Watashi wa ongaku ga suki desu.',
        exampleTh: 'ฉันชอบดนตรี (ดนตรี=สิ่งที่ถูกชอบ ใช้ が)',
      },
    ],
    questions: [
      { id: 'ja-g1', sentence: 'わたし ___ 学生です。(ฉันเป็นนักเรียน)', choices: ['は', 'を', 'が', 'に'], answerIndex: 0, explanation: 'は ใช้บอกหัวข้อของประโยค อ่านว่า "wa"' },
      { id: 'ja-g2', sentence: '本 ___ 読みます。(อ่านหนังสือ)', choices: ['は', 'を', 'が', 'の'], answerIndex: 1, explanation: 'を ใช้บอกกรรมตรงที่ถูกกริยากระทำ' },
      { id: 'ja-g3', sentence: 'わたしは音楽 ___ 好きです。(ฉันชอบดนตรี)', choices: ['は', 'を', 'が', 'も'], answerIndex: 2, explanation: 'が ใช้คู่กับคำคุณศัพท์แสดงความรู้สึกอย่าง 好き (ชอบ)' },
      { id: 'ja-g4', sentence: 'เรียงประโยค "ฉันกินซูชิ" ให้ถูกต้องตามไวยากรณ์ญี่ปุ่น', choices: ['わたしはすしを食べます', 'わたしは食べますすしを', '食べますわたしはすしを', 'すしはわたしを食べます'], answerIndex: 0, explanation: 'โครงสร้าง S+O+V: わたしは(S) すしを(O) 食べます(V อยู่ท้ายสุด)' },
      { id: 'ja-g5', sentence: '駅 ___ どこですか。(สถานีอยู่ที่ไหน)', choices: ['は', 'を', 'が', 'か'], answerIndex: 0, explanation: 'は ใช้บอกว่า "สถานี" เป็นหัวข้อที่กำลังถามถึง' },
    ],
  },
]
