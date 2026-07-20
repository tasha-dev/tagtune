import type { Metadata } from "next";
import Footer from "@/component/footer";
import Header from "@/component/header";
import AppContainer from "@/component/container/appContainer";

export const metadata: Metadata = {
  title: "App",
};

export default function AppPage() {
  return (
    <>
      <Header />
      <section className="lg:min-h-[calc(100dvh-50px)] max-w-2xl mx-auto p-4">
        <div className="prose prose-neutral dark:prose-invert max-w-full w-full mb-5">
          <h1>Upload</h1>
        </div>
        <AppContainer />
      </section>
      <Footer />
    </>
  );
}
