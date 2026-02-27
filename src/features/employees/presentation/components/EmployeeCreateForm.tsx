import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useAddEmployeeMutation,
  useGetDepartmentsQuery,
} from "../../data/employeesApi";

const employeeCreateSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  startDate: z.string().min(1, "Start date is required"),
  status: z.enum(["active", "inactive"]),
});

type EmployeeCreateFormData = z.infer<typeof employeeCreateSchema>;

interface EmployeeCreateFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function EmployeeCreateForm({
  onSuccess,
  onCancel,
}: EmployeeCreateFormProps) {
  const { data: departments } = useGetDepartmentsQuery();
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeCreateFormData>({
    resolver: zodResolver(employeeCreateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      position: "",
      department: "",
      startDate: "",
      status: "active",
    },
  });

  const onSubmit = async (data: EmployeeCreateFormData) => {
    await addEmployee(data).unwrap();
    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName")}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName")}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            {...register("position")}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {errors.position && (
            <p className="mt-1 text-xs text-red-600">
              {errors.position.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            {...register("department")}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select department</option>
            {departments?.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-1 text-xs text-red-600">
              {errors.department.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            {...register("startDate")}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {errors.startDate && (
            <p className="mt-1 text-xs text-red-600">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            {...register("status")}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-xs text-red-600">
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Employee"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
