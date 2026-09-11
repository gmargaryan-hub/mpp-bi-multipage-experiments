import type { Metadata } from 'next'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Terms of Use | MPP Insights',
  description: 'Review the terms and conditions for using the MPP Insights website.',
  robots: { index: false, follow: false },
}

export default function TermsOfUsePage() {
  return (
    <LegalPageLayout title="Terms of Use" effectiveDate="09/11/2026">
      <div className="legal-content">
        <p>
          Welcome to mpp-insights.com. This website is operated by MPP Insights, a data
          engineering and business intelligence consultancy headquartered in Richmond,
          Virginia.
        </p>
        <p>
          These Terms of Use govern your use of our website. By accessing or using
          mpp-insights.com, you agree to these terms.
        </p>

        <h2>1. Use of the Website</h2>
        <p>You agree to use the website in a lawful and reasonable way. You must not:</p>
        <ul>
          <li>Use this website for any illegal or unauthorized purpose</li>
          <li>Attempt to hack, disrupt, or damage the website or our systems</li>
          <li>Copy, scrape, or extract large amounts of content from the website using automated tools</li>
          <li>Misrepresent your identity or affiliation when contacting us</li>
          <li>Transmit viruses, malware, or any harmful code</li>
          <li>Violate any applicable laws or regulations while using this website</li>
        </ul>
        <p>We reserve the right to suspend or block access to anyone who violates these terms.</p>

        <h2>2. Intellectual Property</h2>
        <p>All content on this website is owned by MPP Insights. This includes:</p>
        <ul>
          <li>Text, articles, and written materials</li>
          <li>Images, graphics, and visual design</li>
          <li>Logos, trademarks, and brand assets</li>
          <li>Website code and technical architecture</li>
        </ul>
        <p>
          You can view and browse our content, share links to our website, and quote brief
          excerpts with proper attribution.
        </p>
        <p>
          You cannot copy substantial portions of our content for your own use, republish
          entire articles, or use our logos and trademarks without permission. If you&apos;d
          like to use our content in other ways, contact us at{' '}
          <a href="mailto:welcome@mpp-insights.com">welcome@mpp-insights.com</a>.
        </p>

        <h2>3. Links to Other Websites</h2>
        <p>
          Our website may contain links to third-party websites, resources, or services.
          These links are provided for your convenience.
        </p>
        <p>We do not control, endorse, or assume responsibility for:</p>
        <ul>
          <li>The content of third-party websites</li>
          <li>The privacy practices of external sites</li>
          <li>Any products or services offered by third parties</li>
        </ul>
        <p>
          When you click on external links, you leave our website and do so at your own risk.
          We recommend reviewing the terms and privacy policies of any third-party sites you
          visit.
        </p>

        <h2>4. Disclaimer</h2>
        <p>
          This website and all information on it are provided &quot;as is&quot; without
          warranties of any kind, either express or implied.
        </p>
        <p>We do not guarantee that:</p>
        <ul>
          <li>The website will always be available or uninterrupted</li>
          <li>The website will be free from errors or technical issues</li>
          <li>Information on the website is always accurate, complete, or current</li>
        </ul>
        <p>
          The information on this website is for general informational purposes only. It does
          not constitute professional advice. For specific guidance related to your business
          or technical needs, please contact us directly.
        </p>
        <p>We may update, change, or remove content from this website at any time without notice.</p>

        <h2>5. Limitation of Liability</h2>
        <p>
          To the maximum extent allowed by law, MPP Insights is not liable for any loss or
          damage resulting from:
        </p>
        <ul>
          <li>Your use of (or inability to use) this website</li>
          <li>Technical issues, errors, or interruptions</li>
          <li>Inaccuracies or omissions in website content</li>
          <li>Actions you take based on information found on this website</li>
          <li>Third-party websites or links</li>
        </ul>
        <p>
          This includes direct, indirect, incidental, consequential, or punitive damages,
          even if we have been advised of the possibility of such damages.
        </p>

        <h2>7. Changes to These Terms</h2>
        <p>
          We may update these Terms of Use from time to time to reflect changes in our
          practices or legal requirements.
        </p>
        <p>When we make changes:</p>
        <ul>
          <li>We will post the updated Terms on this page</li>
          <li>We will update the &quot;Effective Date&quot; at the top of this document</li>
        </ul>

        <h2>8. Contact</h2>
        <p>If you have questions about these Terms of Use, please contact us:</p>
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
