export function checkComp() {
  const componentType = typeof window === 'undefined' ? 'server' : 'client';
  console.log(componentType);
}
