import type { VocabChapter } from '../lib/types'

export const vocabChapters: VocabChapter[] = [
  {
    id: 'office-hr',
    title: 'Office & Human Resources',
    titleTh: 'บทที่ 1: สำนักงานและงานบุคคล',
    description: 'คำศัพท์เกี่ยวกับการสมัครงาน สัญญาจ้าง และชีวิตในออฟฟิศ',
    words: [
      { id: 'ohr-1', term: 'applicant', pos: 'n.', meaningTh: 'ผู้สมัครงาน', synonym: 'candidate', exampleEn: 'Each applicant must submit a resume and cover letter.', exampleTh: 'ผู้สมัครแต่ละคนต้องส่งเรซูเม่และจดหมายสมัครงาน' },
      { id: 'ohr-2', term: 'recruit', pos: 'v.', meaningTh: 'รับสมัคร/สรรหาบุคลากร', synonym: 'hire', exampleEn: 'The company plans to recruit ten new engineers.', exampleTh: 'บริษัทวางแผนจะรับสมัครวิศวกรใหม่สิบคน' },
      { id: 'ohr-3', term: 'qualification', pos: 'n.', meaningTh: 'คุณสมบัติ', antonym: 'incompetence', exampleEn: 'Her qualifications exceed the requirements for the position.', exampleTh: 'คุณสมบัติของเธอเกินกว่าที่ตำแหน่งนี้ต้องการ' },
      { id: 'ohr-4', term: 'supervisor', pos: 'n.', meaningTh: 'หัวหน้างาน', synonym: 'manager', exampleEn: 'Employees should report delays to their supervisor.', exampleTh: 'พนักงานควรรายงานความล่าช้าต่อหัวหน้างาน' },
      { id: 'ohr-5', term: 'promote', pos: 'v.', meaningTh: 'เลื่อนตำแหน่ง', exampleEn: 'She was promoted to senior manager last month.', exampleTh: 'เธอได้รับการเลื่อนตำแหน่งเป็นผู้จัดการอาวุโสเมื่อเดือนที่แล้ว' },
      { id: 'ohr-6', term: 'benefits', pos: 'n.', meaningTh: 'สวัสดิการ', exampleEn: 'The benefits package includes health insurance and paid leave.', exampleTh: 'สวัสดิการรวมถึงประกันสุขภาพและวันลาแบบได้รับค่าจ้าง' },
      { id: 'ohr-7', term: 'evaluate', pos: 'v.', meaningTh: 'ประเมิน', synonym: 'assess', exampleEn: 'Managers evaluate employee performance twice a year.', exampleTh: 'ผู้จัดการประเมินผลงานพนักงานปีละสองครั้ง' },
      { id: 'ohr-8', term: 'resign', pos: 'v.', meaningTh: 'ลาออก', synonym: 'quit', exampleEn: 'He decided to resign from his position.', exampleTh: 'เขาตัดสินใจลาออกจากตำแหน่ง' },
      { id: 'ohr-9', term: 'workload', pos: 'n.', meaningTh: 'ปริมาณงาน', exampleEn: 'The new project has increased our workload significantly.', exampleTh: 'โปรเจกต์ใหม่ทำให้ปริมาณงานของเราเพิ่มขึ้นมาก' },
      { id: 'ohr-10', term: 'attendance', pos: 'n.', meaningTh: 'การเข้าร่วม/การมาทำงาน', exampleEn: 'Attendance at the training session is mandatory.', exampleTh: 'การเข้าร่วมการอบรมเป็นสิ่งบังคับ' },
      { id: 'ohr-11', term: 'compensation', pos: 'n.', meaningTh: 'ค่าตอบแทน', synonym: 'salary', exampleEn: 'The compensation package was competitive.', exampleTh: 'แพ็กเกจค่าตอบแทนมีความสามารถในการแข่งขัน' },
      { id: 'ohr-12', term: 'terminate', pos: 'v.', meaningTh: 'ยกเลิก/เลิกจ้าง', exampleEn: 'The contract was terminated due to budget cuts.', exampleTh: 'สัญญาถูกยกเลิกเนื่องจากการตัดงบประมาณ' },
      { id: 'ohr-13', term: 'orientation', pos: 'n.', meaningTh: 'การปฐมนิเทศ', exampleEn: 'New employees attend orientation on their first day.', exampleTh: 'พนักงานใหม่เข้าร่วมการปฐมนิเทศในวันแรก' },
      { id: 'ohr-14', term: 'proficient', pos: 'adj.', meaningTh: 'ชำนาญ', synonym: 'skilled', exampleEn: 'She is proficient in three languages.', exampleTh: 'เธอมีความชำนาญในสามภาษา' },
      { id: 'ohr-15', term: 'punctual', pos: 'adj.', meaningTh: 'ตรงต่อเวลา', exampleEn: 'All staff are expected to be punctual.', exampleTh: 'พนักงานทุกคนต้องตรงต่อเวลา' },
    ],
  },
  {
    id: 'meetings',
    title: 'Meetings & Negotiations',
    titleTh: 'บทที่ 2: การประชุมและการเจรจา',
    description: 'คำศัพท์ที่ใช้บ่อยในห้องประชุมและการเจรจาธุรกิจ',
    words: [
      { id: 'mtg-1', term: 'agenda', pos: 'n.', meaningTh: 'ระเบียบวาระการประชุม', exampleEn: 'Please review the agenda before the meeting.', exampleTh: 'กรุณาตรวจสอบวาระการประชุมก่อนเริ่มประชุม' },
      { id: 'mtg-2', term: 'postpone', pos: 'v.', meaningTh: 'เลื่อนออกไป', synonym: 'delay', exampleEn: 'The meeting has been postponed until Friday.', exampleTh: 'การประชุมถูกเลื่อนออกไปเป็นวันศุกร์' },
      { id: 'mtg-3', term: 'negotiate', pos: 'v.', meaningTh: 'เจรจาต่อรอง', exampleEn: 'Both parties agreed to negotiate the contract terms.', exampleTh: 'ทั้งสองฝ่ายตกลงที่จะเจรจาเงื่อนไขสัญญา' },
      { id: 'mtg-4', term: 'consensus', pos: 'n.', meaningTh: 'ความเห็นพ้องต้องกัน', exampleEn: 'The team reached a consensus on the budget.', exampleTh: 'ทีมงานได้ข้อสรุปร่วมกันเรื่องงบประมาณ' },
      { id: 'mtg-5', term: 'proposal', pos: 'n.', meaningTh: 'ข้อเสนอ', exampleEn: 'The client rejected our initial proposal.', exampleTh: 'ลูกค้าปฏิเสธข้อเสนอเบื้องต้นของเรา' },
      { id: 'mtg-6', term: 'compromise', pos: 'v./n.', meaningTh: 'ประนีประนอม', exampleEn: 'We need to compromise to close the deal.', exampleTh: 'เราต้องประนีประนอมเพื่อปิดดีล' },
      { id: 'mtg-7', term: 'minutes', pos: 'n.', meaningTh: 'บันทึกการประชุม', exampleEn: 'She was asked to take the minutes of the meeting.', exampleTh: 'เธอถูกขอให้จดบันทึกการประชุม' },
      { id: 'mtg-8', term: 'attendee', pos: 'n.', meaningTh: 'ผู้เข้าร่วมประชุม', exampleEn: 'Attendees should arrive ten minutes early.', exampleTh: 'ผู้เข้าร่วมประชุมควรมาถึงก่อนสิบนาที' },
      { id: 'mtg-9', term: 'clause', pos: 'n.', meaningTh: 'ข้อสัญญา/ข้อกำหนด', exampleEn: 'Please review clause 5 of the contract.', exampleTh: 'กรุณาตรวจสอบข้อ 5 ของสัญญา' },
      { id: 'mtg-10', term: 'finalize', pos: 'v.', meaningTh: 'สรุปให้เสร็จสมบูรณ์', exampleEn: 'We will finalize the agreement next week.', exampleTh: 'เราจะสรุปข้อตกลงให้เสร็จสมบูรณ์สัปดาห์หน้า' },
      { id: 'mtg-11', term: 'stakeholder', pos: 'n.', meaningTh: 'ผู้มีส่วนได้ส่วนเสีย', exampleEn: 'All stakeholders must approve the plan.', exampleTh: 'ผู้มีส่วนได้ส่วนเสียทุกคนต้องอนุมัติแผนนี้' },
      { id: 'mtg-12', term: 'reschedule', pos: 'v.', meaningTh: 'จัดตารางใหม่', exampleEn: 'Could we reschedule our call to Monday?', exampleTh: 'เราสามารถเลื่อนนัดโทรศัพท์ไปวันจันทร์ได้ไหม' },
      { id: 'mtg-13', term: 'objection', pos: 'n.', meaningTh: 'ข้อคัดค้าน', exampleEn: 'No one raised an objection to the plan.', exampleTh: 'ไม่มีใครคัดค้านแผนนี้' },
      { id: 'mtg-14', term: 'draft', pos: 'n./v.', meaningTh: 'ร่างเอกสาร', exampleEn: 'He drafted the proposal overnight.', exampleTh: 'เขาร่างข้อเสนอในชั่วข้ามคืน' },
      { id: 'mtg-15', term: 'unanimous', pos: 'adj.', meaningTh: 'เป็นเอกฉันท์', exampleEn: 'The board gave a unanimous approval.', exampleTh: 'คณะกรรมการอนุมัติเป็นเอกฉันท์' },
    ],
  },
  {
    id: 'travel',
    title: 'Travel & Transportation',
    titleTh: 'บทที่ 3: การเดินทางและการขนส่ง',
    description: 'คำศัพท์ที่พบบ่อยในหัวข้อการเดินทางเพื่อธุรกิจ สนามบิน และโรงแรม',
    words: [
      { id: 'trv-1', term: 'itinerary', pos: 'n.', meaningTh: 'กำหนดการเดินทาง', exampleEn: 'Please send me the updated travel itinerary.', exampleTh: 'กรุณาส่งกำหนดการเดินทางที่อัปเดตให้ฉัน' },
      { id: 'trv-2', term: 'reservation', pos: 'n.', meaningTh: 'การจอง', synonym: 'booking', exampleEn: 'I made a reservation at the downtown hotel.', exampleTh: 'ฉันจองโรงแรมในตัวเมืองแล้ว' },
      { id: 'trv-3', term: 'departure', pos: 'n.', meaningTh: 'การออกเดินทาง', antonym: 'arrival', exampleEn: 'The departure gate has been changed.', exampleTh: 'ประตูขึ้นเครื่องถูกเปลี่ยน' },
      { id: 'trv-4', term: 'delayed', pos: 'adj.', meaningTh: 'ล่าช้า', exampleEn: 'Our flight was delayed by two hours.', exampleTh: 'เที่ยวบินของเราล่าช้าไปสองชั่วโมง' },
      { id: 'trv-5', term: 'fare', pos: 'n.', meaningTh: 'ค่าโดยสาร', exampleEn: 'The train fare has increased this year.', exampleTh: 'ค่าโดยสารรถไฟเพิ่มขึ้นในปีนี้' },
      { id: 'trv-6', term: 'boarding pass', pos: 'n.', meaningTh: 'บัตรขึ้นเครื่อง', exampleEn: 'Please have your boarding pass ready.', exampleTh: 'กรุณาเตรียมบัตรขึ้นเครื่องให้พร้อม' },
      { id: 'trv-7', term: 'accommodation', pos: 'n.', meaningTh: 'ที่พัก', exampleEn: 'The company will arrange accommodation for guests.', exampleTh: 'บริษัทจะจัดที่พักให้แขก' },
      { id: 'trv-8', term: 'baggage', pos: 'n.', meaningTh: 'สัมภาระ', synonym: 'luggage', exampleEn: 'Excess baggage fees apply after 20kg.', exampleTh: 'มีค่าธรรมเนียมสัมภาระเกินหลัง 20 กิโลกรัม' },
      { id: 'trv-9', term: 'connecting flight', pos: 'n.', meaningTh: 'เที่ยวบินต่อเครื่อง', exampleEn: 'We have a two-hour layover before our connecting flight.', exampleTh: 'เรามีเวลาต่อเครื่องสองชั่วโมงก่อนเที่ยวบินต่อเครื่อง' },
      { id: 'trv-10', term: 'refund', pos: 'n./v.', meaningTh: 'การคืนเงิน', exampleEn: 'You may request a refund within 24 hours.', exampleTh: 'คุณสามารถขอคืนเงินได้ภายใน 24 ชั่วโมง' },
      { id: 'trv-11', term: 'customs', pos: 'n.', meaningTh: 'ศุลกากร', exampleEn: 'Passengers must go through customs on arrival.', exampleTh: 'ผู้โดยสารต้องผ่านศุลกากรเมื่อมาถึง' },
      { id: 'trv-12', term: 'vacant', pos: 'adj.', meaningTh: 'ว่าง', exampleEn: 'No vacant rooms are available this weekend.', exampleTh: 'ไม่มีห้องว่างในสุดสัปดาห์นี้' },
      { id: 'trv-13', term: 'complimentary', pos: 'adj.', meaningTh: 'ฟรี/ให้เปล่า', exampleEn: 'Breakfast is complimentary for all guests.', exampleTh: 'อาหารเช้าฟรีสำหรับแขกทุกคน' },
      { id: 'trv-14', term: 'shuttle', pos: 'n.', meaningTh: 'รถรับส่ง', exampleEn: 'A shuttle bus runs between the airport and the hotel.', exampleTh: 'มีรถรับส่งระหว่างสนามบินกับโรงแรม' },
      { id: 'trv-15', term: 'itemize', pos: 'v.', meaningTh: 'แจกแจงรายการ', exampleEn: 'Please itemize your expenses for reimbursement.', exampleTh: 'กรุณาแจกแจงค่าใช้จ่ายเพื่อขอเบิกเงินคืน' },
    ],
  },
  {
    id: 'finance',
    title: 'Finance & Accounting',
    titleTh: 'บทที่ 4: การเงินและบัญชี',
    description: 'คำศัพท์เกี่ยวกับงบประมาณ ใบแจ้งหนี้ และรายงานทางการเงิน',
    words: [
      { id: 'fin-1', term: 'invoice', pos: 'n.', meaningTh: 'ใบแจ้งหนี้', exampleEn: 'The invoice must be paid within 30 days.', exampleTh: 'ใบแจ้งหนี้ต้องชำระภายใน 30 วัน' },
      { id: 'fin-2', term: 'budget', pos: 'n.', meaningTh: 'งบประมาณ', exampleEn: 'The marketing budget was cut this quarter.', exampleTh: 'งบประมาณการตลาดถูกตัดในไตรมาสนี้' },
      { id: 'fin-3', term: 'revenue', pos: 'n.', meaningTh: 'รายได้', exampleEn: 'Annual revenue grew by 15 percent.', exampleTh: 'รายได้ประจำปีเพิ่มขึ้น 15 เปอร์เซ็นต์' },
      { id: 'fin-4', term: 'expenditure', pos: 'n.', meaningTh: 'รายจ่าย', synonym: 'expense', exampleEn: 'Total expenditure exceeded projections this year.', exampleTh: 'รายจ่ายรวมเกินกว่าที่คาดการณ์ไว้ปีนี้' },
      { id: 'fin-5', term: 'audit', pos: 'n./v.', meaningTh: 'การตรวจสอบบัญชี', exampleEn: 'The company undergoes an audit every year.', exampleTh: 'บริษัทมีการตรวจสอบบัญชีทุกปี' },
      { id: 'fin-6', term: 'reimburse', pos: 'v.', meaningTh: 'จ่ายคืน/เบิกจ่าย', exampleEn: 'Employees will be reimbursed for travel expenses.', exampleTh: 'พนักงานจะได้รับเงินคืนสำหรับค่าเดินทาง' },
      { id: 'fin-7', term: 'surplus', pos: 'n.', meaningTh: 'ส่วนเกิน/เงินเหลือ', antonym: 'deficit', exampleEn: 'The department reported a budget surplus.', exampleTh: 'แผนกรายงานว่ามีงบประมาณเหลือ' },
      { id: 'fin-8', term: 'deficit', pos: 'n.', meaningTh: 'ขาดดุล', exampleEn: 'The company is trying to reduce its deficit.', exampleTh: 'บริษัทกำลังพยายามลดการขาดดุล' },
      { id: 'fin-9', term: 'asset', pos: 'n.', meaningTh: 'สินทรัพย์', exampleEn: 'Real estate is one of the company\'s main assets.', exampleTh: 'อสังหาริมทรัพย์เป็นหนึ่งในสินทรัพย์หลักของบริษัท' },
      { id: 'fin-10', term: 'liability', pos: 'n.', meaningTh: 'หนี้สิน', exampleEn: 'The report lists all current liabilities.', exampleTh: 'รายงานแสดงหนี้สินหมุนเวียนทั้งหมด' },
      { id: 'fin-11', term: 'installment', pos: 'n.', meaningTh: 'การผ่อนชำระ', exampleEn: 'You can pay in monthly installments.', exampleTh: 'คุณสามารถผ่อนชำระเป็นรายเดือนได้' },
      { id: 'fin-12', term: 'fiscal year', pos: 'n.', meaningTh: 'ปีงบประมาณ', exampleEn: 'The fiscal year ends in March.', exampleTh: 'ปีงบประมาณสิ้นสุดในเดือนมีนาคม' },
      { id: 'fin-13', term: 'projection', pos: 'n.', meaningTh: 'การคาดการณ์', exampleEn: 'Sales projections look promising for next year.', exampleTh: 'การคาดการณ์ยอดขายดูมีแนวโน้มดีสำหรับปีหน้า' },
      { id: 'fin-14', term: 'overdue', pos: 'adj.', meaningTh: 'เกินกำหนด', exampleEn: 'The payment is now two weeks overdue.', exampleTh: 'การชำระเงินเกินกำหนดมาแล้วสองสัปดาห์' },
      { id: 'fin-15', term: 'shareholder', pos: 'n.', meaningTh: 'ผู้ถือหุ้น', exampleEn: 'Shareholders will vote on the merger next month.', exampleTh: 'ผู้ถือหุ้นจะลงคะแนนเรื่องการควบรวมกิจการเดือนหน้า' },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing & Advertising',
    titleTh: 'บทที่ 5: การตลาดและโฆษณา',
    description: 'คำศัพท์เกี่ยวกับแคมเปญโฆษณา แบรนด์ และการวิจัยตลาด',
    words: [
      { id: 'mkt-1', term: 'campaign', pos: 'n.', meaningTh: 'แคมเปญ', exampleEn: 'The new ad campaign launches next week.', exampleTh: 'แคมเปญโฆษณาใหม่จะเปิดตัวสัปดาห์หน้า' },
      { id: 'mkt-2', term: 'target audience', pos: 'n.', meaningTh: 'กลุ่มเป้าหมาย', exampleEn: 'Our target audience is young professionals.', exampleTh: 'กลุ่มเป้าหมายของเราคือคนวัยทำงานรุ่นใหม่' },
      { id: 'mkt-3', term: 'brand awareness', pos: 'n.', meaningTh: 'การรับรู้แบรนด์', exampleEn: 'The campaign boosted brand awareness significantly.', exampleTh: 'แคมเปญนี้ช่วยเพิ่มการรับรู้แบรนด์อย่างมาก' },
      { id: 'mkt-4', term: 'endorse', pos: 'v.', meaningTh: 'รับรอง/สนับสนุน', exampleEn: 'A famous athlete endorses the sports brand.', exampleTh: 'นักกีฬาชื่อดังเป็นผู้รับรองแบรนด์กีฬานี้' },
      { id: 'mkt-5', term: 'discount', pos: 'n.', meaningTh: 'ส่วนลด', exampleEn: 'Customers get a 20% discount this week.', exampleTh: 'ลูกค้าจะได้ส่วนลด 20% สัปดาห์นี้' },
      { id: 'mkt-6', term: 'consumer', pos: 'n.', meaningTh: 'ผู้บริโภค', exampleEn: 'Consumer demand for eco-friendly products is rising.', exampleTh: 'ความต้องการของผู้บริโภคต่อสินค้าเป็นมิตรกับสิ่งแวดล้อมเพิ่มขึ้น' },
      { id: 'mkt-7', term: 'market share', pos: 'n.', meaningTh: 'ส่วนแบ่งตลาด', exampleEn: 'The company gained market share this quarter.', exampleTh: 'บริษัทได้ส่วนแบ่งตลาดเพิ่มขึ้นในไตรมาสนี้' },
      { id: 'mkt-8', term: 'launch', pos: 'v./n.', meaningTh: 'เปิดตัว', exampleEn: 'The product launch was a huge success.', exampleTh: 'การเปิดตัวสินค้าประสบความสำเร็จอย่างมาก' },
      { id: 'mkt-9', term: 'feedback', pos: 'n.', meaningTh: 'ความคิดเห็นตอบกลับ', exampleEn: 'We collected customer feedback through a survey.', exampleTh: 'เราเก็บความคิดเห็นลูกค้าผ่านแบบสำรวจ' },
      { id: 'mkt-10', term: 'competitor', pos: 'n.', meaningTh: 'คู่แข่ง', exampleEn: 'Our main competitor lowered its prices.', exampleTh: 'คู่แข่งหลักของเราลดราคาสินค้า' },
      { id: 'mkt-11', term: 'sponsor', pos: 'n./v.', meaningTh: 'ผู้สนับสนุน/สนับสนุน', exampleEn: 'The event is sponsored by a local bank.', exampleTh: 'งานนี้ได้รับการสนับสนุนจากธนาคารท้องถิ่น' },
      { id: 'mkt-12', term: 'demographic', pos: 'n.', meaningTh: 'ข้อมูลประชากร', exampleEn: 'The survey covers a wide demographic range.', exampleTh: 'แบบสำรวจครอบคลุมข้อมูลประชากรที่หลากหลาย' },
      { id: 'mkt-13', term: 'promotional', pos: 'adj.', meaningTh: 'เกี่ยวกับการส่งเสริมการขาย', exampleEn: 'The store is offering promotional items this month.', exampleTh: 'ร้านค้ามีสินค้าส่งเสริมการขายเดือนนี้' },
      { id: 'mkt-14', term: 'subscription', pos: 'n.', meaningTh: 'การสมัครสมาชิก', exampleEn: 'The magazine offers an annual subscription discount.', exampleTh: 'นิตยสารมีส่วนลดสำหรับการสมัครสมาชิกรายปี' },
      { id: 'mkt-15', term: 'retail', pos: 'n./adj.', meaningTh: 'การขายปลีก', exampleEn: 'Retail sales increased during the holiday season.', exampleTh: 'ยอดขายปลีกเพิ่มขึ้นในช่วงเทศกาล' },
    ],
  },
]

export function findWordById(wordId: string) {
  for (const chapter of vocabChapters) {
    const word = chapter.words.find((w) => w.id === wordId)
    if (word) return word
  }
  return undefined
}

export function allWords() {
  return vocabChapters.flatMap((c) => c.words)
}
