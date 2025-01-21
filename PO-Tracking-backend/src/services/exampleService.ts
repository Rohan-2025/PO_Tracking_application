import { findAllExamples } from '../database/repositories/exampleRepository';
import { ExampleInterface } from '../interfaces/exampleInterface';

export const getExamples = async (): Promise<ExampleInterface[]> => {
    return await findAllExamples();
};
