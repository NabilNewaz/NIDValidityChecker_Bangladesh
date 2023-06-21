import axios from "axios";
import { useState } from "react";

function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [isNID, setisNID] = useState(false);
  const [isDOB, setisDOB] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [NIDData, setNIDData] = useState();


  const handleNIDnumCard = () => {
    setisDOB(false);
    setisNID(true);
  }

  const handleNIDdobCard = () => {
    setisNID(false);
    setisDOB(true);
  }

  const handleBlur = () => {
    setisNID(false);
    setisDOB(false);
  }

  const handleImageLoad = () => {
    setIsLoaded(true);
  }

  const handelSearchAgain = () => {
    setNIDData();
  }

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const nid_number = form.nid_number.value;
    const date_of_birth = form.date_of_birth.value;

    if (nid_number && date_of_birth) {
      setLoading(true);
      const data = {
        nid_number: nid_number,
        date_of_birth: date_of_birth
      }
      axios.post('https://nidv-alidity-checker-backend-bangladesh.vercel.app/check_nid', data)
        .then(function (response) {
          setNIDData(response.data);
          console.log(NIDData)
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
          <a href="https://nidverificationbd.web.app" className="flex items-center">
            <img src="https://i.ibb.co/x7CJ3xt/nidverify.png" className="h-8 mr-2" alt="NIDVerification" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"><span className="font-bold">NID</span>Verification<sup className="text-sm">BD</sup></span>
          </a>
        </div>
      </nav>

      <div className="mx-auto w-[30rem] content-center px-3 lg:px-0">
        <div className={!NIDData ? "block" : "hidden"}>
          <div className={isLoaded ? "hidden" : "block mb-5"}>
            <div className="flex items-center animate-pulse justify-center w-full h-[19rem] bg-gray-300 rounded-xl dark:bg-gray-700"> <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path></svg> </div>
          </div>

          <div className={isLoaded && !isNID && !isDOB ? "block" : "hidden"}>
            <img onLoad={handleImageLoad} className="h-auto rounded-lg mb-5" src="https://i.ibb.co/0mdjNhz/nid.png" alt="image description" />
          </div>

          <div className={isNID ? "block" : "hidden"}>
            <img onLoad={handleImageLoad} className="h-auto rounded-lg mb-5" src="https://i.ibb.co/FVXLZ8L/nidnum.png" alt="image description" />
          </div>

          <div className={isDOB ? "block" : "hidden"}>
            <img onLoad={handleImageLoad} className="h-auto rounded-lg mb-5" src="https://i.ibb.co/VSs6Zjh/dob.png" alt="image description" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NID Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  NID
                </span>
                <input disabled={Loading ? true : false} onBlur={handleBlur} required onFocus={handleNIDnumCard} type="text" name="nid_number" className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XXXXXXXXXX" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of Birth</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  DOB
                </span>
                <input disabled={Loading ? true : false} onBlur={handleBlur} onFocus={handleNIDdobCard} required type="date" name="date_of_birth" className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Date Of Birth" />
              </div>
            </div>
            <button disabled={Loading ? true : false} type="submit" className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg aria-hidden="true" role="status" className={Loading ? "inline w-4 h-4 mr-3 text-white animate-spin" : "hidden"} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
              <span className={Loading ? " " : "hidden"}>Chacking..</span>
              <span className={Loading ? "hidden" : " "}>Check Validity</span></button>
          </form>
        </div>

        <div>
          <div className={NIDData?.isValid == true && NIDData?.data != null ? "block" : "hidden"}>
            <div id="alert-additional-content-3" className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
              <div className="flex items-center">
                <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium">This NID Is Valid</h3>
              </div>
              <div className="mt-2 mb-4 text-sm">
                More information about this NID is given below. Please check other details with this NID to be sure.
              </div>
              <div className="flex">
                <button onClick={handelSearchAgain} type="button" className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  <svg aria-hidden="true" className="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span className="mb-0.5">Search Again</span>
                </button>
              </div>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden">
                <div className="pl-4 pt-4 lg:pb-4 sm:w-1/3">
                  <img className="rounded w-36 h-36" src={NIDData?.data?.photo} alt="Extra large avatar" />
                </div>
                <div className="p-4 sm:w-2/3">
                  <h2 className="text-gray-800 font-bold text-2xl mb-2">{NIDData?.data?.name}</h2>
                  <p className="text-gray-600">
                    পিতার নাম : {NIDData?.data?.fathers_name}
                  </p>
                  <p className="text-gray-600">
                    মাতার নাম : {NIDData?.data?.mothers_name}
                  </p>
                  <p className="text-gray-600">
                    জন্ম তারিখ : {NIDData?.data?.date_of_birth}
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className={NIDData?.isValid == false && NIDData?.data == null ? "block" : "hidden"}>
            <div id="alert-additional-content-3" className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
              <div className="flex items-center">
                <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium">This NID Is Not Valid</h3>
              </div>
              <div className="mt-2 mb-4 text-sm">
                Please click on Search Again button and check the information again.
              </div>
              <div className="flex">
                <button onClick={handelSearchAgain} type="button" className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  <svg aria-hidden="true" className="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span className="mb-0.5">Search Again</span>
                </button>
              </div>
            </div>
          </div>

          <div className={NIDData?.isValid == true && NIDData?.data == null ? "block" : "hidden"}>
            <div id="alert-additional-content-3" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
              <div className="flex items-center">
                <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium">This NID Is Valid</h3>
              </div>
              <div className="mt-2 mb-4 text-sm">
                Sorry we can not find details information about this NID for match with document but your NID Number is valid.
              </div>
              <div className="flex">
                <button onClick={handelSearchAgain} type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg aria-hidden="true" className="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span className="mb-0.5">Search Again</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="mx-auto text-sm text-gray-500 text-center dark:text-gray-400">© Copyright {new Date().getFullYear()}. Developed By <a href="https://nabilnewaz.com/" className="hover:underline">Nabil Newaz</a>
        </span>
      </footer>

    </div>
  )
}

export default App
