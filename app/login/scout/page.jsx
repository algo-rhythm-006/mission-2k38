import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Scout Login · FOOTLAB",
  description:
    "Sign in as a Scout on FOOTLAB. Discover talent and build winning teams.",
};

export default function ScoutLoginPage() {
  return <LoginForm role="scout" />;
}
