import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Coach Login · FOOTLAB",
  description:
    "Sign in as a Coach on FOOTLAB. Manage players and develop future talent.",
};

export default function CoachLoginPage() {
  return <LoginForm role="coach" />;
}
