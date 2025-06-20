// frontend/src/utils/toast.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifySuccess = (message) => toast.success(message, { position: "top-right" });
export const notifyError = (message) => toast.error(message, { position: "top-right" });
