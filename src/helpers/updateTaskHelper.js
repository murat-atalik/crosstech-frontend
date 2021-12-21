/* eslint-disable prefer-const */
export default function UpdateTaskHelper(values) {
  let errors = {};
  if (!values.title && values.title.length === 0) {
    errors.titleErr = true;
    errors.titleMsg = 'Title is required';
  }
  if (!values.description && values.description.length === 0) {
    errors.descriptionErr = true;
    errors.descriptionMsg = 'Description is required';
  }
  return errors;
}
