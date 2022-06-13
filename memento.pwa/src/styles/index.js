import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const black = "#000";
export const green = "#10D310";
export const purple = "#a537fd";
export const red = "#ff5454";
export const subtleGreyBlue = "#67809f";
export const lightGrey = "#f3f3f3";
export const baseGrey = "#AFAFAF";
export const superLightGrey = "#AFAFAF99";
export const grey = "#939393";
export const grey2 = "#AFAFAF";
export const blue = "#10A5F5";
export const lightBlue = "#b0f0ff";
export const fadedBlue = "#72a2da";
export const orange = "#f89406";
export const lightOrange = "#fabe58";
export const disabled = "#bdc6d0";
export const shadow = "0 7px 14px -3px hsla(0, 0%, 0%, 0.1)";
export const darkThemeBgc = '#121212';
export const blackBgc = '#101010';
export const lightThemeBgc = '#F5F5F5';
export const profileColor = '#202324';

const GlobalStyle = createGlobalStyle`
	${reset}

	:root {
		--white: white;
		--black: ${black};
		--green: ${green};
		--dark-theme-bgc: ${darkThemeBgc};
		--black-bgc: ${blackBgc};
		--light-theme-bgc: ${lightThemeBgc};
		--profile-color: ${profileColor};
		--purple: ${purple};
		--red: ${red};
		--baseGrey: ${baseGrey};
		--subtleGreyBlue: ${subtleGreyBlue};
		--lightGrey: ${lightGrey};
		--superLightGrey: ${superLightGrey};
    --blue: ${blue};
    --lightBlue: ${lightBlue};
    --grey: ${grey};
    --grey2: ${grey2};
		--fadedBlue: ${fadedBlue};
		--orange: ${orange};
		--lightOrange: ${lightOrange};
		--primaryColor: ${blue};
		--secondaryColor: ${orange};
		--appBackground: ${lightGrey};
		--disabled: ${disabled};
		--shadow: ${shadow};
		--regularBackground: transparent;
    --font-body: 'Roboto', apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    --font-headings: 'Nunito Sans', apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
		--font-weight-light: 300;
		--font-weight-light-italic: 300i;
		--font-weight-regular: 400;
    --font-weight-medium: 600;
    --font-weight-bold: 700;c

		--backgroundColor: var(--regularBackground);
	}

	*, *:before, *:after {
		box-sizing: border-box;
	}

	html {
		font-size: 62.5%;
		scroll-behavior: smooth;
	}

	html, body {
		width: 100%;
		height: 100%;
	}

	body {
		font-family: var(--font-body);
		font-weight: var(--font-weight-regular);
		font-size: 1.5rem;
		margin: 0;
		background-color: var(--light-theme-bgc);

		&.modal-open {
		  overflow: hidden;
		}
	}

	#root {
		position: relative;
	}

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-body);
    font-weight: var(--font-weight-bold);
  }

	button, a, p, span, input, select, option, textarea, label {
		font-family: var(--font-body);
		font-weight: var(--font-weight-normal);
	}

	a, p, input, select, option, textarea {
		font-size: 1.5rem;
	}

	label {
		font-family: var(--font-body);
		font-weight: var(--font-weight-bold);
		color: var(--subtleGreyBlue);
		font-size: 1.5rem;
	}

	h1, h2, h3, h4, h5 {
		font-weight: var(--font-weight-light);
	}

	h1 {
		font-size: 3.9rem;
	}

	h2 {
		font-size: 3.2rem;
	}

	h3 {
		font-size: 2.5rem;
	}

	h4 {
		font-size: 2.4rem;
	}

	h5 {
		font-size: 2.0rem;
	}

	a {
		cursor: pointer !important;
		&:hover {
			cursor: pointer !important;
		}
		color: var(--blue);
	}
`;

export default GlobalStyle;
