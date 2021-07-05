import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';

import cogoToast from "cogo-toast";
import { useAuth } from './AuthProvider';


const GeneralContext = React.createContext()

export function useGenCtx () {
	return useContext(GeneralContext)
}

const GeneralProvider = ({ children }) => {
	const { user } = useAuth()
	const [task, setTask] = useState(null)
	const [recipient, setRecipient] = useState(null)
	const [msgs, setmsgs] = useState([])
	const [err, setErr] = useState(false);
	const [error, setError] = useState(null);
	const [loadingChatMessages, setLoadingChatMessages] = useState(false);

	const [loading, setLoading] = useState(false);
	const [notifs, setNotifs] = useState([]);
	const [notifCount, setNotifCount] = useState(null);


	const fetchNotifs = async () => {
		if (user) {

			setLoading(true);
			setError(null);
			try {
				const dt = await axios.get("/api/notifs");
				const { data } = dt.data;
				setError(null);

				setNotifs(data.notifs);
				setNotifCount(data.unreadCount);
				console.log(data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		}
	};
	const fetchMessagesForChat = async (id) => {
		setLoadingChatMessages(true);
		setErr(null);
		try {
			const dt = await axios.post("/api/messages/chat", { id });
			const { data } = dt.data;
			setmsgs(data.messages);
			setLoadingChatMessages(false);
			scrollToBottom()
		} catch (error) {
			setErr(error.message);
			setLoadingChatMessages(false);
		}
	};
	const scrollToBottom = () => {
		const chat = document.getElementById("chat-bx-scll");
		if (chat == null) return;
		chat.scrollTop = chat.scrollHeight;
	};

	useEffect(() => {
		fetchNotifs()
		Echo.private("chat." + user.id).listen(".MessageSent", (e) => {
			cogoToast.info("New message from " + e.user.firstname, {
				position: "bottom-right",
			});
			setmsgs(e.message.messages);
			scrollToBottom();
		});
		Echo.private("notif." + user.id).listen(".Notif", (e) => {
			cogoToast.info(e.notif, {
				position: "bottom-right",
			});
			fetchNotifs()
		});
	}, [user])


	return (
		<GeneralContext.Provider
			value={{
				task,
				setTask,
				recipient,
				setRecipient,
				msgs,
				setmsgs,
				fetchMessagesForChat,
				loadingChatMessages,
				err,
				error,
				scrollToBottom,
				notifs,
				loading,
				notifCount,
				fetchNotifs
			}}
		>
			{children}
		</GeneralContext.Provider>
	);
}
export default GeneralProvider
