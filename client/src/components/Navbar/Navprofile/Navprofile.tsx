import "./Navprofile.css";

type NavprofileProps = {
    toggleUserMenu: () => void,
}

export default function Navprofile({ toggleUserMenu }: NavprofileProps) {
    const profileImageUrl = localStorage.getItem("profileImageUrl");
    const username = localStorage.getItem("username");

    return (
        <button className="openUserMenu" onClick={toggleUserMenu}>
            {(profileImageUrl) ? (
                <img
                    src={ profileImageUrl }
                    alt={`${username}`}
                    className="profileImage"
                />
            ) : (
                <i className="c-icon las la-user-circle la-3x">
                    <p>{username}</p>
                </i>
            )}

        </button>
    );
}
