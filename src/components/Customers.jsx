import Figma from '../assets/svgs/customers/Figma-5.svg'
import Adobe from '../assets/svgs/customers/Adobe_Corporate_logo.svg'
import Apple from '../assets/svgs/customers/apple-11-logo-svgrepo-com.svg'
import Descript from '../assets/svgs/customers/Descript_logo.svg'
import Discord from '../assets/svgs/customers/Discord-wordmark-1.svg'
import HubSpot from '../assets/svgs/customers/HubSpot_Logo.svg'
import Meta from '../assets/svgs/customers/Meta_Platforms_Inc._logo.svg'
import Notion from '../assets/svgs/customers/Notion-logo.svg'
import Stripe from '../assets/svgs/customers/Stripe_Logo,_revised_2016.svg'
import Vercel from '../assets/svgs/customers/Vercel_logo_2025.svg'

const DEFAULT_WIDTH = 81
const DEFAULT_HEIGHT = 40

const companies = [
    { name: 'Figma', logo: Figma, href: '/customers/figma' },
    { name: 'Adobe', logo: Adobe, href: '/customers/adobe' },
    { name: 'Apple', logo: Apple, href: '/customers/apple', height: 50 },
    { name: 'Descript', logo: Descript, href: '/customers/descript', width: 90, height: 45 },
    { name: 'Discord', logo: Discord, href: '/customers/discord' },
    { name: 'HubSpot', logo: HubSpot, href: '/customers/hubspot' },
    { name: 'Meta', logo: Meta, href: '/customers/meta' },
    { name: 'Notion', logo: Notion, href: '/customers/notion', width: 61, height: 31 },
    { name: 'Stripe', logo: Stripe, href: '/customers/stripe', width: 61, height: 41 },
    { name: 'Vercel', logo: Vercel, href: '/customers/vercel' },
]

function Customers() {
    const total = companies.length

    // Only full rows
    const companiesSm = companies.slice(0, total - (total % 3))
    const companiesLg = companies.slice(0, total - (total % 5))

    const renderItem = (company) => {
        const width = company.width || DEFAULT_WIDTH
        const height = company.height || DEFAULT_HEIGHT

        return (
            <li key={company.name} className="flex w-full justify-stretch">
                <a
                    className="group relative flex w-full items-center justify-center px-4 py-6 focus-outline md:px-0 md:py-8"
                    aria-label={`Read the customer story about ${company.name}`}
                    href={company.href}
                >
                    <img
                        alt={`${company.name} Logo`}
                        loading="lazy"
                        decoding="async"
                        width={width}
                        height={height}
                        src={company.logo}
                        className={`${company.name !== 'Notion' ? 'customer-logo' : ''} block object-contain transition-all duration-500 ease-in-out lg:grayscale lg:group-hover:grayscale-0 lg:group-focus-visible:grayscale-0 lg:group-active:grayscale-0`}
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                            color: "transparent",
                        }}
                    />
                </a>
            </li>
        )
    }

    return (
        <div className="py-2 md:mt-16 relative w-full" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <h2 className="pl-10 space-grotesk-normal text-[1.75rem] leading-tight mb-5 md:mb-3 text-center md:pl-0" style={{ color: 'var(--text-primary)' }}>
                PatchAI powers top AI teams, from startups to global enterprises.
            </h2>
            <div className="flex flex-nowrap">

                {/* Small screens (3 per row) */}
                <ul className="grid w-full grow grid-cols-3 lg:hidden">
                    {companiesSm.map(renderItem)}
                </ul>

                {/* Large screens (5 per row) */}
                <ul className="hidden w-full grow grid-cols-5 lg:grid">
                    {companiesLg.map(renderItem)}
                </ul>

            </div>
        </div>
    )
}

export default Customers