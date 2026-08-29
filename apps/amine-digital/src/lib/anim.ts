export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const EASE_INOUT: [number, number, number, number] = [0.65, 0.05, 0.36, 1]
export const EASE_SOFT: [number, number, number, number] = [0.25, 1, 0.5, 1]
export const EASE_SNAPPY: [number, number, number, number] = [0.4, 0, 0.2, 1]

export const EASE_OUT_CSS = `cubic-bezier(${EASE_OUT.join(',')})`
export const EASE_INOUT_CSS = `cubic-bezier(${EASE_INOUT.join(',')})`
export const EASE_SOFT_CSS = `cubic-bezier(${EASE_SOFT.join(',')})`