import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './editorConfig';
import Root from './Root';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Root />);
}
