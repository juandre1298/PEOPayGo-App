'use client';
import React, { useEffect, useState } from 'react';
import { Datasheets, PayRate } from '../../service/dto';
import { getUsers } from '../../service/userService';
import { getFullDatasheet } from '../../service/payrollService';
import { formatDate } from '../../utils/generalUtils';

const Timesheet = () => {
  const [datasheets, setDatasheets] = useState<Datasheets[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: Datasheets[] = await getFullDatasheet(); // Pass your accessToken here
        setDatasheets(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto mt-24">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Id</th>
            <th className="border px-4 py-2">start Date</th>
            <th className="border px-4 py-2">final Date</th>
            <th className="border px-4 py-2">fullName</th>
            <th className="border px-4 py-2">payType</th>
            <th className="border px-4 py-2">payRate</th>
            <th className="border px-4 py-2">hours</th>
            <th className="border px-4 py-2">grossWage</th>
          </tr>
        </thead>
        <tbody>
          {datasheets.map((timesheet, key) => (
            <tr key={key} className="bg-gray-100">
              <td className="border px-4 py-2">{timesheet.id}</td>
              <td className="border px-4 py-2">
                {formatDate(new Date(timesheet.startDate))}
              </td>
              <td className="border px-4 py-2">
                {formatDate(new Date(timesheet.finalDate))}
              </td>
              <td className="capitalize border px-4 py-2">
                {timesheet.employeeName}
              </td>
              <td className="border px-4 py-2">
                ${' '}
                {timesheet.payType == 'hourly'
                  ? PayRate['hourly']
                  : PayRate['salary']}
              </td>
              <td className="border px-4 py-2">{timesheet.payRate}</td>
              <td className="border px-4 py-2">{timesheet.hours}</td>
              <td className="border px-4 py-2">$ {timesheet.grossWage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timesheet;
