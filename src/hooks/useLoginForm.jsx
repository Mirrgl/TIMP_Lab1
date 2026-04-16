import { useForm } from "react-hook-form";

const emptyValues = {
  login: "",
  password: "",
};

export function useLoginForm({ checkLogin, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: emptyValues,
    mode: "onSubmit",
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await checkLogin(values.login, values.password);
      onSuccess();
    } catch (error) {
      setError("root.serverError", {
        type: "server",
        message: error.message,
      });
    }
  });

  return {
    register,
    errors,
    onSubmit,
  };
}
