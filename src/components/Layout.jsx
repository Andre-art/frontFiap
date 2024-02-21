import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
 

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
