import "./About.css";

import Line from "../Line/Line";

export default function About() {
    return (
        <div className="about px-36 pt-32">
            <div className="content">
                <h1 className="py-4 charmonman-regular">
                    Welcome&nbsp;&nbsp;to&nbsp;&nbsp;Blogon&nbsp;...
                </h1>
                <Line className="-mt-6 mb-6" />
                <h4 className="py-4 italic">
                    A digital-vault, to preserve thoughts and ideas related to
                    personal projects, music, anecdotes, and a whole lot more.
                    Feel free to check out the blogs section.
                </h4>
            </div>
            <div className="image">
                <img
                    className="w-4/5 h-4/5 rounded-2xl"
                    src="/images/about/writing.jpg"
                    alt=""
                />
            </div>
        </div>
    );
}
