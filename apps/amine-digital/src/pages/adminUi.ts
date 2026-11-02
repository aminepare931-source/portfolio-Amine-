export const input = 'w-full border border-stroke rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-clay'
export const btn = 'inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-xs font-semibold border transition-colors'
export type Call = <T>(fn: string, args?: Record<string, unknown>) => Promise<T>
export interface TabProps { call: Call; notify: (t: string) => void; onChange?: () => void }
