"use client";

import { useState } from "react";
import { addTechnology, NewTechnology } from "../../../actions/addTechnology";

export default function AddTechnologyForm() {
  const [techData, setTechData] = useState<NewTechnology>({
    name: "",
    iconKey: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTechnology(techData);
      alert("Technology added successfully!");
      setTechData({ name: "", iconKey: "" });
    } catch (error) {
      alert("Failed to add technology.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Technology Name"
        value={techData.name}
        onChange={(e) => setTechData({ ...techData, name: e.target.value })}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Icon Key (e.g., react-native, javascript)"
        value={techData.iconKey}
        onChange={(e) => setTechData({ ...techData, iconKey: e.target.value })}
        className="p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Add Technology
      </button>
    </form>
  );
}
