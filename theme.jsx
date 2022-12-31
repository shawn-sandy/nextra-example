import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { MDXProvider } from "@mdx-js/react";
import { Footer } from "./components/footer.tsx";
import useTilg from "tilg";

// import styles from "./theme.module.sass";
import "@shawnsandy/first-paint/dist/css/libs/all.min.css";

function Layout({ pageOpts, children }) {
  // Front matter of the current page:
  // pageOpts.frontMatter

  // You can build the sidebar based on the structure data from `pageMap`:
  // console.log(pageOpts.pageMap);
  useTilg();

  return (
    <>
      <Head>
        <title>{pageOpts.title}</title>
      </Head>
        <nav>
          {
            // You can also set a NEXT_LOCALE cookie to make it the default redirection target:
            // document.cookie = `NEXT_LOCALE=de; path=/`
          }
          <div>
            <Link href={"/"} locale="en">
              Home
            </Link>
          </div>
          <div>
            <Link href="/docs/v19/globals">Globals</Link>
            <Link href={"/"} locale="en">
              EN
            </Link>
            <Link href={"/"} locale="de">
              DE
            </Link>
          </div>
        </nav>
        <header>
          <h1>{pageOpts.title}</h1>
        </header>
        <main>
          <section>
            {/* <aside>
              <h3>Navigation</h3>
              <div>
                <Link href="/">Home</Link>
              </div>
              <div>
                <Link href="/docs/v19/globals">Globals</Link>
              </div>
            </aside> */}
            <article>
              <MDXProvider components={{}}>{children}</MDXProvider>
            </article>
          </section>
        </main>
        <hr />
        <Footer />
      </>
  );
}

export default function Theme(props) {
  // These are just initial setup for Nextra themes
  const { route } = useRouter();
  const context = globalThis.__nextra_pageContext__[route];
  if (!context) throw new Error(`No content found for ${route}.`);
  const { pageOpts, Content } = context;

  return (
    <Layout pageOpts={pageOpts}>
      <Content {...props} />
    </Layout>
  );
}
