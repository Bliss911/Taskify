import { GoSignIn } from 'react-icons/go'
import { FaSign, FaDollarSign } from 'react-icons/fa'
import { MdAssignment } from 'react-icons/md'
const user = [
    {
        title: "Enroll as user",
        caption: "Before you can post your tasks, you must enroll as a user and fund your wallet.",
        icon: <GoSignIn />

    },
    {
        title: 'Post Your Tasks',
        icon: <FaSign />,
        caption: "Include as much information as possible, set a price offer for your task."
    },
    {
        title: "Pay Tasker for service",
        icon: <FaDollarSign />,
        caption: 'Pay tasker if service is completed or file a complaint against tasker.'
    }

]

const vendor = [
    {
        title: "Register an Account",
        caption: "Before you can earn on Taskify, you must be registered. Make sure you submit all info.",
        icon: <GoSignIn />


    },
    {
        title: 'Browse for Tasks',
        icon: <MdAssignment />,
        caption: "Once you're registered, you can browse our task library for tasks you can do."
    },
    {
        title: "Get Paid",
        icon: <FaDollarSign />,
        caption: 'Taskify will only authorize payments if vendor is satisfied with your service.'
    }

]


export { vendor, user };
