import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background} !important;
    overflow-y: scroll;
    transition: background 0.50s linear, body 0.50s linear, text 0.50s linear, toggleBorder 0.50s linear;
  }
`

export const lightTheme = {
  backgroundBoxColor: '#ffffff',
  bgc: '#ffffff',
  bgcMainLayout: '#F5F5F5',
  background: 'var(--light-theme-bgc)',
  oppositeBgc: '#000000ac',
  profileColor: 'var(--white)',
  profileColorAvatar: 'var(--white)',
  text: 'var(--black)',
  navBgc: 'var(--white)',
  navIconColor: 'var(--black)',
  navIconColorMuted: 'var(--grey)',
  skeleton: `linear-gradient(90deg,#eee,#f5f5f5,#eee )`,
  bgColorSkeleton: 'none',
  bgColorSkeletonAvatar: 'none',
  oppositeColor: 'var(--white)',
  copyLinkInSettingBgc: 'rgba(0, 0, 0, 0.05)',
  switchBgc: '#d1d1d1',
  borderBottom: '15px solid rgb(234, 234, 234)',
  bgcIcon: 'var(--white)',
  headerBoxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
  footerBoxShadow: '0px -1px 2px rgba(0, 0, 0, 0.2);',
  uploadImageBackground:'transparent',
  copyLinkIconBgc: 'rgb(242, 242, 242)',
  borderLineColor: '#E3E3E3',
  copyLinkText: '#333',
  notificationBorderBottom: 'var(--light-theme-bgc)',
  popUpBgc: '#fff',
  popUpHeaderColor: `var(--lightGrey)`,
  buttonBorderColor: "var(--black)",
  infoPanel: "var(--lightBlue)",
  borderBottomDesktop: '#12121208',
  inputHeaderBorderColor: '#D6D6D6',
  line: '#E3E3E3',
  lineThin: '2px',
  solidLine: 'solid',
  zeroforAll0: '0px',
  DMBorderAva: '2px solid #10A5F5',
  bgtoast: 'rgba(10, 10, 10, 0.6)',
  texttoast: '#fff',
}

export const darkTheme = {
  backgroundBoxColor: `var(--black)`,
  bgc: `var(--dark-theme-bgc)`,
  bgcMainLayout: `var(--dark-theme-bgc)`,
  background: 'var(--black)',
  oppositeBgc: '#ffffffcc',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  profileColor: 'var(--profile-color)',
  profileColorAvatar: 'var(--black)',
  navBgc: 'var(--black-bgc)',
  navIconColor: 'var(--white)',
  navIconColorMuted: '#939393',
  skeleton: `linear-gradient(90deg,#090909,#050505,#090909 )`,
  bgColorSkeleton: '#0a0a0a',
  bgColorSkeletonAvatar: '#0a0a0a',
  oppositeColor: 'var(--black)',
  copyLinkInSettingBgc: 'rgb(31,35,36)',
  switchBgc: '#252626',
  borderBottom: '15px solid #2023244D',
  bgcIcon: 'var(--black)',
  headerBoxShadow: '0px 1px 2px rgba(255, 255, 255, 0.2)',
  footerBoxShadow: '0px -1px 2px rgba(255, 255, 255, 0.2);',
  uploadImageBackground: 'transparent',
  copyLinkIconBgc: 'rgb(31,35,36)',
  borderLineColor: '#272727',
  copyLinkText: 'var(--white)',
  notificationBorderBottom: '#2023244D',
  popUpBgc: '#e0e0e0',
  popUpHeaderColor: `var(--dark-theme-bgc)`,
  buttonBorderColor: "#707070",
  infoPanel: "#707070",
  borderBottomDesktop: 'var(--black)',
  inputHeaderBorderColor: '#767676',
  line: '#939393',
  avaDM: '42px',
  zeroforAll: '0px',
  DMBorderAva: '2px solid #10A5F5',
  bgtoast: 'transparent',
  texttoast: '#fff'
}
