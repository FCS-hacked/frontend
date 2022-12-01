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
            <div className="text-sm text-gray">Please accept the certificate at <a href="https://192.168.2.234:8000">https://192.168.2.234:8000</a> if you face errors</div>        
      </div>
    </div>
  )
}
