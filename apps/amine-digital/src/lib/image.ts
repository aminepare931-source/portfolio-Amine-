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
