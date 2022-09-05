import {
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import topics from "../constants/topicState";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import editorOptions from "../constants/editorOptions";
import apiCall from "../axios/apiCall";
import urls from "../constants/urls";
import {
	clearMessages,
	updateCollection,
} from "../app/features/collection/collectionSlice";
import Loader from "../components/Loader/Loader";

const EditCollection = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const { currentLocale } = useSelector((state) => state.locale);
	const { messages, isLoading } = useSelector((state) => state.collection);
	const [editorState, setEditorState] = useState();
	const [oldData, setOldData] = useState({
		title: "",
		description: "",
		topic: "",
		imgUrl: "",
		imgPath: "",
		newImgUrl: "",
	});

	const fetchCollection = useCallback(async () => {
		const res = await apiCall.get(`/collection/${params.id}`);
		const { title, description, topic, imgUrl } = res.data;
		setEditorState(
			EditorState.createWithContent(convertFromRaw(JSON.parse(description)))
		);
		setOldData({ title, topic, imgUrl, description });
	}, [params.id]);

	useEffect(() => {
		fetchCollection();
	}, [fetchCollection]);

	const onEditorStateChange = (change) => {
		setEditorState(change);
		const convertedDesc = JSON.stringify(
			convertToRaw(editorState.getCurrentContent())
		);
		return setOldData({ ...oldData, description: convertedDesc });
	};
	const onChange = (e) => {
		setOldData({ ...oldData, [e.target.id]: e.target.value });
	};
	const onSelectChange = (e) => {
		setOldData({ ...oldData, topic: e.target.value });
	};
	const setImgToBase = (img) => {
		const reader = new FileReader();
		reader.readAsDataURL(img);
		reader.onloadend = () => {
			setOldData({
				...oldData,
				imgUrl: "",
				newImgUrl: img,
				imgPath: reader.result,
			});
		};
	};
	const onImgChange = (e) => {
		const img = e.target.files[0];
		setImgToBase(img);
	};
	const cancelHandler = (e) => {
		e.preventDefault();
		navigate(-1);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		const updCollData = new FormData();
		updCollData.append("title", oldData.title);
		updCollData.append("description", oldData.description);
		updCollData.append("topic", oldData.topic);
		updCollData.append("imgPath", oldData.imgPath || "");
		await dispatch(updateCollection({ updCollData, navigate, params }));
		dispatch(clearMessages());
	};
	useEffect(() => {
		if (messages && currentLocale === "ru") {
			toast(Object.values(messages)[0]);
		} else {
			toast(Object.values(messages)[1]);
		}
	}, [messages, currentLocale]);

	return (
		<div className='min-h-[calc(100vh-80px)] container m-auto px-4 lg:px-0 pt-8'>
			{oldData && !isLoading ? (
				<form className='flex flex-col lg:w-3/5 px-6 py-4 rounded-md gap-5 dark:bg-darkModal'>
					<FormControl>
						<InputLabel className='dark:text-light'>
							<FormattedMessage id='collection.title' />
						</InputLabel>
						<OutlinedInput
							className='dark:text-light'
							id='title'
							type='text'
							label={<FormattedMessage id='collection.title' />}
							value={oldData.title}
							onChange={onChange}
						/>
					</FormControl>
					<FormControl>
						<InputLabel className='dark:text-light h-'>
							<FormattedMessage id='collection.topic' />
						</InputLabel>
						<Select
							id='topic'
							className='dark:text-light'
							value={oldData.topic}
							onChange={onSelectChange}
							label={<FormattedMessage id='collection.topic' />}
						>
							{currentLocale === "ru"
								? topics.RU.map((title) => (
										<MenuItem key={title} value={title}>
											{title}
										</MenuItem>
								  ))
								: topics.EN.map((title) => (
										<MenuItem key={title} value={title}>
											{title}
										</MenuItem>
								  ))}
						</Select>
					</FormControl>
					<Button variant='contained' component='label'>
						<FormattedMessage id='collection.uploadImg' />
						<input type='file' accept='image/*' onChange={onImgChange} hidden />
					</Button>
					<div
						className={`flex ${
							(oldData.imgUrl && "h-[300px]") ||
							(oldData.newImgUrl && "h-[300px]")
						} py-2`}
					>
						{oldData.imgUrl && (
							<img
								className='object-cover'
								src={oldData.imgUrl}
								alt={oldData.imgUrl}
							/>
						)}
						{oldData.newImgUrl && (
							<img
								className='object-cover'
								src={URL.createObjectURL(oldData.newImgUrl)}
								alt={oldData.newImgUrl.name}
							/>
						)}
					</div>
					<Editor
						toolbar={editorOptions}
						editorState={editorState}
						onEditorStateChange={onEditorStateChange}
						toolbarClassName='border dark:text-dark '
						wrapperClassName='wrapperClassName'
						editorClassName='bg-white border px-4 dark:bg-gray-200 dark:text-dark min-h-[200px] max-h-[300px]'
						stripPastedStyles='true'
					/>
					<div className='flex items-center gap-5'>
						<button
							className='flex items-center gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-40'
							disabled={!oldData.title || !oldData.topic}
							onClick={submitHandler}
						>
							<FormattedMessage id='collection.update' />
						</button>
						<button
							type='button'
							className='flex items-center gap-2 bg-red-500 mr-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
							onClick={cancelHandler}
						>
							<FormattedMessage id='collection.cancel' />
						</button>
					</div>
				</form>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default EditCollection;
