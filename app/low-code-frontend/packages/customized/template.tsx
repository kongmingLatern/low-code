export const codeTemplate = (elementData) => `
import { RenderTemplate } from 'low-code-renderer'

const MyComponent = () => {
  return (
     <RenderTemplate element={${JSON.stringify(elementData)}} />
  );
};

export default MyComponent;
`.trim();
