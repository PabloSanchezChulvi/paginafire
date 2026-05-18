import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Calculadora FIRE España',
  description: 'Política de privacidad y uso de cookies de la Calculadora FIRE España.',
  robots: { index: false },
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-emerald-600 text-sm hover:underline mb-6 inline-block">
          ← Volver a la calculadora
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Privacidad</h1>
        <p className="text-gray-500 text-sm mb-8">
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8 prose prose-gray max-w-none">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Responsable del sitio</h2>
            <p className="text-gray-600">
              Esta web es operada de forma independiente. Para cualquier consulta relacionada con privacidad,
              puedes contactar a través del correo electrónico indicado en el pie de página.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Datos que recogemos</h2>
            <p className="text-gray-600 mb-3">
              Esta calculadora no almacena ningún dato personal. Todos los cálculos se realizan
              localmente en tu navegador y no se envían a ningún servidor.
            </p>
            <p className="text-gray-600">
              Recogemos de forma anónima datos de uso (páginas visitadas, tiempo en el sitio)
              a través de Google Analytics 4 con anonimización de IP activada.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Cookies y tecnologías de seguimiento</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-1">Google Analytics 4</h3>
                <p className="text-sm text-gray-600">
                  Usamos Google Analytics para entender cómo se usa la web y mejorar la calculadora.
                  Los datos son anónimos y se procesan en servidores de Google según su{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    política de privacidad
                  </a>.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-1">Google AdSense</h3>
                <p className="text-sm text-gray-600">
                  Mostramos anuncios de Google AdSense para financiar el mantenimiento gratuito
                  de esta herramienta. Google puede usar cookies para personalizar los anuncios.
                  Puedes gestionar tus preferencias en{' '}
                  <a
                    href="https://myadcenter.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    My Ad Center
                  </a>.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-1">Enlaces de afiliado</h3>
                <p className="text-sm text-gray-600">
                  Algunos enlaces de esta web son de afiliado. Si abres una cuenta a través de ellos,
                  podemos recibir una comisión sin coste adicional para ti. Esto nos ayuda a mantener
                  la calculadora gratuita.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Tus derechos</h2>
            <p className="text-gray-600 mb-3">
              Conforme al RGPD (Reglamento General de Protección de Datos), tienes derecho a:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la supresión de tus datos</li>
              <li>Oponerte al tratamiento</li>
              <li>Presentar una reclamación ante la AEPD (aepd.es)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Aviso legal</h2>
            <p className="text-gray-600">
              La información proporcionada por esta calculadora es meramente orientativa y no
              constituye asesoramiento financiero, fiscal ni de inversión. Los cálculos se basan
              en la normativa tributaria española vigente pero pueden contener imprecisiones.
              Consulta siempre con un asesor financiero cualificado antes de tomar decisiones de inversión.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
