export const checkComponents = () => {
  const componentType = typeof window === 'undefined' ? 'server' : 'client';

  console.log(componentType);
};
