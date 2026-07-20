import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Player Login · FOOTLAB",
  description:
    "Sign in as a Player on FOOTLAB. Showcase your profile and connect with opportunities.",
};

export default function PlayerLoginPage() {
  return <LoginForm role="player" />;
}
