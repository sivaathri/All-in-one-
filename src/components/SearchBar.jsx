import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, User, ChevronDown } from 'lucide-react';

const POPULAR_LOCATIONS = [
  { name: 'Puducherry (Pondicherry)', subtitle: 'Pondicherry, India' },
  { name: 'Delhi', subtitle: 'National Capital Territory, India' },
  { name: 'Bengaluru', subtitle: 'Karnataka, India' },
  { name: 'Kochi', subtitle: 'Kerala, India' }
];

export default function SearchBar({ onSearch, isModifySearch }) {
  const [searchQuery, setSearchQuery] = useState('Pondicherry, India');
  const [checkIn, setCheckIn] = useState('2025-06-21');
  const [checkOut, setCheckOut] = useState('2025-06-25');
  const [guests, setGuests] = useState('3 Adults, 1 Child, 1 Room');
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [adults, setAdults] = useState(3);
  const [childrenCount, setChildrenCount] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5)); // June 2025

  const dropdownRef = useRef(null);
  const locationRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsGuestsOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
      if (
        calendarRef.current && 
        !calendarRef.current.contains(event.target) &&
        !event.target.closest('.check-in-trigger') &&
        !event.target.closest('.check-out-trigger')
      ) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredLocations = POPULAR_LOCATIONS.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    loc.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLocation = (locName) => {
    setSearchQuery(locName);
    setIsLocationOpen(false);
  };

  const updateGuestsText = (a, c, r) => {
    const adultStr = `${a} Adult${a !== 1 ? 's' : ''}`;
    const childStr = c > 0 ? `, ${c} Child${c !== 1 ? 'ren' : ''}` : '';
    const roomStr = `, ${r} Room${r !== 1 ? 's' : ''}`;
    setGuests(`${adultStr}${childStr}${roomStr}`);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    if (!date) return;
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut('');
    } else {
      const checkInTime = new Date(checkIn).getTime();
      const clickedTime = date.getTime();
      
      if (clickedTime >= checkInTime) {
        setCheckOut(dateStr);
        setIsCalendarOpen(false); // Close dropdown when range is complete
      } else {
        setCheckIn(dateStr);
      }
    }
  };

  const isSameDay = (d1Str, d2Date) => {
    if (!d1Str || !d2Date) return false;
    const d1 = new Date(d1Str);
    return d1.getFullYear() === d2Date.getFullYear() &&
           d1.getMonth() === d2Date.getMonth() &&
           d1.getDate() === d2Date.getDate();
  };

  const isBetween = (date, startStr, endStr) => {
    if (!date || !startStr || !endStr) return false;
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const start = new Date(new Date(startStr).getFullYear(), new Date(startStr).getMonth(), new Date(startStr).getDate()).getTime();
    const end = new Date(new Date(endStr).getFullYear(), new Date(endStr).getMonth(), new Date(endStr).getDate()).getTime();
    return d > start && d < end;
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  
  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(new Date(year, month, i));
  }

  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = monthsList[month];
  const yearName = year;

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return 'Select date';
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} (${days[date.getDay()]})`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        searchQuery,
        checkIn,
        checkOut,
        guests
      });
    }
  };

  return (
    <div className={isModifySearch ? "w-full" : "w-full max-w-6xl"}>
      <form
        onSubmit={handleSearch}
        className="w-full rounded-2xl bg-white py-4 pl-4 pr-4 border border-slate-100/80 flex flex-col lg:flex-row items-center gap-4 lg:gap-0 lg:divide-x lg:divide-slate-200/50"
      >
        {/* Search Input */}
        <div ref={locationRef} className="w-full lg:w-[35%] pl-1.5 pr-5 py-1.5 flex items-center gap-3 relative">
          <Search className="h-5 w-5 text-slate-400 shrink-0 stroke-[2.2]" />
          <div className="flex flex-col w-full text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Where Are You Going?</span>
            <input
              type="text"
              placeholder="Pondicherry.."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsLocationOpen(true);
              }}
              onFocus={() => setIsLocationOpen(true)}
              className="text-[14px] font-semibold text-slate-800 placeholder-slate-400 outline-none w-full bg-transparent mt-1 leading-none"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {isLocationOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 top-full mt-3 w-80 rounded-2xl border border-gray-150 bg-white py-1 shadow-2xl z-50 overflow-hidden">
              {filteredLocations.length > 0 ? (
                <div className="flex flex-col">
                  {filteredLocations.map((loc, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectLocation(loc.name)}
                      className="flex items-center gap-3.5 px-4.5 py-3 hover:bg-slate-50 transition-colors duration-150 cursor-pointer border-b border-slate-100/50 last:border-b-0"
                    >
                      <MapPin className="h-4.5 w-4.5 text-slate-400 shrink-0 stroke-[2.2]" />
                      <div className="flex flex-col text-left">
                        <span className="text-[13.5px] font-bold text-slate-800 leading-tight">
                          {loc.name}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400 mt-0.5 leading-tight">
                          {loc.subtitle}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-4 text-center text-xs font-semibold text-slate-400">
                  No destinations found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Check-In Date */}
        <div 
          onClick={() => setIsCalendarOpen(true)}
          className="check-in-trigger w-full lg:w-[20%] px-5 py-1.5 flex items-center gap-3.5 relative cursor-pointer hover:bg-slate-50/50 rounded-xl transition-colors"
        >
          <Calendar className="h-5 w-5 text-slate-400 shrink-0 stroke-[2.2]" />
          <div className="flex flex-col w-full text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Check-in</span>
            <div className="mt-1 leading-none">
              <span className="text-[14px] font-semibold text-slate-800 block">
                {formatDateDisplay(checkIn)}
              </span>
            </div>
          </div>

          {/* Custom Calendar Dropdown */}
          {isCalendarOpen && (
            <div 
              ref={calendarRef}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 top-full mt-3 w-[340px] bg-white rounded-2xl border border-gray-150 p-5 shadow-2xl z-50"
            >
              {/* Month Selector Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
                >
                  <ChevronDown className="h-4.5 w-4.5 rotate-90 stroke-[2.5]" />
                </button>
                <span className="text-[14px] font-extrabold text-slate-800 tracking-tight">
                  {monthName} {yearName}
                </span>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
                >
                  <ChevronDown className="h-4.5 w-4.5 -rotate-90 stroke-[2.5]" />
                </button>
              </div>

              {/* Weekdays Header */}
              <div className="grid grid-cols-7 text-center mb-2.5">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <span key={day} className="text-[12px] font-bold text-slate-400">
                    {day}
                  </span>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-y-1">
                {daysArray.map((date, idx) => {
                  if (!date) return <div key={`empty-${idx}`} className="h-9 w-full" />;

                  const isStart = isSameDay(checkIn, date);
                  const isEnd = isSameDay(checkOut, date);
                  const inRange = isBetween(date, checkIn, checkOut);
                  
                  let dayClass = "h-9 w-full flex items-center justify-center text-[12.5px] font-bold relative transition-all ";
                  
                  if (isStart && !checkOut) {
                    dayClass += "bg-[#0F766E] text-white rounded-full z-10";
                  } else if (isStart && checkOut) {
                    dayClass += "bg-[#0F766E] text-white rounded-l-full z-10";
                  } else if (isEnd) {
                    dayClass += "bg-[#0F766E] text-white rounded-r-full z-10";
                  } else if (inRange) {
                    dayClass += "bg-slate-100 text-[#0F766E]";
                  } else {
                    dayClass += "text-slate-800 hover:bg-slate-50 hover:rounded-full";
                  }

                  const today = new Date(2025, 5, 1);
                  const isPast = date.getTime() < today.getTime() && !isSameDay('2025-06-01', date);

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isPast}
                      onClick={() => handleDateClick(date)}
                      className={`${dayClass} ${isPast ? 'opacity-25 cursor-not-allowed hover:bg-transparent font-normal' : 'cursor-pointer'}`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Check-Out Date */}
        <div 
          onClick={() => setIsCalendarOpen(true)}
          className="check-out-trigger w-full lg:w-[20%] px-5 py-1.5 flex items-center gap-3.5 relative cursor-pointer hover:bg-slate-50/50 rounded-xl transition-colors"
        >
          <Calendar className="h-5 w-5 text-slate-400 shrink-0 stroke-[2.2]" />
          <div className="flex flex-col w-full text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Check-out</span>
            <div className="mt-1 leading-none">
              <span className="text-[14px] font-semibold text-slate-800 block">
                {formatDateDisplay(checkOut)}
              </span>
            </div>
          </div>
        </div>

        {/* Guests and Rooms Selection */}
        <div ref={dropdownRef} className="w-full lg:w-[25%] px-5 py-1.5 flex items-center gap-3.5 relative">
          <User className="h-5 w-5 text-slate-400 shrink-0 stroke-[2.2]" />
          <div className="flex flex-col w-full text-left cursor-pointer" onClick={() => setIsGuestsOpen(!isGuestsOpen)}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Guests & Rooms</span>
            <div className="flex items-center justify-between mt-1 leading-none">
              <span className="text-[14px] font-semibold text-slate-800 truncate pr-2">
                {guests}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-500 shrink-0 stroke-[2.5]" />
            </div>
          </div>

          {/* Simple Dropdown for Guests selection */}
          {isGuestsOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0 bottom-full lg:bottom-auto lg:top-full mt-2 w-64 rounded-xl border border-gray-150 bg-white p-4 shadow-xl z-50">
              <div className="space-y-3.5">
                {/* Adults Count */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Adults</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newVal = Math.max(1, adults - 1);
                        setAdults(newVal);
                        updateGuestsText(newVal, childrenCount, rooms);
                      }}
                      className="h-6 w-6 rounded border border-gray-300 text-xs font-bold text-slate-600 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-slate-800">{adults}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newVal = adults + 1;
                        setAdults(newVal);
                        updateGuestsText(newVal, childrenCount, rooms);
                      }}
                      className="h-6 w-6 rounded border border-gray-300 text-xs font-bold text-slate-600 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children Count */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Children</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newVal = Math.max(0, childrenCount - 1);
                        setChildrenCount(newVal);
                        updateGuestsText(adults, newVal, rooms);
                      }}
                      className="h-6 w-6 rounded border border-gray-300 text-xs font-bold text-slate-600 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-slate-800">{childrenCount}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newVal = childrenCount + 1;
                        setChildrenCount(newVal);
                        updateGuestsText(adults, newVal, rooms);
                      }}
                      className="h-6 w-6 rounded border border-gray-300 text-xs font-bold text-slate-600 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms Count */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Rooms</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newVal = Math.max(1, rooms - 1);
                        setRooms(newVal);
                        updateGuestsText(adults, childrenCount, newVal);
                      }}
                      className="h-6 w-6 rounded border border-gray-300 text-xs font-bold text-slate-600 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-slate-800">{rooms}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newVal = rooms + 1;
                        setRooms(newVal);
                        updateGuestsText(adults, childrenCount, newVal);
                      }}
                      className="h-6 w-6 rounded border border-gray-300 text-xs font-bold text-slate-600 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGuestsOpen(false)}
                  className="w-full rounded-lg bg-primary py-1.5 text-center text-xs font-semibold text-white hover:bg-teal-800 transition-colors mt-2 cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="w-full lg:w-auto p-1.5 shrink-0 pl-4 lg:pl-3">
          <button
            type="submit"
            className="w-full lg:w-auto rounded-xl bg-[#0F766E] px-8 py-3.5 text-xs font-bold text-white shadow-sm hover:bg-[#0c625c] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            {isModifySearch ? (
              <>
                <Search className="h-3.5 w-3.5 text-white stroke-[2.5]" />
                <span>Modify Search</span>
              </>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
