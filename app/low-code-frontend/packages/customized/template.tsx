export const codeTemplate = (elementData) => `
import { RenderTemplate } from 'low-code-renderer'

const MyComponent = () => {
  return (
     <RenderTemplate element={${JSON.stringify(elementData, null, 2)}} />
  );
};

export default MyComponent;
`.trim();
