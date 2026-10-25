import type { ChineseFoundations, PinyinDrillItem, PinyinSound } from '../../lib/langTypes'

/**
 * Chinese foundations — pinyin (initials, finals, tones, tone sandhi), a listening drill,
 * basic strokes, stroke-order rules and high-frequency radicals.
 *
 * Audio is browser TTS (zh-CN) reading the `hanzi` field, so every demo character is a common
 * character whose standard reading is exactly the given pinyin.
 */

function s(pinyin: string, thai: string, hanzi: string, example: string, noteTh?: string): PinyinSound {
  return noteTh ? { pinyin, thai, hanzi, example, noteTh } : { pinyin, thai, hanzi, example }
}

function d(
  hanzi: string,
  pinyin: string,
  tone: 1 | 2 | 3 | 4,
  confusables: string[],
  meaningTh: string,
): PinyinDrillItem {
  return { hanzi, pinyin, tone, confusables, meaningTh }
}

export const zhFoundations: ChineseFoundations = {
  introTh:
    'พินอิน (拼音 pīnyīn) คือระบบเขียนเสียงภาษาจีนกลางด้วยอักษรโรมัน ตัวอักษรจีนไม่ได้บอกเสียงอ่านในตัว ' +
    'ดังนั้นพินอินจึงเป็นกุญแจดอกแรก ใช้ทั้งเปิดพจนานุกรม พิมพ์จีนบนมือถือ และอ่านคำศัพท์ HSK ทุกระดับ ' +
    'แต่ละพยางค์มี 3 ส่วน: พยัญชนะต้น (声母) + สระ (韵母) + วรรณยุกต์ (声调) ' +
    'ระวัง: ตัวอักษรโรมันในพินอินไม่ได้ออกเสียงแบบภาษาอังกฤษเสมอ เช่น q ออกเสียงคล้าย ช และ x คล้าย ซ ' +
    'บทนี้เรียงจากพยัญชนะต้น → สระ → วรรณยุกต์ 4 เสียง + เสียงเบา → กฎเปลี่ยนเสียง → ฝึกฟัง ' +
    'แล้วต่อด้วยขีดพื้นฐาน ลำดับการเขียน และหมวดนำ (部首) ที่ใช้บ่อย กดที่ตัวอักษรจีนเพื่อฟังเสียงจริงได้ทุกจุด',

  initials: [
    {
      titleTh: 'กลุ่มริมฝีปาก b p m f',
      sounds: [
        s('b', 'ป (ไม่พ่นลม)', '八', 'bā', 'ไม่ใช่ บ แบบไทย — เป็นเสียง ป ที่ไม่มีลมพ่นออกมา'),
        s('p', 'พ (พ่นลม)', '爬', 'pá', 'ถือกระดาษไว้หน้าปาก ออกเสียง p แล้วกระดาษต้องไหว'),
        s('m', 'ม', '妈', 'mā'),
        s('f', 'ฟ', '飞', 'fēi'),
      ],
    },
    {
      titleTh: 'กลุ่มปลายลิ้น d t n l',
      sounds: [
        s('d', 'ต (ไม่พ่นลม)', '大', 'dà', 'ไม่ใช่ ด แบบไทย — เป็นเสียง ต ไม่พ่นลม'),
        s('t', 'ท (พ่นลม)', '他', 'tā'),
        s('n', 'น', '你', 'nǐ'),
        s('l', 'ล', '来', 'lái'),
      ],
    },
    {
      titleTh: 'กลุ่มโคนลิ้น g k h',
      sounds: [
        s('g', 'ก (ไม่พ่นลม)', '哥', 'gē'),
        s('k', 'ค (พ่นลม)', '口', 'kǒu'),
        s('h', 'ฮ (ขูดลำคอเล็กน้อย)', '黑', 'hēi', 'เสียงออกจากลำคอ หนักกว่า ฮ ไทยเล็กน้อย คล้าย ch ในภาษาเยอรมันแต่เบากว่า'),
      ],
    },
    {
      titleTh: 'กลุ่มลิ้นแบน (เพดานแข็ง) j q x',
      sounds: [
        s('j', 'จ (ไม่พ่นลม)', '鸡', 'jī', 'ปลายลิ้นแตะหลังฟันล่าง ริมฝีปากยิ้ม — ต่างจาก zh ที่ม้วนลิ้น'),
        s('q', 'ช (พ่นลม)', '七', 'qī', 'q ไม่ใช่เสียง ค/คว — อ่านคล้าย ช ไทย ลิ้นแบน ยิ้มกว้าง'),
        s('x', 'ซ (ลิ้นแบน ยิ้ม)', '西', 'xī', 'x ไม่ใช่ เอ็กซ์ — อ่านคล้าย ซ/ซี แบบลิ้นแบน คล้าย sh อังกฤษแต่ยิ้ม'),
      ],
    },
    {
      titleTh: 'กลุ่มลิ้นม้วน zh ch sh r',
      sounds: [
        s('zh', 'จ (ม้วนลิ้น ไม่พ่นลม)', '猪', 'zhū', 'ม้วนปลายลิ้นขึ้นแตะเพดานปากด้านหน้า แล้วออกเสียง จ'),
        s('ch', 'ช (ม้วนลิ้น พ่นลม)', '吃', 'chī', 'ม้วนลิ้นเหมือน zh แต่พ่นลมแรง'),
        s('sh', 'ซ (ม้วนลิ้น)', '书', 'shū', 'คล้าย sh ในภาษาอังกฤษ แต่ม้วนลิ้นมากกว่า'),
        s('r', 'ร (ม้วนลิ้น ไม่รัว)', '热', 'rè', 'ไม่ใช่ ร รัวลิ้น — ม้วนลิ้นค้างไว้ ไม่แตะเพดาน มีเสียงก้อง คล้าย r ในภาษาอังกฤษผสม ย'),
      ],
    },
    {
      titleTh: 'กลุ่มปลายลิ้น-ฟัน z c s',
      sounds: [
        s('z', 'จ/ตซ (ไม่พ่นลม)', '字', 'zì', 'ลิ้นแบนแตะหลังฟันบน ไม่ม้วน — เทียบ z (ลิ้นแบน) กับ zh (ม้วนลิ้น)'),
        s('c', 'ทซ (พ่นลม)', '菜', 'cài', 'c ไม่ใช่ ค หรือ ซ — เป็นเสียง ts ที่พ่นลมแรง คล้าย ts ใน cats'),
        s('s', 'ซ (ลิ้นแบน)', '三', 'sān', 'ซ ธรรมดาแบบไทย ลิ้นไม่ม้วน — ต่างจาก sh'),
      ],
    },
    {
      titleTh: 'y และ w — กฎการเขียน (ไม่ใช่พยัญชนะต้นจริง)',
      sounds: [
        s('yi', 'อี', '衣', 'yī', 'สระ i ที่ขึ้นต้นพยางค์เขียนเป็น yi เช่น i → yi, ia → ya, ie → ye'),
        s('ya', 'ยา', '鸭', 'yā', 'ia ไม่มีพยัญชนะต้น เขียนเป็น ya'),
        s('wu', 'อู', '五', 'wǔ', 'สระ u ที่ขึ้นต้นพยางค์เขียนเป็น wu เช่น u → wu, uo → wo, ua → wa'),
        s('wo', 'หวอ/อัว', '我', 'wǒ', 'uo ไม่มีพยัญชนะต้น เขียนเป็น wo'),
        s('yu', 'อวี (ü)', '鱼', 'yú', 'ü ขึ้นต้นพยางค์เขียนเป็น yu (ตัดจุดสองจุดออก) แต่ยังออกเสียง ü เหมือนเดิม'),
        s('yue', 'เยวะ (üe)', '月', 'yuè', 'üe → yue, üan → yuan, ün → yun'),
      ],
    },
  ],

  finals: [
    {
      titleTh: 'สระเดี่ยว a o e i u ü',
      sounds: [
        s('a', 'อา', '他', 'tā'),
        s('o', 'ออ (ห่อปาก ปลายเสียงคล้าย อัว)', '波', 'bō', 'มักตามหลัง b p m f เท่านั้น เสียงจริงคล้าย ป-วอ'),
        s('e', 'เออ (ลึกในลำคอ)', '饿', 'è', 'e ไม่ใช่ เอ — อ่านคล้าย เออ/เอ้อ ปากไม่ห่อ'),
        s('i', 'อี', '衣', 'yī'),
        s('u', 'อู', '五', 'wǔ'),
        s('ü', 'อวี (ห่อปากพูด อี)', '女', 'nǚ', 'ทำปากจู๋เหมือน อู แล้วพูด อี — หลัง n l เขียนจุดเสมอ (nǚ, lǜ) เพื่อแยกจาก nǔ, lù'),
      ],
    },
    {
      titleTh: 'สระประสม ai ei ao ou',
      sounds: [
        s('ai', 'อาย/ไอ', '爱', 'ài'),
        s('ei', 'เอย์', '飞', 'fēi'),
        s('ao', 'อาว/เอา', '猫', 'māo'),
        s('ou', 'โอว', '狗', 'gǒu'),
      ],
    },
    {
      titleTh: 'สระนาสิก an en ang eng ong',
      sounds: [
        s('an', 'อาน/อัน', '安', 'ān', '-n ปลายลิ้นแตะหลังฟันบน (แม่กน)'),
        s('en', 'เอิน', '门', 'mén'),
        s('ang', 'อาง/อัง', '忙', 'máng', '-ng เสียงขึ้นจมูก ลิ้นไม่แตะฟัน (แม่กง)'),
        s('eng', 'เอิง', '冷', 'lěng', 'ฝึกคู่ en / eng ให้ชัด เพราะเปลี่ยนความหมาย'),
        s('ong', 'อง (โอง)', '红', 'hóng'),
      ],
    },
    {
      titleTh: 'สระกลุ่ม i',
      sounds: [
        s('ia', 'เอีย (อี-อา)', '家', 'jiā'),
        s('ie', 'เอีย (อี-เอ)', '写', 'xiě', 'e ในชุด ie อ่านเป็น เอ ไม่ใช่ เออ'),
        s('iao', 'เอียว', '小', 'xiǎo'),
        s('iu (iou)', 'อิว/อีโอว', '九', 'jiǔ', 'iu ย่อมาจาก iou — ออกเสียงมี โอว แฝงอยู่ (โดยเฉพาะเสียง 3 และ 4)'),
        s('ian', 'เอียน (อี-เอน)', '天', 'tiān', 'ian อ่านคล้าย เอียน/เยน ไม่ใช่ อี-อาน'),
        s('in', 'อิน', '新', 'xīn'),
        s('iang', 'เอียง (อี-อาง)', '想', 'xiǎng'),
        s('ing', 'อิง', '听', 'tīng'),
        s('iong', 'อี-อง', '熊', 'xióng'),
      ],
    },
    {
      titleTh: 'สระกลุ่ม u',
      sounds: [
        s('ua', 'อัว-อา (วา)', '花', 'huā'),
        s('uo', 'อัว (อู-ออ)', '国', 'guó'),
        s('uai', 'อวาย', '快', 'kuài'),
        s('ui (uei)', 'อุย/เวย', '对', 'duì', 'ui ย่อมาจาก uei — เสียงจริงคล้าย เตวย'),
        s('uan', 'อวน (อู-อาน)', '船', 'chuán'),
        s('un (uen)', 'อุน (อู-เอิน)', '春', 'chūn', 'un หลังพยัญชนะทั่วไปคือ uen — แต่หลัง j q x y คือ ün (เช่น yún)'),
        s('uang', 'อวาง', '黄', 'huáng'),
        s('ueng', 'เวิง', '翁', 'wēng', 'มีพยางค์เดียวคือ weng'),
      ],
    },
    {
      titleTh: 'สระกลุ่ม ü',
      sounds: [
        s('üe', 'เอวี่ย (ü-เอ)', '学', 'xué', 'หลัง j q x y เขียน u แต่ต้องอ่านเป็น ü เสมอ (xue = xüe)'),
        s('üan', 'เอวียน (ü-เอน)', '远', 'yuǎn', 'yuan / juan / quan / xuan ทั้งหมดคือ üan'),
        s('ün', 'อวิน (ü-น)', '云', 'yún', 'yun / jun / qun / xun คือ ün'),
      ],
    },
    {
      titleTh: 'สระพิเศษ er และ -i',
      sounds: [
        s('er', 'เอ่อร์ (ม้วนลิ้น)', '二', 'èr', 'ออกเสียง เออ แล้วม้วนลิ้นขึ้น ใช้เป็นพยางค์เดี่ยว และเป็นเสียง 儿 ท้ายคำ'),
        s('-i (zi ci si)', 'อือ (ลิ้นแบน)', '字', 'zì', 'i หลัง z c s ไม่ใช่ อี — เป็นเสียงต่อเนื่องจากพยัญชนะ คล้าย อือ'),
        s('-i (zhi chi shi ri)', 'อือ (ม้วนลิ้น)', '吃', 'chī', 'i หลัง zh ch sh r ไม่ใช่ อี — ม้วนลิ้นค้างไว้แล้วลากเสียง คล้าย เชอ/ชรือ'),
      ],
    },
  ],

  tones: [
    {
      tone: 1,
      nameTh: 'เสียง 1 (เสียงสูงราบ)',
      mark: 'ˉ',
      contour: [5, 5],
      thaiCompare: 'ใกล้เสียงสามัญแต่สูงกว่ามาก — สูงและคงที่ตลอด คล้ายเสียงร้องเพลงโน้ตสูง ห้ามตกท้าย',
      hanzi: '妈',
      example: 'mā',
      meaningTh: 'แม่',
    },
    {
      tone: 2,
      nameTh: 'เสียง 2 (เสียงขึ้น)',
      mark: 'ˊ',
      contour: [3, 5],
      thaiCompare: 'ใกล้เสียงจัตวา (หมา) แต่เริ่มจากกลางและขึ้นตรง ๆ ไม่ลดลงก่อน เหมือนถามว่า "หา?"',
      hanzi: '麻',
      example: 'má',
      meaningTh: 'ป่าน, ชา (มือชา)',
    },
    {
      tone: 3,
      nameTh: 'เสียง 3 (เสียงต่ำ-ตก-ขึ้น)',
      mark: 'ˇ',
      contour: [2, 1, 4],
      thaiCompare:
        'ไม่มีเสียงไทยตรงกัน — เริ่มต่ำ กดลงต่ำสุด แล้วค่อยเชิดขึ้น (คล้ายเสียงเอก เช่น หม่า ลากยาวแล้วเชิดขึ้นท้าย) ' +
        'ในการพูดจริงมักออกแค่ช่วงต่ำ (เสียง 3 ครึ่ง) ดูกฎเปลี่ยนเสียง',
      hanzi: '马',
      example: 'mǎ',
      meaningTh: 'ม้า',
    },
    {
      tone: 4,
      nameTh: 'เสียง 4 (เสียงตก)',
      mark: 'ˋ',
      contour: [5, 1],
      thaiCompare: 'ใกล้เสียงโท (ม่า, ไม่) แต่กระแทกกว่า — ตกจากสูงสุดลงต่ำสุดอย่างเร็วและหนัก เหมือนสั่งหรือดุ',
      hanzi: '骂',
      example: 'mà',
      meaningTh: 'ด่า',
    },
    {
      tone: 5,
      nameTh: 'เสียงเบา (轻声)',
      mark: '·',
      contour: [3],
      thaiCompare:
        'สั้นและเบา ไม่มีเครื่องหมายวรรณยุกต์ ระดับเสียงขึ้นกับพยางค์ข้างหน้า ' +
        'คล้ายพยางค์ที่พูดเร็วไม่ลงน้ำหนักในภาษาไทย เช่น "นะ" ท้ายประโยค',
      hanzi: '吗',
      example: 'ma',
      meaningTh: 'คำลงท้ายคำถาม (ไหม)',
    },
  ],

  toneRules: [
    {
      titleTh: 'เสียง 3 + เสียง 3 → เสียง 2 + เสียง 3',
      explanation:
        'เมื่อพยางค์เสียง 3 สองตัวมาติดกัน พยางค์แรกจะเปลี่ยนเป็นเสียง 2 แต่ยังเขียนเครื่องหมายเดิม (ˇ) ไว้ในพินอิน',
      examples: [
        { hanzi: '你好', written: 'nǐ hǎo', spoken: 'ní hǎo', meaningTh: 'สวัสดี' },
        { hanzi: '水果', written: 'shuǐguǒ', spoken: 'shuíguǒ', meaningTh: 'ผลไม้' },
        { hanzi: '很好', written: 'hěn hǎo', spoken: 'hén hǎo', meaningTh: 'ดีมาก' },
      ],
    },
    {
      titleTh: 'เสียง 3 ครึ่ง (ก่อนเสียง 1, 2, 4 และเสียงเบา)',
      explanation:
        'เมื่อเสียง 3 อยู่หน้าเสียงอื่นที่ไม่ใช่เสียง 3 จะออกแค่ช่วงต่ำ (2→1) โดยไม่เชิดขึ้นท้าย ' +
        'พินอินเขียนเหมือนเดิม แต่ให้พูดต่ำ ๆ แล้วต่อพยางค์ถัดไปทันที',
      examples: [
        { hanzi: '老师', written: 'lǎoshī', spoken: 'lǎoshī (lǎo ต่ำ ไม่ขึ้นท้าย)', meaningTh: 'ครู' },
        { hanzi: '很忙', written: 'hěn máng', spoken: 'hěn máng (hěn ต่ำ ไม่ขึ้นท้าย)', meaningTh: 'ยุ่งมาก' },
        { hanzi: '每天', written: 'měi tiān', spoken: 'měi tiān (měi ต่ำ ไม่ขึ้นท้าย)', meaningTh: 'ทุกวัน' },
        { hanzi: '我们', written: 'wǒmen', spoken: 'wǒmen (wǒ ต่ำ ไม่ขึ้นท้าย)', meaningTh: 'พวกเรา' },
      ],
    },
    {
      titleTh: '不 bù → bú เมื่ออยู่หน้าเสียง 4',
      explanation:
        '不 ปกติเป็นเสียง 4 (bù) แต่ถ้าคำถัดไปเป็นเสียง 4 จะเปลี่ยนเป็นเสียง 2 (bú) หน้าเสียง 1, 2, 3 ยังคงเป็น bù',
      examples: [
        { hanzi: '不是', written: 'bù shì', spoken: 'bú shì', meaningTh: 'ไม่ใช่' },
        { hanzi: '不对', written: 'bù duì', spoken: 'bú duì', meaningTh: 'ไม่ถูก' },
        { hanzi: '不去', written: 'bù qù', spoken: 'bú qù', meaningTh: 'ไม่ไป' },
        { hanzi: '不好', written: 'bù hǎo', spoken: 'bù hǎo (ไม่เปลี่ยน)', meaningTh: 'ไม่ดี' },
      ],
    },
    {
      titleTh: '一 yī เปลี่ยนเสียงตามคำที่ตามมา',
      explanation:
        '一 อ่าน yī เมื่ออยู่เดี่ยว ๆ นับเลข เป็นลำดับที่ หรืออยู่ท้ายคำ — ' +
        'หน้าเสียง 4 (หรือ 个 ที่เดิมเป็นเสียง 4) เปลี่ยนเป็น yí และหน้าเสียง 1, 2, 3 เปลี่ยนเป็น yì',
      examples: [
        { hanzi: '一个', written: 'yī gè', spoken: 'yí ge', meaningTh: 'หนึ่งอัน/หนึ่งคน' },
        { hanzi: '一样', written: 'yī yàng', spoken: 'yíyàng', meaningTh: 'เหมือนกัน' },
        { hanzi: '一天', written: 'yī tiān', spoken: 'yì tiān', meaningTh: 'หนึ่งวัน' },
        { hanzi: '一起', written: 'yī qǐ', spoken: 'yìqǐ', meaningTh: 'ด้วยกัน' },
        { hanzi: '第一', written: 'dì yī', spoken: 'dì yī (ไม่เปลี่ยน)', meaningTh: 'ที่หนึ่ง' },
      ],
    },
    {
      titleTh: 'เสียงเบาในคำซ้ำและคำช่วย',
      explanation:
        'พยางค์ที่สองของคำซ้ำ (เช่น คำเรียกญาติ) และคำช่วยอย่าง 的 了 吗 呢 อ่านเป็นเสียงเบา สั้นและไม่ลงน้ำหนัก ' +
        'เสียงที่ขีดฆ่าไว้คือเสียงเดิมของแต่ละตัว เมื่อเป็นคำแล้วพยางค์ที่สองจะอ่านเบา และพจนานุกรมเขียนโดยไม่มีเครื่องหมายวรรณยุกต์ เช่น māma, xièxie',
      examples: [
        { hanzi: '妈妈', written: 'mā mā', spoken: 'māma', meaningTh: 'แม่' },
        { hanzi: '谢谢', written: 'xiè xiè', spoken: 'xièxie', meaningTh: 'ขอบคุณ' },
        { hanzi: '我的', written: 'wǒ de', spoken: 'wǒ de', meaningTh: 'ของฉัน' },
        { hanzi: '好了', written: 'hǎo le', spoken: 'hǎo le', meaningTh: 'เสร็จแล้ว / ดีแล้ว' },
      ],
    },
  ],

  drill: [
    // Tone 1
    d('书', 'shū', 1, ['sū', 'xū', 'shōu'], 'หนังสือ'),
    d('吃', 'chī', 1, ['cī', 'qī', 'chē'], 'กิน'),
    d('猪', 'zhū', 1, ['zū', 'jū', 'zhōu'], 'หมู'),
    d('三', 'sān', 1, ['shān', 'xiān', 'sāng'], 'สาม'),
    d('七', 'qī', 1, ['chī', 'cī', 'qū'], 'เจ็ด'),
    d('天', 'tiān', 1, ['tān', 'diān', 'tīng'], 'ฟ้า, วัน'),
    d('飞', 'fēi', 1, ['huī', 'fēn', 'pēi'], 'บิน'),
    d('今', 'jīn', 1, ['zhēn', 'jīng', 'qīn'], 'ปัจจุบัน (今天 วันนี้)'),
    d('星', 'xīng', 1, ['shēng', 'xīn', 'sēng'], 'ดาว'),
    d('开', 'kāi', 1, ['gāi', 'kēi', 'hāi'], 'เปิด'),
    // Tone 2
    d('人', 'rén', 2, ['réng', 'léng', 'rán'], 'คน'),
    d('学', 'xué', 2, ['xié', 'xú', 'qué'], 'เรียน'),
    d('鱼', 'yú', 2, ['yóu', 'yí', 'wú'], 'ปลา'),
    d('茶', 'chá', 2, ['zhá', 'cháng', 'chí'], 'ชา'),
    d('钱', 'qián', 2, ['chán', 'xián', 'qiáng'], 'เงิน'),
    d('来', 'lái', 2, ['nái', 'léi', 'lán'], 'มา'),
    d('您', 'nín', 2, ['níng', 'lín', 'mín'], 'คุณ (สุภาพ)'),
    d('年', 'nián', 2, ['niáng', 'lián', 'nín'], 'ปี'),
    d('从', 'cóng', 2, ['chóng', 'cún', 'qióng'], 'จาก'),
    d('十', 'shí', 2, ['xí', 'chí', 'shé'], 'สิบ'),
    // Tone 3
    d('水', 'shuǐ', 3, ['suǐ', 'shǔ', 'shǎi'], 'น้ำ'),
    d('女', 'nǚ', 3, ['nǔ', 'lǚ', 'nǐ'], 'ผู้หญิง'),
    d('走', 'zǒu', 3, ['zhǒu', 'jiǔ', 'zǔ'], 'เดิน'),
    d('小', 'xiǎo', 3, ['shǎo', 'sǎo', 'qiǎo'], 'เล็ก'),
    d('很', 'hěn', 3, ['kěn', 'hǎn', 'hǒng'], 'มาก'),
    d('有', 'yǒu', 3, ['yǔ', 'ǒu', 'yǎo'], 'มี'),
    d('买', 'mǎi', 3, ['měi', 'mǎ', 'nǎi'], 'ซื้อ'),
    d('冷', 'lěng', 3, ['lǐng', 'nǐng', 'lǎng'], 'หนาว'),
    d('早', 'zǎo', 3, ['zhǎo', 'cǎo', 'zǒu'], 'เช้า'),
    d('请', 'qǐng', 3, ['qǐn', 'jǐng', 'chěng'], 'เชิญ, กรุณา'),
    // Tone 4
    d('去', 'qù', 4, ['qì', 'jù', 'chù'], 'ไป'),
    d('四', 'sì', 4, ['shì', 'xì', 'cì'], 'สี่'),
    d('日', 'rì', 4, ['lì', 'zhì', 'rè'], 'วัน, ดวงอาทิตย์'),
    d('热', 'rè', 4, ['lè', 'zhè', 'rì'], 'ร้อน'),
    d('字', 'zì', 4, ['zhì', 'jì', 'cì'], 'ตัวอักษร'),
    d('菜', 'cài', 4, ['zài', 'sài', 'chài'], 'ผัก, กับข้าว'),
    d('肉', 'ròu', 4, ['lòu', 'zhòu', 'yòu'], 'เนื้อสัตว์'),
    d('认', 'rèn', 4, ['rèng', 'lìn', 'zhèn'], 'จำได้ (认识 รู้จัก)'),
    d('二', 'èr', 4, ['è', 'ài', 'àn'], 'สอง'),
    d('坐', 'zuò', 4, ['zhuò', 'cuò', 'zòu'], 'นั่ง'),
  ],

  strokes: [
    { stroke: '一', nameZh: '横 héng', nameTh: 'ขีดนอน', descriptionTh: 'ลากจากซ้ายไปขวา ระดับเกือบราบ เชิดขึ้นเล็กน้อย', exampleHanzi: '三' },
    { stroke: '丨', nameZh: '竖 shù', nameTh: 'ขีดตั้ง', descriptionTh: 'ลากจากบนลงล่างตรง ๆ', exampleHanzi: '十' },
    { stroke: '丿', nameZh: '撇 piě', nameTh: 'ขีดตกซ้าย', descriptionTh: 'ลากจากบนขวาลงไปล่างซ้าย ปลายเรียวแหลม', exampleHanzi: '人' },
    { stroke: '丶', nameZh: '点 diǎn', nameTh: 'จุด', descriptionTh: 'กดสั้น ๆ จากบนลงล่างขวา', exampleHanzi: '六' },
    { stroke: '㇏', nameZh: '捺 nà', nameTh: 'ขีดตกขวา', descriptionTh: 'ลากจากบนซ้ายลงล่างขวา กดหนักตอนท้ายแล้วปาดออก', exampleHanzi: '八' },
    { stroke: '㇀', nameZh: '提 tí', nameTh: 'ขีดเชิด', descriptionTh: 'ลากจากล่างซ้ายขึ้นไปบนขวา สั้นและเร็ว', exampleHanzi: '我' },
    { stroke: '㇕', nameZh: '折 zhé', nameTh: 'ขีดหักมุม', descriptionTh: 'ลากแนวนอนไปขวาแล้วหักลงล่างในขีดเดียว (ไม่ยกปากกา)', exampleHanzi: '口' },
    { stroke: '㇚', nameZh: '钩 gōu', nameTh: 'ขีดตะขอ', descriptionTh: 'ลากลงแล้วสะบัดปลายเป็นตะขอขึ้น (เช่น ขีดตั้งตะขอไปทางซ้าย)', exampleHanzi: '小' },
  ],

  strokeOrder: [
    { ruleTh: 'บนก่อนล่าง', exampleHanzi: '三', explanation: 'เขียนขีดนอนบนสุดก่อน แล้วค่อยไล่ลงมาทีละขีด' },
    { ruleTh: 'ซ้ายก่อนขวา', exampleHanzi: '川', explanation: 'เขียนขีดซ้ายสุดก่อน แล้วไล่ไปทางขวา' },
    { ruleTh: 'นอนก่อนตั้ง', exampleHanzi: '十', explanation: 'เมื่อขีดนอนกับขีดตั้งตัดกัน ให้เขียนขีดนอนก่อน' },
    { ruleTh: 'ตกซ้ายก่อนตกขวา', exampleHanzi: '人', explanation: 'เขียนขีด 丿 (ตกซ้าย) ก่อน แล้วค่อยเขียน ㇏ (ตกขวา)' },
    { ruleTh: 'นอกก่อนใน', exampleHanzi: '月', explanation: 'เขียนกรอบด้านซ้าย-บน-ขวาก่อน แล้วค่อยเขียนขีดด้านใน' },
    { ruleTh: 'ในก่อนปิดกรอบ', exampleHanzi: '国', explanation: 'เขียนกรอบสามด้าน → ใส่ส่วนข้างใน (玉) → ปิดกรอบด้านล่างเป็นขีดสุดท้าย เช่นเดียวกับ 回' },
    { ruleTh: 'กลางก่อนสองข้าง', exampleHanzi: '小', explanation: 'เมื่อซ้ายขวาสมมาตร ให้เขียนขีดตรงกลางก่อน แล้วค่อยเขียนซ้ายและขวา' },
  ],

  radicals: [
    {
      radical: '人', pinyin: 'rén', meaningTh: 'คน', variant: '亻',
      examples: [
        { hanzi: '你', pinyin: 'nǐ', meaningTh: 'คุณ' },
        { hanzi: '他', pinyin: 'tā', meaningTh: 'เขา (ผู้ชาย)' },
        { hanzi: '休', pinyin: 'xiū', meaningTh: 'พัก (คนพิงต้นไม้)' },
      ],
    },
    {
      radical: '口', pinyin: 'kǒu', meaningTh: 'ปาก (เกี่ยวกับการพูด กิน)',
      examples: [
        { hanzi: '吃', pinyin: 'chī', meaningTh: 'กิน' },
        { hanzi: '叫', pinyin: 'jiào', meaningTh: 'เรียก, ชื่อ' },
        { hanzi: '唱', pinyin: 'chàng', meaningTh: 'ร้องเพลง' },
      ],
    },
    {
      radical: '女', pinyin: 'nǚ', meaningTh: 'ผู้หญิง',
      examples: [
        { hanzi: '妈', pinyin: 'mā', meaningTh: 'แม่' },
        { hanzi: '姐', pinyin: 'jiě', meaningTh: 'พี่สาว' },
        { hanzi: '妹', pinyin: 'mèi', meaningTh: 'น้องสาว' },
      ],
    },
    {
      radical: '子', pinyin: 'zǐ', meaningTh: 'เด็ก, ลูก',
      examples: [
        { hanzi: '字', pinyin: 'zì', meaningTh: 'ตัวอักษร' },
        { hanzi: '学', pinyin: 'xué', meaningTh: 'เรียน' },
        { hanzi: '孩', pinyin: 'hái', meaningTh: 'เด็ก' },
      ],
    },
    {
      radical: '木', pinyin: 'mù', meaningTh: 'ไม้, ต้นไม้',
      examples: [
        { hanzi: '林', pinyin: 'lín', meaningTh: 'ป่า' },
        { hanzi: '树', pinyin: 'shù', meaningTh: 'ต้นไม้' },
        { hanzi: '桌', pinyin: 'zhuō', meaningTh: 'โต๊ะ' },
      ],
    },
    {
      radical: '水', pinyin: 'shuǐ', meaningTh: 'น้ำ (ของเหลว)', variant: '氵',
      examples: [
        { hanzi: '河', pinyin: 'hé', meaningTh: 'แม่น้ำ' },
        { hanzi: '洗', pinyin: 'xǐ', meaningTh: 'ล้าง' },
        { hanzi: '海', pinyin: 'hǎi', meaningTh: 'ทะเล' },
      ],
    },
    {
      radical: '火', pinyin: 'huǒ', meaningTh: 'ไฟ, ความร้อน', variant: '灬',
      examples: [
        { hanzi: '热', pinyin: 'rè', meaningTh: 'ร้อน' },
        { hanzi: '点', pinyin: 'diǎn', meaningTh: 'จุด, นาฬิกา (โมง)' },
        { hanzi: '炒', pinyin: 'chǎo', meaningTh: 'ผัด' },
      ],
    },
    {
      radical: '土', pinyin: 'tǔ', meaningTh: 'ดิน',
      examples: [
        { hanzi: '在', pinyin: 'zài', meaningTh: 'อยู่ที่' },
        { hanzi: '坐', pinyin: 'zuò', meaningTh: 'นั่ง' },
        { hanzi: '城', pinyin: 'chéng', meaningTh: 'เมือง' },
      ],
    },
    {
      radical: '日', pinyin: 'rì', meaningTh: 'ดวงอาทิตย์, วัน (เวลา แสง)',
      examples: [
        { hanzi: '明', pinyin: 'míng', meaningTh: 'สว่าง' },
        { hanzi: '早', pinyin: 'zǎo', meaningTh: 'เช้า' },
        { hanzi: '时', pinyin: 'shí', meaningTh: 'เวลา' },
      ],
    },
    {
      radical: '月', pinyin: 'yuè', meaningTh: 'ดวงจันทร์, เดือน (และ "เนื้อ" ในส่วนอวัยวะ)',
      examples: [
        { hanzi: '朋', pinyin: 'péng', meaningTh: 'เพื่อน' },
        { hanzi: '期', pinyin: 'qī', meaningTh: 'ช่วงเวลา (星期 สัปดาห์)' },
        { hanzi: '脸', pinyin: 'liǎn', meaningTh: 'ใบหน้า' },
      ],
    },
    {
      radical: '心', pinyin: 'xīn', meaningTh: 'หัวใจ, ความรู้สึก', variant: '忄',
      examples: [
        { hanzi: '想', pinyin: 'xiǎng', meaningTh: 'คิด, อยาก' },
        { hanzi: '忙', pinyin: 'máng', meaningTh: 'ยุ่ง' },
        { hanzi: '快', pinyin: 'kuài', meaningTh: 'เร็ว' },
      ],
    },
    {
      radical: '手', pinyin: 'shǒu', meaningTh: 'มือ (การกระทำด้วยมือ)', variant: '扌',
      examples: [
        { hanzi: '打', pinyin: 'dǎ', meaningTh: 'ตี, โทร (打电话)' },
        { hanzi: '找', pinyin: 'zhǎo', meaningTh: 'หา' },
        { hanzi: '拿', pinyin: 'ná', meaningTh: 'ถือ, หยิบ' },
      ],
    },
    {
      radical: '言', pinyin: 'yán', meaningTh: 'คำพูด', variant: '讠',
      examples: [
        { hanzi: '说', pinyin: 'shuō', meaningTh: 'พูด' },
        { hanzi: '话', pinyin: 'huà', meaningTh: 'คำพูด' },
        { hanzi: '请', pinyin: 'qǐng', meaningTh: 'เชิญ, กรุณา' },
      ],
    },
    {
      radical: '金', pinyin: 'jīn', meaningTh: 'ทอง, โลหะ', variant: '钅',
      examples: [
        { hanzi: '钱', pinyin: 'qián', meaningTh: 'เงิน' },
        { hanzi: '银', pinyin: 'yín', meaningTh: 'เงิน (โลหะ)' },
        { hanzi: '错', pinyin: 'cuò', meaningTh: 'ผิด' },
      ],
    },
    {
      radical: '艹', pinyin: 'cǎo', meaningTh: 'หญ้า, พืช (草字头 อยู่ด้านบน)',
      examples: [
        { hanzi: '草', pinyin: 'cǎo', meaningTh: 'หญ้า' },
        { hanzi: '茶', pinyin: 'chá', meaningTh: 'ชา' },
        { hanzi: '花', pinyin: 'huā', meaningTh: 'ดอกไม้' },
      ],
    },
    {
      radical: '门', pinyin: 'mén', meaningTh: 'ประตู',
      examples: [
        { hanzi: '问', pinyin: 'wèn', meaningTh: 'ถาม' },
        { hanzi: '间', pinyin: 'jiān', meaningTh: 'ห้อง, ระหว่าง' },
        { hanzi: '闹', pinyin: 'nào', meaningTh: 'เสียงดัง, วุ่นวาย' },
      ],
    },
    {
      radical: '宀', pinyin: 'mián', meaningTh: 'หลังคา, บ้าน (宝盖头)',
      examples: [
        { hanzi: '家', pinyin: 'jiā', meaningTh: 'บ้าน, ครอบครัว' },
        { hanzi: '室', pinyin: 'shì', meaningTh: 'ห้อง' },
        { hanzi: '安', pinyin: 'ān', meaningTh: 'สงบ, ปลอดภัย' },
      ],
    },
    {
      radical: '辶', pinyin: 'chuò', meaningTh: 'การเดิน, การเคลื่อนที่ (走之底)',
      examples: [
        { hanzi: '这', pinyin: 'zhè', meaningTh: 'นี่' },
        { hanzi: '进', pinyin: 'jìn', meaningTh: 'เข้า' },
        { hanzi: '远', pinyin: 'yuǎn', meaningTh: 'ไกล' },
      ],
    },
    {
      radical: '食', pinyin: 'shí', meaningTh: 'อาหาร, การกิน', variant: '饣',
      examples: [
        { hanzi: '饭', pinyin: 'fàn', meaningTh: 'ข้าว, อาหาร' },
        { hanzi: '饿', pinyin: 'è', meaningTh: 'หิว' },
        { hanzi: '饱', pinyin: 'bǎo', meaningTh: 'อิ่ม' },
      ],
    },
    {
      radical: '糸', pinyin: 'mì', meaningTh: 'ไหม, เส้นด้าย (绞丝旁)', variant: '纟',
      examples: [
        { hanzi: '红', pinyin: 'hóng', meaningTh: 'สีแดง' },
        { hanzi: '绿', pinyin: 'lǜ', meaningTh: 'สีเขียว' },
        { hanzi: '级', pinyin: 'jí', meaningTh: 'ระดับ, ชั้น' },
      ],
    },
    {
      radical: '目', pinyin: 'mù', meaningTh: 'ตา (การมอง)',
      examples: [
        { hanzi: '眼', pinyin: 'yǎn', meaningTh: 'ตา' },
        { hanzi: '看', pinyin: 'kàn', meaningTh: 'ดู, มอง' },
        { hanzi: '睡', pinyin: 'shuì', meaningTh: 'นอน' },
      ],
    },
    {
      radical: '足', pinyin: 'zú', meaningTh: 'เท้า (การเดิน วิ่ง)', variant: '⻊',
      examples: [
        { hanzi: '跑', pinyin: 'pǎo', meaningTh: 'วิ่ง' },
        { hanzi: '跳', pinyin: 'tiào', meaningTh: 'กระโดด' },
        { hanzi: '路', pinyin: 'lù', meaningTh: 'ถนน, ทาง' },
      ],
    },
    {
      radical: '贝', pinyin: 'bèi', meaningTh: 'เปลือกหอย (เงินตราสมัยโบราณ — เกี่ยวกับเงิน การค้า)',
      examples: [
        { hanzi: '贵', pinyin: 'guì', meaningTh: 'แพง' },
        { hanzi: '购', pinyin: 'gòu', meaningTh: 'ซื้อ (购物 ซื้อของ)' },
        { hanzi: '货', pinyin: 'huò', meaningTh: 'สินค้า' },
      ],
    },
    {
      radical: '雨', pinyin: 'yǔ', meaningTh: 'ฝน (ปรากฏการณ์อากาศ)',
      examples: [
        { hanzi: '雪', pinyin: 'xuě', meaningTh: 'หิมะ' },
        { hanzi: '雷', pinyin: 'léi', meaningTh: 'ฟ้าร้อง' },
        { hanzi: '零', pinyin: 'líng', meaningTh: 'ศูนย์' },
      ],
    },
  ],

  tipsTh: [
    'ฝึกวรรณยุกต์เป็นคู่ (เช่น 1+1, 1+2 … 4+4) แทนการฝึกทีละพยางค์ เพราะในการพูดจริงเสียงจะต่อกันเสมอ',
    'แยกคู่ที่คนไทยมักสับสนให้ขาด: z/zh, c/ch, s/sh (ม้วนลิ้นหรือไม่) และ j/q/x (ลิ้นแบน ยิ้ม) — ฟังแล้วพูดตามทีละคู่',
    'จำคำศัพท์พร้อมวรรณยุกต์ตั้งแต่แรก ใช้สีหรือท่ามือช่วย (มือราบ/ชี้ขึ้น/ตวัดลงขึ้น/ฟันลง) เพราะแก้ทีหลังยากกว่ามาก',
    'อัดเสียงตัวเองแล้วเทียบกับเสียงต้นฉบับ จุดที่พลาดบ่อยคือเสียง 1 ไม่สูงพอ และเสียง 3 ที่ขึ้นท้ายเกินในกลางประโยค',
    'เรียนตัวอักษรผ่านหมวดนำ: เห็น 氵 ให้นึกถึงน้ำ เห็น 讠 ให้นึกถึงคำพูด ช่วยเดาความหมายและจำได้เร็วขึ้น',
    'เขียนตามลำดับขีดที่ถูกต้องตั้งแต่ต้น ตัวอักษรจะสวยสมดุล และช่วยให้ใช้ระบบเขียนด้วยมือบนมือถือได้แม่นยำ',
  ],
}
