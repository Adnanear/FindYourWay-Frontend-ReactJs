import Dark from './Dark';
import Light from './Light';

const variant = {
  Dark,
  Light,
};

export default variant;
export type ThemeVariant = keyof typeof variant;
