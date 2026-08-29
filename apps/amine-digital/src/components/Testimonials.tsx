import { Fade } from './Reveal'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  return (
    <section className="bg-bg py-16 sm:py-20 lg:pb-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            5
          </span>
          <span className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-sm px-3 sm:px-4 py-1 sm:py-1.5">
            Avis clients
          </span>
        </div>

        <Fade className="border-2 border-dashed border-gray-300 rounded-md py-14 px-8 text-center bg-surface2/40">
          <Quote size={26} className="text-gov/40 mx-auto mb-4" />
          <p className="text-sm font-medium text-gray-600 max-w-sm mx-auto">
            Les premiers avis clients apparaîtront ici dès les premiers projets livrés.
          </p>
        </Fade>
      </div>
    </section>
  )
}
