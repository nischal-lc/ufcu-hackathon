import HeroSection from './Components/HeroSection'
import FormNav from './Components/FormNav'
import NavBar from './Components/NavBar'
import OpenAccount from './Components/OpenAccount'
import SecurityTip from './Components/SecurityTip'
import ApplicationComplete from './Components/ApplicationComplete'

export default function App() {
  const isOpenAccountRoute = window.location.pathname === '/open-account'
  const isApplicationCompleteRoute =
    window.location.pathname === '/application-complete'

  return (
    <div className="min-h-screen bg-white text-[#23335d]">
      {isApplicationCompleteRoute ? (
        <ApplicationComplete />
      ) : isOpenAccountRoute ? (
        <>
          <FormNav />
          <OpenAccount />
        </>
      ) : (
        <>
          <NavBar />
          <main>
            <HeroSection />
            <SecurityTip />
          </main>
        </>
      )}
    </div>
  )
}
