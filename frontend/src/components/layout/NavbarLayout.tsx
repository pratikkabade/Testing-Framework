import { Navbar } from "flowbite-react"
export const NavbarLayout = () => {
   return (
      <Navbar fluid rounded className="shadow-sm">
         <Navbar.Brand>
            <img src='../../assets/logo.png'
               className="mr-3 h-6 sm:h-9"
               alt="Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">

            </span>
         </Navbar.Brand>
         <Navbar.Toggle />
         <Navbar.Collapse>
            <Navbar.Link href="#" active>Home</Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
         </Navbar.Collapse>
      </Navbar>

   )
}