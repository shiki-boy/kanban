import { cleanEnv, port, str } from 'envalid';

// TODO: add validations from zod
const validateEnv = () => {
  // returns a sanitized, immutable environment object
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
};

export default validateEnv;
