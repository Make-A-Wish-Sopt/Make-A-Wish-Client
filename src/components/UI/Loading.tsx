'use client';

export const LoadingComponent = ({ render }: { render: JSX.Element }) => {
  return (
    <div
      id="modal-overlay"
      className={
        'fixed top-0 left-0 flex justify-center items-center w-full h-full z-[9999] bg-black/70'
      }
    >
      <div
        className={'fixed top-0 w-375 h-full flex flex-col items-center justify-center'}
        style={{
          animation: 'appearAnimation 0.3s ease-out forwards',
        }}
      >
        {render}
      </div>
      <style jsx>{`
        @keyframes appearAnimation {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
