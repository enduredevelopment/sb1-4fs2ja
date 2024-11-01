import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const events = [
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(2024, 2, 15),
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Project Deadline',
      date: new Date(2024, 2, 20),
      type: 'deadline',
    },
  ];

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks = [];
  let week = Array(7).fill(null);
  let weekIndex = 0;

  days.forEach((day, index) => {
    const dayIndex = (index + firstDayOfMonth) % 7;
    week[dayIndex] = day;

    if (dayIndex === 6 || index === days.length - 1) {
      weeks.push(week);
      week = Array(7).fill(null);
    }
  });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
        <button
          onClick={() => setShowEventModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Event
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="mx-4 text-lg font-semibold text-gray-900">
                {currentDate.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </h2>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-7 gap-px">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px mt-2">
            {weeks.map((week, weekIdx) =>
              week.map((day, dayIdx) => {
                const date = day
                  ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                  : null;
                const isToday =
                  date?.toDateString() === new Date().toDateString();
                const isSelected =
                  date?.toDateString() === selectedDate?.toDateString();
                const dayEvents = events.filter(
                  (event) =>
                    date && event.date.toDateString() === date.toDateString()
                );

                return (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    className={`min-h-[100px] p-2 border border-gray-200 ${
                      isToday ? 'bg-blue-50' : 'bg-white'
                    } ${isSelected ? 'ring-2 ring-indigo-500' : ''}`}
                    onClick={() => date && setSelectedDate(date)}
                  >
                    {day && (
                      <>
                        <p
                          className={`text-sm ${
                            isToday ? 'font-semibold text-blue-600' : ''
                          }`}
                        >
                          {day}
                        </p>
                        <div className="mt-1 space-y-1">
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded ${
                                event.type === 'meeting'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {event.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {showEventModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add New Event
                </h3>
                <div className="mt-2">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Event Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Event Type
                      </label>
                      <select
                        id="type"
                        name="type"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="meeting">Meeting</option>
                        <option value="deadline">Deadline</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                >
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;