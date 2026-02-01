import Link from "next/link";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalMarkAlert({ open, onClose }: ModalProps) {
  if (!open) {
    return;
  }
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-bg text-fg shadow-lg border border-border">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-fg">
              Authorization required
            </h2>
          </div>

          <div className="px-6 py-4">
            <p className="text-sm text-muted">
              To like, dislike or comment, please log in to your account.
            </p>
          </div>

          <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
            <button
              onClick={onClose}
              className="
            rounded-md px-4 py-2 text-sm font-medium
            text-fg
            transition
            hover:bg-primary-50
            focus:outline-none focus:ring-2 focus:ring-primary
          "
            >
              Continue as guest
            </button>

            <Link
              href="/login"
              onClick={onClose}
              className="
            rounded-md bg-primary px-4 py-2 text-sm font-medium
            text-white transition
            hover:bg-primary-600
            focus:outline-none focus:ring-2 focus:ring-primary
          "
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
