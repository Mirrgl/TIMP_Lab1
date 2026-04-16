import { useEffect, useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";

export function useCheckpointForm({ initialData, onSave }) {
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: initialData?.name ?? "",
      status: initialData?.status ?? false,
      hosts:
        initialData?.hosts?.length > 0
          ? initialData.hosts.map((host) => ({ value: host }))
          : [{ value: "" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hosts",
  });

  const status = useWatch({
    control,
    name: "status",
  });

  const onAddHost = () => {
    append({ value: "" });
  };

  const onRemoveHost = (index) => {
    if (fields.length === 1) return;
    remove(index);
  };

  const onToggleStatus = () => {
    setValue("status", !status);
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(false);
    try {
      await onSave({
        name: values.name.trim(),
        status: values.status,
        hosts: values.hosts.map((item) => item.value.trim()),
      });
    } catch (error) {
      setSubmitError(true);
    }
  });

  return {
    register,
    getValues,
    errors,
    fields,
    status,
    isSubmitting,
    submitError,
    onAddHost,
    onRemoveHost,
    onToggleStatus,
    onSubmit,
  };
}
