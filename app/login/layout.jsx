export const metadata = {
  title: "Login · Mission 2K38",
  description:
    "Sign in to Mission 2K38. Select your role — Player, Coach, or Scout — to continue.",
};

export default function LoginLayout({ children }) {
  return (
    <div
      className="dark"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#080808",
        position: "fixed",
        inset: 0,
      }}
    >
      {children}
    </div>
  );
}
