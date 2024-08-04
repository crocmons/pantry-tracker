import PantryList from "@/components/PantryList";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center p-8">
      
      <div className='mb-12 mt-6 sm:mt-10 flex flex-col items-center justify-center text-center mx-auto bg-feature-bg bg-center bg-no-repeat'>
        <div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
          <p className='text-md font-semibold text-gray-700'>
          CRUD App
          </p>
        </div>
        <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          Pantry {' '}
          <span className='text-blue-600'>
          Tracker
          </span>{' '}
          
        </h1>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
        Pantry Tracker is a sleek CRUD app built with Next.js and Material UI, designed for efficient pantry management. Easily add, update, delete, and search items with data securely stored in Firebase.

        </p>

       
      <PantryList />
      </div>
      {/* <Pantry /> */}
    </main>
  );
}
