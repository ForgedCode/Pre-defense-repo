import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { addStringField } from "../../app/features/items/itemSlice";

const AddFieldsToolbar = () => {
	// const params = useParams();
	// const dispatch = useDispatch();
	const [fieldTitle, setFieldTitle] = useState({
		string: "",
		multiline: "",
		integer: "",
		data: "",
		boolean: "",
	});

	const onChange = (e) => {
		setFieldTitle({ ...fieldTitle, [e.target.id]: e.target.value });
	};
	// const addStringHandler = () => {
	// 	dispatch(addStringField({ params, title: fieldTitle.string }));
	// };
	return (
		<div className='my-8 flex flex-col gap-4'>
			<div className='flex lg:w-2/4 gap-4'>
				<FormControl className='w-full' variant='outlined' size='small'>
					<InputLabel className='dark:text-light'>
						<FormattedMessage id='field.addString' />
					</InputLabel>
					<OutlinedInput
						className='dark:text-light'
						id='string'
						value={fieldTitle.string}
						onChange={onChange}
						label={<FormattedMessage id='field.addString' />}
					/>
				</FormControl>
				<Button variant='contained'>
					<FormattedMessage id='create' />
				</Button>
			</div>
			<div className='flex lg:w-2/4 gap-4'>
				<FormControl className='w-full' variant='outlined' size='small'>
					<InputLabel className='dark:text-light'>
						<FormattedMessage id='field.addTextarea' />
					</InputLabel>
					<OutlinedInput
						className='dark:text-light'
						id='multiline'
						value={fieldTitle.multiline}
						onChange={onChange}
						label={<FormattedMessage id='field.addTextarea' />}
					/>
				</FormControl>
				<Button variant='contained'>
					<FormattedMessage id='create' />
				</Button>
			</div>
			<div className='flex lg:w-2/4 gap-4'>
				<FormControl className='w-full' variant='outlined' size='small'>
					<InputLabel className='dark:text-light'>
						<FormattedMessage id='field.addNumber' />
					</InputLabel>
					<OutlinedInput
						className='dark:text-light'
						id='integer'
						value={fieldTitle.integer}
						onChange={onChange}
						label={<FormattedMessage id='field.addNumber' />}
					/>
				</FormControl>
				<Button variant='contained'>
					<FormattedMessage id='create' />
				</Button>
			</div>
			<div className='flex lg:w-2/4 gap-4'>
				<FormControl className='w-full' variant='outlined' size='small'>
					<InputLabel className='dark:text-light'>
						<FormattedMessage id='field.addBoolean' />
					</InputLabel>
					<OutlinedInput
						className='dark:text-light'
						id='boolean'
						value={fieldTitle.boolean}
						onChange={onChange}
						label={<FormattedMessage id='field.addBoolean' />}
					/>
				</FormControl>
				<Button variant='contained'>
					<FormattedMessage id='create' />
				</Button>
			</div>
			<div className='flex lg:w-2/4 gap-4'>
				<FormControl className='w-full' variant='outlined' size='small'>
					<InputLabel className='dark:text-light'>
						<FormattedMessage id='field.addDate' />
					</InputLabel>
					<OutlinedInput
						className='dark:text-light'
						id='date'
						value={fieldTitle.date}
						onChange={onChange}
						label={<FormattedMessage id='field.addDate' />}
					/>
				</FormControl>
				<Button variant='contained'>
					<FormattedMessage id='create' />
				</Button>
			</div>
		</div>
	);
};

export default AddFieldsToolbar;
