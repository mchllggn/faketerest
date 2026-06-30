import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Shield,
    Database,
    Eye,
    Lock,
    Trash2,
    Mail,
} from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white border-b border-gray-200">
                    <div className="max-w-4xl px-4 py-4 mx-auto sm:px-6 lg:px-8">
                        <Link
                            href={route("home")}
                            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
                    <div className="p-8 bg-white border border-gray-200 shadow-sm rounded-2xl sm:p-12">
                        <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-8 h-8 text-[#e60023]" />
                            <h1 className="text-3xl font-bold text-gray-900">
                                Privacy Policy
                            </h1>
                        </div>
                        <p className="mb-10 text-sm text-gray-500">
                            Last updated: June 14, 2026
                        </p>

                        <div className="space-y-8 prose prose-gray max-w-none">
                            {/* Section 1 */}
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <Database className="w-5 h-5 text-gray-700" />
                                    <h2 className="m-0 text-xl font-semibold text-gray-900">
                                        1. Information We Collect
                                    </h2>
                                </div>
                                <p className="leading-relaxed text-gray-600">
                                    We collect information you provide directly
                                    to us, such as when you create an account,
                                    upload pins, or contact us for support. This
                                    may include your name, email address, and
                                    any content you choose to share on the
                                    platform.
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                    If you sign in via a third-party provider
                                    (e.g., Google), we receive your name, email
                                    address, and profile picture from that
                                    provider.
                                </p>
                            </section>

                            {/* Section 2 */}
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <Eye className="w-5 h-5 text-gray-700" />
                                    <h2 className="m-0 text-xl font-semibold text-gray-900">
                                        2. How We Use Your Information
                                    </h2>
                                </div>
                                <p className="leading-relaxed text-gray-600">
                                    We use the information we collect to:
                                </p>
                                <ul className="ml-4 space-y-1 text-gray-600 list-disc list-inside">
                                    <li>
                                        Provide, maintain, and improve our
                                        services
                                    </li>
                                    <li>
                                        Authenticate your identity and manage
                                        your account
                                    </li>
                                    <li>
                                        Display your pins and profile to other
                                        users
                                    </li>
                                    <li>
                                        Send you technical notices and support
                                        messages
                                    </li>
                                    <li>
                                        Respond to your comments and questions
                                    </li>
                                </ul>
                            </section>

                            {/* Section 3 */}
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <Lock className="w-5 h-5 text-gray-700" />
                                    <h2 className="m-0 text-xl font-semibold text-gray-900">
                                        3. How We Protect Your Information
                                    </h2>
                                </div>
                                <p className="leading-relaxed text-gray-600">
                                    We implement appropriate technical and
                                    organizational measures to protect your
                                    personal information against unauthorized
                                    access, alteration, disclosure, or
                                    destruction. All data is encrypted in
                                    transit and at rest.
                                </p>
                            </section>

                            {/* Section 4 */}
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <Trash2 className="w-5 h-5 text-gray-700" />
                                    <h2 className="m-0 text-xl font-semibold text-gray-900">
                                        4. Data Retention & Deletion
                                    </h2>
                                </div>
                                <p className="leading-relaxed text-gray-600">
                                    We retain your personal information for as
                                    long as your account is active or as needed
                                    to provide you services. You may request
                                    deletion of your account and associated data
                                    at any time from the{" "}
                                    <Link
                                        href={route("data.deletion")}
                                        className="text-[#e60023] hover:underline font-medium"
                                    >
                                        Data Deletion
                                    </Link>{" "}
                                    page or by contacting us directly.
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                    Upon account deletion, we will remove your
                                    personal information, pins, and activity
                                    logs within 30 days, except where we are
                                    required to retain data for legal
                                    obligations.
                                </p>
                            </section>

                            {/* Section 5 */}
                            <section>
                                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                                    5. Third-Party Services
                                </h2>
                                <p className="leading-relaxed text-gray-600">
                                    Our service may contain links to third-party
                                    websites or integrate with third-party
                                    services (such as Cloudinary for image
                                    storage). We are not responsible for the
                                    privacy practices of those third parties. We
                                    encourage you to read their privacy
                                    policies.
                                </p>
                            </section>

                            {/* Section 6 */}
                            <section>
                                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                                    6. Your Rights
                                </h2>
                                <p className="leading-relaxed text-gray-600">
                                    Depending on your location, you may have the
                                    right to:
                                </p>
                                <ul className="ml-4 space-y-1 text-gray-600 list-disc list-inside">
                                    <li>
                                        Access the personal data we hold about
                                        you
                                    </li>
                                    <li>
                                        Request correction of inaccurate data
                                    </li>
                                    <li>
                                        Request deletion of your personal data
                                    </li>
                                    <li>
                                        Object to or restrict certain processing
                                    </li>
                                    <li>Request data portability</li>
                                </ul>
                            </section>

                            {/* Section 7 */}
                            <section>
                                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                                    7. Changes to This Policy
                                </h2>
                                <p className="leading-relaxed text-gray-600">
                                    We may update this privacy policy from time
                                    to time. We will notify you of any changes
                                    by posting the new policy on this page and
                                    updating the "Last updated" date.
                                </p>
                            </section>

                            {/* Section 8 - Contact */}
                            <section className="pt-8 border-t border-gray-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <Mail className="w-5 h-5 text-gray-700" />
                                    <h2 className="m-0 text-xl font-semibold text-gray-900">
                                        8. Contact Us
                                    </h2>
                                </div>
                                <p className="leading-relaxed text-gray-600">
                                    If you have any questions about this privacy
                                    policy or our data practices, please contact
                                    us through the information provided on our
                                    website.
                                </p>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
