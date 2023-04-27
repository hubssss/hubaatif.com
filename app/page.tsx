import Image from 'next/image';
import { Inter } from 'next/font/google';
import avatar from '../public/huba-avatar.jpeg';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className='container px-8 lg:px-32 mt-8 lg:pt-20'>
      <Image src={avatar} className='rounded w-28 h-28' alt='Profile Photo' />
      <h1 className='mb-4 mt-4 text-4xl font-extrabold leading-none tracking-wide text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
        Hafiza Huba Atif
        <div className='pt-4' style={{ fontSize: '18px' }}>
          (حافظہ حُبا عاطف)
        </div>
      </h1>
      <p className='text-lg font-normal text-gray-300 lg:text-xl dark:text-gray-300 pb-8'>
        I am a computer science student with a passion for digital marketing, SEO, and data science.
        Over the past year, I have gained experience in creating SEO audit reports, conducting
        keyword research, producing SEO-based content, and working as a freelance data scientist on
        Upwork. My skills in data visualization, analysis, and machine learning have enabled me to
        successfully complete various projects in this field. As a dedicated learner and freelancer,
        I am committed to staying up-to-date with the latest technologies and trends to provide
        valuable insights and solutions to my clients. I am excited to continue growing my skills
        and contributing to the tech industry.
      </p>
    </div>
  );
}
