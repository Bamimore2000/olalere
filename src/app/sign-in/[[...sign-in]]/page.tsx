import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="w-full max-w-md space-y-8">
                <SignIn
                    appearance={{
                        elements: {
                            formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm text-sm normal-case tracking-wide",
                            card: "bg-card border shadow-none rounded-none",
                            headerTitle: "font-serif font-bold text-2xl tracking-tight text-foreground",
                            headerSubtitle: "text-muted-foreground",
                            dividerLine: "bg-border",
                            dividerText: "text-muted-foreground font-medium",
                            formFieldLabel: "text-foreground font-medium",
                            formFieldInput: "bg-background border-input rounded-sm focus:ring-primary focus:border-primary",
                            footerActionLink: "text-primary hover:text-primary/90 font-medium"
                        }
                    }}
                />
            </div>
        </div>
    );
}
