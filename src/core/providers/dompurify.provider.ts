import { Provider } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

export const DOMPURIFY = Symbol('DOMPURIFY');

export const DOMPurifyProvider: Provider = {
  provide: DOMPURIFY,
  useFactory: () => {
    const window = new JSDOM('').window;
    return createDOMPurify(window as unknown as Window);
  },
};
