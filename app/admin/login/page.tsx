import PageHero from "@/components/PageHero";
import AdminLoginForm from "./AdminLoginForm";

export const metadata = { title: "Admin" };

export default function AdminLoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Dashboard"
        subtitle="Interner Zugang. Bitte Passwort eingeben."
      />
      <section className="py-14">
        <div className="container-rail max-w-md">
          <AdminLoginForm />
        </div>
      </section>
    </>
  );
}
