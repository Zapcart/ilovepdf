import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer - PDFMaster Tools',
  description: 'Disclaimer for PDFMaster Tools. Important information about our services.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Disclaimer
        </h1>
        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">General Information</h2>
          <p className="text-gray-700 leading-relaxed">
            The information on this website is provided on an &apos;as is&apos; basis. To the fullest extent 
            permitted by law, PDFMaster Tools excludes all representations, warranties, conditions, and terms 
            relating to our website and the use of this website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Warranties</h2>
          <p className="text-gray-700 leading-relaxed">
            PDFMaster Tools makes no warranties, representations, or guarantees of any kind, express or implied, 
            regarding the operation of our website or the information, content, materials, or products included 
            on our website. This includes, but is not limited to, implied warranties of merchantability and 
            fitness for a particular purpose.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            PDFMaster Tools will not be liable for any damages of any kind arising from the use of this website, 
            including, but not limited to, direct, indirect, incidental, punitive, and consequential damages. 
            This limitation applies regardless of the legal theory on which the claim is based.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">File Processing</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            While we strive to provide accurate and reliable PDF processing services:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>We do not guarantee that all PDF files will process correctly</li>
            <li>Complex PDFs with advanced features may not be fully supported</li>
            <li>Results may vary depending on the complexity and structure of your PDF files</li>
            <li>We recommend backing up your files before processing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Content</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website may contain links to third-party websites or services. We are not responsible for the 
            content, privacy policies, or practices of any third-party websites or services. You acknowledge and 
            agree that PDFMaster Tools shall not be responsible or liable for any damage or loss caused by or in 
            connection with the use of any such content, goods, or services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy of Information</h2>
          <p className="text-gray-700 leading-relaxed">
            We endeavor to keep the information on our website up to date and correct. However, we make no 
            representations or warranties of any kind, express or implied, about the completeness, accuracy, 
            reliability, suitability, or availability of the information, products, services, or related graphics 
            contained on the website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibility</h2>
          <p className="text-gray-700 leading-relaxed">
            Users are responsible for ensuring that they have the legal right to process any files they upload 
            to our website. PDFMaster Tools is not responsible for any copyright infringement or other legal issues 
            that may arise from the use of our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify this disclaimer at any time. Changes will be effective immediately 
            upon posting to the website. Your continued use of the website after any changes constitutes your 
            acceptance of the new disclaimer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Disclaimer, please contact us through our 
            <a href="/contact" className="text-primary-600 hover:text-primary-700"> contact page</a>.
          </p>
        </section>
      </div>
    </div>
  )
}

