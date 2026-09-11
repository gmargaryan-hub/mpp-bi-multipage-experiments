import type { Metadata } from 'next'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy | MPP Insights',
  description:
    'Read how MPP Insights collects, uses, and protects your information when you visit our website.',
  robots: { index: false, follow: false },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" effectiveDate="09/11/2026">
      <div className="legal-content">
        <p>
          This Privacy Policy explains how MPP Insights collects, uses, and protects
          information when you visit mpp-insights.com.
        </p>
        <p>
          If you have questions, contact us at{' '}
          <a href="mailto:welcome@mpp-insights.com">welcome@mpp-insights.com</a>.
        </p>

        <h2>1. Information We Collect</h2>

        <h3>Information You Provide:</h3>
        <ul>
          <li>Name, email, phone number, and message when you contact us</li>
          <li>Email address if you subscribe to our newsletter</li>
        </ul>

        <h3>Information Collected Automatically:</h3>
        <ul>
          <li>Pages you visit, time on site, links clicked</li>
          <li>IP address, browser type, device information</li>
          <li>Referral source (which site brought you here)</li>
        </ul>

        <p>
          We collect this through cookies and similar technologies. See our{' '}
          <a href="/cookie-policy">Cookie Policy</a> for details.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Respond to your inquiries and consultation requests</li>
          <li>Send newsletters with important updates about our services and company</li>
          <li>Understand how visitors use our site and improve it</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>You can unsubscribe from newsletters anytime using the link in any email.</p>

        <h2>3. How We Share Your Information</h2>
        <p>We do not sell your information.</p>
        <p>We share information only with:</p>
        <ul>
          <li><strong>Google Analytics:</strong> For website traffic analysis</li>
          <li><strong>Mailchimp:</strong> For newsletter distribution</li>
          <li><strong>Legal authorities:</strong> If required by law</li>
        </ul>
        <p>These providers are contractually required to protect your information.</p>

        <h2>4. Data Security</h2>
        <p>
          We use reasonable security measures including HTTPS encryption and limited access
          controls. However, no system is completely secure.
        </p>

        <h2>5. Data Retention</h2>
        <p>
          We retain your information for as long as necessary to fulfill the purposes
          described in this Privacy Policy:
        </p>
        <ul>
          <li>
            <strong>Contact form inquiries:</strong> We keep your information as long as
            needed to respond to your inquiry and maintain business records (typically 3-5
            years)
          </li>
          <li><strong>Newsletter subscriptions:</strong> We keep your email address until you unsubscribe</li>
          <li>
            <strong>Website analytics:</strong> Usage data is typically retained for 14
            months (Google Analytics default)
          </li>
        </ul>

        <h2>6. Your Rights</h2>
        <p>You can:</p>
        <ul>
          <li>Ask us to correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt out of newsletters anytime</li>
        </ul>
        <p>
          Contact us at <a href="mailto:welcome@mpp-insights.com">welcome@mpp-insights.com</a>{' '}
          to exercise these rights.
        </p>

        <h2>7. Third-Party Links</h2>
        <p>
          We are not responsible for the privacy practices of linked third-party websites.
          Review their privacy policies before providing information.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this
          page with a new effective date.
        </p>

        <h2>9. Contact Us</h2>
        <p>If you have questions about these privacy policies, please contact us:</p>
        <p>
          <strong>MPP Insights</strong>
          <br />
          Email: <a href="mailto:welcome@mpp-insights.com">welcome@mpp-insights.com</a>
          <br />
          Website: <a href="https://mpp-insights.com">mpp-insights.com</a>
        </p>
      </div>
    </LegalPageLayout>
  )
}
