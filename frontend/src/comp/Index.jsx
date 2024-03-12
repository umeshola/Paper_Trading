import logo1 from '../assets/logo1.jpg'
import logo from '../assets/logo.jpg'
import umesh from '../assets/umesh.jpg'
import harmeet from '../assets/harmeet.jpg'
import hardik from '../assets/hardik.jpg'
import sahil from '../assets/sahil.jpg'
import arvind from '../assets/arvindd.jpg'
import { Link, useLocation } from "react-router-dom";
import { TickerTape } from "react-ts-tradingview-widgets";
export default function Home() {
  const email = "umeshola07@gmail.com";
  const subject = 'Subject of the email';
  const body = 'Body of the email';
  const handlemailumesh = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return (
    <div className="pl-24 pr-24 relative">
      <div className="grid grid-cols-12 relative z-10">
        <div className="col-span-7 z-10 md:text-8xl lg:text-9xl font-bold text-7xl text-pretty text-white">Discover and trade the market for better you</div>
        <div className="col-span-5">
          <figure className="z-10 relative max-w-sm transition-all duration-300 filter grayscale hover:grayscale-0">
            <img className="rounded-lg h-auto max-w-lg" src={logo1} alt="img" />
          </figure>
        </div>
      </div>
      <div className="pl-16 relative z-10">
        <Link to="/learn">
          <button className="bg-cyan-500 hover:border-2 hover:border-green-300 hover:bg-transparent text-white hover:text-green-600 mr-10 pl-9 pt-5 pr-9 pb-5 text-xl font-bold hover:italic rounded-md transition-all duration-300">Learn</button>
        </Link>
        <Link to="/market">
          <button className="bg-cyan-500 hover:border-2 hover:border-green-300 hover:bg-transparent text-white hover:text-green-600 pl-9 pt-5 pr-9 pb-5 text-xl font-bold hover:italic rounded-md transition-all duration-300">Trade</button>
        </Link>
      </div>

      <div className="mt-24 relative z-10">
        <div >
          <TickerTape isTransparent="true" colorTheme="dark" />
        </div>

      </div>

      <div className="relative flex place-items-center before:absolute before:h-[200px] before:w-full sm:before:w-[700px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-green before:to-transparent before:blur-3xl before:content-[''] after:absolute after:-z-20 after:h-[1000px] after:w-full sm:after:w-[1000px] after:translate-x-1/3 after:bg-gradient-conic after:from-green-300 after:via-green-200 after:blur-3xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-purple-900 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <div className="mt-96 relative z-10">
          <h1 className="text-7xl text-white">HOW THE SITE WORKS</h1>
        </div>
      </div>


      <div className="grid grid-cols-12 mt-32 relative z-10">
        <div className="col-span-4 min-w-96">
          <figure className="relative max-w-sm transition-all duration-300 filter grayscale hover:grayscale-0">
            <img className="rounded-lg h-auto max-w-lg" src={logo} alt="image description" />
          </figure>
        </div>
        <div className="col-span-6">
          <h1 className="text-5xl font-extralight p-5 text-white">This website can provide you a tool from which you can improve your trading skills without using any real money. Learn and Grow.</h1>
        </div>
        <div className="col-span-2 ">
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[500px] after:w-full sm:after:w-[500px] after:translate-x-1/3 after:bg-gradient-conic after:from-red-500 after:via-red-400 after:blur-3xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-00/10 after:dark:from-red-900 after:dark:via-[#0141ff]/40 before:lg:h-[500px]">
            <Link to="/more">
              <button className="mt-56 rotate-90 bg-cyan-500 hover:bg-transparent text-white hover:text-green-600 mr-10 pl-9 pt-5 pr-9 pb-5 text-xl font-bold hover:italic rounded-md transition-all duration-300 hover:border-2 hover:border-green-300">More</button>
            </Link>
          </div>

        </div>
      </div>

      <div className="mt-96 flex justify-center relative z-10">
        <h1 className="text-7xl mt-16 text-white">About Us</h1>
      </div>

      <div className="mt-32 relative z-10">
        <h1 className="text-6xl font-light p-5 text-white">This is the project for us where we can try to learn and grow as an individual.  We are the student of CU. We as a team aspire to build something that can create a impact one the first day, So we have created this website. We like to accepts the challenge and find the creative solution for these challenges as a team. </h1>
      </div>

      <div className="mt-96 flex justify-center relative z-10">
        <div className="relative flex place-items-center before:absolute before:h-[200px] before:w-full sm:before:w-[300px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-green before:to-transparent before:blur-3xl before:content-[''] after:absolute after:-z-20 after:h-[600px] after:w-full sm:after:w-[700px] after:translate-x-1/3 after:bg-gradient-conic after:from-green-300 after:via-green-200 after:blur-3xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-purple-900 after:dark:from-sky-100 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <h1 className="text-7xl text-white">Team</h1>
        </div>
      </div>

      <div className="flex justify-center flex-wrap mt-32 relative z-10">
        <div className="p-10">
          <div className="w-96 bg-slate-900">
            <div className="w-full max-w-sm shadow dark:bg-gray-900 dark:border-gray-800">
              <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={umesh} alt="Bonnie image" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Umesh Ola</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Web Dev/Web Designer</span>
                <div className="flex mt-4 md:mt-6 mb-6">
                  <a href="https://github.com/umeshola" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Git Hub</a>
                  <button onClick={handlemailumesh} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Mail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-10">
          <div className=" w-96 bg-slate-900">
            <div className="w-full max-w-sm shadow dark:bg-gray-900 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-26 mb-3 rounded-full  shadow-lg" src={harmeet} alt="Bonnie image" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Harmeet</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Frontend</span>
                <div className="flex mt-4 md:mt-6">
                  <a href="https://github.com/singh-harmeet" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Git Hub</a>
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-10">
          <div className=" w-96 bg-slate-900">
            <div className="w-full max-w-sm shadow dark:bg-gray-900 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-26 mb-3 rounded-full shadow-lg" src={hardik} alt="Bonnie image" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Hardik</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Web Designer</span>
                <div className="flex mt-4 md:mt-6">
                  <a href="https://github.com/HardikSharma12" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Git Hub</a>
                   </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-10">
          <div className=" w-96 bg-slate-900">
            <div className="w-full max-w-sm shadow dark:bg-gray-900 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-26 mb-3 bg-orange-600  rounded-full shadow-lg" src={arvind} alt='' />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Arvind</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Backend Dev</span>
                <div className="flex mt-4 md:mt-6">
                  <a href="https://github.com/Arvind85288" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Git Hub</a>
                   </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-10">
          <div className=" w-96 bg-slate-900">
            <div className="w-full max-w-sm shadow dark:bg-gray-900 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={sahil} alt="" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Sahil</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Full stack/Doc.</span>
                <div className="flex mt-4 md:mt-6 mb-6">
                  <a href="https://github.com/Sahil-Saifi98" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Git Hub</a>
                   </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-32 relative z-10">
      <h1 class="h-px bg-gray-200 border-0 dark:bg-white"/>
        <div className='flex justify-between pr-96'>
          <div>
              <p className='text-green-300 text-5xl'>404</p>
          </div>
          <div>
            <h1 className='text-green-300 text-2xl'>Products</h1>
            <h2 className='text-blue-300'>Stocks</h2>
            <h2></h2>
          </div>
          <div>
            <h1 className='text-green-300 text-2xl'>404</h1>
            <h2 className='text-blue-300'>Pricing</h2>
            <h2 className='text-blue-300'>Help and support</h2>
            <h2 className='text-blue-300'>Trust</h2>
          </div>
          <div>
            <h1 className='text-green-300 text-2xl'>Quick Links</h1>
            <Link to='/market'>
              <h2 className='hover:underline hover:text-green-300 text-blue-300'>Market</h2>
            </Link>
            <Link to='/portfolio'>
              <h2 className='hover:underline hover:text-green-300 text-blue-300'>Wallet</h2>
            </Link>
            <Link to='/balance'>
              <h2 className='hover:underline hover:text-green-300 text-blue-300'>News</h2>
            </Link>
            <Link to='/balance'>
              <h2 className='hover:underline hover:text-green-300 text-blue-300'>Balance</h2>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}


