'use client'
import { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'

// Opciones:
// A) Mailchimp: cambia la acción del formulario por tu URL de Mailchimp
// B) Beehiiv / ConvertKit / Substack: usa un iframe o link directo
// C) API propia si tienes backend

const MAILCHIMP_ACTION = '#newsletter-placeholder'

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Con Mailchimp real: el form hace POST al action de Mailchimp
    // Por ahora simulamos el éxito
    if (email) setEnviado(true)
  }

  return (
    <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold mb-2">
          Recibe actualizaciones de la calculadora
        </h2>
        <p className="text-slate-300 mb-6 text-sm">
          Nuevas funciones, cambios en el IRPF, mejores brokers y estrategias FIRE para España.
          Sin spam, solo contenido útil.
        </p>

        {enviado ? (
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4 text-emerald-300 font-medium">
            ✓ ¡Apuntado! Te avisaremos cuando haya novedades.
          </div>
        ) : (
          <form
            action={MAILCHIMP_ACTION}
            method="post"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
            >
              Suscribirme
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-slate-500 text-xs mt-4">
          Sin spam. Puedes darte de baja en cualquier momento.
        </p>
      </div>
    </section>
  )
}
