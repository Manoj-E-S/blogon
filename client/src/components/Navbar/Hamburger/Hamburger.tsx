import './Hamburger.css'

interface TwResponsiveClasses {
    navlinks_listed_lg_and_less: string;
}

type HamburgerProps = {
    toggleNavlinks: () => void
}

export default function Hamburger({ toggleNavlinks }: HamburgerProps) {

    const twResponsiveClasses: TwResponsiveClasses = {
        navlinks_listed_lg_and_less: "lg:hidden",
    };

    return (
        <button className="ham" onClick={toggleNavlinks}>
            <svg
                className={`w-8 h-8 ${twResponsiveClasses.navlinks_listed_lg_and_less}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                />
            </svg>
        </button>
    );
}
