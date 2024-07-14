import "./NavlinkList.css";

interface TwResponsiveClasses {
    navlinks_disappear_lg_and_less: string;
    navlinks_listed_lg_and_less: string;
}

type NavlinkListProps = {
    biggerScreen: boolean;
};

export default function NavlinkList({ biggerScreen }: NavlinkListProps) {
    const userId = localStorage.getItem("userId") || ""

    const twResponsiveClasses: TwResponsiveClasses = {
        navlinks_disappear_lg_and_less: "hidden lg:flex lg:items-center",
        navlinks_listed_lg_and_less: "lg:hidden",
    };

    return (
        <>
            {biggerScreen && (
                <div
                    className={`navlinks-row ${twResponsiveClasses.navlinks_disappear_lg_and_less}`}
                >
                    <ul className="navlinks-ul-row">
                        <li className="navlink hover:bg-slate-200 rounded-md">
                            <a href="/" className="" aria-current="page">
                                <h4>
                                    <i className="c-icon las la-home la-md la-1x"></i>
                                    Home
                                </h4>
                            </a>
                        </li>
                        <li className="navlink hover:bg-slate-200 rounded-md">
                            <a href="/blogs" className="">
                                <h4>
                                    <i className="c-icon las la-pager la-lg"></i>
                                    Blogs
                                </h4>
                            </a>
                        </li>
                        <li className="navlink hover:bg-slate-200 rounded-md">
                            <a href={`/blogs/author/${userId}`} className="">
                                <h4>
                                    <i className="c-icon las la-pen-square la-lg"></i>
                                    My Blogs
                                </h4>
                            </a>
                        </li>
                    </ul>
                </div>
            )}

            {!biggerScreen && (
                <div
                    className={`navlinks-col bg-slate-100 ${twResponsiveClasses.navlinks_listed_lg_and_less}`}
                >
                    <ul className="navlinks-ul-col pt-4 pb-6">
                        <li className="navlink hover:bg-slate-200 rounded-md w-full">
                            <a href="/" className="" aria-current="page">
                                <h4>
                                    <i className="c-icon las la-home la-md la-1x"></i>
                                    Home
                                </h4>
                            </a>
                        </li>
                        <li className="navlink hover:bg-slate-200 rounded-md w-full">
                            <a href="/blogs" className="">
                                <h4>
                                    <i className="c-icon las la-pager la-lg"></i>
                                    Blogs
                                </h4>
                            </a>
                        </li>
                        <li className="navlink hover:bg-slate-200 rounded-md w-full">
                            <a href={`/blogs/author/${userId}`} className="">
                                <h4>
                                    <i className="c-icon las la-pen-square la-lg"></i>
                                    My Blogs
                                </h4>
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
