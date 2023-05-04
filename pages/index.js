import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date'
//In Next.js, a page is a React Component exported from a file in the pages directory.
/*This is possible because getStaticProps only runs on the server-side. 
It will never run on the client-side. 
It won’t even be included in the JS bundle for the browser. 
That means you can write code such as direct database queries without them being 
  sent to browsers.*/

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Estoy aprendiendo NextJS]</p>
        <p>
          Este blog es un ejemplo básico de lo que se puede hacer.{' '}
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
             <Link href={`/posts/${id}`}>{title}</Link> 
              <br/>
              <small className={utilStyles.lightText}>
               <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>



    </Layout>
  );
}