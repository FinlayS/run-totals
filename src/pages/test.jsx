import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required("requiredzzzzzz"),
  age: yup.number().required("most be number"),
});

const App = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  console.log("errors", errors.name)

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input name="name" ref={register} />
      <input name="age" type="string" ref={register} />
      <input type="submit" />
      <div className='alert alert-danger mt-2' style={{display: errors.name ? 'block' : 'none' }} role='alert'>

      </div>
    </form>

  );
};

export default App