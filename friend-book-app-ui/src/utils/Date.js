const today = new Date();
export const maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()).toISOString().split("T")[0];
export const minDate=new Date().toISOString().split("T")[0]