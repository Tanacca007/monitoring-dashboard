const FormatSelector = ({ formats, selected, onSelect }) => {
  return (
    <div className="format-selector">
      <label className="block text-sm font-medium mb-2">Export Format</label>
      <div className="grid grid-cols-3 gap-2">
        {formats.map(format => (
          <button
            key={format}
            onClick={() => onSelect(format)}
            className={`p-2 rounded ${
              selected === format
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {format}
          </button>
        ))}
      </div>
    </div>
  );
};

const TimeRangeSelector = ({ ranges, selected, onSelect }) => {
  return (
    <div className="time-range-selector">
      <label className="block text-sm font-medium mb-2">Time Range</label>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {ranges.map(range => (
          <option key={range} value={range}>
            Last {range}
          </option>
        ))}
      </select>
    </div>
  );
};
