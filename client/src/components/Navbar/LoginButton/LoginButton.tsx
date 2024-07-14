import "./LoginButton.css";

type LoginButtonProps = {
    gotoLoginPage: () => void;
};

export default function LoginButton({ gotoLoginPage }: LoginButtonProps) {
    return (
        <button onClick={gotoLoginPage}>
            <i className="c-icon-sm las la-user-circle la-3x">
                <p>Login</p>
            </i>
        </button>
    );
}
