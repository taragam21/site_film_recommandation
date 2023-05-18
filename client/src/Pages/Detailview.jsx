import React, { useEffect } from 'react'
import DetailBanner from '../Component/DetailView/DetailBanner';


function Detailview() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, []);
  return (
    <div style={{color:"white",marginTop:"88px"}}>
 
      <DetailBanner/>

    </div>
  )
}

export default Detailview