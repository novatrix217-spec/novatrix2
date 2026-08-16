export function useCloudinaryUrl() {
  const cloudName = useRuntimeConfig().public.cloudinaryCloudName
  return (publicId?: string, transform = 'q_auto,f_auto') => {
    if (!publicId || !cloudName) return ''
    if (publicId.startsWith('http')) return publicId
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transform ? transform + '/' : ''}${publicId}`
  }
}
