import { LegalLayout } from "@/components/legal-layout";

export default function TermsPage() {
    const sections = [
        {
            id: "acceptance",
            title: "1. Acceptance of Terms",
            content: (
                <p>
                    By accessing or using Vantive ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. Vantive provides an AI-powered pitch coaching session designed to simulate a venture capital interrogation.
                </p>
            ),
        },
        {
            id: "services",
            title: "2. Description of Services",
            content: (
                <p>
                    Vantive offers realtime voice sessions with an AI coach. Services are provided on a "pay-per-session" basis with single-use access keys. We do not require account registration, and we do not maintain persistent user profiles. Each session is ephemeral and self-contained.
                </p>
            ),
        },
        {
            id: "data-privacy",
            title: "3. Data & Privacy",
            content: (
                <div className="space-y-4">
                    <p>
                        Our core principle is data minimization. We do not collect personal information beyond what is necessary to process your payment and execute the session.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>We do not create or store user accounts.</li>
                        <li>We do not record sessions for training purposes.</li>
                        <li>We do not sell your data to third parties.</li>
                        <li>We do not maintain a database of user pitches or intellectual property.</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "openai-integration",
            title: "4. Third-Party AI Integration",
            content: (
                <p>
                    Vantive utilizes OpenAI's API to generate responses. By using our service, you acknowledge that your voice and text inputs are processed by OpenAI. While we configure our usage to maximize privacy (opting out of training where applicable for enterprise endpoints), OpenAI has its own terms and policies which govern their data handling. We encourage you to review OpenAI's policies linked below.
                </p>
            ),
        },
        {
            id: "no-warranty",
            title: "5. No Warranty & Disclaimer",
            content: (
                <p>
                    The services are provided "as is" and "as available" without any warranties of any kind, express or implied. We do not guarantee that the AI coach will provide accurate, useful, or professional advice. The "interrogation" style is a simulation and should not be taken as professional financial or legal advice.
                </p>
            ),
        },
        {
            id: "limitation-liability",
            title: "6. Limitation of Liability",
            content: (
                <p>
                    To the maximum extent permitted by law, Vantive shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly. Our total liability for any claim arising out of or relating to these terms or our services is limited to the amount you paid us for the specific session key giving rise to the claim.
                </p>
            ),
        },
        {
            id: "refunds",
            title: "7. Refunds & Cancellations",
            content: (
                <p>
                    Due to the instant nature of the service and the costs incurred for AI processing, all sales of access keys are final and non-refundable once a session has been initiated. If a technical error prevents a session from starting, please contact support for a replacement key.
                </p>
            ),
        },
    ];

    return (
        <LegalLayout
            title="Terms of Service"
            subtitle="Effective Date: Feb 18, 2026"
            sections={sections}
        />
    );
}
