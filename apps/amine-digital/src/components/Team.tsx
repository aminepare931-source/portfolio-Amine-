import { useEffect, useState } from 'react'
import { User } from 'lucide-react'
import { fetchTeam } from '../lib/supabase'
import { Fade } from './Reveal'
import { TEAM, type Member, type TeamGroup } from '../data/team'

const GROUPS: TeamGroup[] = ['Fondateur', 'Associés', 'Collaborateurs']

export default function Team() {
  const [remote, setRemote] = useState<Member[]>([])
  useEffect(() => {
    fetchTeam().then((rows) => setRemote(rows.map((r) => ({ name: r.name, role: r.role, group: r.grp, photo: r.photo ?? undefined, bio: r.bio ?? undefined }))))
  }, [])
  const all = [...TEAM, ...remote.filter((r) => !TEAM.some((t) => t.name.toLowerCase() === r.name.toLowerCase()))]

  return (
    <section className="mb-16">
      <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Équipe</div>
      <h2 className="font-display text-3xl mb-8">Les personnes derrière AMINE DIGITAL</h2>
      {GROUPS.map((g) => {
        const members = all.filter((m) => m.group === g)
        if (!members.length) return null
        return (
          <div key={g} className="mb-10">
            <div className="text-sm font-medium text-muted mb-4">{g}</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((m) => (
                <Fade key={m.name}>
                  <div className="h-full flex items-start gap-4 border border-stroke rounded-md p-5 bg-surface/30">
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} loading="lazy" className="w-16 h-16 rounded-full object-cover border-2 border-clay/30 shrink-0" />
                    ) : (
                      <span className="w-16 h-16 rounded-full bg-clay/10 text-clay flex items-center justify-center shrink-0"><User size={24} /></span>
                    )}
                    <div>
                      <div className="font-display text-base">{m.name}</div>
                      <div className="text-xs text-clay font-mono uppercase tracking-wide mt-0.5">{m.role}</div>
                      {m.bio && <p className="text-xs text-muted leading-relaxed mt-2">{m.bio}</p>}
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
