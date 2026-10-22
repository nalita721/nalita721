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

export const scenePhotos: Record<string, ScenePhoto> = {}
