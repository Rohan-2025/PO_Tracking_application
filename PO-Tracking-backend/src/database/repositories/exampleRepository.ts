import Example, { IExample } from '../models/exampleModel';

export const findAllExamples = async (): Promise<IExample[]> => {
    return Example.find();
};
