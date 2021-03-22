export const slugify = (name: string): string => {
  return name.toLowerCase()
             .replace(/[\s\.'-]/g, '')
             .replace(/s$/, '')
}