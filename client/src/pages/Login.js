import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import routes from "../constants/routes";
import { clearMessages, login } from "../app/features/auth/authSlice";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { messages, isLoading } = useSelector((state) => state.auth);
	const { currentLocale } = useSelector((state) => state.locale);
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const onChange = (e) => {
		setForm({ ...form, [e.target.id]: e.target.value });
	};
	const loginHandler = async () => {
		await dispatch(login({ form, navigate }));
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
		<div className='flex px-4 flex-col md:items-center h-[calc(100vh-80px)]'>
			{isLoading ? (
				<Loader />
			) : (
				<div className='w-full p-6 mt-16 md:mt-20 lg:mt-28 bg-light dark:bg-darkModal rounded-md shadow-md lg:max-w-xl'>
					<h2 className='text-xl font-semibold text-center text-dark dark:text-light'>
						<FormattedMessage id='nav.login' />
					</h2>
					<form className='mt-6'>
						<div className='mb-6'>
							<FormControl className='w-full' variant='outlined' size='small'>
								<InputLabel className='dark:text-light'>Email</InputLabel>
								<OutlinedInput
									className='dark:text-light'
									id='email'
									type='text'
									label='Email'
									value={form.email}
									onChange={onChange}
								/>
							</FormControl>
						</div>
						<div className='mb-2'>
							<FormControl className='w-full' variant='outlined' size='small'>
								<InputLabel className='dark:text-light'>
									<FormattedMessage id='auth.pass' />
								</InputLabel>
								<OutlinedInput
									className='dark:text-light'
									label={<FormattedMessage id='auth.pass' />}
									type={showPassword ? "text" : "password"}
									value={form.password}
									id='password'
									onChange={onChange}
									endAdornment={
										<InputAdornment position='start'>
											<IconButton
												edge='end'
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? (
													<Visibility className='dark:text-light' />
												) : (
													<VisibilityOff className='dark:text-light' />
												)}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</div>
						<p className='dark:text-light'>
							<FormattedMessage id='auth.noacc' />{" "}
							<Link
								className='text-lightLink hover:text-blue-800 transition ease-in'
								to={routes.REGISTER}
							>
								<FormattedMessage id='nav.register' />
							</Link>
						</p>
						<div className='mt-6'>
							<Button
								className='w-full dark:text-light'
								variant='contained'
								disabled={!form.email || !form.password}
								onClick={loginHandler}
							>
								<FormattedMessage id='auth.go' />
							</Button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Login;
