
import { Button } from "@/components/ui/button"
import type { SocialProvider } from "@/types/auth"

export default function SocialLoginButtons() {
    const socialProviders: SocialProvider[] = [
        {
            id: "google",
            name: "Google",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
        <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.086-9.8l4.046-3.455A.6.6 0 0 0 15 8.4v-.8a.6.6 0 0 0-.6-.6H9.6a.6.6 0 0 0-.6.6v.8a.6.6 0 0 0 .6.6h2.218L8 12.8v.8a.6.6 0 0 0 .6.6h4.8a.6.6 0 0 0 .6-.6v-.8a.6.6 0 0 0-.6-.6h-2.486z"/>
      </svg>`,
        },
        {
            id: "facebook",
            name: "Facebook",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
        <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>`,
        },
        {
            id: "apple",
            name: "Apple",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
        <path fill="currentColor" d="M11.624 7.222c-.876 0-2.232-.996-3.66-.96-1.884.024-3.612 1.092-4.584 2.784-1.956 3.396-.504 8.412 1.404 11.172.936 1.344 2.04 2.856 3.504 2.808 1.404-.06 1.932-.912 3.636-.912 1.692 0 2.172.912 3.66.876 1.512-.024 2.472-1.368 3.396-2.724 1.068-1.56 1.5-3.072 1.524-3.156-.036-.012-2.928-1.128-2.952-4.476-.024-2.784 2.268-4.116 2.376-4.188-1.308-1.92-3.324-2.136-4.032-2.184-1.848-.144-3.396 1.008-4.272.96zm3.12-2.832c.78-.936 1.308-2.232 1.164-3.54-1.128.048-2.496.756-3.312 1.68-.72.828-1.368 2.196-1.2 3.48 1.272.096 2.568-.636 3.348-1.62z"/>
      </svg>`,
        },
    ]

    return (
        <div className="grid grid-cols-3 gap-3">
            {socialProviders.map((provider) => (
                <Button
                    key={provider.id}
                    variant="outline"
                    className="w-full"
                    onClick={() => console.log(`Sign in with ${provider.name}`)}
                >
                    <span className="mr-2" dangerouslySetInnerHTML={{ __html: provider.icon }} />
                    <span className="sr-only sm:not-sr-only sm:text-sm">{provider.name}</span>
                </Button>
            ))}
        </div>
    )
}
