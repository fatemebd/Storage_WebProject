import { useRouter } from "next/router";
import { useEffect } from "react";

const Activate = () => {
      const router = useRouter();

    useEffect(()=>{
        console.log(router.pathname);
    })
    return ( "" );
}
 
export default Activate;