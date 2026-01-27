import { authenticate } from "../actions/actions";
import { AuthForm } from "../ui/authForm/authForm";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-primary">
          Sign up
        </h1>
        <AuthForm action={authenticate} />
      </div>
    </div>
  );
}
