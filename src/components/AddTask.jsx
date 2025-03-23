import { useState } from "react";
import Input from "./Input";

function AddTask({ onTaskAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-4 rounded-md shadow p-6 bg-slate-200 flex flex-col">
      <Input
        type="text"
        placeholder="Digite o Titulo da Tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        type="text"
        placeholder="Digite a Descrição da Tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button
        className="bg-slate-400 text-white p-2 rounded-md"
        onClick={() => {
          if (!title.trim || !description.trim)
            return alert("Preencha os campos");

          onTaskAdd(title, description);
          setTitle("");
          setDescription("");
        }}
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
