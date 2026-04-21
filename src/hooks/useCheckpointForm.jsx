import { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";

function toDateTimeLocalValue(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function useCheckpointForm({ initialData, onSave }) {
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: initialData?.name ?? "",
      status: initialData?.status ?? false,
      alarm: initialData?.alarm ?? "Отсутствует",
      traffic: initialData?.traffic ?? "Средняя",
      shiftTime: toDateTimeLocalValue(initialData?.shiftTime),
      hosts:
        initialData?.hosts?.length > 0
          ? initialData.hosts.map((host) => ({ value: host }))
          : [{ value: "" }],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hosts",
  });

  const status = useWatch({
    control,
    name: "status",
  });

  const alarm = useWatch({
    control,
    name: "alarm",
  });

  const traffic = useWatch({
    control,
    name: "traffic",
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

  const onChangeAlarm = (value) => {
    setValue("alarm", value);
  };

  const onChangeTraffic = (value) => {
    setValue("traffic", value);
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(false);
    try {
      await onSave({
        name: values.name.trim(),
        status: values.status,
        alarm: values.alarm,
        traffic: values.traffic,
        shiftTime:
          values.shiftDate && values.shiftClock
            ? new Date(`${values.shiftDate}T${values.shiftClock}`).toISOString()
            : "",
        hosts: values.hosts.map((item) => item.value.trim()),
      });
    } catch (error) {
      setSubmitError(true);
    }
  });

  return {
    register,
    control,
    fields,
    status,
    alarm,
    traffic,
    isSubmitting,
    submitError,
    onAddHost,
    onRemoveHost,
    onToggleStatus,
    onChangeAlarm,
    onChangeTraffic,
    onSubmit,
  };
}
