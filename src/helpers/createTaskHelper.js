/* eslint-disable prefer-const */
export default function CreateTaskHelper(values) {
  let errors = {};
  if (!values.title && values.title.length === 0) {
    errors.titleErr = true;
    errors.titleMsg = 'Title is required';
  }
  if (!values.description && values.description.length === 0) {
    errors.descriptionErr = true;
    errors.descriptionMsg = 'Description is required';
  }
  if (!values.assignedDepartment && values.assignedDepartment !== 0) {
    console.log(!values.assignedDepartment);
    errors.assignedDepartmentErr = true;
    errors.assignedDepartmentMsg = 'Assigned Department is required';
  }
  console.log(errors);
  return errors;
}
