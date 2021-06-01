import GlobalStyle from './styles/global';
import { Title, Article, ToggleButton } from './components/darkModeElements';
import { ThemeProvider } from 'styled-components';
import themeStyle from './components/Theme';
import useTheme from './hooks/useTheme';

function App() {
  const [theme, toggleTheme] = useTheme();
  return (
    /* theme 안에 들어있는 객체를 전달받을 수 있음.*/
    <ThemeProvider theme={themeStyle[theme]}>
      <GlobalStyle />
      <Title>Light / Dark Mode - Toggle Button</Title>
      <ToggleButton onClick={toggleTheme}/>
      <Article>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum optio ab porro magni in sunt ipsam,
        doloremque minima, itaque sapiente consequatur, repellat velit voluptatum accusantium aperiam. Nostrum
        sunt reprehenderit nemo!
      </Article>
    </ThemeProvider>
  );
}

export default App;
