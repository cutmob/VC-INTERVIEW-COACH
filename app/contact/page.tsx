import { LegalLayout } from "@/components/legal-layout";

export default function ContactPage() {
    const sections = [
        {
            id: "about-vantive",
            title: "About Vantive",
            content: (
                <p>
                    Vantive is a specialized AI coaching platform developed by DriftRail, an LLM-focused technology company. We leverage advanced language models to simulate realistic venture capital interrogations, helping founders refine their pitch delivery and strategic thinking under pressure.
                </p>
            ),
        },
        {
            id: "support",
            title: "Support & Inquiries",
            content: (
                <div className="space-y-4">
                    <p>
                        For technical issues, billing questions, feature requests, or general inquiries about Vantive, please reach out to our support team:
                    </p>
                    <div className="bg-wood-100 dark:bg-white/[0.03] border border-wood-200 dark:border-white/5 rounded-lg p-4">
                        <p className="font-mono text-sm">
                            <strong>Email:</strong>{" "}
                            <a
                                href="mailto:support@driftrail.com"
                                className="text-wood-600 hover:text-wood-900 dark:text-wood-400 dark:hover:text-wood-200 underline transition"
                            >
                                support@driftrail.com
                            </a>
                        </p>
                    </div>
                    <p className="text-sm text-wood-600 dark:text-wood-500">
                        We aim to respond to all inquiries within 24 hours during business days.
                    </p>
                </div>
            ),
        },
        {
            id: "feedback",
            title: "Feedback & Feature Requests",
            content: (
                <p>
                    We value your feedback. If you have suggestions for improving Vantive or ideas for new features, please send them to{" "}
                    <a
                        href="mailto:support@driftrail.com"
                        className="text-wood-600 hover:text-wood-900 dark:text-wood-400 dark:hover:text-wood-200 underline transition"
                    >
                        support@driftrail.com
                    </a>
                    . Your input helps us build a better product.
                </p>
            ),
        },
        {
            id: "technical-issues",
            title: "Technical Issues",
            content: (
                <p>
                    If you experience any technical problems during a session or have trouble accessing your key, please contact us at{" "}
                    <a
                        href="mailto:support@driftrail.com"
                        className="text-wood-600 hover:text-wood-900 dark:text-wood-400 dark:hover:text-wood-200 underline transition"
                    >
                        support@driftrail.com
                    </a>
                    . Include details about the issue and your session key (if applicable) to help us assist you faster.
                </p>
            ),
        },
        {
            id: "driftrail",
            title: "About DriftRail",
            content: (
                <p>
                    DriftRail is a technology company specializing in large language model applications and AI-driven solutions. Vantive represents our commitment to creating practical, high-impact tools that help founders and entrepreneurs succeed. Learn more about DriftRail and our other products at driftrail.com.
                </p>
            ),
        },
    ];

    return (
        <LegalLayout
            title="Contact"
            subtitle="Get in Touch"
            sections={sections}
        />
    );
}
