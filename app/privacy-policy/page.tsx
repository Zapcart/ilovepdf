import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - PDFMaster Tools',
  description: 'Privacy Policy for PDFMaster Tools. Learn how we protect your privacy and handle your data.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            PDFMaster Tools (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our website 
            and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            PDFMaster Tools is designed with privacy in mind. We collect minimal information:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>No File Storage:</strong> We do not store, upload, or access your PDF files. All processing happens locally in your browser.</li>
            <li><strong>Usage Data:</strong> We may collect anonymous usage statistics to improve our services.</li>
            <li><strong>Contact Information:</strong> If you contact us, we collect the information you provide in your message.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Provide and improve our PDF processing services</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Ensure the security and functionality of our website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            Your privacy is our priority. All PDF processing happens entirely in your browser using client-side 
            technology. Your files never leave your device and are never uploaded to our servers. We implement 
            appropriate technical and organizational measures to protect any data we do collect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website may use third-party services such as Google AdSense for advertising. These services may 
            collect information about your visits to our website and other websites. Please review their privacy 
            policies for more information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
          <p className="text-gray-700 leading-relaxed">
            We may use cookies and similar tracking technologies to enhance your experience. You can control 
            cookie preferences through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Access any personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of certain data collection practices</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have questions about this Privacy Policy, please contact us through our 
            <a href="/contact" className="text-primary-600 hover:text-primary-700"> contact page</a>.
          </p>
        </section>
      </div>
    </div>
  )
}

