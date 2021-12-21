import { useEffect, useState } from 'react';

const useValidation = (callback, validate, values) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = () => {
    setIsSubmitting(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      setIsSubmitting(false);
      callback(values);
    }
  }, [callback, errors, isSubmitting, values]);

  return {
    handleChange,
    values,
    handleSubmit,
    errors,
  };
};

export default useValidation;
