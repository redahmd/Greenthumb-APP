import React from "react";

const Input = ({ icon: Icon, label, type, name, value, onChange, placeholder, required }) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-3 py-2 border rounded ${Icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
};

export default Input;
