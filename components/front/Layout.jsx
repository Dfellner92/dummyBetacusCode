import Head from 'next/head';
import Header from '../front/Header'
import Footer from '../front/Footer';
export default function Layout({
  children,
  title = 'Betacus Game Application',
  description = 'Betacus Game Application',
  keywords = 'Betacus Game Application',
  canonical = 'https://betacus.com/betacusGameApp/'
}) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonical} />
        <link rel="icon" href="favicon.ico" />
        <link rel="apple-touch-icon" href="favicon.ico" />
        <link rel="stylesheet" href="assets/css/font-awesome.css" type="text/css" />
        <link rel="stylesheet" href="assets/css/bootstrap.min.css" type="text/css" />
        <link rel="stylesheet" href="assets/css/style.css" type="text/css" />
        <link rel="stylesheet" href="assets/css/responsive.css" type="text/css" />
        <link rel="stylesheet" href="assets/css/custom.css" type="text/css" />
      </Head>
      <div className="wrapper">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}