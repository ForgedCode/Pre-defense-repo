import { useThemeSwitcher } from "../../hooks/useThemeSwitcher";
import { LightMode, DarkMode } from "@mui/icons-material";

const ThemeSwitcher = () => {
	const [theme, themeSwitcher] = useThemeSwitcher();
	return (
		<button onClick={themeSwitcher}>
			{theme ? (
				<DarkMode className='text-lightLink scale-150' />
			) : (
				<LightMode className='text-yellow-500 scale-150' />
			)}
		</button>
	);
};

export default ThemeSwitcher;
