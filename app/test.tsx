import Select from "react-select";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const [projects, setProjects] = useState([]);
const [selectedTechIds, setSelectedTechIds] = useState([]);

const getTechnologies = async () => {
  try {
    const res = await fetch("/api/technologies", { method: "GET" });
    const data = await res.json();
    setProjects(data);
  } catch (err) {
    toast.error("Failed to load technologies");
  }
};

useEffect(() => {
  getTechnologies();
}, []);

const handleSelectAll = () => {
  const allTechIds = projects.map((tech) => tech._id);
  setSelectedTechIds(allTechIds);
};

const handleRemoveTech = (id) => {
  const updatedSelectedIds = selectedTechIds.filter((techId) => techId !== id);
  setSelectedTechIds(updatedSelectedIds);
};

const handleClearAll = () => {
  setSelectedTechIds([]);
};

const groupedOptions = [
  {
    label: "All Technologies",
    options: projects.map((tech) => ({
      value: tech._id,
      label: tech.name,
    })),
  },
];

return (
  <div className="mb-3">
    <label className="form-label">Technologies</label>
    <Select
      isMulti
      options={groupedOptions}
      onChange={(selectedOptions) =>
        setSelectedTechIds(selectedOptions ? selectedOptions.map((opt) => opt.value) : [])
      }
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#f8f9fa",
          color: "#212529",
          border: "1px solid #ced4da",
          boxShadow: "none",
          "&:hover": { borderColor: "#868e96" },
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#f8f9fa",
          color: "#212529",
        }),
        option: (base, { isFocused, isSelected }) => ({
          ...base,
          backgroundColor: isFocused
            ? "#e9ecef"
            : isSelected
            ? "#ced4da"
            : "#f8f9fa",
          color: "#212529",
          "&:hover": {
            backgroundColor: "#dee2e6",
            color: "#212529",
          },
        }),
      }}
      placeholder="Select technologies"
      isSearchable={true}
    />
    <button
      type="button"
      className="btn btn-primary mt-2"
      onClick={handleSelectAll}
    >
      Select All
    </button>
  </div>

  {selectedTechIds.length > 0 && (
    <div className="mb-3">
      <h5>Selected Technologies:</h5>
      <ul className="list-group">
        {selectedTechIds.map((techId) => {
          const tech = projects.find((t) => t._id === techId);
          if (!tech) return null;
          return (
            <li
              key={techId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {tech.name}
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleRemoveTech(techId)}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="btn btn-warning mt-2"
        onClick={handleClearAll}
      >
        Clear All
      </button>
    </div>
  )}
);
