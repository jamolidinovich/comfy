import Header from "../components/Header";

function Layout({children}) {
  return (
    <div>
     <Header></Header>
     {children}
    </div>
  )
}

export default Layout