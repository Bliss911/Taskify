import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedSubMenu({children}){
    return (<>
    
    <AnimatePresence>
         <motion.div
           initial={{ height: 0}}
           animate={{ height: 'fit-content'}}
           exit={{ height: 0 }}
         >
             {children}

             </motion.div>
                </AnimatePresence>
    
    </>)
}