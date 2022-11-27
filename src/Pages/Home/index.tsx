import NavBar from '../../Components/Generic_Navbar'

export default function Home() {
  return (
    <div>
        <div>
            <NavBar/>
            <div className="flex justify-center text-center font-nunitoBold text-4xl align-middle mt-[30vh]">
              Welcome to the home page<br/>
              This is group 2's project
            </div>
        </div>
    </div>
  )
}
