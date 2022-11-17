import {useState, useEffect } from "react"
import { useRouter} from 'next/router'
import '../App.scss'
import PageTransition from '../components/PageTransition'

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    const [routingPageOffset, setRoutingPageOffset] = useState(0)

    useEffect(() => {
      const pageChange = () => {
        setRoutingPageOffset(window.scrollY)
      }

      router.events.on('routeChangeStart', pageChange)
    }, [router.events])
    

    return <PageTransition 
    route={router.asPath}
    routingPageOffset={routingPageOffset}
    >
        <Component {...pageProps} />
    </PageTransition>
}

export default MyApp
