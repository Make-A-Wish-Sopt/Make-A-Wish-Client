import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn, DefaultValues } from 'react-hook-form';
import * as yup from 'yup';

// export default function useFormMethods<T>(init: DefaultValues<T>, resolver: yup.ObjectSchema<T>) {
//   const methods = useForm<T>({
//     defaultValues: init,
//     resolver: yupResolver(resolver),
//   });

//   return methods;
// }
