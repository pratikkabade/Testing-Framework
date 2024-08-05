import { Navbar } from "flowbite-react"
export const NavbarLayout = () => {
   return (
      <Navbar fluid rounded className="shadow-sm">
         <Navbar.Brand>
            <img src='https://upload.wikimedia.org/wikipedia/commons/d/d5/Selenium_Logo.png'
               className="mr-3 h-6 sm:h-9"
               alt="Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">

            </span>
         </Navbar.Brand>
      </Navbar>
   )
}