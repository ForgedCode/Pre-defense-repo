import {
	Autocomplete,
	Chip,
	createFilterOptions,
	FormControl,
	InputLabel,
	OutlinedInput,
	TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearMessages, editCollItem } from "../app/features/items/itemSlice";
import { getTags } from "../app/features/tags/tagSlice";
import apiCall from "../axios/apiCall";

const EditItem = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const { tags } = useSelector((state) => state.tag);
	const { messages } = useSelector((state) => state.item);
	const { currentLocale } = useSelector((state) => state.locale);
	const [oldData, setOldData] = useState({
		id: "",
		title: "",
		selectedTags: [],
		tagValue: "",
	});
	const fetchItem = useCallback(async () => {
		const res = await apiCall.get(`/collection/getCollItem/${params.id}`);
		const { itemId, title, tags } = res.data;
		setOldData((oldData) => ({
			...oldData,
			title,
			id: itemId,
			selectedTags: tags,
		}));
	}, [params.id]);
	useEffect(() => {
		dispatch(getTags());
		fetchItem();
	}, [dispatch, fetchItem]);

	const filterOptions = createFilterOptions({
		limit: 5,
	});
	const onChange = (e) => {
		setOldData({ ...oldData, [e.target.id]: e.target.value });
	};
	const submitHandler = async () => {
		await dispatch(editCollItem({ params, oldData, navigate }));
		dispatch(clearMessages());
	};
	const cancelHandler = (e) => {
		e.preventDefault();
		navigate(-1);
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
			<form
				onSubmit={(e) => e.preventDefault()}
				className='flex flex-col lg:w-3/5 px-6 py-4 rounded-md gap-5 dark:bg-darkModal'
			>
				<FormControl>
					<InputLabel className='dark:text-light'>
						<FormattedMessage id='item.id' />
					</InputLabel>
					<OutlinedInput
						className='dark:text-light'
						id='id'
						type='text'
						value={oldData.id}
						onChange={onChange}
						label={<FormattedMessage id='item.id' />}
					/>
				</FormControl>
				<FormControl>
					<InputLabel className='dark:text-light'>
						<FormattedMessage id='item.title' />
					</InputLabel>
					<OutlinedInput
						className='dark:text-light'
						id='title'
						type='text'
						value={oldData.title}
						onChange={onChange}
						label={<FormattedMessage id='item.title' />}
					/>
				</FormControl>
				<Autocomplete
					multiple
					className='dark:text-light'
					id='tags'
					disableClearable={oldData.selectedTags.length === 0}
					filterOptions={filterOptions}
					options={tags.map((option) => option.tag)}
					value={oldData.selectedTags}
					onChange={(e, value) => {
						setOldData({
							...oldData,
							selectedTags: value,
							tagValue: "",
						});
					}}
					freeSolo
					inputValue={oldData.tagValue}
					onInputChange={(e) =>
						setOldData({ ...oldData, tagValue: e.target.value })
					}
					open={oldData.tagValue.length > 0}
					renderTags={(value, getTagProps) =>
						value.map((option, index) => (
							<Chip
								variant='outlined'
								label={option}
								{...getTagProps({ index })}
							/>
						))
					}
					renderInput={(params) => (
						<TextField
							{...params}
							variant='outlined'
							label={<FormattedMessage id='item.tag' />}
						/>
					)}
				/>
				<div className='flex items-center gap-5'>
					<button
						className='flex items-center justify-center gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-40'
						onClick={submitHandler}
						disabled={
							!oldData.title || !oldData.id || oldData.selectedTags.length === 0
						}
					>
						<FormattedMessage id='item.edit' />
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
		</div>
	);
};

export default EditItem;
