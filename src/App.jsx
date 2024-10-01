// import axios from 'axios';
import './App.css'

import { useState , useEffect } from 'react';
import xhamLogo from './assets/xh_logo.png';
import loader from './assets/loader.svg';

function App() {
  
  const [pgInValue, setPgInValue] = useState(1);
  const [oPInValue, setOPInValue] = useState('clb');
  const [bcOpValue, setBcOpValue] = useState('');
  const [data, setData] = useState([]);
  const [ccdata, setCCData] = useState([]);


  useEffect(() => {
    const fetchBCData = async () => {
      const response = await fetch('https://xm-ps-sc-api.onrender.com/api/v1/cd/get');  
      // Replace with your actual API endpoint
           const jsonData = await response.json();
           setCCData(jsonData);
         };
    fetchBCData();
  }, [bcOpValue]);


  const handleChangeBC = (event)=>{
    setBcOpValue(event.target.value);
  };


  const url = (bcOpValue==="")?`https://xm-ps-sc-api.onrender.com/api/v1/${oPInValue}/get/?page=${pgInValue}`:`https://xm-ps-sc-api.onrender.com/api/v1/bc/get/?page=${pgInValue}&ccode=${bcOpValue}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);  
 // Replace with your actual API endpoint
      const jsonData = await response.json();
      console.log(data);
      setData(jsonData);
    };
      fetchData();
  }, [pgInValue,oPInValue]);


const handleChangePG = (event)=>{
  setPgInValue(event.target.value);
};
const handleChangeOP = (event)=>{
  setOPInValue(event.target.value);
};


  return (
    <>
   <main className='bg-slate-900 font-mono container mx-auto' >
    <header className='container text-white flex justify-between bg-black p-3 fixed'>
      <div className='flex flex-row'>
      <img className='w-[48px] h-[48px] my-auto' src={xhamLogo} alt="" />
      <h1 className='w-full text-2xl font-bold my-auto mx-[20px]' >X-Hams </h1>
      </div>
  
      <div >
        <h1 className='text-white font-bold '>C-Page : {pgInValue}</h1>
        <input onChange={handleChangePG}  className='w-[70px] h-8 text-black font-bold' name='page' type="text" placeholder='page'  />
        <select disabled={bcOpValue===""?false:true} onChange={handleChangeOP} className={(bcOpValue==="")?'bg-white h-8 text-black font-bold':'h-8 bg-white text-gray-500  font-bold'} name="opt" id="" value={oPInValue}>
          <option value="clb">clb</option>
          <option value="ps">ps</option>
        </select>
        <select disabled={(oPInValue==='clb')?true:false} onChange={handleChangeBC} className={(oPInValue==='clb')?' w-[190px] h-8 my-auto text-gray-500 font-bold bg-white':'w-[190px] h-8 my-auto text-black font-bold bg-white'} name="" id="">
        <option value="">Select</option>
        {ccdata.map((country)=>(<option key={"id-"+country.cc} value={country.cc}>{country.cName} &#40; {country.cc} &#41;</option>))}
        </select>

      </div>
    </header>
    <main className='w-full h-full bg-slate-100 container mx-auto scroll-smooth'>
    <h1 className='pt-[110px] pb-[10px] text-center text-2xl font-bold shadow-md'>{(oPInValue === 'clb')?'Celebrity':'Pornstars'}</h1>
    <div className='pt-[10px] pb-[20px] bg-white flex flex-wrap gap-4 mx-auto '>
      
      {(data.success)?data.DS.map((celebrity) => (
        <div className=' flex flex-col mx-auto p-2 border-2 border-gray-200 shadow-lg rounded-md ' key={celebrity.title}>
          <img className='w-[350px] h-[400px] rounded-md shadow-lg' src={celebrity.image} alt={celebrity.title} />
          <h1 className='rounded-md shadow-md border border-1 px-2 py-1 text-left font-bold text-2xl mt-4'>{celebrity.title}</h1>          
          <a className='w-full px-5 py-3 font-bold shadow-md text-center my-3 mx-auto bg-stone-900 text-white rounded-md' href={celebrity.link}>Profile</a>
          <p className='my-1 font-bold text-gray-600'>Rating - <span>{celebrity.rating} </span> </p>
          <p className='my-1 font-bold text-gray-600'>Country - <span>{(oPInValue==='clb')?<>{celebrity.country}</>:<>{celebrity.cname} &#40;{celebrity.cc}&#41;</>}</span> </p>

        </div>
      )):<><img className='w-[50%] h-[50%] mx-auto my-auto' src={loader} alt="" /></>}
    </div>
    </main>
    <footer className='container  text-white flex bg-black '>
        <span className='mx-auto'>&copy; {new Date().getFullYear() } RVSO IN, All rights reserved. Made By RV <span className='text-xl text-[#ff2c2c]'>&hearts;</span></span>
    </footer>
   </main>
    </>
  )
}

export default App
