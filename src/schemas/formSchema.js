import * as yup from 'yup';

export const Schema = yup.object().shape({
    title: yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    content: yup.string()
        .min(10, 'Too Short!')
        .max(40, 'Too Long!')
        .required('Required'),
});
