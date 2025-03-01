import { createContext, useContext, useEffect, useRef, useState } from 'react';

const STORY_NAMES: string[][] = [
  ['basic', 'accordion'],
  ['basic', 'button'],
  ['basic', 'tooltip'],
  ['data-display', 'divider'],
  ['data-display', 'table'],
  ['feedback', 'snackbar'],
  ['illustration', 'icon'],
  ['illustration', 'spinner'],
  ['input', 'form'],
  ['input', 'form-dialog'],
  ['input', 'numberinput'],
  ['input', 'radioinput'],
  ['input', 'rangeinput'],
  ['input', 'selectinput'],
  ['input', 'switchinput'],
  ['input', 'textinput'],
  ['navigation', 'breadcrumbs'],
  ['navigation', 'drawer'],
  ['navigation', 'link'],
  ['navigation', 'scrollpage'],
  ['navigation', 'tabs'],
  ['navigation', 'tree'],
  ['utility', 'click-target'],
  ['utility', 'scrollbar'],
];

const toUpperCase = (s: string) => `${s[0].toUpperCase()}${s.slice(1)}`;
const STORIES: Story[] = STORY_NAMES.map(([category, story]) => {
  return {
    name: `${category.split('-').map(s => toUpperCase(s)).join(' ')} / ${toUpperCase(story)}`,
    story: `${category}-${story}`,
  }
});

type Theme = 'light' | 'dark';
const ThemeContext = createContext<Theme>('light');
type Mode = 'dev' | 'prod';
const EnvContext = createContext<Mode>('prod');

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mode, setMode] = useState<Mode>(import.meta.env.DEV ? 'dev' : 'prod');
  const [search, setSearch] = useState('');

  return (
    <EnvContext.Provider value={mode}>
      <ThemeContext.Provider value={theme}>
        <div className="mx-auto w-full max-w-[1200px] mb-24 mt-8">
          <div className="flex flex-col space-y-8 p-2">

            <div>
              <h1 className='font-bold text-5xl text-center'>@thavixt/uikit</h1>
            </div>

            <div className="flex space-x-2 items-center justify-center">
              <img src="https://img.shields.io/npm/v/@thavixt/uikit" alt="NPM package version" />
              <img src="https://img.shields.io/npm/dm/@thavixt/uikit" alt="NPM package monthly downloads" />
              <img src="https://img.shields.io/npm/last-update/@thavixt/uikit" alt="NPM package last updated at" />
            </div>

            <div className="flex flex-col items-center">
              {import.meta.env.DEV ? (
                <div className="flex space-x-2">
                  <input type="checkbox" defaultChecked={mode === 'dev'} id="devSite" onChange={e => setMode(e.target.checked ? 'dev' : 'prod')} />
                  <label htmlFor="devSite">Dev storybook</label>
                </div>
              ) : null}
              <div className="flex space-x-2">
                <input type="checkbox" defaultChecked={theme === 'dark'} id="darkMode" onChange={e => setTheme(e.target.checked ? 'dark' : 'light')} />
                <label htmlFor="darkMode">Show stories in <b>dark mode</b> by default</label>
              </div>
            </div>

            <div className="flex space-x-2 justify-center items-center">
              <label htmlFor="search">Search:</label>
              <input type="text" name="search" id="search" className='border-1 rounded-md' onChange={e => setSearch(e.target.value)} />
            </div>

            <Stories stories={STORIES.filter(story => story.name.toLowerCase().includes(search.toLowerCase()) || story.story.includes(search.toLowerCase()))} />

          </div>
        </div>
      </ThemeContext.Provider>
    </EnvContext.Provider>
  )
}

interface Story {
  name: string;
  story: string;
}

function Stories({stories}: {stories: Story[]}) {
  return (
    <div className="flex flex-col space-y-2">
      {stories.map(story => <StoryComponent {...story} />)}
    </div>
  )
}

function StoryComponent({ name, story }: Story) {
  const env = useContext(EnvContext);
  const theme = useContext(ThemeContext);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            console.log(name, 'is visible now');
            setVisible(true);
          }
        }
      },
      { threshold: 1 }
    );
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [name]);

  // const storyUrl = `${env === 'prod' ? 'https://thavixt-uikit.komlosidev.net/iframe.html' : 'http://localhost:6006/iframe.html'
  const storyUrl = `${env === 'prod' ? 'https://thavixt-uikit.komlosidev.net/' : 'http://localhost:6006/'
    }?${[
      // story embed
      `path=/story/${story}--default`,
      'full=1',
      // component only
      // `id=${story}--default`,
      // 'viewMode=story',
      // for all embeds
      'shortcuts=false',
      'singleStory=true',
      // params
      `globals=theme:${theme}`,
    ].join('&')}`;

  return (
    <div ref={ref} className="grid grid-cols-[1fr_3fr] items-center justify-center">
        <h2>{name}</h2>
        {visible ? (
          <iframe src={storyUrl} width="100%" height="500" />
        ) : (
          <div className='block h-[500px] w-full bg-slate-800 rounded-md' />
        )}
    </div>
  )
}

export default App
