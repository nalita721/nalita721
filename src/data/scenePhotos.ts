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
}
