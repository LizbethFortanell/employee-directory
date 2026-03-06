import type { Employee } from "../../domain/employee-detail.types";
import StatusBadge from "../../../../shared/components/StatusBadge";

interface EmployeeDetailTableProps {
  employees: Employee[];
  onSelect?: (employee: Employee) => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EmployeeDetailTable({
  employees,
  onSelect,
}: EmployeeDetailTableProps) {
  if (employees.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <p className="text-sm text-gray-500">
          No employees found. Click "Add Employee" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />
      <table className="min-w-full divide-y divide-gray-200" aria-label="Employee directory">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
              Name
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
              Position
            </th>
            <th scope="col" className="hidden px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:table-cell">
              Department
            </th>
            <th scope="col" className="hidden px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase sm:table-cell">
              Start Date
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
              Status
            </th>
            {onSelect && (
              <th scope="col" className="px-4 py-4">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {employees.map((employee, index) => (
            <tr
              key={employee.id}
              className={`transition-colors hover:bg-blue-50/50 ${onSelect ? "cursor-pointer" : ""} ${index % 2 === 1 ? "bg-gray-50/50" : ""}`}
              onClick={() => onSelect?.(employee)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && onSelect) {
                  e.preventDefault();
                  onSelect(employee);
                }
              }}
              tabIndex={onSelect ? 0 : undefined}
              role={onSelect ? "button" : undefined}
              aria-label={onSelect ? `View details for ${employee.firstName} ${employee.lastName}` : undefined}
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
                    <a
                      href={`mailto:${employee.email}`}
                      className="text-xs text-gray-500 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {employee.email}
                    </a>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                {employee.position}
              </td>
              <td className="hidden whitespace-nowrap px-6 py-4 sm:table-cell">
                <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                  {employee.department}
                </span>
              </td>
              <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-600 sm:table-cell">
                {formatDate(employee.startDate)}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <StatusBadge status={employee.status} />
              </td>
              {onSelect && (
                <td className="whitespace-nowrap px-4 py-4 text-gray-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
