import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions - PDFMaster Tools',
  description: 'Terms and Conditions for using PDFMaster Tools. Read our terms of service.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Terms and Conditions
        </h1>
        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing and using PDFMaster Tools, you accept and agree to be bound by the terms and 
            provision of this agreement. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Permission is granted to temporarily use PDFMaster Tools for personal, non-commercial use. 
            This license does not include:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Modification or copying of materials</li>
            <li>Use of materials for commercial purposes</li>
            <li>Removal of copyright or proprietary notations</li>
            <li>Transfer of materials to another person or server</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed">
            The materials on PDFMaster Tools are provided on an &apos;as is&apos; basis. We make no warranties, 
            expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, 
            implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
            of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations</h2>
          <p className="text-gray-700 leading-relaxed">
            In no event shall PDFMaster Tools or its suppliers be liable for any damages (including, without 
            limitation, damages for loss of data or profit, or due to business interruption) arising out of the 
            use or inability to use the materials on our website, even if we or an authorized representative 
            have been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy of Materials</h2>
          <p className="text-gray-700 leading-relaxed">
            The materials appearing on PDFMaster Tools could include technical, typographical, or photographic 
            errors. We do not warrant that any of the materials on our website are accurate, complete, or current. 
            We may make changes to the materials contained on our website at any time without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Uses</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You may not use our services:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications</h2>
          <p className="text-gray-700 leading-relaxed">
            PDFMaster Tools may revise these terms of service at any time without notice. By using this website, 
            you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about these Terms and Conditions, please contact us through our 
            <a href="/contact" className="text-primary-600 hover:text-primary-700"> contact page</a>.
          </p>
        </section>
      </div>
    </div>
  )
}

