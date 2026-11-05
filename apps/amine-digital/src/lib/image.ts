/** Réduit une image (côté le plus long = maxSide) et la compresse en JPEG avant envoi. */
export async function resizeImage(file: File, maxSide = 1000, quality = 0.82): Promise<{ dataUrl: string; w: number; h: number }> {
  const bmp = await createImageBitmap(file)
  const k = Math.min(1, maxSide / Math.max(bmp.width, bmp.height))
  const w = Math.round(bmp.width * k), h = Math.round(bmp.height * k)
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h)
  ctx.drawImage(bmp, 0, 0, w, h)
  return { dataUrl: c.toDataURL('image/jpeg', quality), w, h }
}

/** Comme resizeImage, mais renvoie un fichier JPEG (pour l'envoyer dans le stockage plutôt que dans la base). */
export async function resizeToBlob(file: File, maxSide = 1600, quality = 0.84): Promise<{ blob: Blob; w: number; h: number }> {
  const bmp = await createImageBitmap(file)
  const k = Math.min(1, maxSide / Math.max(bmp.width, bmp.height))
  const w = Math.round(bmp.width * k), h = Math.round(bmp.height * k)
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h)
  ctx.drawImage(bmp, 0, 0, w, h)
  const blob = await new Promise<Blob | null>((res) => c.toBlob(res, 'image/jpeg', quality))
  if (!blob) throw new Error('image illisible')
  return { blob, w, h }
}

/** Image de couverture tirée d'une vidéo (première seconde). Renvoie null si le navigateur n'y arrive pas. */
export async function videoPoster(file: File): Promise<{ blob: Blob; w: number; h: number } | null> {
  const url = URL.createObjectURL(file)
  try {
    const v = document.createElement('video')
    v.muted = true; v.playsInline = true; v.preload = 'auto'; v.src = url
    await new Promise<void>((res, rej) => { v.onloadeddata = () => res(); v.onerror = () => rej(new Error('vidéo illisible')); setTimeout(() => rej(new Error('délai')), 8000) })
    v.currentTime = Math.min(1, (v.duration || 1) / 2)
    await new Promise<void>((res, rej) => { v.onseeked = () => res(); setTimeout(() => rej(new Error('délai')), 8000) })
    const k = Math.min(1, 1280 / Math.max(v.videoWidth, v.videoHeight))
    const w = Math.round(v.videoWidth * k), h = Math.round(v.videoHeight * k)
    const c = document.createElement('canvas'); c.width = w; c.height = h
    c.getContext('2d')!.drawImage(v, 0, 0, w, h)
    const blob = await new Promise<Blob | null>((res) => c.toBlob(res, 'image/jpeg', 0.82))
    return blob ? { blob, w, h } : null
  } catch { return null } finally { URL.revokeObjectURL(url) }
}
