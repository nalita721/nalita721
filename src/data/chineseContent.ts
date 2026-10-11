export interface ChineseVocabWord {
  id: string
  hanzi: string
  pinyin: string
  pos: string
  meaningTh: string
  mnemonicTh: string
  exampleZh: string
  examplePinyin: string
  exampleTh: string
}

export interface ChineseVocabChapter {
  id: string
  title: string
  titleTh: string
  description: string
  hskLevel: 'HSK 1'
  words: ChineseVocabWord[]
}

export const chineseVocabChapters: ChineseVocabChapter[] = [
  {
    id: 'zh-basics-1',
    title: 'Everyday Basics',
    titleTh: 'บทที่ 1: คำพื้นฐานในชีวิตประจำวัน',
    description: 'คำทักทาย คำถาม และคำกริยาพื้นฐานที่สุดสำหรับการสื่อสารระดับ HSK 1',
    hskLevel: 'HSK 1',
    words: [
      { id: 'zh-1', hanzi: '你好', pinyin: 'nǐ hǎo', pos: 'phr.', meaningTh: 'สวัสดี', mnemonicTh: '你 (คุณ) + 好 (ดี) = ขอให้คุณดี เป็นคำทักทาย', exampleZh: '你好，我叫小明。', examplePinyin: 'Nǐ hǎo, wǒ jiào Xiǎomíng.', exampleTh: 'สวัสดีครับ ผมชื่อเสี่ยวหมิง' },
      { id: 'zh-2', hanzi: '谢谢', pinyin: 'xièxie', pos: 'v.', meaningTh: 'ขอบคุณ', mnemonicTh: 'พูดซ้ำสองครั้ง "เซี่ย เซี่ย" ฟังดูนุ่มนวลเหมือนขอบคุณจริงใจ', exampleZh: '谢谢你的帮助。', examplePinyin: 'Xièxie nǐ de bāngzhù.', exampleTh: 'ขอบคุณสำหรับความช่วยเหลือ' },
      { id: 'zh-3', hanzi: '对不起', pinyin: 'duìbuqǐ', pos: 'phr.', meaningTh: 'ขอโทษ', mnemonicTh: '对 (ถูกต้อง) + 不起 (ทำไม่ได้) = ทำสิ่งที่ไม่ถูกต้อง จึงขอโทษ', exampleZh: '对不起，我来晚了。', examplePinyin: 'Duìbuqǐ, wǒ lái wǎn le.', exampleTh: 'ขอโทษค่ะ ฉันมาสาย' },
      { id: 'zh-4', hanzi: '没关系', pinyin: 'méi guānxi', pos: 'phr.', meaningTh: 'ไม่เป็นไร', mnemonicTh: '没 (ไม่มี) + 关系 (ความเกี่ยวข้อง) = ไม่มีผลกระทบ ไม่เป็นไร', exampleZh: '没关系，不用担心。', examplePinyin: 'Méi guānxi, búyòng dānxīn.', exampleTh: 'ไม่เป็นไร ไม่ต้องกังวล' },
      { id: 'zh-5', hanzi: '是', pinyin: 'shì', pos: 'v.', meaningTh: 'คือ/ใช่', mnemonicTh: 'คำกริยาเชื่อมที่ใช้บ่อยที่สุดในภาษาจีน แปลว่า "เป็น/คือ"', exampleZh: '我是老师。', examplePinyin: 'Wǒ shì lǎoshī.', exampleTh: 'ฉันเป็นครู' },
      { id: 'zh-6', hanzi: '不', pinyin: 'bù', pos: 'adv.', meaningTh: 'ไม่', mnemonicTh: 'คำปฏิเสธพื้นฐานที่สุด วางหน้ากริยาหรือคุณศัพท์', exampleZh: '我不是学生。', examplePinyin: 'Wǒ bú shì xuésheng.', exampleTh: 'ฉันไม่ใช่นักเรียน' },
      { id: 'zh-7', hanzi: '我', pinyin: 'wǒ', pos: 'pron.', meaningTh: 'ฉัน/ผม/ดิฉัน', mnemonicTh: 'สรรพนามบุรุษที่ 1 ที่พบบ่อยที่สุด', exampleZh: '我喜欢中国菜。', examplePinyin: 'Wǒ xǐhuan Zhōngguó cài.', exampleTh: 'ฉันชอบอาหารจีน' },
      { id: 'zh-8', hanzi: '你', pinyin: 'nǐ', pos: 'pron.', meaningTh: 'คุณ/เธอ', mnemonicTh: 'สรรพนามบุรุษที่ 2 เติม 们 เป็น 你们 แปลว่า "พวกคุณ"', exampleZh: '你叫什么名字？', examplePinyin: 'Nǐ jiào shénme míngzi?', exampleTh: 'คุณชื่ออะไร' },
      { id: 'zh-9', hanzi: '他', pinyin: 'tā', pos: 'pron.', meaningTh: 'เขา(ผู้ชาย)', mnemonicTh: 'ตัวอักษรมีส่วน 人 (คน) อยู่ด้านซ้าย สื่อถึงบุรุษที่ 3', exampleZh: '他是我的朋友。', examplePinyin: 'Tā shì wǒ de péngyou.', exampleTh: 'เขาเป็นเพื่อนของฉัน' },
      { id: 'zh-10', hanzi: '她', pinyin: 'tā', pos: 'pron.', meaningTh: 'เขา(ผู้หญิง)', mnemonicTh: 'ออกเสียงเหมือน 他 แต่ส่วนซ้ายเป็น 女 (ผู้หญิง)', exampleZh: '她是我的老师。', examplePinyin: 'Tā shì wǒ de lǎoshī.', exampleTh: 'เขา(ผู้หญิง)เป็นครูของฉัน' },
      { id: 'zh-11', hanzi: '这', pinyin: 'zhè', pos: 'pron.', meaningTh: 'นี่/อันนี้', mnemonicTh: 'ใช้ชี้สิ่งของที่อยู่ใกล้ตัวผู้พูด', exampleZh: '这是我的书。', examplePinyin: 'Zhè shì wǒ de shū.', exampleTh: 'นี่คือหนังสือของฉัน' },
      { id: 'zh-12', hanzi: '那', pinyin: 'nà', pos: 'pron.', meaningTh: 'นั่น/อันนั้น', mnemonicTh: 'ใช้ชี้สิ่งของที่อยู่ไกลตัวผู้พูด ตรงข้ามกับ 这', exampleZh: '那是你的手机吗？', examplePinyin: 'Nà shì nǐ de shǒujī ma?', exampleTh: 'นั่นโทรศัพท์ของคุณใช่ไหม' },
      { id: 'zh-13', hanzi: '什么', pinyin: 'shénme', pos: 'pron.', meaningTh: 'อะไร', mnemonicTh: 'คำถามที่ใช้บ่อยที่สุด วางแทนที่คำที่ต้องการถาม', exampleZh: '你喜欢吃什么？', examplePinyin: 'Nǐ xǐhuan chī shénme?', exampleTh: 'คุณชอบกินอะไร' },
      { id: 'zh-14', hanzi: '谁', pinyin: 'shéi', pos: 'pron.', meaningTh: 'ใคร', mnemonicTh: 'คำถามเกี่ยวกับบุคคล มีส่วน 言 (คำพูด) ด้านซ้าย', exampleZh: '那个人是谁？', examplePinyin: 'Nàge rén shì shéi?', exampleTh: 'คนนั้นคือใคร' },
      { id: 'zh-15', hanzi: '哪里', pinyin: 'nǎlǐ', pos: 'pron.', meaningTh: 'ที่ไหน', mnemonicTh: '哪 (อัน/ที่ไหน) + 里 (ข้างใน) = ถามสถานที่', exampleZh: '你家在哪里？', examplePinyin: 'Nǐ jiā zài nǎlǐ?', exampleTh: 'บ้านคุณอยู่ที่ไหน' },
      { id: 'zh-16', hanzi: '今天', pinyin: 'jīntiān', pos: 'n.', meaningTh: 'วันนี้', mnemonicTh: '今 (ปัจจุบัน) + 天 (วัน) = วันนี้', exampleZh: '今天天气很好。', examplePinyin: 'Jīntiān tiānqì hěn hǎo.', exampleTh: 'วันนี้อากาศดีมาก' },
      { id: 'zh-17', hanzi: '明天', pinyin: 'míngtiān', pos: 'n.', meaningTh: 'พรุ่งนี้', mnemonicTh: '明 (สว่าง/ถัดไป) + 天 (วัน) = วันถัดไป', exampleZh: '明天我要去上班。', examplePinyin: 'Míngtiān wǒ yào qù shàngbān.', exampleTh: 'พรุ่งนี้ฉันต้องไปทำงาน' },
      { id: 'zh-18', hanzi: '现在', pinyin: 'xiànzài', pos: 'n.', meaningTh: 'ตอนนี้', mnemonicTh: '现 (ปัจจุบัน) + 在 (อยู่) = เวลาที่กำลังเป็นอยู่', exampleZh: '现在几点？', examplePinyin: 'Xiànzài jǐ diǎn?', exampleTh: 'ตอนนี้กี่โมง' },
      { id: 'zh-19', hanzi: '老师', pinyin: 'lǎoshī', pos: 'n.', meaningTh: 'ครู/อาจารย์', mnemonicTh: '老 (เก่า/ผู้มีประสบการณ์) + 师 (ผู้เชี่ยวชาญ) = ครู', exampleZh: '王老师教我们汉语。', examplePinyin: 'Wáng lǎoshī jiāo wǒmen Hànyǔ.', exampleTh: 'อาจารย์หวังสอนภาษาจีนให้พวกเรา' },
      { id: 'zh-20', hanzi: '学生', pinyin: 'xuésheng', pos: 'n.', meaningTh: 'นักเรียน/นักศึกษา', mnemonicTh: '学 (เรียน) + 生 (คน) = คนที่เรียนหนังสือ', exampleZh: '他是大学生。', examplePinyin: 'Tā shì dàxuéshēng.', exampleTh: 'เขาเป็นนักศึกษามหาวิทยาลัย' },
      { id: 'zh-21', hanzi: '朋友', pinyin: 'péngyou', pos: 'n.', meaningTh: 'เพื่อน', mnemonicTh: '朋 (เพื่อน) + 友 (มิตร) = เพื่อนสนิท', exampleZh: '她是我最好的朋友。', examplePinyin: 'Tā shì wǒ zuì hǎo de péngyou.', exampleTh: 'เธอเป็นเพื่อนที่ดีที่สุดของฉัน' },
      { id: 'zh-22', hanzi: '家', pinyin: 'jiā', pos: 'n.', meaningTh: 'บ้าน/ครอบครัว', mnemonicTh: 'ตัวอักษรมีหลังคา (宀) คลุมอยู่ด้านบน สื่อถึงบ้าน', exampleZh: '我家有四个人。', examplePinyin: 'Wǒ jiā yǒu sì gè rén.', exampleTh: 'ครอบครัวฉันมีสี่คน' },
      { id: 'zh-23', hanzi: '喜欢', pinyin: 'xǐhuan', pos: 'v.', meaningTh: 'ชอบ', mnemonicTh: '喜 (ยินดี) + 欢 (สนุกสนาน) = รู้สึกยินดีกับสิ่งนั้น', exampleZh: '我喜欢听音乐。', examplePinyin: 'Wǒ xǐhuan tīng yīnyuè.', exampleTh: 'ฉันชอบฟังเพลง' },
      { id: 'zh-24', hanzi: '去', pinyin: 'qù', pos: 'v.', meaningTh: 'ไป', mnemonicTh: 'คำกริยาเคลื่อนไหวพื้นฐาน ตรงข้ามกับ 来 (มา)', exampleZh: '我们去公园吧。', examplePinyin: 'Wǒmen qù gōngyuán ba.', exampleTh: 'พวกเราไปสวนสาธารณะกันเถอะ' },
      { id: 'zh-25', hanzi: '来', pinyin: 'lái', pos: 'v.', meaningTh: 'มา', mnemonicTh: 'คำกริยาเคลื่อนไหวพื้นฐาน ตรงข้ามกับ 去 (ไป)', exampleZh: '请你过来。', examplePinyin: 'Qǐng nǐ guòlái.', exampleTh: 'กรุณามาทางนี้' },
      { id: 'zh-26', hanzi: '吃', pinyin: 'chī', pos: 'v.', meaningTh: 'กิน', mnemonicTh: 'มีส่วน 口 (ปาก) อยู่ด้านซ้าย สื่อถึงการใช้ปากกิน', exampleZh: '你吃饭了吗？', examplePinyin: 'Nǐ chī fàn le ma?', exampleTh: 'คุณกินข้าวหรือยัง' },
      { id: 'zh-27', hanzi: '喝', pinyin: 'hē', pos: 'v.', meaningTh: 'ดื่ม', mnemonicTh: 'มีส่วน 口 (ปาก) อยู่ด้านซ้ายเช่นกัน สื่อถึงการดื่ม', exampleZh: '我想喝水。', examplePinyin: 'Wǒ xiǎng hē shuǐ.', exampleTh: 'ฉันอยากดื่มน้ำ' },
      { id: 'zh-28', hanzi: '看', pinyin: 'kàn', pos: 'v.', meaningTh: 'ดู', mnemonicTh: 'มีส่วน 目 (ตา) อยู่ด้านล่าง สื่อถึงการมองดู', exampleZh: '我喜欢看电影。', examplePinyin: 'Wǒ xǐhuan kàn diànyǐng.', exampleTh: 'ฉันชอบดูหนัง' },
      { id: 'zh-29', hanzi: '说', pinyin: 'shuō', pos: 'v.', meaningTh: 'พูด', mnemonicTh: 'มีส่วน 言 (คำพูด) อยู่ด้านซ้าย สื่อถึงการพูด', exampleZh: '你会说英语吗？', examplePinyin: 'Nǐ huì shuō Yīngyǔ ma?', exampleTh: 'คุณพูดภาษาอังกฤษได้ไหม' },
      { id: 'zh-30', hanzi: '好', pinyin: 'hǎo', pos: 'adj.', meaningTh: 'ดี', mnemonicTh: '女 (ผู้หญิง) + 子 (ลูก) = แม่ลูกอยู่ด้วยกันคือภาพของความดีงาม', exampleZh: '这个菜很好吃。', examplePinyin: 'Zhège cài hěn hǎochī.', exampleTh: 'กับข้าวจานนี้อร่อยมาก' },
    ],
  },
]

export interface ChineseGrammarQuestion {
  id: string
  sentence: string
  choices: string[]
  answerIndex: number
  explanation: string
}

export interface ChineseGrammarTopic {
  id: string
  title: string
  titleTh: string
  description: string
  introTh: string
  keyPoints: { label: string; explanation: string; exampleZh: string; examplePinyin: string; exampleTh: string }[]
  questions: ChineseGrammarQuestion[]
}

export const chineseGrammarTopics: ChineseGrammarTopic[] = [
  {
    id: 'zh-sentence-basics',
    title: 'Basic Sentence Structure',
    titleTh: 'โครงสร้างประโยคพื้นฐาน',
    description: 'ลำดับคำแบบ主语+谓语+宾语 (ประธาน+กริยา+กรรม) และการใช้ 是/的',
    introTh: 'ภาษาจีนเรียงประโยคแบบ "ประธาน + กริยา + กรรม" เหมือนภาษาอังกฤษ ไม่ผันคำตามกาล/บุรุษ ทำให้เรียนไวยากรณ์พื้นฐานได้เร็ว',
    keyPoints: [
      {
        label: 'โครงสร้าง S + V + O',
        explanation: 'เรียงประธานก่อน ตามด้วยกริยา แล้วตามด้วยกรรม เหมือนภาษาอังกฤษ',
        exampleZh: '我喜欢中国菜。',
        examplePinyin: 'Wǒ xǐhuan Zhōngguó cài.',
        exampleTh: 'ฉันชอบอาหารจีน (ฉัน=ประธาน, ชอบ=กริยา, อาหารจีน=กรรม)',
      },
      {
        label: '是 (shì) ใช้เชื่อมคำนามสองคำ',
        explanation: '是 แปลว่า "เป็น/คือ" ใช้เชื่อมประธานกับคำนามที่บอกว่าประธานคืออะไร ปฏิเสธด้วย 不是',
        exampleZh: '他是老师，不是学生。',
        examplePinyin: 'Tā shì lǎoshī, bú shì xuésheng.',
        exampleTh: 'เขาเป็นครู ไม่ใช่นักเรียน',
      },
      {
        label: '的 (de) แสดงความเป็นเจ้าของ',
        explanation: '的 วางระหว่างเจ้าของกับสิ่งของ คล้าย apostrophe-s ในภาษาอังกฤษ',
        exampleZh: '这是我的书。',
        examplePinyin: 'Zhè shì wǒ de shū.',
        exampleTh: 'นี่คือหนังสือของฉัน',
      },
    ],
    questions: [
      { id: 'zh-g1', sentence: '我 ___ 老师。(ฉันเป็นครู)', choices: ['是', '的', '不', '去'], answerIndex: 0, explanation: '是 ใช้เชื่อมประธานกับคำนาม แปลว่า "เป็น/คือ"' },
      { id: 'zh-g2', sentence: '这是我 ___ 朋友。(นี่คือเพื่อนของฉัน)', choices: ['是', '的', '不', '喝'], answerIndex: 1, explanation: '的 ใช้แสดงความเป็นเจ้าของ วางระหว่างเจ้าของกับคำนาม' },
      { id: 'zh-g3', sentence: '他 ___ 是学生，他是老师。(เขาไม่ใช่นักเรียน เขาเป็นครู)', choices: ['是', '的', '不', '去'], answerIndex: 2, explanation: '不 วางหน้า 是 เพื่อปฏิเสธ กลายเป็น 不是' },
      { id: 'zh-g4', sentence: 'เรียงประโยค "ฉันชอบดูหนัง" ให้ถูกต้อง', choices: ['我喜欢看电影', '电影喜欢我看', '看我喜欢电影', '喜欢我看电影'], answerIndex: 0, explanation: 'โครงสร้าง S+V+O: 我(S) 喜欢(V) 看电影(O ที่เป็นกริยาวลี)' },
      { id: 'zh-g5', sentence: '那 ___ 你的手机吗？(นั่นโทรศัพท์ของคุณใช่ไหม)', choices: ['是', '的', '不', '来'], answerIndex: 0, explanation: '是 ใช้ถามว่าสิ่งนั้นคืออะไร มักจบประโยคคำถามด้วย 吗' },
    ],
  },
]
