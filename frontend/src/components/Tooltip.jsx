const Tooltip = ({ children, text }) => {
  return (
    <span className="tooltip-container relative inline-block cursor-pointer ml-1">
      <svg
        className="tooltip-icon inline-block w-4 h-4 text-blue-500"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
      <span
        className="tooltip-text invisible absolute right-0 bottom-full mb-2 w-64 max-w-xs bg-gray-800 text-white text-xs rounded-lg py-2 px-3 z-50 opacity-0 transition-opacity duration-300 shadow-xl"
        dangerouslySetInnerHTML={{ __html: text }}
        style={{
          pointerEvents: 'none',
          whiteSpace: 'normal',
          wordWrap: 'break-word'
        }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        .tooltip-container:hover .tooltip-text {
          visibility: visible !important;
          opacity: 1 !important;
        }
        .tooltip-text::after {
          content: '';
          position: absolute;
          top: 100%;
          right: 10px;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #1f2937 transparent transparent transparent;
        }
      `}} />
    </span>
  );
};

export default Tooltip;
