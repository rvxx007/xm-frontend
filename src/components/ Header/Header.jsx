import {Link} from 'react-dom'
import xhamLogo from '../../assets/xh_logo.png'
const Header = (propObj1,propObj2,propObj3,propObj4) => {
    

    const handleChangePG = (event)=>{
        propObj1.setPgInValue(event.target.value);
      };
      const handleChangeOP = (event)=>{
        propObj2.setOPInValue(event.target.value);
      };
  return (
    <>
    <header className='container text-white flex justify-between bg-black p-3 fixed'>
      <div className='flex flex-row'>
      <img className='w-[48px] h-[48px] my-auto' src={xhamLogo} alt="" />
      <h1 className='text-2xl font-bold my-auto mx-[20px]' >X-Hams </h1>
      </div>
      <div className='flex flex-row'>
          <ul>
            <li><Link to='/' element>Home</Link></li>
            <li><Link to='/ps/bycountry'>Country</Link></li>
          </ul>
      </div>
      <div>
        <h1 className='text-white font-bold '>C-Page : {propObj3.pgInValue}</h1>
        <input onChange={handleChangePG} value={propObj3.pgInValue} className='w-[70px] text-black font-bold' name='page' type="text" placeholder='page'  />
        <select onChange={handleChangeOP} className='text-black font-bold' name="opt" id="" value={propObj4.oPInValue}>
          <option value="clb">clb</option>
          <option value="ps">ps</option>
        </select>
        

      </div>
    </header>
    </>
  )
}

export default Header