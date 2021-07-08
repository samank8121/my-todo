import React, { memo } from 'react';

function ErrorAlert(props: { errorMessage: string; setShowErrorMessage: (s: boolean) => void }) {
  const { errorMessage, setShowErrorMessage } = props;
  console.log('Render Alert');
  return (
    <>
      <div
        className='relative z-50 px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded '
        onClick={() => setShowErrorMessage(false)}
      >
        <strong className='font-bold'>Error:</strong>
        <span className='block pl-2 sm:inline'>{errorMessage}</span>
        <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
          <svg className='w-6 h-6 text-red-500 fill-current' role='button' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <title>Close</title>
            <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
          </svg>
        </span>
      </div>
    </>
  );
}
export default memo(ErrorAlert);
