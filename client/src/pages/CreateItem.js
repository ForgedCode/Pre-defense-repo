import {
	Autocomplete,
	Chip,
	createFilterOptions,
	FormControl,
	InputLabel,
	OutlinedInput,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { clearMessages, createItem } from "../app/features/items/itemSlice";
import { getTags } from "../app/features/tags/tagSlice";
import { toast } from "react-toastify";

const CreateItem = () => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { tags } = useSelector((state) => state.tag);
	const { messages } = useSelector((state) => state.item);
	const { currentLocale } = useSelector((state) => state.locale);
	const [itemData, setItemData] = useState({
		id: "",
		title: "",
		selectedTags: [],
		tagValue: "",
	});
	useEffect(() => {
		dispatch(getTags());
	}, [dispatch]);
	const filterOptions = createFilterOptions({
		limit: 5,
	});
	const submitHandler = async () => {
		await dispatch(createItem({ itemData, navigate, params }));
		dispatch(clearMessages());
	};
	const onChange = (e) => {
		setItemData({ ...itemData, [e.target.id]: e.target.value });
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
						value={itemData.id}
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
						value={itemData.title}
						onChange={onChange}
						label={<FormattedMessage id='item.title' />}
					/>
				</FormControl>
				<Autocomplete
					multiple
					id='tags'
					disableClearable={itemData.selectedTags.length === 0}
					filterOptions={filterOptions}
					options={tags.map((option) => option.tag)}
					value={itemData.selectedTags}
					onChange={(e, value) => {
						setItemData({
							...itemData,
							selectedTags: value,
							tagValue: "",
						});
					}}
					freeSolo
					inputValue={itemData.tagValue}
					onInputChange={(e) =>
						setItemData({ ...itemData, tagValue: e.target.value })
					}
					open={itemData.tagValue.length > 0}
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
				<button
					className='flex items-center justify-center w-full gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-40'
					onClick={submitHandler}
					disabled={
						!itemData.title ||
						!itemData.id ||
						itemData.selectedTags.length === 0
					}
				>
					<FormattedMessage id='item.add' />
				</button>
			</form>
		</div>
	);
};

export default CreateItem;
