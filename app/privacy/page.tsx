import { LegalLayout } from "@/components/legal-layout";

export default function PrivacyPage() {
    const sections = [
        {
            id: "intro",
            title: "1. Data Collection Philosophy",
            content: (
                <p>
                    At Vantive, we believe data minimization is the ultimate privacy protection. We do not maintain user accounts, databases, or persistent profiles. We collect only the minimum data necessary to process your transaction and facilitate a single AI coaching session.
                </p>
            ),
        },
        {
            id: "payment-info",
            title: "2. Payment Information",
            content: (
                <p>
                    Your payment information is processed entirely by Stripe. We do not store or process your sensitive credit card details on our servers. Stripe acts as our merchant of record and maintains its own secure compliance posture.
                </p>
            ),
        },
        {
            id: "session-data",
            title: "3. Session Data & Recordings",
            content: (
                <div className="space-y-4">
                    <p>
                        Vantive sessions are realtime and ephemeral by design.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>We do not record audio of your pitch.</li>
                        <li>We do not save transcripts of your conversation.</li>
                        <li>We do not sell any data about your session or your business ideas.</li>
                        <li>We do not maintain a database of user pitches.</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "openai-data-usage",
            title: "4. OpenAI Data Processing",
            content: (
                <div className="space-y-4">
                    <p>
                        When you engage with our AI coach, your voice is transmitted via WebRTC directly to OpenAI's Realtime API for processing. OpenAI acts as a data processor for these interactions.
                    </p>
                    <p>
                        While we configure our integration to maximize privacy (e.g., using endpoints that default to not training on API data where available for our tier), OpenAI's retention policies apply to the data while it is in their systems. Their systems process audio to text and generate responses. We do not retain copies of these interactions.
                    </p>
                    <p>
                        You should review OpenAI&apos;s API data usage policies to understand how they handle data transiently during processing.
                    </p>
                </div>
            ),
        },
        {
            id: "cookies",
            title: "5. Cookies & Local Storage",
            content: (
                <p>
                    We use local storage only to temporarily persist your session state (e.g., your active token) during the session itself. We do not use tracking cookies for advertising or analytics.
                </p>
            ),
        },
        {
            id: "contact",
            title: "6. Questions",
            content: (
                <p>
                    Since we do not store user data, we cannot modify or "delete" your account because no account exists. If you have questions about our minimal data practices, please contact us.
                </p>
            ),
        },
    ];

    return (
        <LegalLayout
            title="Privacy Policy"
            subtitle="Effective Date: Feb 18, 2026"
            sections={sections}
        />
    );
}
