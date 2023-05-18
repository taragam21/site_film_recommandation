import React, { useEffect } from 'react'
import CastDetailBanner from "../Component/CastDetail/CastDetailBanner"


function CastDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{color:"white",marginTop:"88px"}}>
      <CastDetailBanner/>
    </div>
  )
}

export default CastDetail