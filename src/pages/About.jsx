import { useContext } from 'react';
import { ThemeContext } from '../App';

function About() {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <div className="w-4/5 mx-auto align-element py-20">
        <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-6xl text-base-content">We love</h1>
        <h2 className={`stats shadow px-8 py-6 text-3xl text-white ${theme.theme == 'dark' ? 'bg-secondary' :'bg-primary'}`}>comfy</h2>
        </div>
        <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae quam blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia optio aut! Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo sed officiis ea tempore! Similique eos minima sit porro, ratione aspernatur!</p>
      </div>
    </div>
  )
}

export default About