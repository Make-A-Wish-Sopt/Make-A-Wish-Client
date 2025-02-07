export function checkComp() {
  const componentType = typeof window === 'undefined' ? 'server' : 'client';
  return componentType;
}
