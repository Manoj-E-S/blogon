import "./Footer.css";

export default function Footer() {
    return (
        <div id="footerGlobal" className="Footer bg-slate-100 flex-col-reverse lg:flex-row p-2 mt-36">
            <div className="logo setflex-1 text-center m-2">
                <h1>Blogon</h1>
            </div>
            <div className="setflex-1 text-center lg:text-start m-2 lg:pl-96">
                <h5>&copy; 2024 Blogon All rights reserved.</h5>
            </div>
            {/* <div className="setflex-1 text-center lg:text-start m-2">
                <a
                    href="mailto:manoj.es.professional@gmail.com"
                    target="_top"
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Get in touch
                </a>
            </div> */}
        </div>
    );
}
