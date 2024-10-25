import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 /** Success toast
     * 
     * @param {*} mas 
     * @param {*} position 
     * @param {*} delay 
     */
    export const SuccessTost = (mas='successful', position="top-right", delay=2000) =>{
      toast.success(mas, {
        position,
        autoClose: delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    /** 
     * 
     * @param {*} mas 
     * @param {*} position 
     * @param {*} delay 
     */
    export const ErrorTost = (msg="error", position="top-right", delay=2000) =>{
        toast.error(msg, {
            position,
            autoClose: delay,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: Bounce,
        });
    }
    /**
     * 
     * @param {*} msg 
     * @param {*} position 
     * @param {*} delay 
     */
    export const InfoTost = (msg="Info", position="top-right", delay=2000) =>{
        toast.info(msg, {
            position,
            autoClose: delay,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

