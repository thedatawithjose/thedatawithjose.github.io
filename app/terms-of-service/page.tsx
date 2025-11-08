'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <motion.div
        className="relative bg-gradient-to-br from-[#0A192F] via-[#1A3A52] to-[#005A9C] text-white pt-16 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4">
          <nav className="mb-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <Link href="/" className="hover:text-green-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-green-400">Terms of Service</span>
            </div>
          </nav>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Terms of Service
          </motion.h1>
          <motion.p
            className="text-center text-gray-300 text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Last Updated: November 8, 2025
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service ("Terms") govern your use of data engineering consulting services 
                provided by Jose Acosta ("Service Provider", "we", "us", or "our") through datawithjose.tech 
                ("Website"). By engaging our services, you ("Client", "you", or "your") agree to be bound by these Terms.
              </p>
            </div>
          </section>

          {/* 1. Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Services Provided</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-700">1.1 Scope of Services</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              We provide data engineering consulting services including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li>Real-time data pipeline development and optimization</li>
              <li>Time-series analytics and modeling</li>
              <li>Data architecture design and implementation</li>
              <li>Cloud infrastructure setup and optimization (AWS, Snowflake, etc.)</li>
              <li>Data quality frameworks and monitoring</li>
              <li>Technical consulting and advisory services</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">1.2 Service Delivery</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Services are delivered remotely unless otherwise agreed in writing. Specific deliverables, 
              timelines, and milestones will be defined in a separate Statement of Work (SOW) or project agreement.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">1.3 Client Responsibilities</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Client agrees to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li>Provide timely access to necessary systems, data, and resources</li>
              <li>Designate a point of contact for project communication</li>
              <li>Provide timely feedback and approvals as outlined in the SOW</li>
              <li>Ensure compliance with all applicable laws and regulations regarding data access</li>
            </ul>
          </section>

          {/* 2. Payment Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">2. Payment Terms</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-700">2.1 Fees and Pricing</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Service fees are specified in the SOW or project agreement. Unless otherwise stated:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li>Hourly rates or fixed project fees will be clearly defined</li>
              <li>Rates are subject to change with 30 days' written notice for ongoing engagements</li>
              <li>All fees are in USD unless otherwise specified</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">2.2 Payment Schedule</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Unless otherwise agreed:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li>Fixed-price projects: 50% upfront, 50% upon completion</li>
              <li>Hourly engagements: Invoiced bi-weekly or monthly</li>
              <li>Payment is due within 15 days of invoice date</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">2.3 Late Payment</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Late payments may incur a fee of 1.5% per month (18% annually) or the maximum allowed by law, 
              whichever is less. Service Provider reserves the right to suspend services for accounts more than 
              30 days overdue.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">2.4 Expenses</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Client is responsible for reimbursing pre-approved expenses including cloud infrastructure costs, 
              third-party software licenses, and other project-specific costs. Expenses will be itemized on invoices.
            </p>
          </section>

          {/* 3. Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">3. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-700">3.1 Client-Owned IP</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Upon full payment, Client owns all custom code, documentation, and deliverables created specifically 
              for the project ("Work Product"). This excludes pre-existing materials and general methodologies.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">3.2 Service Provider IP</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Service Provider retains ownership of:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li>Pre-existing code, frameworks, and tools</li>
              <li>General methodologies and best practices</li>
              <li>Knowledge and experience gained during the engagement</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">3.3 Third-Party Components</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Work Product may include open-source or third-party components subject to their respective licenses. 
              Client is responsible for compliance with such licenses.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">3.4 Portfolio Rights</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Service Provider may use non-confidential aspects of the project (anonymized metrics, architecture 
              patterns, general approach) for portfolio, marketing, and case study purposes unless explicitly 
              prohibited in writing.
            </p>
          </section>

          {/* 4. Confidentiality */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">4. Confidentiality</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-700">4.1 Confidential Information</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Both parties agree to maintain confidentiality of proprietary information disclosed during the engagement. 
              Confidential Information includes business data, technical specifications, trade secrets, and any 
              information marked as confidential.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">4.2 Exceptions</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Confidentiality obligations do not apply to information that:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li>Is publicly available through no fault of the receiving party</li>
              <li>Was rightfully known prior to disclosure</li>
              <li>Is independently developed without use of confidential information</li>
              <li>Must be disclosed by law or court order</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">4.3 Data Security</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Service Provider implements reasonable security measures to protect Client data. However, Client 
              acknowledges that no system is completely secure and Service Provider is not liable for unauthorized 
              access beyond our reasonable control.
            </p>
          </section>

          {/* 5. Warranties and Disclaimers */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">5. Warranties and Disclaimers</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-700">5.1 Service Warranty</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Service Provider warrants that services will be performed in a professional and workmanlike manner 
              consistent with industry standards. Work Product will substantially conform to specifications in the 
              SOW for 30 days after delivery.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">5.2 Disclaimer</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-2">
                EXCEPT AS EXPRESSLY PROVIDED, SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, 
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
                PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Service Provider does not warrant that services will be uninterrupted, error-free, or meet all 
                Client requirements. Client is responsible for testing and validating all deliverables before 
                production deployment.
              </p>
            </div>
          </section>

          {/* 6. Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">6. Limitation of Liability</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">6.1 Maximum Liability</h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SERVICE PROVIDER'S TOTAL LIABILITY FOR ANY CLAIMS ARISING 
                FROM OR RELATED TO SERVICES SHALL NOT EXCEED THE TOTAL FEES PAID BY CLIENT IN THE 12 MONTHS 
                PRECEDING THE CLAIM, OR $10,000, WHICHEVER IS LESS.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">6.2 Excluded Damages</h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                IN NO EVENT SHALL SERVICE PROVIDER BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, 
                OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, OR BUSINESS INTERRUPTION, EVEN IF ADVISED 
                OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">6.3 Exceptions</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Limitations do not apply to liability arising from gross negligence, willful misconduct, or breach 
              of confidentiality obligations.
            </p>
          </section>

          {/* 7. Term and Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">7. Term and Termination</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-700">7.1 Term</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Engagement begins on the effective date specified in the SOW and continues until completion of 
              deliverables or termination per these Terms.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">7.2 Termination for Convenience</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Either party may terminate with 14 days' written notice. Client remains responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li>Payment for all work completed through termination date</li>
              <li>Reimbursement of non-refundable expenses incurred</li>
              <li>A termination fee of 25% of remaining project value for fixed-price projects</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">7.3 Termination for Cause</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Either party may terminate immediately if the other party:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li>Materially breaches these Terms and fails to cure within 7 days of written notice</li>
              <li>Becomes insolvent or files for bankruptcy</li>
              <li>Engages in fraud or illegal activity</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">7.4 Effect of Termination</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Upon termination:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li>Service Provider will deliver all completed Work Product</li>
              <li>Client will pay for all work completed and expenses incurred</li>
              <li>Confidentiality obligations survive termination</li>
              <li>Each party will return or destroy the other's confidential information</li>
            </ul>
          </section>

          {/* 8. General Provisions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">8. General Provisions</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-700">8.1 Independent Contractor</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Service Provider is an independent contractor, not an employee or agent of Client. Service Provider 
              is responsible for all taxes, insurance, and benefits.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">8.2 Governing Law</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              These Terms are governed by the laws of the State of New York, USA, without regard to conflict of 
              law principles. Any disputes will be resolved in the courts of New York County, New York.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">8.3 Dispute Resolution</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Parties agree to attempt good-faith negotiation for 30 days before pursuing legal action. If 
              negotiation fails, disputes may be submitted to binding arbitration under AAA Commercial Arbitration 
              Rules, or pursued in court per Section 8.2.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">8.4 Entire Agreement</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              These Terms, together with any SOW or project agreement, constitute the entire agreement between 
              parties and supersede all prior agreements. Modifications must be in writing and signed by both parties.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">8.5 Severability</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              If any provision is found unenforceable, the remaining provisions remain in full effect.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">8.6 Force Majeure</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Neither party is liable for delays or failures due to circumstances beyond reasonable control, 
              including natural disasters, war, terrorism, pandemics, or government actions.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">8.7 Assignment</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              Client may not assign these Terms without prior written consent. Service Provider may assign to 
              an affiliate or in connection with a merger or acquisition.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-700">8.8 Notices</h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              All notices must be in writing and sent to the email addresses specified in the SOW or to 
              datawithjose@outlook.com for Service Provider.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">9. Contact Information</h2>
            <p className="mb-4 text-gray-600 leading-relaxed">
              For questions about these Terms of Service, please contact:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-2"><strong>Jose Acosta</strong></p>
              <p className="mb-2"><strong>Email:</strong> datawithjose@outlook.com</p>
              <p className="mb-2"><strong>Website:</strong> datawithjose.tech</p>
            </div>
          </section>

          {/* Acceptance */}
          <section className="mb-8">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Acceptance of Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                By engaging our services, signing a Statement of Work, or making payment, you acknowledge that 
                you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </section>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
            >
              <i className="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform duration-300"></i>
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
