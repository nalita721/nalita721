/**
 * Real photographs for TOEIC Part 1 items, keyed by an item's `imageId`.
 * An id listed here shows the photo; any other id falls back to the drawn
 * scene in SceneIllustration. Files live in public/photos/part1/ (1280px
 * wide JPEG). Every photo is free to reuse; the credit is shown under it.
 */
export interface ScenePhoto {
  src: string
  /** English description for screen readers; never shown as a hint */
  alt: string
  author: string
  license: string
  sourceUrl: string
}

export const scenePhotos: Record<string, ScenePhoto> = {
  'handshake-cafe': {
    src: '/photos/part1/handshake-cafe.jpg',
    alt: 'Two people shaking hands across a café table',
    author: 'rawpixel.com',
    license: 'CC0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Business_agreement_handshake_at_coffee_shop.jpg',
  },
  'typing-desk': {
    src: '/photos/part1/typing-desk.jpg',
    alt: 'A woman typing on a laptop at a desk',
    author: 'Shixart1985',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Middle-aged_businesswoman_typing_on_laptop_at_home_office.jpg',
  },
  'unloading-truck': {
    src: '/photos/part1/unloading-truck.jpg',
    alt: 'Two men unloading boxes from the back of a truck',
    author: 'Derek Bridges',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Vendor_central_-_unloading_from_truck,_New_Orleans_Mardi_Gras_2011.jpg',
  },
  'chefs-kitchen': {
    src: '/photos/part1/chefs-kitchen.jpg',
    alt: 'Chefs cooking over open flames in a restaurant kitchen',
    author: 'Matthias Ripp',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cooking,_2015.jpg',
  },
  'boarding-bus': {
    src: '/photos/part1/boarding-bus.jpg',
    alt: 'Passengers getting on a city bus at a bus stop',
    author: '4300streetcar',
    license: 'CC BY 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Passengers_boarding_MBTA_39_bus_March_2025.jpg',
  },
  'printer-repair': {
    src: '/photos/part1/printer-repair.jpg',
    alt: 'A man repairing an opened printer on a table',
    author: 'Robo Michalec',
    license: 'CC0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Repairing_printer.jpg',
  },
  'handshake-desk': {
    src: '/photos/part1/handshake-desk.jpg',
    alt: 'Two people shaking hands over a desk with notebooks',
    author: 'perzon seo',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Business_man_and_woman_handshake_in_work_office.jpg',
  },
  'typing-sofa': {
    src: '/photos/part1/typing-sofa.jpg',
    alt: 'A woman typing on a laptop in a living room',
    author: 'Nenad Stojkovic',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Woman_smiling_while_typing_on_a_laptop._(51533492745).jpg',
  },
  'lifting-box': {
    src: '/photos/part1/lifting-box.jpg',
    alt: 'Men loading a large cardboard box onto a truck',
    author: 'Saiphani02',
    license: 'CC BY 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Volunteers_loading_boxes_of_clothes_onto_truck.jpg',
  },
  'plating-food': {
    src: '/photos/part1/plating-food.jpg',
    alt: 'A chef finishing plates of food on a steel counter',
    author: 'U.S. Army photo by Cpl. Hyung Ju Lee',
    license: 'Public domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Eighth_Army_Chef_of_the_Year_competition_(9182185).jpg',
  },
  'crowded-bus': {
    src: '/photos/part1/crowded-bus.jpg',
    alt: 'Passengers crowding onto a bus',
    author: 'YVSREDDY',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Passengers_boarding_on_Bus_(YS).jpg',
  },
  'handshake-meeting': {
    src: '/photos/part1/handshake-meeting.jpg',
    alt: 'A man and a woman shaking hands across a glass meeting table',
    author: 'amtec_photos',
    license: 'CC BY-SA 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Shaking_Hands_-_Man_and_Woman.jpg',
  },
  'typing-pastries': {
    src: '/photos/part1/typing-pastries.jpg',
    alt: 'A woman typing on a laptop beside a doughnut and a croissant',
    author: 'Nenad Stojkovic',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Woman_typing_on_the_laptop._One_tray_with_a_donut_and_one_tray_with_a_croissant_next_to_her_-_51524764031.jpg',
  },
  'forklift-truck': {
    src: '/photos/part1/forklift-truck.jpg',
    alt: 'A forklift loading cargo into a truck while a worker guides it',
    author: 'PEO ACWA',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Blue_Grass_Chemical_Agent-Destruction_Pilot_Plant_Container_Storage_Facility_(50612942223).jpg',
  },
  'chefs-counter': {
    src: '/photos/part1/chefs-counter.jpg',
    alt: 'Chefs preparing food at a counter with diners behind them',
    author: 'Paul Keller',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Chefs_at_work_(8150562599).jpg',
  },
  'tour-bus-night': {
    src: '/photos/part1/tour-bus-night.jpg',
    alt: 'A group of people boarding a coach at night',
    author: 'An Errant Knight',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tour_group_boarding_bus_at_Provo_station,_Jul_16.jpg',
  },
  'handshake-outdoors': {
    src: '/photos/part1/handshake-outdoors.jpg',
    alt: 'A man in a suit shaking hands with a young woman outdoors',
    author: 'Shane T. McCoy',
    license: 'Public domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:U.S._Marshal_shakes_hand_with_Police_Explorer.jpg',
  },
  'laptop-wooden-table': {
    src: '/photos/part1/laptop-wooden-table.jpg',
    alt: 'A woman using a laptop at a wooden table',
    author: 'Shixart1985',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Woman_works_on_laptop_at_wooden_table.jpg',
  },
  'box-delivery-truck': {
    src: '/photos/part1/box-delivery-truck.jpg',
    alt: 'A worker lifting a box overhead beside a parked delivery truck',
    author: '玄史生',
    license: 'CC0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Driver_of_Taiwan_Pelican_Unloaded_Box_from_Truck_20150217.jpg',
  },
  'driver-beside-bus': {
    src: '/photos/part1/driver-beside-bus.jpg',
    alt: 'A man standing beside a parked bus',
    author: 'NPS Photo / Emily Mesner',
    license: 'Public domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Denali_transit_bus_driver_Gary_at_the_Teklanika_Rest_Stop_on_Aug._29,_2019._Buses_in_Denali_are_operated_by_a_concessionaire._(52440df3-ed7c-49d3-ad77-e04bda19fbd8).JPG',
  },
  'copier-office': {
    src: '/photos/part1/copier-office.jpg',
    alt: 'A large copy machine standing in an office',
    author: 'Baron Maddock',
    license: 'CC BY 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Canon_ImageRUNNER_Advance_C7570i_photocopier.jpg',
  },
  'copier-tray': {
    src: '/photos/part1/copier-tray.jpg',
    alt: 'Printed papers lying in the open output tray of a copy machine',
    author: 'Dennis Sylvester Hurd',
    license: 'CC0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:The_Closest_Photocopier_(3594209596).jpg',
  },
  'copier-table': {
    src: '/photos/part1/copier-table.jpg',
    alt: 'A copy machine next to a table and some boxes',
    author: 'Baron Maddock',
    license: 'CC BY 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Konica_Minolta_Bizhub_C454e_photocopier.jpg',
  },
  'pots-stove': {
    src: '/photos/part1/pots-stove.jpg',
    alt: 'Two large pots on an old stove in a restaurant',
    author: 'Gnangcomapp',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Alfred%27s_k_gn_221.jpg',
  },
}
