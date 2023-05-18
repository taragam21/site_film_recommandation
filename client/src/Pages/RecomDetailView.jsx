import React, { useEffect } from 'react'
import DetailBanner2 from '../Component/DetailView/DetailBanner2';


function RecomDetailView() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, []);
  return (
    <div style={{color:"white",marginTop:"88px"}}>
      
      <DetailBanner2/>
      
    </div>
  )
}

export default RecomDetailView