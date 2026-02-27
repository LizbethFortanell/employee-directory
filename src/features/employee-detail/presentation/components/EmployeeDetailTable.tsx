import type { Employee } from "../../domain/employee-detail.types";

interface EmployeeDetailTableProps {
  employees: Employee[];
  onSelect?: (employee: Employee) => void;
}

export default function EmployeeDetailTable({
  employees,
  onSelect,
}: EmployeeDetailTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
              Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
              Position
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
              Department
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
              Start Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className={`transition-colors hover:bg-blue-50/50 ${onSelect ? "cursor-pointer" : ""}`}
              onClick={() => onSelect?.(employee)}
            >
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                    {employee.firstName[0]}
                    {employee.lastName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-xs text-gray-400">{employee.email}</p>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                {employee.position}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                  {employee.department}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                {employee.startDate}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    employee.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      employee.status === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                  {employee.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
