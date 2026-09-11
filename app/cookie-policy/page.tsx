import type { Metadata } from 'next'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Cookie Policy | MPP Insights',
  description:
    'Learn about the cookies we use on mpp-insights.com, how they help improve your experience, and how to control them.',
  robots: { index: false, follow: false },
}

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy" effectiveDate="09/11/2026">
      <div className="legal-content">
        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that websites store on your device when you visit them.
          They help websites remember information about your visit and improve your experience.
        </p>

        <h2>2. Cookies We Use</h2>
        <p>
          We use Google Analytics to understand how visitors use our website. This helps us
          improve the site and provide better content.
        </p>

        <h3>What these cookies do:</h3>
        <ul>
          <li>Count how many people visit our site</li>
          <li>Track which pages are most popular</li>
          <li>Understand how visitors navigate the site</li>
          <li>Measure how long people stay on different pages</li>
        </ul>

        <h3>Information collected:</h3>
        <ul>
          <li>Pages you visit</li>
          <li>Time spent on the site</li>
          <li>How you arrived at our site (search engine, direct link, etc.)</li>
          <li>Your general location (city/country level, not exact address)</li>
          <li>Device type and browser</li>
        </ul>

        <p>This data is anonymous. We cannot identify you personally from this information.</p>

        <p>
          Learn more:{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Analytics Privacy Policy
          </a>
        </p>

        <h2>3. Why We Use Cookies</h2>
        <p>We use cookies to:</p>
        <ul>
          <li>Understand which content is most helpful to visitors</li>
          <li>Improve our website based on how people use it</li>
          <li>Identify technical issues</li>
          <li>Make better decisions about website design and content</li>
        </ul>

        <p>We do not use cookies for:</p>
        <ul>
          <li>Advertising or marketing tracking</li>
          <li>Selling your data to third parties</li>
          <li>Identifying you personally</li>
        </ul>

        <h2>4. How to Control Cookies</h2>
        <p>You can control or delete cookies through your browser settings:</p>
        <ul>
          <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
          <li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data</li>
          <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions</li>
        </ul>
        <p><strong>Note:</strong> If you block all cookies, some website features may not work properly.</p>

        <h2>5. How Long Cookies Last</h2>
        <ul>
          <li><strong>Google Analytics cookies</strong> last for 2 years from your last visit</li>
          <li>You can delete them anytime through your browser settings</li>
          <li>Cookies are automatically deleted after they expire</li>
        </ul>

        <h2>6. Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Changes will be posted on this
          page with a new effective date.
        </p>

        <h2>7. Contact Us</h2>
        <p>If you have questions about how we use cookies, contact us:</p>
        <p>
          <strong>Email:</strong> <a href="mailto:welcome@mpp-insights.com">welcome@mpp-insights.com</a>
          <br />
          <strong>Website:</strong> <a href="https://mpp-insights.com">mpp-insights.com</a>
        </p>
      </div>
    </LegalPageLayout>
  )
}
